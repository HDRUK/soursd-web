import { postRegister } from "@/services/auth";
import {
  patchCustodianUser,
  getCustodianUserByEmail,
} from "@/services/custodian_users";
import { getCustodian, getCustodianByEmail } from "@/services/custodians";
import { act, renderHook, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import useRegisterCustodianUser from "./useRegisterCustodianUser";
import { mockedCustodian, mockedCustodianUser } from "@/mocks/data/custodian";
import { AccountType } from "@/types/accounts";

const mockedEmail = faker.internet.email();
const mockedCustodianData = mockedCustodian();

const mockReplace = jest.fn();
const mockSetCustodian = jest.fn();

jest.useFakeTimers().setSystemTime(new Date("2024-01-01"));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    replace: mockReplace,
  })),
}));

jest.mock("@/services/custodians");
jest.mock("@/services/custodian_users");
jest.mock("@/services/auth");

jest.mock("@/data/store", () => ({
  useStore: () => mockSetCustodian,
}));

const setupUseRegisterCustodianUser = (email: string = mockedEmail) =>
  renderHook(() => useRegisterCustodianUser(email));

describe("useRegisterCustodianUser", () => {
  beforeAll(() => {
    (getCustodianUserByEmail as jest.Mock).mockReturnValue({
      data: mockedCustodianUser({
        email: mockedEmail,
      }),
    });

    (getCustodian as jest.Mock).mockReturnValue({
      data: mockedCustodianData,
    });
  });

  it("registers a custodian user", async () => {
    setupUseRegisterCustodianUser();

    await waitFor(() => {
      expect(mockSetCustodian).toHaveBeenCalledWith(mockedCustodianData);
    });

    expect(getCustodianUserByEmail).toHaveBeenCalledWith(mockedEmail, {
      error: { message: "getCustodianUserByEmailError" },
    });

    expect(postRegister).toHaveBeenCalledWith(
      { account_type: AccountType.CUSTODIAN },
      {
        error: { message: "failedToRegister" },
      }
    );

    expect(patchCustodianUser).toHaveBeenCalledWith(
      1,
      { invite_accepted_at: "2024-01-01 12:00:00" },
      {
        error: { message: "patchCustodianUserError" },
      }
    );
  });
});
