<template>
  <div>
    <!-- Conditional rendering based on the getIp prop -->
    <div v-if="getIp">
      {{ isIpInRange(ip) ? "Connect" : "Disconnect" }}
    </div>
    <v-chip
      v-else
      :prepend-icon="mobile ? 'fa-duotone fa-mobile' : 'fa-duotone fa-laptop'"
      variant="tonal"
      :color="isIpInRange(ip) ? 'success' : 'red'"
    >
      {{ ip || "Fetching IP..." }}
    </v-chip>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
// Subnet pertama
const SUBNET1 = "10.251.0.0/17";
// Subnet kedua
const SUBNET2 = "10.6.93.0/24";

// IP dari respons API
const ip = ref(null);

const props = defineProps({
  getIp: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  status: Boolean,
  description: String,
});

// Fungsi untuk memeriksa apakah IP berada dalam salah satu subnet
function isIpInRange(ip) {
  if (!ip) return false; // Jika IP belum ada, langsung kembalikan false.

  return checkIpInSubnet(ip, SUBNET1) || checkIpInSubnet(ip, SUBNET2);
}

// Fungsi untuk memeriksa apakah IP berada di dalam subnet tertentu
function checkIpInSubnet(ip, subnet) {
  const [subnetIp, maskLength] = subnet.split("/");
  const subnetIpBinary = ipToBinary(subnetIp);
  const mask = parseInt(maskLength, 10);
  const ipBinary = ipToBinary(ip);

  return ipBinary.substring(0, mask) === subnetIpBinary.substring(0, mask);
}

// Mengubah IP menjadi format biner
function ipToBinary(ip) {
  return ip
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("");
}

// Memanggil API untuk mendapatkan IP klien
onMounted(async () => {
  try {
    const response = await axios.get("https://insight.hpc.apps.unej.ac.id/");
    ip.value = response.data.clientIp;
  } catch (error) {
    console.error("Error fetching IP:", error);
  }
});
</script>
