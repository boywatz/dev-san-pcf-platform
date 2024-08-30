<template>
  <div>
    <UBreadcrumb :links="links" />

    <div class="flex justify-start items-center mb-4">
      <SelectProject @select="selectProject" :placeholder="'เลือกโครงการต้นทาง'" />
      <div class="mx-4">=></div>
      <SelectProject @select="selectProjectDest" :placeholder="'เลือกโครงการปลายทาง'" />
    </div>

    <div class="flex justify-start items-center mb-4">
      <UButton label="สร้างคำร้องขอโอนย้าย" @click="showConfirm = true"
        :disabled="(!selectedProject || !destinationProject) || stockRows.length === 0" />
    </div>

    <UTable :columns="stockColumns" :rows="stockRows">
      <template #id-header="{ row }">
        <span></span>
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
import { useNotificationStore } from '~/stores/notification/notification';
import { useStockStore } from '~/stores/site-warehouse/stock';
import { useTransferStore } from '~/stores/site-warehouse/transfer';


definePageMeta({
  layout: 'site-warehouse'
})

const notiStore = useNotificationStore();
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
const destinationProject = ref<string>('')
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
  }
];
const stockRows = computed(() => stockStore.list)
const showConfirm = ref(false)

function selectProject(projectCode: string) {
  selectedProject.value = projectCode
  stockStore.loadStock(projectCode);
}
function selectProjectDest(projectCode: string) {
  destinationProject.value = projectCode;
}
async function confirm() {
  const payload: ICreateTransferDto = {
    projectCode: selectedProject.value,
    destination: destinationProject.value,
    transferItems: stockStore.list.map((d) => ({
      materialCode: d.materialCode,
      transferQty: d.qty
    }))
  }
  await transferStore.create(payload);
  notiStore.pushSuccess();
  resetPage()
}
function resetPage() {
  selectedProject.value = ''
  destinationProject.value = ''
  stockStore.setList([])
  showConfirm.value = false
}
</script>

<style></style>