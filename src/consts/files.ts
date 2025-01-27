const MAX_UPLOAD_SIZE_BYTES = 10000000;

enum FileStatus {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  FAILED = "FAILED",
}

enum FileType {
  CV = "CV",
  CERTIFICATION = "CERTIFICATION",
}

export { MAX_UPLOAD_SIZE_BYTES, FileStatus, FileType };
