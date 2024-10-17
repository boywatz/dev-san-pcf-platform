<template>
  <USelect v-model="selectedProject" :options="list.map((d) => ({
    value: d.projectCode,
    label: `${d.projectCode} - ${d.projectName}`
  }))" :placeholder="props.placeholder || 'เลือกโครงการ'" @change="$emit('select', selectedProject)"
    :loading="loading" />
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user/user';
import { useMasterDataApi } from '~/composables/api/useMasterDataApi';

const props = defineProps<{
  placeholder?: string
}>()
const userStore = useUserStore()
const selectedProject = ref<string>('')
const loading = ref(false)
const list = ref([] as {
  projectCode: string,
  projectName: string
}[])

const resetSelection = () => {
  selectedProject.value = ''
  fetchData();
}

const fetchData = async () => {
  loading.value = true;

  const [projects] = await Promise.all([useMasterDataApi(userStore.token!).getProjectList()])
  list.value = projects;

  loading.value = false;
}
fetchData();

defineExpose({
  resetSelection
})
</script>

<style></style>