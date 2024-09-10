<template>
  <USelect v-model="selectedProject" :options="userStore.projects.map((d) => ({
    value: d.projectCode,
    label: `${d.projectCode} - ${d.projectName}`
  }))" :placeholder="props.placeholder || 'เลือกโครงการ'" @change="$emit('select', selectedProject)" />
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user/user';

const props = defineProps<{
  placeholder?: string
}>()
const userStore = useUserStore()
const selectedProject = ref<string>('')

const resetSelection = () => {
  selectedProject.value = ''
}

defineExpose({
  resetSelection
})
</script>

<style></style>