import { QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postProjectDetails from "./postProjectDetails";
import { PostProjectDetailsPayload } from "./types";
export default function postProjectQuery(options?: QueryOptions): UseMutationOptions<Awaited<ReturnType<typeof postProjectDetails>>, Error, PostProjectDetailsPayload>;
