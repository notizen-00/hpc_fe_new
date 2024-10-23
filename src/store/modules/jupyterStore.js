import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter
import { useAuthStores } from './authStore';
import { Preferences } from '@capacitor/preferences';

export const useJupyterStores = defineStore('jupyterStore', {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_JUPYTER_URL,
    info:[],
    token: import.meta.env.VITE_APP_JUPYTER_TOKEN,
    snackbar: {
      show: false,
      message: '',
      color: 'red', // Warna snackbar untuk error
    },
    jupyterUser: [],
    error:[],
    connection:true

  }),
  actions: {
    async checkConnection(){
      try {
        const response = await axios.get(this.apiUrl + 'hub/api/info', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });


        // Navigate to home on success
        if (response.status === 200) {
          this.info = response.data
          this.connection = true
        }
        console.log(response)
 
      } catch (error) {
      // Log error yang lebih detail
        this.connection = false;

        // Menggunakan error dari respons, jika ada
        if (error.response) {
          // Pastikan error adalah objek
          this.error = error.response.data
           this.connection = false;
          // this.error.code = error.response.data.status || null;

        } else {
          this.error = ['Network error or server is not reachable'];
           this.connection = false;
        }
         this.connection = false;
      }
    },  
    async doShutdown(){
      try {
        const authStore = useAuthStores()
        const response = await axios.delete(this.apiUrl + `hub/api/users/user${authStore.user.uid}/server`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Navigate to home on success
        if (response.status === 200) {
          const status = response.status;
          return [
            { 
              status: status, 
              message: 'Server ' + authStore.user.uid + ' Telah dimatikan' 
            }
          ];
        }else{
          const status = response.status;
          return [
            { 
              status: status, 
              message: 'Gagal di matikan, terjadi kesalahan di server' 
            }
          ];
        }
        


      } catch (error) {
        return [
          { 
            status: 500, 
            message: 'Gagal di matikan, terjadi kesalahan di server' 
          }
        ];
      }
    },
    
  async doShareCode(name) {
  try {
    const authStore = useAuthStores();
    const response = await axios.post(
      `${this.apiUrl}hub/api/share-codes/${name}/`,
      {
      }, // Empty object since no data is being sent in the body
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    // Navigate to home on success
    if (response.status === 200) {
      return [
        { 
          status: response.status,
          token: response.data.code,
          accept_url:response.data.accept_url, 
          expires_at:response.data.expires_at,
          message: `Server ${authStore.user.uid} telah dihidupkan!` 
        }
      ];
    } else {
      return [
        { 
          status: response.status, 
          message: 'Gagal dihidupkan, terjadi kesalahan di server' 
        }
      ];
    }
  } catch (error) {
    // Handle error
    const status = error.response ? error.response.status : 500;
    return [
      { 
        status: status, 
        message: 'Gagal dihidupkan, terjadi kesalahan: ' + (error.message || 'Unknown error') 
      }
    ];
  }
}
,
  async doStart() {
  try {
    const authStore = useAuthStores();
    const response = await axios.post(
      `${this.apiUrl}hub/api/users/user${authStore.user.uid}/servers/`,
      {}, // Empty object since no data is being sent in the body
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    // Navigate to home on success
    if (response.status === 201) {
      return [
        { 
          status: response.status, 
          message: `Server ${authStore.user.uid} telah dihidupkan!` 
        }
      ];
    } else {
      return [
        { 
          status: response.status, 
          message: 'Gagal dihidupkan, terjadi kesalahan di server' 
        }
      ];
    }
  } catch (error) {
    // Handle error
    const status = error.response ? error.response.status : 500;
    return [
      { 
        status: status, 
        message: 'Gagal dihidupkan, terjadi kesalahan: ' + (error.message || 'Unknown error') 
      }
    ];
  }
}
,
  async doDeploy(name) {
  try {
    const authStore = useAuthStores();
    const response = await axios.post(
      `${this.apiUrl}hub/api/users/${name}/servers/`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    // Navigate to home on success
    if (response.status === 201) {
      return [
        { 
          status: response.status, 
          message: `Server ${authStore.user.uid} telah dihidupkan!` 
        }
      ];
    } else {
      return [
        { 
          status: response.status, 
          message: 'Gagal dihidupkan, terjadi kesalahan di server' 
        }
      ];
    }
  } catch (error) {
    // Handle error
    const status = error.response ? error.response.status : 500;
    return [
      { 
        status: status, 
        message: 'Gagal dihidupkan, terjadi kesalahan: ' + (error.message || 'Unknown error') 
      }
    ];
  }
}
,
    async fetchInfo() {

      try {
        const response = await axios.get(this.apiUrl + 'hub/api/info', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Navigate to home on success
        if (response.status === 200) {
          this.info = response.data
        }

        return false; 
      } catch (error) {

        this.info = error
        console.log(error)
      }
    },
    async fetchUser(){
      try {
        const authStore = useAuthStores();

        const user = authStore.getUser;
        const uid = user.uid;
        const response = await axios.get(this.apiUrl + 'hub/api/users/user'+uid, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          this.jupyterUser = response.data
        }

        return false; 
      } catch (error) {
        console.error('Subscription failed:', error);
        this.snackbar.message = 'Subscription failed. Please try again.';
        this.snackbar.show = true;
      }
    },


  },
  getters: {
    isLogin() {
      return this.login;
    },
    getInfo() {
      return this.info;
    },
    getJupyterUser(){
      return this.jupyterUser;
    },
    getError() {
      return this.error;
    },
    getSnackbar() {
      return this.snackbar;
    },
    getConnection(){
      return this.connection;
    },
  },
  persist: true,
});
