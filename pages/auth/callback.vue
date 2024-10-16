<template>
  <div>
    <SplashScreen />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user/user';
const route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  const { token } = route.query;
  await userStore.validateAndSetToken(token!.toString());
})
</script>

<style></style>