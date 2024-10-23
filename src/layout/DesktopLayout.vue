<template>
  <v-layout>
    <Navigation></Navigation>

    <!-- <v-app-bar title="Application bar"></v-app-bar> -->

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <slot name="default"></slot>
    </v-main>
  </v-layout>
</template>

<script setup>
import Navigation from "@/layout/desktop/Navigation.vue";
</script>
