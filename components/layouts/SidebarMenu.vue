<template>
  <aside class="bg-main-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">{{ props.title }}</h2>
    </div>
    <nav>
      <ul class="space-y-4">
        <li v-for="(item, index) in $props.menu">
          <a :href="item.link" class="block text-white hover:text-secondary">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    require: true
  },
  menu: Array<{
    link: string,
    name: string
  }>
})
</script>

<style></style>