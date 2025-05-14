import { UseFormReturn } from "react-hook-form";
import { FormConfig } from "@/types/forms";
export default function useFormFromConfig<T>(formFieldsConfig: FormConfig): UseFormReturn<Partial<T>>;
