import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { postTrainings, getTrainingByRegistryId } from "@/services/trainings";
import { mock200Json } from "jest.utils";
import Training from "./Training";

jest.mock("@/services/trainings");
jest.mock("@/data/store");

const mockSetUser = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: `
    {"identity": {"dob": false, "score": 67, "last_name": true, "first_name": true}}
  `,
  profile_completed_at: null,
});

(useStore as unknown as jest.Mock).mockReturnValue([defaultUser, mockSetUser]);

(getTrainingByRegistryId as jest.Mock).mockResolvedValue({ data: [] });
(postTrainings as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);
const renderTrainingComponent = () => {
  return render(<Training />);
};

describe("<Training />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([/Training provider/i, /Training name/i])(
    "does not submit when %s is not defined",
    async fieldName => {
      renderTrainingComponent();

      const input = screen.getByRole("textbox", { name: fieldName });
      fireEvent.change(input, { target: { value: faker.string.sample() } });

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /save/i })
        ).toBeInTheDocument();
      });

      expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();

      await act(() => {
        fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
      });

      await waitFor(() => {
        expect(postTrainings).not.toHaveBeenCalled();
      });
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTrainingComponent());
  });
});
