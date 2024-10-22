import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/sass/main.sass';
import router from '@/router';
import store from './store';

const app = createApp(App); // Cria a instância do aplicativo

app.use(router); // Usa o Vue Router
app.use(store); // Usa o Vuex Store
app.mount('#app'); // Monta a instância do aplicativo no elemento com id "app"
