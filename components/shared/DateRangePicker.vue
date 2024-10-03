<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'


const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]
const selected = ref({ start: sub(new Date(), { days: 7 }), end: new Date() })

onMounted(() => {
  emit('update:modelValue', selected.value)
})

watch(() => props.modelValue, (newValue) => {
  selected.value = newValue
})

watch(selected, (newValue) => {
  console.log('new', newValue)
  emit('update:modelValue', newValue)
})

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}

const resetSelection = () => {
  selected.value = { start: sub(new Date(), { days: 7 }), end: new Date() }
}

const emitSelected = () => {
  return {
    start: selected.value.start,
    end: selected.value.end
  }
}

defineExpose({
  resetSelection
})
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid">
      {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
    </UButton>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div class="hidden sm:flex flex-col py-4">
          <UButton v-for="(range, index) in ranges" :key="index" :label="range.label" color="gray" variant="ghost"
            class="rounded-none px-6"
            :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
            truncate @click="selectRange(range.duration)" />
        </div>

        <DatePicker v-model="selected" @close="close" />
      </div>
    </template>
  </UPopover>
</template>
