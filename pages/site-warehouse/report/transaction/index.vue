<template>
  <div>
    <UBreadcrumb :links="links" />

    <div class="grid grid-cols-4 gap-4 mt-4">
      <SelectProject ref="selectProjectRef" @select="(projectCode) => filter.projectCode = projectCode" />
      <SelectUnit ref="selectUnitRef" :project-code="filter.projectCode" @select="costCenterOrUnit" />
      <UInput v-model="filter.model" placeholder="Model" />
      <SelectTransactionType ref="selectTransactionTypeRef"
        @select="(transactionType) => filter.transactionTypeId = transactionType" />
      <UInput v-model="filter.documentRef" placeholder="Document Ref." />
      <div class="flex items-center space-x-2">
        <UToggle v-model="filter.flagOverBom" />
        <label>เลือกเฉพาะการเบิกเกิน Bom</label>
      </div>
      <SelectOverBomReason ref="selectOverBomReasonRef" @select="(id) => filter.reasonId = id" />
      <SelectNCRReason ref="selectNCRReasonRef" @select="(id) => filter.reasonId = id" />
      <DateRangePicker ref="dateRangePickerRef" v-model="dateRange" @update:model-value="() => {
        filter.transactionDateFrom = useDateHandler(dateRange?.start).toDDMMYYYY()
        filter.transactionDateTo = useDateHandler(dateRange?.end).toDDMMYYYY()
      }" />
      <!--
        TODO: 
        เลือกรายการ MaterialGroup,
        เลือกรายการ MaterialCode, MaterialName,
        เลือกวันที่ DateFrom, DateTo
      -->
    </div>

  </div>
  <div class="flex justify-end space-x-2 mt-4">
    <UButton label="ล้างข้อมูล" color="secondary" @click="resetFilter" />
    <UButton label="ดาวน์โหลดไฟล์" @click="download" :loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import { useDateHandler } from '~/composables/utils/dateHandler';
import type { IDownloadSiteWarehouseTransactionReportDto } from '~/composables/api/useSiteWarehouseApi';
import { useSiteWarehouseReportStore } from '~/stores/site-warehouse/report';
import { useSiteWarehouseReasonStore } from '~/stores/site-warehouse/reason';

definePageMeta({
  layout: 'site-warehouse',
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
    label: 'รายงานข้อมูล - Transaction',
    icon: 'i-heroicons-chart-bar',
    to: '/site-warehouse/report/transaction'
  }
]
const reportStore = useSiteWarehouseReportStore();
const reasonStore = useSiteWarehouseReasonStore();

const filter = ref<IDownloadSiteWarehouseTransactionReportDto>({
  projectCode: '',
  unit: '',
  model: '',
  costCenter: '',
  transactionTypeId: '',
  documentRef: '',
  flagOverBom: false,
  reasonId: '',
  materialGroup: '',
  materialCode: '',
  transactionDateFrom: '',
  transactionDateTo: ''
})
const selectProjectRef = ref(null);
const selectUnitRef = ref(null);
const selectTransactionTypeRef = ref(null);
const selectOverBomReasonRef = ref(null);
const selectNCRReasonRef = ref(null);
const dateRange = ref()

const loading = ref(false);

function costCenterOrUnit(data: string) {
  const isUnit = data.includes('-') ? data : '';

  filter.value.costCenter = isUnit ? '' : data;
  filter.value.unit = isUnit ? data : '';
}
async function download() {
  loading.value = true;
  await reportStore.downloadTransaction(filter.value);
  resetFilter()
  loading.value = false;
}
function resetFilter() {
  (selectProjectRef.value as any).resetSelection();
  (selectUnitRef.value as any).resetSelection();
  (selectTransactionTypeRef.value as any).resetSelection();
  (selectOverBomReasonRef.value as any).resetSelection();
  (selectNCRReasonRef.value as any).resetSelection();

  filter.value.projectCode = ''
  filter.value.unit = ''
  filter.value.model = ''
  filter.value.costCenter = ''
  filter.value.transactionTypeId = ''
  filter.value.documentRef = ''
  filter.value.flagOverBom = false
  filter.value.reasonId = ''
  filter.value.materialGroup = ''
  filter.value.materialCode = ''
  filter.value.transactionDateFrom = ''
  filter.value.transactionDateTo = ''
}
onMounted(() => {
  reasonStore.initialData();
})
</script>

<style></style>