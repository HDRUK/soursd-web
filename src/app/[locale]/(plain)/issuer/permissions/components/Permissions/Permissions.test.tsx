import { mockedPermission } from "@/mocks/data/permission";
import { EntityType } from "@/types/api";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import Permissions, { PermissionsProps } from ".";

const mockedProps = {
  userId: faker.number.int(),
  issuerId: faker.number.int(),
  permissions: [
    mockedPermission({ id: 1 }),
    mockedPermission({ id: 2 }),
    mockedPermission({ id: 3 }),
  ],
  userPermissions: [mockedPermission({ id: 1 }), mockedPermission({ id: 3 })],
  type: EntityType.researcher,
};

const renderPermissions = (props?: Partial<PermissionsProps>) =>
  render(<Permissions {...mockedProps} {...props} />);

describe("<Permissions />", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderPermissions();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("calls the correct methods for an organisation", async () => {
    renderPermissions({
      type: EntityType.organisation,
    });

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_V1_URL}/organisations/permissions`,
        expect.objectContaining({
          body: `{"issuer_id":${mockedProps.issuerId},"permissions":[1,3],"organisation_id":${mockedProps.userId}}`,
        })
      );
    });
  });

  it("calls the correct methods for a researcher", async () => {
    renderPermissions();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_V1_URL}/users/permissions`,
        expect.objectContaining({
          body: `{"issuer_id":${mockedProps.issuerId},"permissions":[1,3],"user_id":${mockedProps.userId}}`,
        })
      );
    });
  });
});
