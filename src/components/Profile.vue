<template>
  <v-container style="height: 100px" fluid>
    <v-row justify="center">
      <v-menu v-model="menuVisible" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="black" size="large">
              <!-- <span class="text-h5">{{
                getUser.name.slice(0, 2).toUpperCase()
              }}</span> -->
              <v-icon color="white" icon="fa-duotone fa-user"></v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card color="black">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="white" size="large">
                <span class="text-h5">{{
                  getUser.name.slice(0, 2).toUpperCase()
                }}</span>
              </v-avatar>
              <h1 class="mt-2 font-bold">{{ getUser.name }}</h1>
              <p class="text-caption text-left mt-1">
                <i class="fa-duotone fa-id-card"></i>
                {{ getUser.uid }}
              </p>
              <p class="text-caption text-capitalize text-left mt-1">
                <i class="fa-duotone fa-user-gear"></i>
                {{ getUser.department_number }}
              </p>
              <p class="text-caption text-left mt-1">
                <i class="fa-duotone fa-building"></i> {{ getUser.office_name }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                color="red"
                prepend-icon="fas fa-arrow-right-from-bracket"
                variant="text"
                rounded
                @click="store.authStore.doLogout()"
                >Logout</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, inject } from "vue";
import { storeToRefs } from "pinia";
const store = inject("store");
const { getUser } = storeToRefs(store.authStore);
// Status menu untuk mengontrol buka/tutup menu
const menuVisible = ref(false);
</script>
