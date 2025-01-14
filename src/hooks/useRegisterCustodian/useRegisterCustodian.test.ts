import { mockedCustodian } from "@/mocks/data/custodian";
import { postRegister } from "@/services/auth";
import { getCustodianByEmail, patchCustodian } from "@/services/custodians";
import { AccountType } from "@/types/accounts";
import { renderHook, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import useRegisterCustodian from "./useRegisterCustodian";

const mockedEmail = faker.internet.email();
const mockedCustodianData = mockedCustodian({
  contact_email: mockedEmail,
});

const mockReplace = jest.fn();
const mockSetCustodian = jest.fn();

jest.useFakeTimers().setSystemTime(new Date("2024-01-01"));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    replace: mockReplace,
  })),
}));

jest.mock("@/services/custodians");
jest.mock("@/services/auth");

jest.mock("@/data/store", () => ({
  useStore: () => mockSetCustodian,
}));

const setupUseRegisterCustodianUser = (email: string = mockedEmail) =>
  renderHook(() => useRegisterCustodian(email));

describe("useRegisterCustodian", () => {
  beforeAll(() => {
    (getCustodianByEmail as jest.Mock).mockReturnValue({
      data: mockedCustodianData,
    });
  });

  it("registers a custodian user", async () => {
    setupUseRegisterCustodianUser();

    await waitFor(() => {
      expect(mockSetCustodian).toHaveBeenCalledWith(mockedCustodianData);
    });

    expect(postRegister).toHaveBeenCalledWith(
      { account_type: AccountType.CUSTODIAN },
      {
        error: { message: "failedToRegister" },
      }
    );

    expect(patchCustodian).toHaveBeenCalledWith(
      1,
      { invite_accepted_at: "2024-01-01 12:00:00" },
      {
        error: { message: "patchCustodianError" },
      }
    );
  });
});
