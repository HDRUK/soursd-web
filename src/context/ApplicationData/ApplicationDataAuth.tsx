import { ApplicationDataState } from "@/types/application";
import { getAuthData } from "@/utils/auth";
import { ReactNode } from "react";
import { ApplicationDataProviderQueries } from "./ApplicationData";

interface ApplicationDataAuthProps {
  children: ReactNode;
  value: ApplicationDataState;
}

const ApplicationDataAuth = async (props: ApplicationDataAuthProps) => {
  const authData = await getAuthData();

  return (
    <ApplicationDataProviderQueries
      auth={{
        ...authData,
        user: {
          id: 8,
        },
      }}
      {...props}
    />
  );
};

export { ApplicationDataAuth };
