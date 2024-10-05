import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/sass/main.sass';
import router from './router';

const app = createApp(App); // Cria a instância do aplicativo

app.use(router); // Usa o Vue Router
app.mount('#app'); // Monta a instância do aplicativo no elemento com id "app"
