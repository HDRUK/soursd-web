import { FileStatus, FileType } from "@/consts/files";
import { FileResponse } from "@/services/files/types";
import { renderHook } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import useFileScanned from "./useFileScanned";

const setupUseFileScanned = (file?: Partial<FileResponse | undefined>) =>
  renderHook(() =>
    useFileScanned({
      name: faker.system.fileName(),
      status: FileStatus.PENDING,
      type: FileType.CV,
      ...file,
    })
  );

describe("useFileScanned", () => {
  it("scans", async () => {
    const {
      result: { current },
    } = setupUseFileScanned();

    expect(current).toEqual({
      isNotInfected: false,
      isScanning: true,
    });
  });

  it("handles failure", async () => {
    const {
      result: { current },
    } = setupUseFileScanned({
      status: FileStatus.FAILED,
    });

    expect(current).toEqual({
      isNotInfected: false,
      isScanning: false,
    });
  });

  it("handles processed", async () => {
    const {
      result: { current },
    } = setupUseFileScanned({
      status: FileStatus.PROCESSED,
    });

    expect(current).toEqual({
      isNotInfected: true,
      isScanning: false,
    });
  });
});
