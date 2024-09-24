import { defineStore } from 'pinia';
import { useSiteWarehouseApi, type IDownloadSiteWarehouseStockReportDto, type IDownloadSiteWarehouseTransactionReportDto } from '~/composables/api/useSiteWarehouseApi';
import { useUserStore } from '../user/user';

export const useSiteWarehouseReportStore = defineStore({
  id: 'site-warehouse-report-store',
  state: () => ({}),
  actions: {
    async downloadTransaction(filter: IDownloadSiteWarehouseTransactionReportDto) {
      try {
        const token = useUserStore().getToken();
        await useSiteWarehouseApi(token!).downloadTransactionReport(filter);
      } catch (error) {
        console.error('Api error', error);
      }
    },
    async downloadStock(filter: IDownloadSiteWarehouseStockReportDto) {
      try {
        const token = useUserStore().getToken();
        await useSiteWarehouseApi(token!).downloadStockReport(filter);
      } catch (error) {
        console.error('Api error', error);
      }
    },
  },
});
