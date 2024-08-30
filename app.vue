<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user/user';
import { useNotificationStore } from './stores/notification/notification';

const userStore = useUserStore();

onMounted(() => {
  userStore.getProfile();
})
</script>