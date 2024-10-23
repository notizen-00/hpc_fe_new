import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter
import { useAuthStores } from './authStore';
import { useJupyterStores } from './jupyterStore';
import { useOverlayStores } from './overlayStore';
import { Preferences } from '@capacitor/preferences';

export const useNotificationStores = defineStore('notificationStore', {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_API_URL,
    error: '',
    snackbar: {
      show: false,
      message: '',
      color: 'red', // Warna snackbar untuk error
    },
    notification: [],
  }),
  actions: {
    async storeNotebook(token_share,url,nama) {
         try {
        const authStore = useAuthStores();
        const token = authStore.getToken;
        const response = await axios.post(this.apiUrl + 'api/member/notification',{
            url:url,
            token:token_share,
            nama:nama
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          this.notebook = response.data;
          const status = response.status;
          return [
            { 
              status: status, 
              message: 'Server Notebook ' + nama + ' Telah di Deploy' 
            }
          ];
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.snackbar.message = 'Input tidak valid. Silakan cek kembali.';
        } else {
          this.snackbar.message = 'Akun Tidak ditemukan. Silakan coba lagi.';
        }

          const status = error.response.status;
          return [
            { 
              status: status, 
              message: 'Server Notebook ' + nama + ' Gagal di Deploy'
            }
          ];
        this.snackbar.show = true;
      }
    },
    async createNotebook(name) {
  const jupyterStore = useJupyterStores();
  const overlayStore = useOverlayStores();
  const token = jupyterStore.token;

  try {
    const response = await axios.post(
      `${jupyterStore.apiUrl}hub/api/users/${name}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.status)
    // Handle the response for creating a notebook
    if (response.status === 201) {
      const responseDeploy = await jupyterStore.doDeploy(name);
      console.log(responseDeploy)
      if (responseDeploy[0].status === 201) {
        const responseShare = await jupyterStore.doShareCode(name);
        if (responseShare[0].status === 200) {
            console.log(responseShare)
        const responseStore = await this.storeNotebook(responseShare[0].token, responseShare[0].accept_url, name);
        console.log(responseStore)
        if (responseStore[0].status == 200) {
              overlayStore.toggleOverlay(200, 'Notebook server ' + name + ' telah di deploy !');
          return true; 
          
        }else{
            return false;
        }
           // Successful creation, deployment, and sharing
        } else {
          this.snackbar.message = 'Gagal membagikan kode!';
          return false;
        }
      } else {
        this.snackbar.message = 'Gagal di deploy! Terjadi kesalahan di server';
        return false;
      }
    } else if (response.status === 409) {
      console.log('Notebook already exists');
      return false;
    } else {
      this.snackbar.message = 'Terjadi kesalahan tidak terduga.';
      return false;
    }
  } catch (error) {
    if(error.response && error.response.status === 409) {
        console.log('Notebook already exists.');
        overlayStore.toggleOverlay(409, 'Nama Notebook sudah terpakai silahkan ganti nama yang lain !');
        return false;
    }
    console.error('Subscription failed:', error);
    this.snackbar.message = 'Subscription failed. Please try again.';
    this.snackbar.show = true;
    return false; // Consistent return in case of an error
  }
},
  async fetchNotification() {
     try {
        const authStore = useAuthStores();
        const token = authStore.getToken;
        const response = await axios.get(this.apiUrl + 'api/member/notification', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          this.notification = response.data;
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
    async setNotification(data) {
        this.notification = data;
    },
  },
  getters: {
    isLogin() {
      return this.login;
    },
    getNotification() {
      return this.notification;
    },
    getError() {
      return this.error;
    },
    getSnackbar() {
      return this.snackbar;
    },
    findNotebook: (state) => {
      return (notebookId) => state.notebook.find((notebook) => notebook.id === notebookId);
    },
  },
  persist: true,
});
