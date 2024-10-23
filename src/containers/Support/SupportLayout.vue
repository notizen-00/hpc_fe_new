<template>
  <div class="grid grid-rows-3 mt-4 grid-flow-col gap-2">
    <div class="row-span-3 bg-gray-900/50 mx-4 mb-1 h-50 rounded-xl ...">
      <MiniChat />
    </div>
    <div class="col-span-4 row-span-1 bg-gray-900/50 rounded-lg ..."></div>
    <div class="row-span-1 col-span-2 bg-white">
      <!-- <LineChart></LineChart> -->
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import MiniChat from "@/components/Chat/MiniChat.vue";
import LineChart from "@/components/charts/GroupChart.vue";
const store = inject("store");
</script>
