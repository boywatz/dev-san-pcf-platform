<template>
  <div class="bg-background min-h-screen flex">
    <SidebarMenu title="Site Warehouse" :menu="menu" />
    <div class="ml-64 flex-1">
      <main class="container mx-auto py-4">
        <section class="p-8 rounded-lg shadow-md">
          <slot />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = ref([
  {
    link: '/site-warehouse',
    name: 'Home'
  },
  {
    link: '/site-warehouse/transfer',
    name: 'โอนย้ายคลังระหว่าง ERC Site'
  },
  {
    link: '/site-warehouse/request-dummy',
    name: 'รายการเบิก-Dummy'
  },
  {
    link: '/site-warehouse/report',
    name: 'Download รายงาน'
  },
])

</script>