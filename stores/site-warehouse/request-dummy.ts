import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi } from '~/composables/api/useSiteWarehouseApi';
import { useAlertStore } from '../alert/alert';

export interface RequestDummy {
  id: string;
  projectCode: string;
  materialGroup: string;
  status: string;
  unit?: string;
  model?: string;
  costCenter?: string;
  commonArea?: string;
  remark: string;
  requestDummyItems?: RequestDummyItems[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  mappedBy: string;
  mappedAt: Date;
  rejectedBy: string;
  rejectedAt: Date;
}
export interface RequestDummyItems {
  id: string;
  requestDummyId: string;
  materialCode: string;
  requestQty: number;
}
export interface MapToRequestGI {
  projectCode: string;
  requestDummyIds: string[];
  target: {
    unit?: string;
    costCenter?: string;
  };
}
export const useRequestDummyStore = defineStore({
  id: 'request-dummy-store',
  state: () => ({
    list: [] as RequestDummy[],
  }),
  actions: {
    async loadData(projectCode?: string, status?: string) {
      try {
        const token = useUserStore().getToken();
        const list = await useSiteWarehouseApi(token!).getRequestDummyList({ projectCode, status });
        this.setList(list);
      } catch (error) {
        console.error('Api error', error);
      }
    },
    setList(list: RequestDummy[]) {
      this.list = list;
    },
    async loadUnit(projectCode: string) {
      try {
        const token = useUserStore().getToken();
        return await useSiteWarehouseApi(token!).getUnitList(projectCode);
      } catch (error) {
        console.error('Api error', error);
        return [];
      }
    },
    async mapToRequestGI(data: MapToRequestGI) {
      const alertStore = useAlertStore();
      try {
        const token = useUserStore().getToken();
        await useSiteWarehouseApi(token!).mapRequestDummyToGI(data);
        alertStore.success();
        return true;
      } catch (error) {
        alertStore.error(error as string);
        return false;
      }
    },
  },
});
