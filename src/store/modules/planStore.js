import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter
import { useAuthStores } from './authStore';
import { Preferences } from '@capacitor/preferences';

export const usePlanStores = defineStore('planStore', {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_API_URL,
    error: '',
    snackbar: {
      show: false,
      message: '',
      color: 'red', // Warna snackbar untuk error
    },
    plan: [],
  }),
  actions: {
    async doSubscribe(id) {
      const authStore = useAuthStores();
      const token = authStore.getToken;
      try {
        const response = await axios.post(this.apiUrl + 'api/member/subscribe', {
          plan_id: id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Navigate to home on success
        if (response.status === 200) {
          authStore.status_subscribe = true;
          authStore.fetchSubscribe(response.data);
          return true
        }

        return false; 
      } catch (error) {
        console.error('Subscription failed:', error);
        this.snackbar.message = 'Subscription failed. Please try again.';
        this.snackbar.show = true;
      }
    },

    async fetchPlan() {
      try {
        const authStore = useAuthStores();
        const token = authStore.getToken;
        const response = await axios.get(this.apiUrl + 'api/member/plan', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          this.plan = response.data;
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.snackbar.message = 'Input tidak valid. Silakan cek kembali.';
        } else {
          this.snackbar.message = 'Akun Tidak ditemukan. Silakan coba lagi.';
        }
        this.snackbar.show = true;
      }
    },
  },
  getters: {
    isLogin() {
      return this.login;
    },
    getPlan() {
      return this.plan;
    },
    getError() {
      return this.error;
    },
    getSnackbar() {
      return this.snackbar;
    },
  },
  persist: true,
});
