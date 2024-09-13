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
    value: 'RequestDummyTransaction',
    label: 'เบิกจ่ายวัสดุ-Dummy',
  },
  {
    value: 'RequestTempTransaction',
    label: 'เบิกจ่ายวัสดุ-งานซ่อมบ้านลูกค้า',
  },
  {
    value: 'RequestGIWithoutOrderTransaction',
    label: 'เบิกจ่ายวัสดุ-งานซ่อม NCR (คชจ. ติดตั้ง, โรงงานไม่มี Order)',
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