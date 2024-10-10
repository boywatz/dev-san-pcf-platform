<template>
  <div>
    <UBreadcrumb :links="links" />
    <div class="grid grid-cols-2 gap-2 mt-4">
      <div>
        <h2 class="text-xl font-bold mb-4">รายการ Dummy รอ Map</h2>
        <div class="flex flex-cols items-center space-x-2">
          <SelectProject @select="selectProject" />
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold mb-4">รายการวัสดุ</h2>
        <div class="flex flex-cols items-center space-x-2">
          <SelectUnit :project-code="selectedProject" @select="(unit) => selectUnit(unit)" />
          <UButton label="Map รายการลง GI" @click="showConfirm = true" :disabled="!mappingRows.length || !target" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 mt-4">
      <UTable :columns="columns" :rows="rows" v-model="requestSelected" @select="select">
        <template #id-header="{ row }">
          <span></span>
        </template>
        <template #target-data="{ row }">
          <span>{{ row.unit }}{{ row.costCenter }}{{ row.commonArea }}</span>
        </template>
      </UTable>

      <div>
        <UTable :columns="columnsMapping" :rows="mappingRows"></UTable>
      </div>

    </div>
  </div>

  <div>
    <UModal v-model="showConfirm">
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4">ยืนยันการ Map รายการ</h2>
        <div class="flex justify-end">
          <UButton label="ยกเลิก" color="secondary" @click="showConfirm = false" />
          <UButton label="ยืนยัน" @click="confirm" />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { useAlertStore } from '~/stores/alert/alert';
import { useRequestDummyStore, type MapToRequestGI, type RequestDummy, type RequestDummyItems } from '~/stores/site-warehouse/request-dummy';
import { useSapMaterialInfoStore } from '~/stores/site-warehouse/sap-material-info';

definePageMeta({
  layout: 'site-warehouse',
})

type IPreviewMappingRequestItem = {
  materialGroup: string,
  materialCode: string,
  totalRequest: number,
}

const links = [
  {
    label: 'หน้าหลัก',
    to: '/',
  },
  {
    label: 'รายการเบิก-Dummy',
    to: '/site-warehouse/request-dummy',
  }
]

const requestDummyStore = useRequestDummyStore();
const alertStore = useAlertStore();
const sapMaterialInfoStore = useSapMaterialInfoStore();

const columns = [
  {
    label: 'IO/CostCenter/CommonArea',
    key: 'target',
  },
  {
    label: 'MaterialGroup',
    key: 'materialGroup',
  },
  {
    label: 'Remark',
    key: 'remark',
  },
]
const columnsMapping = [
  {
    label: 'Material Group',
    key: 'materialGroup',
  },
  {
    label: 'Material Code',
    key: 'materialCode',
  },
  {
    label: 'Total Request',
    key: 'totalRequest',
  },
]
const rows = computed(() => requestDummyStore.list.map((d) => ({
  id: d.id,
  projectCode: d.projectCode,
  materialGroup: d.materialGroup,
  status: d.status,
  unit: d.unit,
  model: d.model,
  costCenter: d.costCenter,
  commonArea: d.commonArea,
  remark: d.remark,
  requestDummyItems: d.requestDummyItems
})));
const requestSelected = ref<RequestDummy[]>([])
const mappingRows = computed(() => mapItem(requestSelected.value))
const units = ref([])
const target = ref<string>('')
const showConfirm = ref(false)
const selectedProject = ref<string>('')

onMounted(() => {
})

function select(row: RequestDummy) {
  const index = requestSelected.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    requestSelected.value.push(row)
  } else {
    requestSelected.value.splice(index, 1)
  }
}
function mapItem(data: RequestDummy[]) {
  const items: IPreviewMappingRequestItem[] = []
  data.map((d) => {
    d.requestDummyItems?.filter(dd => dd.requestQty > 0).map((item) => {
      if (items.findIndex((i) => i.materialCode === item.materialCode) === -1) {
        items.push({
          materialGroup: d.materialGroup,
          materialCode: item.materialCode,
          totalRequest: item.requestQty,
        })
      } else {
        const index = items.findIndex((i) => i.materialCode === item.materialCode)
        items[index].totalRequest += item.requestQty
      }
    })
  })
  return items
}
function selectProject(projectCode: string) {
  requestDummyStore.loadData(projectCode, 'PENDING')
  requestDummyStore.loadUnit(projectCode).then((data) => {
    units.value = data
  })
  selectedProject.value = projectCode
}
async function selectUnit(unit: string) {
  target.value = unit

  await useSapMaterialInfoStore().loadMaterialGroups(
    selectedProject.value,
    unit
  )
}
async function confirm() {
  const payload: MapToRequestGI = {
    projectCode: selectedProject.value,
    requestDummyIds: requestSelected.value.map((d) => d.id),
    target: {
      unit: target.value,
    }
  }
  const success = await requestDummyStore.mapToRequestGI(payload)
  if (success) {
    resetPage(payload.projectCode)
  }
}
function resetPage(projectCode?: string) {
  selectedProject.value = projectCode || ''
  requestSelected.value = []
  target.value = ''
  showConfirm.value = false
  requestDummyStore.loadData(selectedProject.value, 'PENDING')
}
</script>

<style></style>