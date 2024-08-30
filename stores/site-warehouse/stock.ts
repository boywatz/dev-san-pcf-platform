import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi } from '~/composables/api/useSiteWarehouseApi';

export interface Stock {
  projectCode: string;
  lastSyncAt: Date;
  stockItems: StockItem[];
}
export interface StockItem {
  materialCode: string;
  materialName: string;
  materialUnit: string;
  qty: number;
  dummyQty: number;
  intransit: number;
  safetyStock: number;
  tempStock: number;
}
export const useStockStore = defineStore({
  id: 'stock-store',
  state: () => ({
    list: [] as StockItem[],
  }),
  actions: {
    async loadStock(projectCode: string) {
      try {
        const token = useUserStore().getToken();
        const stock = (await useSiteWarehouseApi(token!).getStock(projectCode)) as Stock;
        this.setList(stock.stockItems);
      } catch (error) {
        console.error('Api error', error);
      }
    },
    setList(list: StockItem[]) {
      this.list = list;
    },
  },
});
