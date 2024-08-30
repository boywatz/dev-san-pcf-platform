export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const apiToken = localStorage.getItem('apiToken');
  const profile = localStorage.getItem('profile');

  if (apiToken && profile && to.path === '/site-warehouse') {
    return;
  }

  //TODO: switch case for navigate to service
  if (apiToken && profile) {
    return navigateTo('/site-warehouse');
  }
  return navigateTo('/auth/checkAuthorize');
});
