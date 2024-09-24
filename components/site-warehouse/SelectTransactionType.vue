<template>
  <USelect v-model="selected" :options="list" :placeholder="'ประเภทรายการ'" @change="$emit('select', selected)" />
</template>

<script lang="ts" setup>
type ITransactionType = {
  value: string;
  label: string;
}
const list = ref<ITransactionType[]>([
  {
    value: 'ReceiptTransaction',
    label: 'รับวัสดุเข้า Site',
  },
  {
    value: 'RequestGITransaction',
    label: 'เบิกจ่ายวัสดุ-รายแปลง',
  },
  {
    value: 'RequestGIReorderTransaction',
    label: 'เบิกจ่ายวัสดุ-งานซ่อมแบบมี Order',
  },
  {
    value: 'RequestDummyTransaction',
    label: 'เบิกจ่ายวัสดุ-dummy',
  },
  {
    value: 'RequestTempTransaction',
    label: 'งานซ่อม Temp',
  },
  {
    value: 'RequestGIWithoutOrderTransaction',
    label: 'เบิกจ่ายวัสดุ-งานซ่อม (งานซ่อมบ้านลูกค้า, งาน NCR)',
  }
]);
const selected = ref<string>('');
const resetSelection = () => {
  selected.value = ''
}

defineExpose({
  resetSelection
})
</script>

<style></style>