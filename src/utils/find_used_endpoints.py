import os
import re

# Functions you're looking for
target_functions = [
    "postRequest",
    "patchRequest",
    "putRequest",
    "deleteRequest",
    "getRequest",
]

# Regex pattern to find calls like: await postRequest(...);
pattern = re.compile(
    r"\b(?:await\s+)?("
    + "|".join(re.escape(func) for func in target_functions)
    + r")\s*\(\s*([^)]*)\)",
    re.DOTALL,
)

skip_dirs = {"node_modules", ".next", "out", "dist", "__tests__"}


def extract_ternary_else_part(argument):
    if ":" in argument:
        return argument.split(":")[1]
    else:
        return argument


def extract_request_calls(content, filename):
    results = []
    for func in target_functions:
        pattern = rf"{func}\s*\("
        for match in re.finditer(pattern, content):
            start = match.end()
            parens = 1
            i = start
            while i < len(content) and parens > 0:
                if content[i] == "(":
                    parens += 1
                elif content[i] == ")":
                    parens -= 1
                i += 1
            arg_block = content[start : i - 1].strip()
            # arg_block = extract_ternary_else_part(arg_block)
            results.append((filename, func, arg_block))
    return results


def scan_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
        content = file.read()
        return extract_request_calls(content, filepath)
        # matches = pattern.findall(content)
        # return [(filepath, func, args.strip()) for func, args in matches]


def find_function_usage(function_name, root_dir):
    usage_locations = []
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in skip_dirs]

        for file in files:
            if ".test." in file:
                continue
            if file.endswith((".js", ".jsx", ".ts", ".tsx")):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                        if function_name + "(" in content:
                            usage_locations.append(filepath)
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
    return usage_locations


def scan_directory(directory):
    results = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for file in files:
            if ".test." in file:
                continue
            if file.endswith((".js", ".jsx", ".ts", ".tsx")):
                filepath = os.path.join(root, file)
                results.extend(scan_file(filepath))
    return results


def split_at_first_capital(s):
    match = re.search(r"[A-Z]", s)
    if match:
        index = match.start()
        return s[:index], s[index:]
    return s, ""


if __name__ == "__main__":
    project_root = "./"  # Set to your project root
    matches = scan_directory(project_root)
    for filepath, func, args in matches:
        target_function = filepath.split("/")[-1].split(".ts")[0]
        method = split_at_first_capital(target_function)[0].upper()
        # print(f"\nFile: {filepath}\nFunction: {func}\nArguments:\n{args}\n{'-' * 40}")

        matches = find_function_usage(target_function, project_root)
        used = len(matches) > 0
        if used:
            arg1 = args.split(",")[0]
            root = arg1.split("/")[1]
            print(method, root)
            # print(
            #    f"\nFile: {filepath}\nFunction: {func}\nArguments:\n{args}\n{'-' * 40}"
            # )
