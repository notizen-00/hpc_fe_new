<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          prepend-icon="fa-duotone fa-arrow-up-right-from-square"
          size="small"
          text="My Notebook"
          variant="tonal"
          color="primary"
          v-bind="activatorProps"
          @click="openDialog"
        ></v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn icon="fa-duotone fa-close" @click="closeDialog"></v-btn>
          <v-toolbar-title>Notebook </v-toolbar-title>
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
          <v-btn
            color="primary"
            variant="outlined"
            prependIcon="fa-duotone fa-add"
            @click="dialogAdd = !dialogAdd"
            >Personal Notebook server</v-btn
          >
          <v-dialog v-model="dialogAdd" width="500" persistent>
            <v-card>
              <v-card-title>
                <div class="w-full d-flex justify-between">
                  <h3 class="font-mono">Form Notebook</h3>
                  <v-btn
                    icon="fas fa-close"
                    color="red"
                    variant="tonal"
                    @click="dialogAdd = false"
                    size="small"
                  ></v-btn>
                </div>
              </v-card-title>
              <FormNotebook></FormNotebook>

              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <div class="w-full container mx-auto mt-10">
            <TreeNotebook></TreeNotebook>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, watch, onMounted } from "vue";
import FormNotebook from "@/components/FormNotebook.vue";
import TreeNotebook from "@/components/TreeNotebook.vue";
const store = inject("store");

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const dialog = ref(props.modelValue);
const dialogAdd = ref(false);
const notifications = ref(false);
const sound = ref(false);
const widgets = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  store.notebookStore.closeLoading();
  emit("update:modelValue", false);
};

const saveSettings = () => {
  emit("save", {
    notifications: notifications.value,
    sound: sound.value,
    widgets: widgets.value,
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
  store.notebookStore.fetchNotebook();
});
</script>
