import { defineStore } from 'pinia'
import { useJupyterStores } from './jupyterStore';
import { useNotebookStores } from './notebookStore';
import axios from 'axios';
import  router from '@/router'

export const useOverlayStores = defineStore('overlayStore', {
  state: () => ({
    overlay: false,
    message:'',
    type:''
   

  }),
  actions: {
    toggleOverlay(type,message){
        this.overlay = !this.overlay
        this.type=type
        this.message=message
    },
   async closeOverlay(){
      const jupyter = useJupyterStores();
      const notebook = useNotebookStores();
      this.overlay = false

        await jupyter.fetchUser()
        await notebook.fetchNotebook()
  
  }
    

  },
  getters: {
    isOverlayActive() {
      return this.overlay
    },
    getMessage(){
      return this.message
    },
    getType() {
      return this.type
    }

  },
  persist:true
})
