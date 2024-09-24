import { defineStore } from 'pinia';
import { useUserStore } from '../user/user';
import { useSiteWarehouseApi, type ICreateTransferDto } from '~/composables/api/useSiteWarehouseApi';
import { useAlertStore } from '../alert/alert';

export const useTransferStore = defineStore({
  id: 'transfer-store',
  state: () => ({}),
  actions: {
    async create(data: ICreateTransferDto) {
      const alertStore = useAlertStore();
      try {
        const token = useUserStore().getToken();
        await useSiteWarehouseApi(token!).createTransfer(data);
        alertStore.success();
        return true;
      } catch (error) {
        alertStore.error(error as string);
        return false;
      }
    },
  },
});
