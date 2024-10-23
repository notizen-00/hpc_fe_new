<template>
  <v-card class="w-full relative h-full">
    <template v-slot:prepend>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo-lighten-2'"
        class="me-8"
        :icon="
          checking ? 'fa-duotone fa-server fa-fade' : 'fa-duotone fa-server'
        "
        size="64"
        @click="takePulse"
      ></v-icon>
    </template>

    <template v-slot:title>
      <div class="w-full d-flex justify-between">
        <div>
          <div class="text-caption text-grey text-uppercase">Jupyter Hub</div>

          <span
            class="text-h3 font-weight-black mr-3"
            v-text="getInfo.version"
          ></span>
          <strong v-if="avg">Version</strong>
        </div>
        <div>
          <div class="text-caption text-grey text-uppercase">
            Python Version
          </div>

          <span
            class="text-h3 font-weight-black mr-3"
            v-text="getInfo.python.slice(0, 7)"
          ></span>

          <strong v-if="avg">Version</strong>
        </div>
      </div>
    </template>

    <template v-slot:append>
      <v-btn
        class="align-self-start"
        icon="mdi-arrow-right-thick"
        size="34"
        variant="text"
      ></v-btn>
    </template>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :gradient="['#0fd15c', '#0aff6c', 'white']"
        :line-width="3"
        :model-value="heartbeats"
        :smooth="16"
        stroke-linecap="round"
        auto-draw
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { storeToRefs } from "pinia";

const store = inject("store");

const { getInfo } = storeToRefs(store.jupyterStore);
// Utility function to delay actions
const exhale = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Reactive state for checking, heartbeats
const checking = ref(false);
const heartbeats = ref([]);

// Generate a random heartbeat
const heartbeat = () => Math.ceil(Math.random() * (120 - 80) + 80);

// Computed property to calculate average BPM
const avg = computed(() => {
  const sum = heartbeats.value.reduce((acc, cur) => acc + cur, 0);
  const length = heartbeats.value.length;

  if (!sum && !length) return 0;

  return Math.ceil(sum / length);
});

// Function to simulate pulse check and generate heartbeat data
const takePulse = async (inhale = true) => {
  checking.value = true;

  if (inhale) {
    await exhale(1000);
  }

  heartbeats.value = Array.from({ length: 20 }, heartbeat);

  checking.value = false;
};

onMounted(async () => {
  await store.jupyterStore.fetchInfo();
  takePulse(false);
});
</script>
