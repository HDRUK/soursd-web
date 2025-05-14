import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postProjectDetailsFromGateway from "./postProjectDetailsFromGateway";
import { PostProjectDetailsFromGatewayPayload } from "./types";
export default function postProjectDetailsFromGatewayQuery(options?: MutationOptions): UseMutationOptions<Awaited<ReturnType<typeof postProjectDetailsFromGateway>>, Error, PostProjectDetailsFromGatewayPayload>;
