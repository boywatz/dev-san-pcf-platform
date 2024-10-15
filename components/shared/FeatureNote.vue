<template>
  <div class="bg-white shadow-lg rounded-lg p-4 mt-4">
    <h3 class="mb-4 underline">{{ props.title }}</h3>
    <ul class="">
      <li v-for="(feature, index) in props.list" :key="index" class="py-4 flex justify-between items-center">
        <div>

          <h3 class="text-sm">{{ feature.title }}<span class="text-sm text-green-600 font-semibold">{{
            feature.status }}</span> </h3>
          <p class="text-sm text-gray-600">{{ feature.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string,
  list: {
    title: string,
    description?: string,
    status?: string
  }[]
}>()
</script>

<style></style>