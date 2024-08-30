<template>
  <div>
    <UBreadcrumb :links="links" />

    <h1 class="text-main">
      Hello, {{ displayName }} ({{ roleName }})
    </h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'site-warehouse',
})
import { useUserStore } from '~/stores/user/user';

const userStore = useUserStore();

const links = [
  {
    label: 'หน้าหลัก',
    to: '/',
  }
]
const displayName = ref('');
const roleName = ref('')

onMounted(() => {
  const profile = userStore.getProfile();
  if (!profile) return;

  displayName.value = profile.displayName
  roleName.value = profile.role.roleName;
})
</script>

<style></style>