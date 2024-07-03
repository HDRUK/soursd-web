import { FileStatus, FileType } from "@/consts/files";

interface FileResponse {
  name: string;
  status: keyof typeof FileStatus;
  type: keyof typeof FileType;
}

type FilePayload = any;

export type { FileResponse, FilePayload };
