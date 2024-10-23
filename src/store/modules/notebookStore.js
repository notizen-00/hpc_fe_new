import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter
import { useAuthStores } from './authStore';
import { useJupyterStores } from './jupyterStore';
import { useOverlayStores } from './overlayStore';
import { Preferences } from '@capacitor/preferences';
import { useToast } from "vue-toastification";

export const useNotebookStores = defineStore('notebookStore', {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_API_URL,
    error: '',
    snackbar: {
      show: false,
      message: '',
      color: 'red', // Warna snackbar untuk error
    },
    loading:false,
    notebook: [],
    public_notebook: [],
  }),
  actions: {

    async fetchPublicNotebook() {
         try {
        const authStore = useAuthStores();
        const token = authStore.getToken;
        const response = await axios.get(this.apiUrl + 'api/member/notebook/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          this.public_notebook = response.data;
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
    toggleLoading() {
        this.loading = !this.loading
    },
    closeLoading() {
        this.loading = false
    },
    async storeNotebook(token_share,url,nama,expires_at) {
         try {
        const authStore = useAuthStores();
        const token = authStore.getToken;
        const response = await axios.post(this.apiUrl + 'api/member/notebook',{
            url:url,
            token:token_share,
            nama:nama,
            expires_at: expires_at
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
        this.loading = false
        toast.error('Server Notebook ' + nama + ' fail to deploy')
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
  const toast = useToast();

  this.loading = true

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
        const responseStore = await this.storeNotebook(responseShare[0].token, responseShare[0].accept_url, name,responseShare[0].expires_at);
        console.log(responseStore)
        if (responseStore[0].status == 200) {
            
          toast.success('Notebook server ' + name + ' has been successfully deployed !');
          this.loading = false
          return true; 
          
        }else{
            return false;
        }
           // Successful creation, deployment, and sharing
        } else {
          this.loading = false
          toast.error('Failed to deploy !');
          
        }
      } else {
          toast.error('Failed to deploy !');
          this.loading = false
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
        this.loading =false
        toast.error("Notebook server '" + name + "' already exists !");
        return 409;
    }
    console.error('Subscription failed:', error);
    toast.error('Failed to deploy !'+error);
    this.loading = false;
    return false; // Consistent return in case of an error
  }
},

    async fetchNotebook() {
      try {
        const authStore = useAuthStores();
        const token = authStore.getToken;
        const response = await axios.get(this.apiUrl + 'api/member/notebook', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          this.notebook = response.data;
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
    getNotebook() {
      return this.notebook;
    },
    getPublicNotebook() {
      return this.public_notebook;
    },
    isLoading() {
      return this.loading;
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
