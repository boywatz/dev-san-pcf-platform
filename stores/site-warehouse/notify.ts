import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi } from '~/composables/api/useSiteWarehouseApi';

export const useSiteWarehouseNotify = defineStore({
  id: 'site-warehouse-notify',
  state: () => ({
    countGIWaitingToApprove: 0,
    countDummyWaitingToMapping: 0,
  }),
  actions: {
    async loadData() {
      const token = await useUserStore().getToken();
      const data = await useSiteWarehouseApi(token!).getNotify();
      data.map((d: { type: string; total: number }) => {
        switch (d.type) {
          case 'DUMMY-WAITING-TO-MAPPING':
            this.countDummyWaitingToMapping = d.total;
            break;
          case 'GI-WAITING-TO-APPROVE':
            this.countGIWaitingToApprove = d.total;
            break;
        }
      });
    },
  },
});
