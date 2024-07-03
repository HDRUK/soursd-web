import { FileStatus, FileType } from "@/consts/files";
import { FileResponse } from "@/services/files/types";
import { faker } from "@faker-js/faker";

const mockedFile = (file?: Partial<FileResponse>) => ({
  name: faker.system.fileName(),
  type: FileType.CV,
  status: FileStatus.PENDING,
  ...file,
});

export { mockedFile };
