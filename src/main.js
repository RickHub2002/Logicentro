import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/assets/sass/main.sass';
import router from '@/router';

const app = createApp(App); // Cria a instância do aplicativo

app.use(router); // Usa o Vue Router
app.use(createPinia());
app.mount('#app'); // Monta a instância do aplicativo no elemento com id "app"


