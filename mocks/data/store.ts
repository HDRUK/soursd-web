import { ROUTES } from "@/consts/router";
import { mockedCustodian } from "./custodian";
import { mockedOrganisation } from "./organisation";
import { mockedUser } from "./user";

const mockedApiPermissions = [
  {
    id: 1,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "ACCESS_GATEWAY",
    enabled: true,
    description: null,
  },
  {
    id: 2,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "ACCESS_COHORT",
    enabled: true,
    description: null,
  },
  {
    id: 3,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "ACCESS_ATLAS",
    enabled: true,
    description: null,
  },
  {
    id: 4,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_METADATA_HIGH",
    enabled: true,
    description: null,
  },
  {
    id: 5,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_METADATA_DETAILED",
    enabled: true,
    description: null,
  },
  {
    id: 6,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_NETWORK_CCS",
    enabled: true,
    description: null,
  },
  {
    id: 7,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_NETWORK_IRM",
    enabled: true,
    description: null,
  },
  {
    id: 8,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "GATEWAY_SDE_NETWORK_RE",
    enabled: true,
    description: null,
  },
  {
    id: 9,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "COHORT_SDE_QUERY",
    enabled: true,
    description: null,
  },
  {
    id: 10,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_ADMIN",
    enabled: true,
    description: "administrator",
  },
  {
    id: 11,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_APPROVER",
    enabled: true,
    description: "approver",
  },
  {
    id: 12,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_KEYCARD_CREATE",
    enabled: true,
    description: null,
  },
  {
    id: 13,
    created_at: "2025-01-08T11:40:07.000000Z",
    updated_at: "2025-01-08T11:40:07.000000Z",
    name: "CUSTODIAN_KEYCARD_REVOKE",
    enabled: true,
    description: null,
  },
];

const mockedStoreState = () => ({
  config: {
    user: mockedUser({
      id: 1,
    }),
    organisation: mockedOrganisation({
      id: 1,
    }),
    custodian: mockedCustodian({
      id: 1,
    }),
    permissions: mockedApiPermissions,
    sectors: [mockedUser()],
    router: {
      history: [],
      entries: ROUTES,
    },
  },
});

export { mockedApiPermissions, mockedStoreState };
