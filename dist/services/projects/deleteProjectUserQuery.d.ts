import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteProjectUser from "./deleteProjectUser";
import { DeleteProjectUserPayload } from "./types";
export default function deleteProjectUserQuery(options?: MutationOptions): UseMutationOptions<Awaited<ReturnType<typeof deleteProjectUser>>, Error, DeleteProjectUserPayload>;
