<template>
  <div class="text-center">
    <v-btn-group
      color="blue"
      variant="tonal"
      density="comfortable"
      rounded="lg"
      divided
    >
      <!-- Share Button -->
      <v-btn prepend-icon="fa-duotone fa-user-group" variant="tonal">
        <div class="text-none font-weight-regular">Share</div>

        <v-dialog activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Invite Collaborators
                </div>
                <v-btn
                  icon="fa-duotone fa-remove"
                  variant="text"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>

              <v-card-text>
                <div class="text-medium-emphasis mb-4">
                  Invite collaborators to your network and grow your
                  connections.
                </div>

                <!-- Message Input -->
                <div class="mb-2">Message (optional)</div>
                <v-textarea
                  :counter="300"
                  class="mb-2"
                  rows="2"
                  variant="outlined"
                  persistent-counter
                ></v-textarea>

                <!-- Members Select -->
                <v-select
                  clearable
                  chips
                  label="Members"
                  v-model="selectedMembers"
                  :items="membersList"
                  multiple
                  variant="solo"
                ></v-select>

                <div class="text-overline mb-2">💎 PREMIUM</div>
                <div class="text-medium-emphasis mb-1">
                  Share with unlimited people and get more insights about your
                  network. Try Premium Free for 30 days.
                </div>
                <v-btn
                  class="text-none font-weight-bold ms-n4"
                  color="primary"
                  text="Retry Premium Free"
                  variant="text"
                ></v-btn>
              </v-card-text>

              <v-divider class="mt-2"></v-divider>

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn
                  class="text-none"
                  rounded="xl"
                  text="Cancel"
                  @click="isActive.value = false"
                ></v-btn>
                <v-btn
                  class="text-none"
                  color="primary"
                  rounded="xl"
                  text="Send"
                  variant="flat"
                  @click="sendInvitation"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

      <!-- Download Button -->
      <v-btn size="small" icon>
        <v-icon icon="fa-duotone fa-arrow-down"></v-icon>
        <v-menu
          activator="parent"
          location="bottom end"
          transition="fade-transition"
        >
          <v-list density="compact" min-width="250" rounded="lg" slim>
            <v-list-item
              prepend-icon="fa-duotone fa-link"
              title="Copy link"
              link
            ></v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item min-height="24">
              <template v-slot:subtitle>
                <div class="text-caption">Shared with John + 1 more</div>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-btn-group>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from "vue";
import { storeToRefs } from "pinia";

const store = inject("store");
const { getMember } = storeToRefs(store.groupStore);
const selectedMembers = ref([]);

// Compute members list to only include id and name
const membersList = computed(() => {
  return getMember.value.map((member) => ({
    name: member.name,
  }));
});

// Fetch members on mount
onMounted(async () => {
  await store.groupStore.fetchMember();
  await store.jupyterStore.checkConnection();
});

// Send invitation function
const sendInvitation = () => {
  // Logic to handle sending the invitation
  console.log("Sending invitation to:", selectedMembers.value);
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
