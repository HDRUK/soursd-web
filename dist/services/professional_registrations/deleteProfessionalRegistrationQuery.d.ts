import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteProfessionalRegistration from "./deleteProfessionalRegistration";
export default function deleteProfessionalRegistrationQuery(options?: MutationOptions): UseMutationOptions<Awaited<ReturnType<typeof deleteProfessionalRegistration>>, Error, number>;
