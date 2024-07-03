import { FileStatus } from "@/consts/files";
import { mockedFile } from "@/mocks/data/file";
import { faker } from "@faker-js/faker";
import {
  getLatestCV,
  isFileInfected,
  isFileNotInfected,
  isFileScanning,
} from "./file";

describe("File utils", () => {
  it("getLatestCV", () => {
    const name = faker.system.fileName();

    const file = getLatestCV([
      mockedFile(),
      mockedFile({
        name,
      }),
    ]);

    expect(file?.name).toEqual(name);
  });

  it("isFileScanning", () => {
    const result = isFileScanning(
      mockedFile({
        status: FileStatus.PENDING,
      })
    );

    expect(result).toEqual(true);
  });

  it("isFileInfected", () => {
    const result = isFileInfected(
      mockedFile({
        status: FileStatus.FAILED,
      })
    );

    expect(result).toEqual(true);
  });

  it("isFileNotInfected", () => {
    const result = isFileNotInfected(
      mockedFile({
        status: FileStatus.PROCESSED,
      })
    );

    expect(result).toEqual(true);
  });
});
