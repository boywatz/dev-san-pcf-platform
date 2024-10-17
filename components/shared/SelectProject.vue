<template>
  <USelect v-model="selectedProject" :options="list.map((d) => ({
    value: d.id,
    label: d.name
  }))" :placeholder="props.placeholder || 'เลือกโครงการ'" @change="$emit('select', selectedProject)"
    :loading="loading" />
  <!-- <UInputMenu class="w-[500px]" :placeholder="props.placeholder || 'เลือกโครงการ'" v-model="selectedProject"
    :options="list" value-attribute="id" option-attribute="name" :search-attributes="['id', 'name']" :loading="loading"
    @change="$emit('select', selectedProject)"  /> -->
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
  id: string,
  name: string
}[])

const resetSelection = () => {
  selectedProject.value = ''
  fetchData();
}

const fetchData = async () => {
  loading.value = true;

  const [projects] = await Promise.all([useMasterDataApi(userStore.token!).getProjectList()])
  list.value = projects.map((p: any) => ({ id: p.projectCode, name: `${p.projectCode} - ${p.projectName}` }));

  loading.value = false;
}
fetchData();

defineExpose({
  resetSelection
})
</script>

<style></style>