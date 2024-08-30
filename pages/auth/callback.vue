<template>
  <div>
    <SplashScreen />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user/user';
const route = useRoute();
const userStore = useUserStore();

onMounted(() => {
  const { token } = route.query;
  userStore.validateAndSetToken(token!.toString()).then(() => {
    navigateTo('/site-warehouse')
  })
})
</script>

<style></style>