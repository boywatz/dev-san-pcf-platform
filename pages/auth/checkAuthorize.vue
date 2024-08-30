<template>
  <SplashScreen />
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user/user';

const userStore = useUserStore();

onMounted(async () => {
  await checkAuthorize();
})

const checkAuthorize = async () => {
  const token = userStore.getToken();
  if (!token) {
    const authUrl = await userStore.getAuthorizeUrl();
    navigateTo(authUrl, { external: true });
  } else {
    userStore.setToken(token);
    userStore.setAuthenticated(true);
  }
}
</script>