<template>
  <USelect v-model="selected" :options="reasonStore.ncrReasons" :placeholder="'เหตุผล NCR'"
    @change="$emit('select', selected)" />
</template>

<script lang="ts" setup>
import { useSiteWarehouseReasonStore } from '~/stores/site-warehouse/reason';
const reasonStore = useSiteWarehouseReasonStore();
const selected = ref<string>('');
const resetSelection = () => {
  selected.value = ''
}
defineExpose({
  resetSelection
})
</script>

<style></style>