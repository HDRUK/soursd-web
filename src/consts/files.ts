const MAX_UPLOAD_SIZE_BYTES = 10000000;

enum FileStatus {
  PENDING = "pending",
  PROCESSED = "processed",
  FAILED = "failed",
}

enum FileType {
  CV = "CV",
  CERTIFICATION = "CERTIFICATION",
  RESEARCHER_LIST = "RESEARCHER_LIST",
}

export { MAX_UPLOAD_SIZE_BYTES, FileStatus, FileType };
