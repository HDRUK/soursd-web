import { FileStatus } from "@/consts/files";
import { mockedFile } from "@/mocks/data/file";
import { FileResponse } from "@/services/files/types";
import { renderHook } from "@/utils/testUtils";
import useFileScanned from "./useFileScanned";

const setupUseFileScanned = (file?: Partial<FileResponse | undefined>) =>
  renderHook(() => useFileScanned(mockedFile(file)));

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
