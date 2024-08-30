import { defineStore } from 'pinia';

export const useNotificationStore = defineStore({
  id: 'notification-store',
  state: () => ({}),
  actions: {
    pushSuccess() {
      const toast = useToast();

      toast.add({
        title: 'Success',
        description: 'The operation was successful',
      });
    },
  },
});
