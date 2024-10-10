import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;
  const apiToken = localStorage.getItem('apiToken');

  if (apiToken) {
    const decoded = jwtDecode(apiToken) as any;
    if (decoded.serviceId && decoded.exp) {
      const expired = Math.floor(Date.now() / 1000) > decoded.exp ? true : false;
      if (expired) {
        return backToAuthorize();
      }

      switch (decoded.serviceId) {
        case 'PCF-SWH':
          return accessTo('/site-warehouse');
        default:
          return backToAuthorize();
      }
    } else {
      return backToAuthorize();
    }
  } else {
    return backToAuthorize();
  }
});

function backToAuthorize() {
  return navigateTo('/auth/checkAuthorize');
}

function accessTo(page: string) {
  return navigateTo(page);
}
