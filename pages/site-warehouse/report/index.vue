<template>
  <div>
    <UBreadcrumb :links="links" />
    <div class="mt-4">
      <UVerticalNavigation :links="menu" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'site-warehouse'
})
const links = [
  {
    label: 'หน้าหลัก',
    to: '/',
  },
  {
    label: 'Download รายงาน',
    to: '/site-warehouse/report',
  }
]
const menu = [
  {
    label: 'รายงานข้อมูล - Transaction',
    icon: 'i-heroicons-chart-bar',
    to: '/site-warehouse/report/transaction'
  },
  {
    label: 'รายงานข้อมูล - Stock',
    icon: 'i-heroicons-chart-bar',
    to: '/site-warehouse/report/stock'
  }
]
</script>

<style></style>