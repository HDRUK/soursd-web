import { renderHook, act } from "@/utils/testUtils";
import useFileDownload from "@/hooks/useFileDownload";

describe("useFileDownload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => "mock-object-url");
  });

  it("should successfully download a file", async () => {
    const { result } = renderHook(() => useFileDownload(1));

    await act(async () => {
      await result.current.downloadFile();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_V1_URL}/files/1/download`,
      expect.any(Object)
    );

    const anchor = document.querySelector("a") as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.download).toBe("mockfile.txt");
  });
});
