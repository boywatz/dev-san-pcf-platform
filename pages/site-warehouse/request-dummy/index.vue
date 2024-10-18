<template>
  <div>
    <UBreadcrumb :links="links" />

    <UTabs :items="tabItems" v-model="tabSelected" class="w-full mt-4">
      <template #item="{ item }">
        <div v-if="item.key === 'step1'">
          <div class="mt-4">
            <h3 class="text-m font-bold mb-4">ข้อมูล PO และรายละเอียด Order</h3>

            <div class="flex flex-cols items-center space-x-2">
              <SelectProject @select="selectProject" />
              <SelectUnit ref="selectedUnitRef" :project-code="selectedProject" @select="(unit) => selectUnit(unit)" />
            </div>

            <div v-if="target.unit || target.costCenter">
              <div class="mt-4" v-if="!sapMaterialInfoStore.materialGroups.length">
                กรุณารอสักครู่ กำลังดึงข้อมูลจาก SAP ...
              </div>
              <div class="mt-4" v-else>
                <URadioGroup legend="PO" v-model="sapMaterialInfoStore.activePO" @change="selectPO" :options="sapMaterialInfoStore.materialGroups.map((g: any) => ({
                  value: g.po,
                  label: `(${g.po}): ${g.materialGroup} - ${g.materialGroupDesc}`
                }))" />
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="item.key === 'step2' && sapMaterialInfoStore.activePO">
          <div class="grid grid-cols-2 gap-2 mt-4">
            <div>
              <h3 class="text-m font-bold mb-4">รายการ Dummy รอ Map</h3>
              <p class="bg-yellow-300 text-black font-bold px-1" v-if="activeElectionGroup">Group ที่กำลัง Map: {{
                activeElectionGroup }} - {{
                  activeElectionGroup ?
                    requestSelected[0].materialGroupDesc : '' }}</p>
            </div>

            <div>
              <h3 class="text-m font-bold mb-4">รายการวัสดุที่จะถูกเบิกลงแปลงด้วย
                <span class="bg-yellow-300 text-black font-bold px-1">PO: ({{
                  sapMaterialInfoStore.activePO
                  }}): {{ sapMaterialInfoStore.activeMaterialGroup }}
                </span>
              </h3>
              <div v-if="warningMap">
                <UVerticalNavigation :links="[{
                  label: warningMap
                }]" :ui="{ wrapper: 'truncate' }">
                  <template #default="{ link }">
                    <span class="flex items-center gap-2">
                      <UIcon name="i-heroicons-exclamation-circle" :class="`text-red-500 w-5 h-5`" /> <span>{{
                        link.label
                      }}</span>
                    </span>
                  </template>
                </UVerticalNavigation>
              </div>
              <UButton label="Map รายการลง GI" @click="showConfirm = true"
                :disabled="!mappingRows.length || !target || warningMap !== ''" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-4">
            <UTable :columns="columns" :rows="rows" v-model="requestSelected" @select="select">
              <template #id-header="{ row }">
                <span></span>
              </template>
              <template #materialGroup-data="{ row }">
                <span>
                  {{ row.materialGroupDesc }}
                </span>
              </template>
              <template #target-data="{ row }">
                <span>{{ row.unit }}{{ row.costCenter }}{{ row.commonArea }}</span>
              </template>
              <template #createdAt-data="{ row }">
                <span>{{ useDateHandler(row.createdAt).toDDMMYYYYHHMMSS() }}</span>
              </template>
            </UTable>

            <div>
              <UTable :columns="columnsMapping" :rows="mappingRows">
                <template #materialCode-data="{ row }">
                  <span>{{ row.materialCode }} - {{ row.materialName }}</span>
                </template>
                <template #bomQty-data="{ row }">
                  <span v-if="row.bomQty > 0">{{ row.bomQty }}</span>
                  <span v-else class="flex items-center gap-2">
                    <UIcon name="i-heroicons-information-circle" class="text-blue-500 w-5 h-5" />
                    <span>New component</span>
                  </span>
                </template>
                <template #stockQty-data="{ row }">
                  <span v-if="row.stockQty > 0">{{ row.stockQty }}</span>
                  <span v-else class="flex items-center gap-2">
                    <UIcon name="i-heroicons-exclamation-circle" class="text-red-500 w-5 h-5" />
                    <span class="text-red-500">Stock ไม่พอ</span>
                  </span>
                </template>
              </UTable>
            </div>
          </div>
        </div>
      </template>
    </UTabs>
  </div>

  <div>
    <UModal v-model="showConfirm">
      <div class="p-4">
        <h3 class="text-m font-bold mb-4">ยืนยันการ Map รายการ</h3>
        <div class="flex justify-end">
          <UButton label="ยกเลิก" color="secondary" @click="showConfirm = false" />
          <UButton label="ยืนยัน" @click="confirm" />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { useDateHandler } from '~/composables/utils/dateHandler';
import { useAlertStore } from '~/stores/alert/alert';
import { useRequestDummyStore, type MapToRequestGI, type RequestDummy, type RequestDummyItems } from '~/stores/site-warehouse/request-dummy';
import { useSapMaterialInfoStore } from '~/stores/site-warehouse/sap-material-info';
import { useStockStore } from '~/stores/site-warehouse/stock';

definePageMeta({
  layout: 'site-warehouse',
})

type IPreviewMappingRequestItem = {
  materialGroup: string,
  materialCode: string,
  materialName: string,
  totalRequest: number,
  bomQty: number,
  stockQty: number,
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

const tabItems = ref([
  {
    key: 'step1',
    label: '(Step 1): เลือกข้อมูล PO ที่ต้องการ Map',
    icon: 'i-heroicons-clipboard-document-list',
  },
  {
    key: 'step2',
    label: '(Step 2): เลือกรายการ Dummy ที่ต้องการ Map',
    icon: 'i-heroicons-building-office-2-20-solid',
  }
])

const requestDummyStore = useRequestDummyStore();
const sapMaterialInfoStore = useSapMaterialInfoStore();
const stockStore = useStockStore();
const alertStore = useAlertStore();

const columns = [
  {
    label: 'IO/CostCenter',
    key: 'target',
  },
  {
    label: 'Election Material Group',
    key: 'materialGroup',
  },
  {
    label: 'เบิกโดย',
    key: 'createdBy',
  },
  {
    label: 'วันที่',
    key: 'createdAt',
  },
  {
    label: 'เหตุผล',
    key: 'remark',
  },
]
const columnsMapping = [
  {
    label: 'Material รอ Map',
    key: 'materialCode',
  },
  {
    label: 'ยอดรอ Map',
    key: 'totalRequest',
  },
  {
    label: 'ยอด BOM ใน SAP',
    key: 'bomQty'
  },
  {
    label: 'ยอด Stock ใน SAP',
    key: 'stockQty'
  }
]
const rows = computed(() => requestDummyStore.list.map((d) => ({
  id: d.id,
  projectCode: d.projectCode,
  materialGroup: d.materialGroup,
  materialGroupDesc: d.materialGroupDesc,
  status: d.status,
  unit: d.unit,
  model: d.model,
  costCenter: d.costCenter,
  commonArea: d.commonArea,
  remark: d.remark,
  requestDummyItems: d.requestDummyItems,
  createdAt: d.createdAt,
  createdBy: d.createdBy,
})));
const requestSelected = ref<RequestDummy[]>([])
const tabSelected = ref(0);
const mappingRows = computed(() => mapItem(requestSelected.value))
const units = ref([])
const target = ref<{
  unit: string,
  costCenter: string,
  materialGroup: string,
  po: string
}>({
  unit: '',
  costCenter: '',
  materialGroup: '',
  po: ''
})
const showConfirm = ref(false)
const selectedProject = ref<string>('')
const selectedUnitRef = ref(null)
const activeElectionGroup = computed(() => requestSelected.value.length > 0 ? requestSelected.value[0].materialGroup : '')
const warningMap = computed(() => mappingRows.value.filter((m) => m.stockQty === 0).length > 0 ? 'Stock ไม่พอ' : '')

function select(row: RequestDummy) {
  const index = requestSelected.value.findIndex((item) => item.id === row.id)
  if (activeElectionGroup.value && activeElectionGroup.value !== row.materialGroup) {
    alertStore.warning('ไม่สามารถเลือกรายการที่มี Material Group ต่างกันได้')
    return;
  }

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
      const curMatOnBom = sapMaterialInfoStore.activeMaterialItems.find((i: any) => i.materialCode === item.materialCode)
      const curMatOnStock = stockStore.list.find((i: any) => i.materialCode === item.materialCode)

      if (items.findIndex((i) => i.materialCode === item.materialCode) === -1) {
        items.push({
          materialGroup: d.materialGroup,
          materialCode: item.materialCode,
          materialName: curMatOnStock?.materialName || '',
          totalRequest: item.requestQty,
          bomQty: curMatOnBom && curMatOnBom.bomQty > 0 ? curMatOnBom.bomQty : 0,
          stockQty: curMatOnBom && curMatOnBom.urStock > 0 ? curMatOnBom.urStock : curMatOnStock && curMatOnStock?.qty + item.requestQty > 0 ? curMatOnStock?.qty + item.requestQty : 0
        })
      } else {
        const index = items.findIndex((i) => i.materialCode === item.materialCode)
        items[index].totalRequest += item.requestQty
        if (items[index].bomQty > 0) {
          items[index].bomQty += item.requestQty;
        } else {
          //TODO: อาจจะต้องแก้ หลัง SAP compute dummy เอง
          items[index].stockQty += item.requestQty;
        }
      }
    })
  })
  return items
}
function selectProject(projectCode: string) {
  resetPage()

  requestDummyStore.loadData(projectCode, 'PENDING')
  requestDummyStore.loadUnit(projectCode).then((data) => {
    units.value = data
  })
  stockStore.loadStock(projectCode);
  selectedProject.value = projectCode
}
async function selectUnit(unit: string) {
  target.value = targetHandler(unit);

  await sapMaterialInfoStore.loadMaterialGroups(
    selectedProject.value,
    target.value.unit,
    target.value.costCenter
  )
}
async function confirm() {
  const payload: MapToRequestGI = {
    projectCode: selectedProject.value,
    requestDummyIds: requestSelected.value.map((d) => d.id),
    target: target.value
  }
  const success = await requestDummyStore.mapToRequestGI(payload)
  if (success) {
    resetPage(payload.projectCode)
  }
}
function resetPage(projectCode?: string) {
  selectedProject.value = projectCode || ''
  if (selectedUnitRef.value) {
    (selectedUnitRef.value as any).resetSelection()
  }
  requestSelected.value = []
  target.value = {
    unit: '',
    costCenter: '',
    materialGroup: '',
    po: ''
  }
  showConfirm.value = false
  tabSelected.value = 0
  sapMaterialInfoStore.activePO = ''
  sapMaterialInfoStore.activeMaterialGroup = ''
  sapMaterialInfoStore.materialGroups = []
  stockStore.list = []
  requestDummyStore.list = []
  requestDummyStore.loadData(selectedProject.value, 'PENDING')
}
function targetHandler(data: string): { unit: string, costCenter: string, materialGroup: string, po: string } {
  const io = data.includes('-') ? true : false;
  return {
    unit: io ? data : '',
    costCenter: io ? '' : data,
    materialGroup: '',
    po: ''
  }
}
async function selectPO(po: string) {
  await sapMaterialInfoStore.loadMaterialBom(
    selectedProject.value,
    po,
    target.value.unit,
    target.value.costCenter
  )
  target.value.po = po
  target.value.materialGroup = sapMaterialInfoStore.activeMaterialGroup
  activeStep(1);
}
function activeStep(step: number) {
  tabSelected.value = step;
}
</script>

<style></style>