import { createApp } from "vue";
import mitt from "mitt";
import router from "./router.js";
import App from "./App.vue";
import "@/assets/css/index.css";

const emitter = mitt();
const app = createApp(App);

app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
