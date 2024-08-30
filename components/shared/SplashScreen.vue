<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
    <UCard class="w-full max-w-md text-center">
      <template #header>
        <h3 class="text-lg font-semibold">Loading</h3>
      </template>
      <UProgress animation="carousel" class="mb-4" />
      <p>Please wait while we check your session...</p>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
</script>

<style></style>