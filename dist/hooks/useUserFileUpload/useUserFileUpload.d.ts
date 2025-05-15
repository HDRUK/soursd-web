import { FileType } from "@/consts/files";
import { File, User } from "@/types/application";
import { ChangeEvent } from "react";
export interface UseUserFileUploadProps {
    fileType: FileType;
    user: User;
    upload: (formData: FormData) => Promise<File | undefined>;
}
export default function useUserFileUpload({ fileType, user, upload, }: UseUserFileUploadProps): (e: ChangeEvent<HTMLInputElement>) => Promise<{
    registry: {
        files: File[];
        digi_ident: string;
        organisations?: import("@/types/application").Organisation[];
        verified: boolean;
        training?: import("@/types/application").ResearcherTraining[];
        affiliations?: import("@/types/application").ResearcherAffiliation[];
        identity?: {
            address_1: string;
            address_2: string;
            country: string;
            county: string;
            created_at: string;
            deleted_at?: string;
            dob: string;
            drivers_license_path: string;
            id: number;
            idvt_completed_at: string;
            idvt_errors?: string;
            idvt_result: number;
            idvt_result_perc: number;
            passport_path: string;
            postcode: string;
            registry_id: number;
            selfie_path: string;
            town: string;
            updated_at?: string;
        };
    };
    id: number;
    registry_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_group: import("../../consts/user").UserGroup;
    permissions: import("@/types/application").Permission[];
    profile_completed_at: string | null;
    profile_steps_completed: string;
    approvals: import("@/types/application").Approval[];
    organisation_id?: number | null;
    custodian_id?: number;
    custodian_user_id?: number;
    consent_scrape: boolean;
    orc_id: string | null;
    orcid_scanning: boolean;
    orcid_scanning_completed_at: string | null;
    created_at: string;
    feed_source?: import("../../consts/user").UserFeedSource;
    unclaimed?: boolean;
    is_delegate: number;
    departments?: import("@/types/application").Department[];
    role?: string;
    location?: string;
    status: import("../..").Status;
    declaration_signed?: boolean;
    uksa_registered?: boolean;
    rules?: import("../../types/rules").RuleState;
    model_state: {
        state: {
            slug: import("../..").Status;
        };
    };
} | null>;
