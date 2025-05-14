import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostOrganisationInviteUserPayload, PostOrganisationInviteUserResponse } from "./types";
declare const _default: (id: number, payload: PostOrganisationInviteUserPayload, options?: ResponseOptions) => Promise<ResponseJson<PostOrganisationInviteUserResponse>>;
export default _default;
