import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi, type ICreateTransferDto } from '~/composables/api/useSiteWarehouseApi';

export const useTransferStore = defineStore({
  id: 'transfer-store',
  state: () => ({}),
  actions: {
    async create(data: ICreateTransferDto) {
      try {
        const token = useUserStore().getToken();
        return await useSiteWarehouseApi(token!).createTransfer(data);
      } catch (error) {
        console.error('Api error', error);
        return false;
      }
    },
  },
});
