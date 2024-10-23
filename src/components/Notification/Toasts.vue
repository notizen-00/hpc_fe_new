<template>
  <div>
    <h1>{{ title }}</h1>
    <span>{{ subtitle }}</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>


