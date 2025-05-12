import type { Meta, StoryObj } from "@storybook/react";

import { mockedUser } from "@/mocks/data/user";
import OrganisationsPeopleTable, {
  OrganisationsPeopleTableProps,
} from "./OrganisationsPeopleTable";
import { useTranslations } from "next-intl";
import { mockedPaginationResults } from "@/mocks/data/requests";

const meta = {
  title: "modules/OrganisationsPeopleTable",
  component: OrganisationsPeopleTable,
  tags: ["autodocs"],
} satisfies Meta<typeof OrganisationsPeopleTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const Component = ({
  data,
  routes,
  queryState,
}: OrganisationsPeopleTableProps) => {
  const t = useTranslations("Organisations.People");

  return (
    <OrganisationsPeopleTable
      data={data}
      t={t}
      routes={routes}
      queryState={queryState}
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
    queryState: {
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  },
  render: Component,
};
