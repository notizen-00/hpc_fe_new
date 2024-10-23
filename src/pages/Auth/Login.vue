<template>
  <div class="bg-slate-900 h-screen">
    <form @submit.prevent="onSubmit">
      <v-img
        @click="navigateToHome"
        class="mx-auto my-20"
        max-width="150"
        src="https://hpc.apps.unej.ac.id/wp-content/uploads/2024/08/xprotection-150x150.png.pagespeed.ic.sO7wphZ37o.webp"
      ></v-img>

      <div class="text-center text-blue-400 font-bold">
        Gunakan akun sister untuk login !
      </div>

      <div
        :class="mobile ? 'w-full' : 'w-1/2 mx-auto'"
        class="mx-auto pa-12 -pb-20"
      >
        <div
          :class="mobile ? 'w-full' : 'w-1/2 mx-auto'"
          class="text-subtitle-1 text-medium-emphasis"
        >
          <span class="text-blue-400">Username</span>
        </div>

        <v-text-field
          density="compact"
          required
          v-if="!mobile"
          color="primary"
          class="text-white w-1/2 mx-auto"
          v-model="formData.username"
          placeholder="Username"
          prepend-inner-icon="fa-duotone fa-user"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          density="compact"
          required
          v-else
          color="primary"
          class="text-white"
          v-model="formData.username"
          placeholder="Username"
          prepend-inner-icon="fa-duotone fa-user"
          variant="outlined"
        ></v-text-field>

        <div
          :class="mobile ? 'w-full' : 'w-1/2 mx-auto'"
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          <span class="text-blue-400">Password</span>
          <!-- <a
            class="text-caption text-decoration-none text-blue-300"
            href="https://sister.unej.ac.id/auth/forgotpassword"
            rel="noopener noreferrer"
            target="_blank"
          >
            Lupa Kata Sandi ?
          </a> -->
        </div>

        <v-text-field
          :append-inner-icon="
            visible ? 'fa-duotone fa-eye' : 'fa-duotone fa-eye-slash'
          "
          :type="visible ? 'text' : 'password'"
          density="compact"
          autocomplete
          required
          v-if="mobile"
          color="primary"
          class="text-white w-full"
          v-model="formData.password"
          placeholder="Enter your password"
          prepend-inner-icon="fa-duotone fa-lock"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          :append-inner-icon="
            visible ? 'fa-duotone fa-eye' : 'fa-duotone fa-eye-slash'
          "
          :type="visible ? 'text' : 'password'"
          density="compact"
          autocomplete
          required
          v-else
          color="primary"
          class="text-white w-1/2 mx-auto"
          v-model="formData.password"
          placeholder="Enter your password"
          prepend-inner-icon="fa-duotone fa-lock"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          :block="mobile"
          :class="mobile ? 'mb-8' : 'w-1/2 d-flex justify-center mt-10 mx-auto'"
          color="blue"
          prependIcon="fas fa-arrow-right-from-bracket"
          size="large"
          type="submit"
          variant="tonal"
        >
          Log In
        </v-btn>
        <ul>
          <li v-for="a in listPokemon" :key="a.url">{{ a.name }}</li>
        </ul>
      </div>
      <div class="ml-3">
        {{ getError ? getError : "" }}
      </div>
    </form>
  </div>

  <v-snackbar
    v-model="getSnackbar.show"
    :color="getSnackbar.color"
    timeout="3000"
    top
  >
    {{ getSnackbar.message }}
    <v-btn
      icon="fas fa-remove"
      color="white"
      variant="plain"
      @click="getSnackbar.show = false"
    >
    </v-btn>
  </v-snackbar>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";

const router = useRouter(); // Initialize the router
const { mobile } = useDisplay();
const store = inject("store");
const { listPokemon, isLogin, getToken, getError, getSnackbar } = storeToRefs(
  store.authStore
);

const visible = ref(false);

const formData = reactive({
  username: "",
  password: "",
});

// Function to handle navigation
const navigateToHome = () => {
  router.push("/"); // Use the router instance to navigate
};

onMounted(() => {});

const onSubmit = async () => {
  await store.authStore.doLogin(formData);
};
</script>
