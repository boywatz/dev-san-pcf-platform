<template>
  <UModal v-model="alertStore.show" :ui="{
    width: 'sm',
    container: 'items-start pt-16'
  }">
    <UCard :ui="{
      base: `bg-${config.bgColor}-50 border-${config.color}-500`,
      header: { padding: 'p-4' },
      body: { padding: 'px-4 pb-4' },
      footer: { padding: 'px-4 pb-4' }
    }">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon :name="config.icon" :class="`text-${config.color}-500 w-5 h-5`" />
          <h3 :class="`text-base font-semibold leading-6 text-${config.color}-900`">
            {{ props.title }}
          </h3>
        </div>
      </template>

      <p :class="`text-sm text-${config.color}-700`">{{ props.desc }}</p>

      <template #footer>
        <div class="flex justify-end w-full">
          <UButton :color="'secondary'" variant="solid" @click="close">
            ปิด
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import { useAlertStore } from '~/stores/alert/alert';
import type { AlertPopupType } from './type';

// type AlertPopupType = 'ERROR' | 'SUCCESS' | 'PRIMARY';

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: false,
    type: String
  },
  type: {
    default: 'PRIMARY',
    type: String as PropType<AlertPopupType>
  },
  isOpen: Boolean
})

const alertStore = useAlertStore();
const config = computed(() => {
  switch (props.type) {
    case 'ERROR':
      return {
        color: 'red',
        bgColor: 'red',
        icon: 'i-heroicons-exclamation-circle'
      };
    case 'SUCCESS':
      return {
        color: 'green',
        bgColor: 'green',
        icon: 'i-heroicons-check-circle'
      };
    case 'WARNING':
      return {
        color: 'orange',
        bgColor: 'orange',
        icon: 'i-heroicons-warn-circle'
      };
    default:
      return {
        color: 'blue',
        bgColor: 'blue',
        icon: 'i-heroicons-information-circle'
      };
  }
})

const close = () => {
  alertStore.close();
}
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>