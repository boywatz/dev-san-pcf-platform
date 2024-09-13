<template>
  <div>
    <UBreadcrumb :links="links" />
    <div class="grid grid-cols-4 gap-4 mt-4">
      <SelectProject ref="selectProjectRef" @select="(projectCode) => filter.projectCode = projectCode" />
    </div>
  </div>
  <div class="flex justify-end space-x-2">
    <UButton label="ล้างข้อมูล" color="secondary" @click="resetFilter" />
    <UButton label="ดาวน์โหลดไฟล์" @click="download" :loading="loading" :disabled="!filter.projectCode" />
  </div>
</template>

<script lang="ts" setup>
import type { IDownloadSiteWarehouseStockReportDto } from '~/composables/api/useSiteWarehouseApi';
import { useSiteWarehouseReportStore } from '~/stores/site-warehouse/report';

definePageMeta({
  layout: 'site-warehouse'
})
const links = [
  {
    label: 'หน้าหลัก',
    to: '/',
  },
  {
    label: 'Download รายงาน',
    to: '/site-warehouse/report',
  },
  {
    label: 'รายงานข้อมูล - Stock',
    icon: 'i-heroicons-chart-bar',
    to: '/site-warehouse/report/stock'
  }
]
const reportStore = useSiteWarehouseReportStore();
const filter = ref<IDownloadSiteWarehouseStockReportDto>({
  projectCode: '',
  materialCodes: []
})
const selectProjectRef = ref(null)
const loading = ref(false)

async function download() {
  loading.value = true;
  await reportStore.downloadStock(filter.value);
  loading.value = false;
}
function resetFilter() {
  (selectProjectRef.value as any).resetSelection();

  filter.value.projectCode = '';
  filter.value.materialCodes = [];
}
</script>

<style></style>