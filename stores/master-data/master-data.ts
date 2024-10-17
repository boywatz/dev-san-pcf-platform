import { defineStore } from 'pinia';

export const useMasterDataStore = defineStore({
  id: 'master-data-store',
  state: () => ({
    projects: [],
    units: [],
  }),
  actions: {},
});
