import { FileStatus, FileType } from "@/consts/files";

interface FileResponse {
  id: number;
  name: string;
  status: keyof typeof FileStatus;
  type: keyof typeof FileType;
  created_at: string;
  updated_at: string;
}

type FilePayload = any;

export type { FileResponse, FilePayload };
