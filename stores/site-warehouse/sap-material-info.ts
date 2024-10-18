import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi } from '~/composables/api/useSiteWarehouseApi';

export const useSapMaterialInfoStore = defineStore({
  id: 'sap-material-info',
  state: () => ({
    loading: false,
    materialGroups: [] as any,
    activePO: '',
    activeMaterialGroup: '',
    activeMaterialItems: [] as any,
  }),
  actions: {
    async loadMaterialGroups(projectCode: string, unit?: string, costCenter?: string) {
      try {
        const token = useUserStore().getToken();
        this.loading = true;
        const data = await useSiteWarehouseApi(token!).getSapMaterialGroups(projectCode, unit, costCenter);
        this.materialGroups = data;
        this.loading = false;
      } catch (error) {
        console.error('Api error', error);
        return [];
      }
    },
    async loadMaterialBom(projectCode: string, po: string, unit?: string, costCenter?: string) {
      try {
        const token = useUserStore().getToken();
        const data = await useSiteWarehouseApi(token!).getSapMaterialBoms(projectCode, po, unit, costCenter);
        this.activeMaterialGroup = data.materialGroup.materialGroup;
        this.activeMaterialItems = data.sapMaterialBomItems;
      } catch (error) {
        console.error('Api error', error);
        return [];
      }
    },
  },
});
