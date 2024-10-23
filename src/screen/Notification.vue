<template>
  <div class="text-center">
    <v-dialog v-model="dialog" transition="dialog-top-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-badge color="red" :content="getNotification.length">
          <v-btn
            class="text-none"
            variant="tonal"
            color="red"
            icon="fa-duotone fa-bell"
            v-bind="activatorProps"
            @click="openDialog"
          ></v-btn>
        </v-badge>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn icon="fa-duotone fa-bell" @click="closeDialog"></v-btn>
          <v-toolbar-title>Notification</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text="Close"
              color="red"
              variant="text"
              @click="saveSettings"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <div class="w-full text-center mt-10">
          <ListNotification></ListNotification>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  inject,
  defineEmits,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { storeToRefs } from "pinia";
import ListNotification from "@/components/Notification/ListNotification.vue";
const store = inject("store");

const { getNotification } = storeToRefs(store.notificationStore);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const dialog = ref(props.modelValue);
const dialogAdd = ref(false);
const notifications = ref([]); // Menyimpan notifikasi sebagai array

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  emit("update:modelValue", false);
};

const saveSettings = () => {
  emit("save", {
    notifications: notifications.value,
    sound: false, // Misalnya, atur sesuai kebutuhan
    widgets: false, // Misalnya, atur sesuai kebutuhan
  });
  closeDialog();
};

// Watch for changes to the prop and update the dialog state
watch(
  () => props.modelValue,
  (newVal) => {
    dialog.value = newVal;
  }
);

onMounted(async () => {
  await store.notificationStore.fetchNotification();
});
</script>

<style>
.notification-item {
  margin: 10px 0;
}
</style>
