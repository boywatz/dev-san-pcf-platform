<template>
  <div>
    <AlertPopup :title="alertStore.title" :desc="alertStore.desc" :type="alertStore.type" :is-open="alertStore.show" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user/user';
import { useAlertStore } from '~/stores/alert/alert';

const userStore = useUserStore();
const alertStore = useAlertStore();

onMounted(() => {
  userStore.getProfile();
  if (userStore.isLoggedIn)
    userStore.checkTokenAlive();
})
</script>