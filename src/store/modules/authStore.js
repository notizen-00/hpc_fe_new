import { defineStore } from 'pinia'
import axios from 'axios';
import  router from '@/router'
import { Preferences } from '@capacitor/preferences';

import { useToast } from 'vue-toastification';

export const useAuthStores = defineStore('authStore', {
  state: () => ({
    login: false,
    token:'', 
    username:'',
    userId:'',
    apiUrl:import.meta.env.VITE_APP_API_URL,
    error:'',
    user:[],
    subscribe:[],
    status_subscribe:false,
    snackbar: {
      show: false,
      message: '',
      color: 'red', // Warna snackbar untuk error
    },

  }),
  actions: {
    async fetchSubscribe(value) {
      this.subscribe = value;
    },
   async doLogin(data) {
  try {
    const response = await axios.post(this.apiUrl + 'api/ldap-login', {
      username: data.username,
      password: data.password,
    });
    if (response.status === 200) {
    //   console.log(response.data);
      await Preferences.set({
        key: 'token',
        value: response.data.token,
      });
      // const { echo, loginUser } = echoModule;
      // loginUser(response.data.token);
      this.token = response.data.token
      this.user = response.data.user
      this.subscribe = response.data.subscribe
      this.status_subscribe = response.data.status
      this.login = true;
      router.push('/dashboard');
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      this.snackbar.message = 'Input tidak valid. Silakan cek kembali.';
    } else {
      console.log(error)
      this.snackbar.message = 'Akun Tidak di temukan . Silakan coba lagi.';
    }
    this.snackbar.show = true;
  }
},
 async doLogout() {
      try {
        
        const response = await axios.get(this.apiUrl + 'api/member/logout', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const toast = useToast();

        if (response.status === 200) {
          // Menghapus token dari Preferences
          await Preferences.remove({ key: 'token' });

          this.login = false;
          this.token = '';
          this.user = [];
          this.subscribe = [];
          this.status_subscribe = false;
          toast.error('Already Logout !');

          router.push('/');
        } else {
        toast.error('Logout Gagal !');
        }
      } catch (error) {
      toast.error('Logout Gagal !');
      }
    },
    

  },
  getters: {
    isLogin() {
      return this.login
    },
    getToken(){
        return this.token
    },
    getUser(){
        return this.user
    },
    getError(){
        return this.error
    },
    getSubscribe(){
        return this.subscribe
    },
    isSubscribed(){
        return this.status_subscribe
    },
     getSnackbar(){
        return this.snackbar
    },
    getUserId()
    {
        return this.userId
    },
    getUsername()
    {
      return this.username
    }

  },
  persist:true
})
