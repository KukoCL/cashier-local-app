<template>
  <div class="d-flex justify-content-center align-items-center mb-3">
    <h1 class="h3 m-0">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
