<template>
  <div
    class="grid grid-cols-4 h-screen grid-rows-4 gap-4 p-4"
    v-if="getConnection"
  >
    <!-- Top left: New Ultra Wide with macro -->
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div
          v-bind="props"
          :class="isHovering ? 'bg-gray-900' : 'bg-gray-100'"
          class="col-span-1 relative row-span-1 p-4 rounded-lg shadow-md"
          v-ripple="{ class: `text-primary` }"
        >
          <div class="text-center">
            <p>
              <i
                :class="
                  isHovering
                    ? 'fa-duotone text-white fa-history fa-4x fa-spin fa-spin-reverse'
                    : 'fa-duotone fa-history fa-4x'
                "
              ></i>
            </p>
            <br />
            <v-divider></v-divider>
            <v-divider></v-divider>
            <br />
            <v-chip
              class="text-xl font-mono"
              :class="isHovering ? 'text-white' : 'text-dark'"
              ><b>Last Activity</b></v-chip
            >
            <br />
            <p
              class="text-sm font-mono text-center"
              :class="isHovering ? 'text-white' : 'text-dark'"
            >
              {{
                isHovering
                  ? getTimeDiff(getJupyterUser.last_activity)
                  : formatDate(getJupyterUser.last_activity) + " WIB"
              }}
            </p>
          </div>
        </div>
      </template>
    </v-hover>

    <!-- Top center: Spatial photos and videos -->
    <!-- <div
      class="col-span-2 row-span-1 bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
    > -->
    <Sparklines
      class="col-span-2 row-span-1 bg-gray-900 p-4 rounded-lg shadow-md flex items-center justify-center"
    ></Sparklines>
    <!-- </div> -->

    <!-- Top right: iOS 18 customization -->
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div
          v-bind="props"
          :class="isHovering ? 'bg-gray-900' : 'bg-white'"
          class="col-span-1 row-span-1 p-4 rounded-lg shadow-md"
        >
          <p class="text-center">
            <v-img
              src="https://global.discourse-cdn.com/flex031/uploads/jupyter/original/1X/5042a9e9c48769ff730b5bf57c0d8875e24b4439.png"
              alt="Jupyter Forum Logo"
              max-height="100"
              contain
            ></v-img>
          </p>
          <div class="mt-4">
            <v-card
              append-icon="fa-duotone fa-arrow-up-right-from-square"
              class="mx-auto"
              prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlquQbehFaMuUwUN32KhAS4AxK7WTUtKuZBQ&s"
              :color="isHovering ? 'white' : 'black'"
              href="https://discourse.jupyter.org/"
              max-width="344"
              rel="noopener"
              subtitle="Join the community on Jupyter HUB"
              target="_blank"
            >
              <!-- <template #prepend>
          <v-img
            src="https://global.discourse-cdn.com/flex031/uploads/jupyter/original/1X/5042a9e9c48769ff730b5bf57c0d8875e24b4439.png"
            alt="Jupyter Forum Logo"
            max-height="100"
            contain
          ></v-img>
          </template> -->
            </v-card>
          </div>
        </div>
      </template>
    </v-hover>

    <!-- Center left: USB-C -->
    <div
      class="col-span-1 row-span-1 bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
    >
      <p>USB-C</p>
    </div>

    <!-- Center: Apple Intelligence -->
    <div
      class="col-span-2 row-span-2 p-4 rounded-lg shadow-md flex flex-col items-center justify-center relative overflow-hidden"
      style="
        background-image: url('https://media.istockphoto.com/id/1309243828/vector/rocket-launch-from-laptop-screen-rocket-taking-off-business-start-up-launching-new-product.jpg?s=612x612&w=0&k=20&c=YUkeag0oAmbBPDYmZHUTzQ5-_bITFpQjytepFpMWjRg=');
        background-size: cover;
        background-position: center;
        opacity: 0.8;
      "
    >
      <div class="absolute inset-0 bg-gray-100 opacity-60"></div>
      <!-- Optional overlay for better visibility -->
      <div class="flex-grow flex items-center justify-center z-10">
        <!-- Ensures the button stays above the background -->
        <!-- <v-btn
          color="primary"
          prepend-icon="fa-duotone fa-rocket-launch"
          variant="outlined"
          @click="navigateToApp"
          >Launch Application</v-btn
        > -->
        <button
          @click="navigateToApp"
          class="relative bg-gray-900 text-white font-bold py-2 px-4 rounded-lg border-e-xl border-b-xl border-dotted border-white transition-transform duration-300 transform hover:border-transparen hover:translate-y-1 active:translate-y-4"
        >
          <i
            class="fas fa-rocket mr-2 fa-beat"
            style="--fa-animation-duration: 0.5s"
          ></i>
          Launch Application
        </button>
      </div>
    </div>

    <!-- Center right: Camera Control -->
    <div
      class="col-span-1 row-span-1 bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
    >
      <p>Camera Control</p>
    </div>

    <!-- Bottom left: New, vibrant colors -->
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div
          v-bind="props"
          :class="isHovering ? 'bg-gray-900' : 'bg-white'"
          class="col-span-2 row-span-1 p-4 rounded-lg shadow-md"
        >
          <div class="text-center">
            <v-tooltip text="Online" location="end">
              <template v-slot:activator="{ props }">
                <v-chip
                  v-bind="props"
                  size="xlarge"
                  class="p-3"
                  :color="isHovering ? 'white' : 'gray'"
                  >{{ getJupyterUser.name }}
                  <i class="fas fa-circle fa-beat text-green ml-2"></i
                ></v-chip>
              </template>
            </v-tooltip>
          </div>
          <div class="text-center">
            <i
              class="fa-duotone fa-gauge fa-4x mt-4"
              :class="
                isHovering
                  ? 'text-white fa-duotone fa-gauge-max'
                  : 'text-slate-500'
              "
            ></i>
          </div>
          <div class="text-center mt-3">
            <v-btn
              :loading="loading"
              @click="handlePower"
              :variant="isHovering ? 'outlined' : 'tonal'"
              :color="
                getJupyterUser.server == null
                  ? 'primary'
                  : getJupyterUser.servers[''].ready
                  ? 'error'
                  : 'success'
              "
              :prependIcon="
                getJupyterUser.server
                  ? 'fa-duotone fa-power-off'
                  : 'fa-duotone fa-circle-play'
              "
            >
              {{
                getJupyterUser.server == null
                  ? "Deploy"
                  : getJupyterUser.servers[""].ready
                  ? "Shutdown"
                  : "Power On"
              }}
            </v-btn>
          </div>
        </div>
      </template>
    </v-hover>

    <!-- Bottom center: A18 chip -->
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div
          v-bind="props"
          :class="isHovering ? 'bg-gray-900' : 'bg-white'"
          class="col-span-1 row-span-1 p-4 rounded-lg shadow-md"
        >
          <p
            :class="isHovering ? 'text-white' : 'text-slate-500'"
            class="text-center font-mono text-lg"
          >
            Public Notebook Server
          </p>

          <div class="text-center">
            <i
              class="fa-duotone fa-globe fa-4x mt-4 text-slate-500"
              :class="isHovering ? 'text-white' : 'text-slate-500'"
            ></i>
          </div>
          <div class="text-center mt-3">
            <PublicNotebookDialog
              :test="showNotebook"
              @save="handleSaveSettings"
            ></PublicNotebookDialog>
          </div></div
      ></template>
    </v-hover>

    <!-- Bottom right: Action button -->
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div
          v-bind="props"
          :class="isHovering ? 'bg-gray-900' : 'bg-white'"
          class="col-span-1 row-span-1 p-4 rounded-lg shadow-md"
        >
          <p
            :class="isHovering ? 'text-white' : 'text-slate-500'"
            class="text-center font-mono text-lg"
          >
            Personal Notebook Server
          </p>

          <div class="text-center">
            <i
              class="fa-duotone fa-laptop-code fa-4x mt-4 text-slate-500"
              :class="isHovering ? 'text-white' : 'text-slate-500'"
            ></i>
          </div>
          <div class="text-center mt-3">
            <NotebookDialog
              :test="showNotebook"
              @save="handleSaveSettings"
            ></NotebookDialog>
          </div></div
      ></template>
    </v-hover>
  </div>

  <JupyterError v-else> </JupyterError>
</template>

<script setup>
import Sparklines from "@/components/Sparklines.vue";
import { storeToRefs } from "pinia";
import { inject, onMounted, ref } from "vue";
import NotebookDialog from "@/screen/NotebookDialog.vue";
import { formatDate, getTimeDiff } from "@/helper/helper.js";
import JupyterError from "@/components/Services/error/JupyterError.vue";
import PublicNotebookDialog from "@/screen/PublicNotebookDialog.vue";

const store = inject("store");

const { getJupyterUser, getConnection } = storeToRefs(store.jupyterStore);
const { getUserOnline } = storeToRefs(store.groupStore);
const loading = ref(false);

const showNotebook = ref(true);

const handleSaveSettings = (settings) => {
  console.log("Settings saved:", settings);
  // Handle saving the settings (e.g., store them in a state or send them to an API)
};
const showNotif = (status, message) => {
  loading.value = true;
  setTimeout(() => {
    store.overlayStore.toggleOverlay(status, message);
    loading.value = false;
  }, 2000);
};

const doShutdown = async () => {
  const response = await store.jupyterStore.doShutdown();
  console.log(response[0].message);
  showNotif(response[0].status, response[0].message);
};

const doStart = async () => {
  const response = await store.jupyterStore.doStart();
  console.log(response[0].message);
  showNotif(response[0].status, response[0].message);
};

const handlePower = () => {
  console.log(getJupyterUser.value.server);

  if (getJupyterUser.value.server == null) {
    doStart();
  }

  if (getJupyterUser.value.servers[""].ready) {
    doShutdown();
  } else {
    doStart();
  }
};

onMounted(async () => {
  await store.jupyterStore.checkConnection();
});

const navigateToApp = () => {
  window.open("https://jupyter.apps.unej.ac.id", "_blank");
};

const navigateToNotebook = () => {
  window.open("https://hpc.uptti.unej.ac.id", "_blank");
};
</script>

<style scoped>
.pa-4 {
  padding: 1.5rem;
}
</style>
