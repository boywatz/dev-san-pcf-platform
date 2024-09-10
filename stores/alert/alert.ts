import { defineStore } from 'pinia';
import type { AlertPopupType } from '~/components/shared/AlertPopup/type';

export const useAlertStore = defineStore({
  id: 'alert-store',
  state: () => ({
    title: '',
    desc: '',
    type: '' as AlertPopupType,
    show: false,
  }),
  actions: {
    error(message: string, title?: string) {
      this.open(title || 'พบข้อผิดพลาด', message, 'ERROR');
    },
    warning(message: string, title?: string) {
      this.open(title || 'แจ้งเตือน', message, 'WARNING');
    },
    open(title: string, desc: string, type: AlertPopupType) {
      this.title = title;
      this.desc = desc;
      this.type = type;
      this.show = true;
    },
    close() {
      this.title = '';
      this.desc = '';
      this.show = false;
    },
  },
});
