import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi } from '~/composables/api/useSiteWarehouseApi';

export const useSapMaterialInfoStore = defineStore({
  id: 'sap-material-info',
  state: () => ({
    materialGroups: [],
    materialBom: {},
  }),
  actions: {
    async loadMaterialGroups(projectCode: string, unit?: string, costCenter?: string) {
      try {
        const token = useUserStore().getToken();
        const data = await useSiteWarehouseApi(token!).getSapMaterialGroups(projectCode, unit, costCenter);
        this.materialGroups = data;
        console.log('materialGroups', this.materialGroups);
      } catch (error) {
        console.error('Api error', error);
        return [];
      }
    },
    async loadMaterialBom(projectCode: string, po: string, unit?: string, costCenter?: string) {
      try {
        const token = useUserStore().getToken();
        const data = await useSiteWarehouseApi(token!).getSapMaterialBoms(projectCode, po, unit, costCenter);
        this.materialBom = data;
        console.log('materialBom', this.materialBom);
      } catch (error) {
        console.error('Api error', error);
        return [];
      }
    },
  },
});
