import { useSiteWarehouseApi } from '~/composables/api/useSiteWarehouseApi';
import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';

export interface SiteWarehouseReasons {
  value: string;
  label: string;
}
export const useSiteWarehouseReasonStore = defineStore({
  id: 'site-warehouse-reason',
  state: () => ({
    overBomReasons: [] as SiteWarehouseReasons[],
    ncrReasons: [] as SiteWarehouseReasons[],
  }),
  actions: {
    async initialData() {
      const token = useUserStore().getToken();
      const api = useSiteWarehouseApi(token!);

      const [overBomReasonsData, ncrReasonsData, fixCustomerReasonsData] = await Promise.all([api.getOverBomReasons(), api.getNCRReasons(), api.getFixCustomerReasons()]);
      this.overBomReasons = overBomReasonsData.map((r: any) => ({
        value: r.id,
        label: r.desc,
      }));
      this.ncrReasons = [...ncrReasonsData, ...fixCustomerReasonsData].map((r: any) => ({
        value: r.id,
        label: r.desc,
      }));
    },
  },
});
