import { useStore } from "@/data/store";
import { mockedUser, mockedTraining } from "@/mocks/data/user";
import { act, render, screen, waitFor, fireEvent } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
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

  it("has no accessibility violations", async () => {
    const { container } = renderTrainingComponent();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it.each(["Training provider", "Training name"])(
    "does not submit when %s is not defined",
    async fieldName => {
      renderTrainingComponent();

      const input = screen.getByLabelText(fieldName);
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

  it("displays existing trainings", async () => {
    const mockTrainings = [
      mockedTraining({
        id: 1,
        provider: "Provider 1",
        training_name: "Training 1",
      }),
      mockedTraining({
        id: 2,
        provider: "Provider 2",
        training_name: "Training 2",
      }),
    ];

    (getTrainingByRegistryId as jest.Mock).mockResolvedValue({
      data: mockTrainings,
    });

    renderTrainingComponent();

    await waitFor(() => {
      expect(screen.getByText("Provider 1")).toBeInTheDocument();
      expect(screen.getByText("Training 1")).toBeInTheDocument();
      expect(screen.getByText("Provider 2")).toBeInTheDocument();
      expect(screen.getByText("Training 2")).toBeInTheDocument();
    });
  });
});
