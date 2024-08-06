import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { handleJsonResponse, postRequest } from "../requests";
import { SendIssuerInvitePayload, SendIssuerInviteResponse } from "./types";

export default async (
    payload: SendIssuerInvitePayload,
    messages: ResponseTranslations
): Promise<ResponseJson<SendIssuerInviteResponse>> => {
    const response = await postRequest(
        `${process.env.NEXT_PUBLIC_API_V1_URL}/trigger_email`,
        payload,
        {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        }
    );

    return handleJsonResponse(response, messages);
};