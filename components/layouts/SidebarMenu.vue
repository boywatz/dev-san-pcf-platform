<template>
  <aside class="bg-main-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">{{ props.title }}</h2>
    </div>
    <nav>
      <ul class="space-y-4">
        <li v-for="(item, index) in $props.menu">
          <a :href="item.link" class="block text-white hover:text-secondary">
            {{ item.name }} {{ item.link.includes('dummy') ? `(${notifyStore.countDummyWaitingToMapping})` : '' }}
          </a>
        </li>
      </ul>
    </nav>
    <div class="mt-6">
      <UButton class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" @click="userStore.logout">
        ออกจากระบบ
      </UButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user/user';
import { useSiteWarehouseNotify } from '~/stores/site-warehouse/notify';

const userStore = useUserStore()
const notifyStore = useSiteWarehouseNotify();

const props = defineProps({
  title: {
    type: String,
    require: true
  },
  menu: Array<{
    link: string,
    name: string,
  }>
})


onMounted(() => {
  notifyStore.loadData();
})
</script>

<style></style>