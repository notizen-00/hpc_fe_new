import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const useEcho = (token) => {
  const echo = new Echo({
    broadcaster: "pusher",
    key: "asdf",
    cluster: "mt1",
    encrypted: true,
    wsHost: "admin.hpc.apps.unej.ac.id", // Change to your domain
    wsPort: 6001,
    forceTLS: true,
    disableStats: true,
    authEndpoint: "https://admin.hpc.apps.unej.ac.id/broadcasting/auth",
    auth: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  return echo;
};
