// src/store/modules/index.js

import { useAuthStores } from './authStore'
import { useOverlayStores } from './overlayStore'
import { usePlanStores } from './planStore'
import {useJupyterStores} from './jupyterStore'
import {useNotebookStores} from './notebookStore'
import { useNotificationStores } from './notificationStore'
import { useGroupStores } from './groupStore'
import { useLabStores } from './labStore'

// Impor modul-modul lain jika ada

export function useStore() {
  return {
    authStore:useAuthStores(),
    overlayStore:useOverlayStores(),
    planStore:usePlanStores(),
    jupyterStore:useJupyterStores(),
    notebookStore:useNotebookStores(),
    notificationStore:useNotificationStores(),
    groupStore:useGroupStores(),
    labStore:useLabStores(),
    // Masukkan modul-modul lain di sini jika ada
  }
}
