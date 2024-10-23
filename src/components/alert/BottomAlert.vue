<template>
  <v-bottom-sheet v-model="isOverlayActive">
    <v-card class="h-full">
      <v-card-title>
        <div class="absolute right-0">
          <v-btn
            variant="tonal"
            @click.prevent="store.overlayStore.closeOverlay()"
            icon="fa-duotone fa-close"
            color="red"
          ></v-btn>
        </div>
      </v-card-title>
      <v-card-item>
        <v-empty-state
          :title="getMessage"
          :icon="
            getType == 201 || getType == 200
              ? 'fa-duotone fa-circle-check text-primary fa-flip'
              : 'fa-duotone fa-circle-exclamation text-error fa-flip'
          "
        ></v-empty-state>
      </v-card-item>
    </v-card>
  </v-bottom-sheet>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { inject } from "vue";
const store = inject("store");

const { isOverlayActive, getType, getMessage } = storeToRefs(
  store.overlayStore
);
</script>
