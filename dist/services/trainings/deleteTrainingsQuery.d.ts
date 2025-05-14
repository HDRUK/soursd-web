import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteTrainings from "./deleteTrainings";
export default function deleteTrainingsQuery(options?: MutationOptions): UseMutationOptions<Awaited<ReturnType<typeof deleteTrainings>>, Error, number>;
