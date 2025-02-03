import { useStore } from "@/data/store";

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

mockedStore = () => {
  return create<StoreState>((set, get) => ({
    config: {
      router: {
        history: [],
        entries: ROUTES,
      },
      permissions: [],
      sectors: [],
    },
    getPreviousUrl: () => {
      const {
        router: { history },
      } = get().config;
  
      return history.length > 1 ? history[history.length - 2] : null;
    },
    setRoutes: (routes: Routes) =>
      set(
        produce(state => {
          state.config.entries = routes;
        })
      ),
    setUser: (user: User) =>
      set(
        produce(state => {
          state.config.user = user;
        })
      ),
    getUser: () => {
      return get().config.user;
    },
    setHistories: (histories: StoreUserHistories) =>
      set(
        produce(state => {
          state.config.histories = histories;
        })
      ),
    getHistories: () => {
      return get().config.histories;
    },
    setSectors: (sectors: Sector[]) =>
      set(
        produce(state => {
          state.config.sectors = sectors;
        })
      ),
    getSectors: () => {
      return get().config.sectors;
    },
    setPermissions: (permissions: Permission[]) =>
      set(
        produce(state => {
          state.config.permissions = permissions;
        })
      ),
    getPermissions: () => {
      return get().config.permissions;
    },
    setOrganisation: (organisation: Organisation | undefined) =>
      set(
        produce(state => {
          state.config.organisation = organisation;
        })
      ),
    getOrganisation: () => {
      return get().config.organisation;
    },
    setCustodian: (custodian: Custodian | undefined) =>
      set(
        produce(state => {
          state.config.custodian = custodian;
        })
      ),
    getCustodian: () => {
      return get().config.custodian;
    },
    addUrlToHistory: (url: string) =>
      set(
        produce(state => {
          state.config.router.history.push(url);
        })
      ),
}

export { mockedApiPermissions };
