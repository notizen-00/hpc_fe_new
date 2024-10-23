<template>
  <v-parallax
    class="h-screen"
    src="https://img.freepik.com/free-vector/black-faded-gradient-background-vector-with-blue-border_53876-128309.jpg?t=st=1724911598~exp=1724915198~hmac=52ae947235fa399f3041d447a00ac015563aefaf210a616b513bf78dcf4f9510&w=1380"
  >
    <div
      class="d-flex flex-column h-screen fill-height justify-center align-center text-white"
    >
      <h1 class="text-h4 font-weight-bold mb-4">HPC</h1>
      <h1 class="text-h6 font-weight-thin">High Performance Computing</h1>
      <h1 class="text-h5 mb-10">UPATIK Universitas Jember</h1>

      <IpCheck></IpCheck>
      <div class="mt-10">
        <v-btn
          rounded="lg"
          prepend-icon="fa-duotone fa-user"
          variant="outlined"
          @click="router.push('/login')"
          size="x-large"
          block
          >Member Area</v-btn
        >
      </div>
    </div>
  </v-parallax>
</template>
<script setup>
import IpCheck from "@/components/IpCheck.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>
