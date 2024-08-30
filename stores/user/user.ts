import { defineStore } from 'pinia';
import { useAuthApi } from '~/composables/api/useAuthApi';

interface UserStore {
  token: string | null;
  isAuthenticated: boolean;
  profile: Profile;
}
type Profile = {
  displayName: string;
  empCode: string;
  email: string;
  titleName: string;
  firstName: string;
  lastName: string;
  isAllProject: boolean;
  role: {
    roleCode: string;
    roleName: string;
  };
  projects: {
    projectCode: string;
    projectName: string;
  }[];
};
export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserStore => ({
    token: '',
    isAuthenticated: false,
    profile: {
      displayName: '',
      empCode: '',
      email: '',
      titleName: '',
      firstName: '',
      lastName: '',
      isAllProject: false,
      role: {
        roleCode: '',
        roleName: '',
      },
      projects: [],
    },
  }),
  getters: {
    apiToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    projects: (state) => state.profile.projects,
  },
  actions: {
    async validateAndSetToken(token: string) {
      try {
        const isValid = await this.checkTokenValidity(token);

        if (isValid) {
          this.setToken(token);
          this.setAuthenticated(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    },
    async checkTokenValidity(token: string) {
      const resp = await useAuthApi().profile(token);
      this.setProfile(resp);
      return true;
    },
    setToken(token: string) {
      localStorage.setItem('apiToken', token);
      this.token = token;
    },
    setProfile(profile: any) {
      localStorage.setItem('profile', JSON.stringify(profile));
      this.profile = profile;
    },
    setAuthenticated(status: boolean) {
      this.isAuthenticated = status;
    },
    async getAuthorizeUrl(): Promise<string> {
      const resp = await useAuthApi().authorize();
      return (resp as any)?.authUrl;
    },
    getToken(): string | null {
      return localStorage.getItem('apiToken');
    },
    getProfile(): Profile | null {
      const profileJson = localStorage.getItem('profile');
      this.profile = profileJson && profileJson !== '' ? JSON.parse(profileJson) : null;
      return this.profile;
    },
  },
});
