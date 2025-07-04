import type { Meta, StoryObj } from "@storybook/react";

import { mockedUser } from "../../mocks/data/user";
import { useTranslations } from "next-intl";
import { mockedPaginationResults } from "../../mocks/data/requests";
import OrganisationsPeopleTable, {
  OrganisationsPeopleTableProps,
} from "./OrganisationsPeopleTable";

const meta = {
  title: "modules/OrganisationsPeopleTable",
  component: OrganisationsPeopleTable,
  tags: ["autodocs"],
} satisfies Meta<typeof OrganisationsPeopleTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const Component = ({ data, routes }: OrganisationsPeopleTableProps) => {
  const t = useTranslations("Organisations.People");

  return (
    <OrganisationsPeopleTable
      data={data}
      t={t}
      routes={routes}
      {...mockedPaginationResults()}
    />
  );
};

export const Basic: Story = {
  args: {
    data: [mockedUser()],
    routes: {
      name: {
        path: "/users",
      },
    },
  },
  render: Component,
};
