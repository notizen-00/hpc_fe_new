<template>
  <div class="flex flex-col h-screen relative">
    <div class="flex justify-between p-4 text-slate-300">
      <div>
        <i class="fa-duotone fa-comment fa-1x"></i> Public Chat Group <br />
        <small class="text-slate-500">
          <span class="font-bold text-white mr-1">{{ getUserOnline }}</span>
          online user <i class="fas fa-circle fa-beat text-green"></i>
        </small>
      </div>
      <v-btn size="small" icon="fa-duotone fa-arrows-maximize"></v-btn>
    </div>

    <div
      class="flex-1 overflow-y-auto rounded-2xl bg-white p-4"
      ref="chatContainer"
    >
      <div class="flex flex-col space-y-2">
        <div
          v-for="(message, index) in getChatPublic"
          :key="index"
          class="flex"
          :class="{ 'justify-end': message.user === authStore.user.name }"
        >
          <div
            :class="
              message.user === authStore.user.name
                ? 'bg-blue-200 p-2 rounded-lg'
                : 'bg-gray-300 p-2 rounded-lg'
            "
          >
            <div class="flex justify-between">
              <p
                class="text-sm text-slate-500"
                :class="
                  message.user === authStore.user.name ? 'text-right' : ''
                "
              >
                {{ message.user }}
              </p>
            </div>
            <div class="">{{ message.message }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-900 text-white w-full">
      <v-text-field
        v-model="newMessage"
        :loading="loading"
        appendInnerIcon="fas fa-send"
        @click:append-inner="sendMessage"
        label="Type your message ..."
        @keyup.enter="sendMessage"
        class="w-full"
        rounded="lg"
      ></v-text-field>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useToast } from "vue-toastification";
import { useEcho } from "@/websocket/useEcho.js"; // Import the useEcho function
import { storeToRefs } from "pinia";

const store = inject("store");
const { getChatPublic } = storeToRefs(store.groupStore);
const loading = ref(false);
const newMessage = ref("");
const toast = useToast();
const chatContainer = ref(null); // Ref for chat container

const tokens = store.authStore.token;
const echo = useEcho(tokens); // Initialize Echo with the token

const authStore = store.authStore;

const sendMessage = async () => {
  loading.value = true;
  if (newMessage.value.trim() === "") {
    loading.value = false;
    return;
  }

  try {
    const response = await store.groupStore.sendPublicChat(newMessage.value);
    if (response === 200) {
      newMessage.value = "";
    } else {
      toast.error("Failed to send message. Please try again later.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Failed to send message. Please try again later.");
  } finally {
    loading.value = false;
  }
};
const groupChat = echo.join(`chat-groups.group-public`);
onMounted(async () => {
  groupChat
    .here((members) => {
      console.log("Current members in chat:", members);
      store.groupStore.fetchUserOnline(members.length);
    })
    .joining((member) => {
      console.log("A new member joined the chat:", member);
      store.groupStore.userOnline++;
    })
    .leaving((member) => {
      console.log("A member left the chat:", member);
      store.groupStore.userOnline--;
    })
    .listen("SendChatGroup", async (data) => {
      console.log("Received message in group chat:", data);
      store.groupStore.receiveGroupMessage(data);
      await nextTick();
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });

  // Manage connection
  echo.connector.pusher.connection.bind("state_change", (states) => {
    const { current } = states;
    if (current === "connected") {
      toast.success("Connected to dashboard");
    }
  });

  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }

  console.log("Connected to public chat");
});

onUnmounted(async () => {
  echo.leave(`chat-groups.group-public`);
  await nextTick(); // Wait for the DOM to update
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});

// Watch for changes in getChatPublic and scroll down
watch(getChatPublic, async () => {
  await nextTick(); // Wait for the DOM to update
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});

const { getUserOnline } = storeToRefs(store.groupStore);
</script>
