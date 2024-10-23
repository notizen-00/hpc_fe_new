<template>
  <div class="mx-auto">
    <v-card class="mx-auto">
      <v-card-title class="bg-primary text-white text-h5">
        User Notebook
      </v-card-title>

      <v-row class="pa-4" justify="space-between">
        <v-col cols="5">
          <v-list>
            <div class="w-full flex justify-between my-4">
              <i class="fa-duotone fa-server fa-2x mr-3"></i>
              <div class="text-center w-full text-xl font-bold font-mono">
                Notebook Server
              </div>
            </div>

            <v-list-item
              v-for="(item, i) in getNotebook.data"
              :key="i"
              @click="selectNotebook(item)"
              selectable="true"
              :active="active == item.id"
              color="primary"
              variant="tonal"
            >
              <template v-slot:prepend>
                <v-icon color="primary">fa-duotone fa-notebook</v-icon>
              </template>

              <v-list-item-title class="text-start flex justify-between"
                >{{ item.nama }}
                <i
                  class="fa-duotone fa-circle"
                  :class="item.status == 1 ? 'text-green fa-beat' : 'text-red'"
                ></i
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col class="d-flex text-center">
          <v-scroll-y-transition mode="out-in">
            <!-- {{ selected }} -->
            <div
              v-if="!selected"
              class="text-h6 text-grey-lighten-1 text-center w-full font-weight-light"
              style="align-self: center"
            >
              Select a Notebook
            </div>
            <v-card
              v-else
              :key="selected.id"
              class="pt-6 mx-auto"
              max-width="400"
              flat
            >
              <v-card-text>
                <h3
                  class="text-4xl font-bold text-slate-500 w-full font-sans mb-2"
                >
                  <i class="fa-duotone fa-link"></i> {{ selected.nama }}
                </h3>
                <div class="text-slate-600 mb-2 w-full mt-10">
                  <v-chip size="small" prependIcon="fa-duotone fa-key">{{
                    selected.token_share
                  }}</v-chip>
                  <v-btn
                    prepend-icon="fa-duotone fa-refresh"
                    color="primary"
                    variant="outlined"
                    :loading="loading"
                    @click="renewToken(selected.id)"
                    class="mt-2"
                    size="small"
                    >Renew Token</v-btn
                  >
                </div>
                <div class="text-blue subheading font-weight-bold">
                  Expires At : {{ selected.expires_at }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <div class="d-flex justify-content-center" tag="v-card-text">
                <div class="text-center me-4 mb-2" cols="12" tag="strong">
                  <v-btn
                    color="primary"
                    prependIcon="fa-duotone fa-globe"
                    variant="tonal"
                    @click="navigateToNotebook(selected.url_notebook)"
                    >Open Access
                  </v-btn>
                </div>

                <div class="text-center me-4 mb-2" cols="12" tag="strong">
                  <Share></Share>
                </div>
              </div>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
import Share from "@/components/Notification/Share.vue";
const store = inject("store");
const { getNotebook, findNotebook } = storeToRefs(store.notebookStore);

const active = ref(null);
const selected = ref(null);
const loading = ref(false);
const toast = useToast();
// Select a notebook when clicked
const selectNotebook = (notebook) => {
  if (active.value !== notebook.id) {
    active.value = notebook.id;
    selected.value = notebook;
  }
};

const renewToken = async (id) => {
  loading.value = true;

  const url =
    import.meta.env.VITE_APP_API_URL +
    "api/member/notebook/renew/" +
    id +
    "/token";

  const token = store.authStore.token;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    selected.value = {
      ...response.data.notebook, // Menggunakan data baru dari respons
    };

    store.notebookStore.fetchNotebook();

    loading.value = false;
    toast.success("Token renewed successfully!");
    return response.data;
  } catch (error) {
    console.error(error);
    loading.value = false;
    toast.error("Failed to renew token!");
  }
};

const checkActive = async (name) => {
  try {
    const url = "https://jupyter.apps.unej.ac.id/user/" + name;
    const response = await axios.get(url);
    if (response.status === 200) {
    }
  } catch (error) {
    if (error.response.status === 404) {
      active.value = null;
    }
  }
};

const navigateToNotebook = (url) => {
  window.open("https://jupyter.apps.unej.ac.id/" + url, "_blank");
};

// Compute the selected notebook using the findNotebook getter
</script>
