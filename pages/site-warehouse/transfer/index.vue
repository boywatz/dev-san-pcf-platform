<template>
  <div>
    <UBreadcrumb :links="links" />

    <div class="flex justify-start items-center mb-4">
      <SelectProject ref="selectProjectRef" @select="selectProject" :placeholder="'เลือกโครงการต้นทาง'" />
      <div class="mx-4">=></div>
      <SelectProject ref="selectProjectDestRef" @select="selectProjectDest" :placeholder="'เลือกโครงการปลายทาง'" />
    </div>

    <div class="flex justify-start items-center mb-4">
      <UButton label="สร้างคำร้องขอโอนย้าย" @click="showConfirm = true" :disabled="disabledInput" />
    </div>

    <UTable :columns="stockColumns" :rows="stockRows">
      <template #transferQty-data="{ row }">
        <UInput v-model="row.transferQty" type="number" :disabled="disabledInput" />
      </template>
    </UTable>

    <div>
      <UModal v-model="showConfirm">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">ยืนยันการโอนย้ายจากโครงการ {{ selectedProject }} ไปยัง {{
            destinationProject }}
          </h2>
          <div class="flex justify-end">
            <UButton label="ยกเลิก" color="secondary" @click="showConfirm = false" />
            <UButton label="ยืนยัน" @click="confirm" />
          </div>
        </div>
      </UModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ICreateTransferDto } from '~/composables/api/useSiteWarehouseApi';
import { useAlertStore } from '~/stores/alert/alert';
import { useStockStore } from '~/stores/site-warehouse/stock';
import { useTransferStore } from '~/stores/site-warehouse/transfer';

definePageMeta({
  layout: 'site-warehouse',
})

type SelectedTransferItem = {
  materialCode: string;
  transferQty: number;
}

const alertStore = useAlertStore();
const stockStore = useStockStore();
const transferStore = useTransferStore();

const links = [
  {

    label: 'หน้าหลัก',
    to: '/',
  },
  {
    label: 'โอนย้ายคลังระหว่าง ERC Site',
    to: '/site-warehouse/transfer',
  }
]
const selectedProject = ref<string>('')
const selectProjectRef = ref(null)
const destinationProject = ref<string>('')
const selectProjectDestRef = ref(null)
const stockColumns = [
  {
    label: 'Material Code',
    key: 'materialCode'
  },
  {
    label: 'Material Name',
    key: 'materialName'
  },
  {
    label: 'หน่วย',
    key: 'materialUnit'
  },
  {
    label: 'คงเหลือ',
    key: 'qty'
  },
  {
    label: 'ยอดโอนย้าย',
    key: 'transferQty'
  }
];
const showConfirm = ref(false)
const stockRows = computed(() => stockStore.list.map((i) => ({ ...i, transferQty: 0 })))
const transferItemSelected = computed(() => stockRows.value.filter(i => i.transferQty > 0))
const saveState = ref(false)
const disabledInput = computed(() => (!selectedProject || !destinationProject) || stockRows.value.length === 0 && saveState.value)
function selectProject(projectCode: string) {
  resetPage();

  selectedProject.value = projectCode
}
function selectProjectDest(projectCode: string) {
  if (selectedProject.value === projectCode) {
    //warning case: transfer same projectCode
    destinationProject.value = '';
    if (selectProjectDestRef.value) {
      (selectProjectDestRef.value as any).resetSelection()
    }
    stockStore.setList([])
    alertStore.warning('ไม่สามารถสร้างคำขอโอนย้ายไปยังโครงการเดียวกันได้')
    return;
  }
  destinationProject.value = projectCode;
  stockStore.loadStock(selectedProject.value);
}
async function confirm() {
  const payload: ICreateTransferDto = {
    projectCode: selectedProject.value,
    destination: destinationProject.value,
    transferItems: transferItemSelected.value.filter(i => i.transferQty > 0).map((d: SelectedTransferItem) => ({
      materialCode: d.materialCode,
      transferQty: Number(d.transferQty) ?? 0
    }))
  }
  saveState.value = true;
  const success = await transferStore.create(payload);
  if (success) {
    saveState.value = false;
    resetPage()
  }
}
function resetPage() {
  selectedProject.value = ''
  // if (selectProjectRef.value) {
  //   (selectProjectRef.value as any).resetSelection()
  // }

  destinationProject.value = ''
  if (destinationProject.value) {
    (destinationProject.value as any).resetSelection()
  }

  stockStore.setList([])
  showConfirm.value = false
}
</script>

<style></style>