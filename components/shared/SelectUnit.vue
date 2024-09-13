<template>
  <USelect v-model="selectedUnit" :options="units.map((d) => ({
    value: d.code,
    label: d.code
  }))" placeholder="เลือก แปลง/IO/CostCenter" @change="$emit('select', selectedUnit)" :loading="loading"
    :disabled="!props.projectCode" />
</template>

<script lang="ts" setup>
import { useMasterDataApi } from '~/composables/api/useMasterDataApi';
import { useUserStore } from '~/stores/user/user';

const props = defineProps<{
  projectCode: string
}>()
const userStore = useUserStore();
const selectedUnit = ref<string>('')
const units = ref<{
  code: string
}[]>([])
const loading = ref(false)

const resetSelection = () => {
  selectedUnit.value = ''
}

const fetchData = async (projectCode: string) => {
  loading.value = true;
  const unitList = await useMasterDataApi(userStore.getToken()!).getUnitList(projectCode);
  units.value = unitList;
  loading.value = false;
}

watch(() => props.projectCode, (newProjectCode) => {
  if (newProjectCode) {
    fetchData(newProjectCode)
  }
})

onMounted(() => { })

defineExpose({
  resetSelection
})
</script>

<style></style>