<template>
  <section id="login-container">
    <div id="login-avatar"></div>
    <div id="line"></div>

    <form id="login-form" @submit.prevent="handleSubmit">
      <input type="text" v-model="username" placeholder="Digite seu usuário..." @input="clearCustomError('text')" />
      <input type="password" v-model="password" placeholder="Digite sua senha..." @input="clearCustomError('password')" />

      <button type="submit">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.05267 15.0001C4.05291 14.735 4.15842 14.4808 4.34601 14.2934L9.46067 9.17876C9.61548 9.02399 9.73829 8.84024 9.82208 8.638C9.90586 8.43576 9.94898 8.219 9.94898 8.00009C9.94898 7.78119 9.90586 7.56442 9.82208 7.36219C9.73829 7.15995 9.61548 6.9762 9.46067 6.82143L4.35267 1.71009C4.17052 1.52149 4.06972 1.26889 4.072 1.00669C4.07428 0.744495 4.17945 0.493682 4.36485 0.308274C4.55026 0.122866 4.80108 0.0176971 5.06327 0.0154187C5.32547 0.0131402 5.57807 0.113935 5.76667 0.296093L10.8747 5.40343C11.5615 6.0916 11.9472 7.02416 11.9472 7.99643C11.9472 8.9687 11.5615 9.90125 10.8747 10.5894L5.76001 15.7041C5.62035 15.8438 5.44244 15.9391 5.2487 15.9778C5.05497 16.0165 4.85411 15.997 4.67147 15.9217C4.48882 15.8464 4.33257 15.7187 4.22245 15.5546C4.11232 15.3906 4.05324 15.1977 4.05267 15.0001V15.0001Z"
            fill="currentColor" />
        </svg>
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '@/api/auth';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']), // Mapeia a ação de login do Vuex
    clearCustomError(type) {
      const input = document.querySelector(`input[type="${type}"]`);
      input.setCustomValidity(''); // Limpa a mensagem de erro
    },
    async handleSubmit() {
      const usernameInput = document.querySelector('input[type="text"]');
      const passwordInput = document.querySelector('input[type="password"]');

      // Verifica se os campos estão vazios e define a mensagem de erro personalizada
      if (!this.username || !this.password) {
        if (!this.username) {
          usernameInput.setCustomValidity('Por favor, digite seu usuário.');
        } else {
          usernameInput.setCustomValidity('');
        }

        if (!this.password) {
          passwordInput.setCustomValidity('Por favor, digite sua senha.');
        } else {
          passwordInput.setCustomValidity('');
        }

        // Impede o envio se houver campos não preenchidos
        return;
      }

      const isValidUser = this.username === 'Ricardo' && this.password === '123';
      const credentials = {
        username: this.username,
        password: this.password
      };

      //const data = await login(credentials);
      //console.log(data);

      if (isValidUser) {
        this.login(); // Chama a ação de login do Vuex
        this.$router.push('/registros-pendentes'); // Redireciona para outra página
      } else {
        alert('Usuário ou senha incorretos');
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass'

#login-container
  background-color: $azul3
  @include centralizar() 
  flex-direction: column
  height: 100vh 

  #login-avatar
    width: 12.5rem
    height: 12.5rem
    border-radius: 50%
    background: $vermelho
  #line
    height: 1px
    width: 60%
    margin-top: 56px
    background-color: $branco

  #login-form
    margin-top: 110px
    @include centralizar()
    flex-direction: column
    gap: 78px
    width: 80%

    input[type="text"], input[type="password"]
      font-family: 'Inter', sans-serif
      width: 60%
      height: 3.75rem
      border: 0
      border-radius: 30px
      padding-left: 22px
      transition: outline, box-shadow 0.1s ease-out

      &::placeholder
        @include placeholder-styles

      &:focus
        box-shadow: 0 0 0 4px $branco
    button
      width: 140px
      height: 24px
      border: 0
      border-radius: 5px
      cursor: pointer
      background-color: $branco
      transition: 0.1s ease-out

      &:hover
        width: calc(140px + 10px)

      svg
        color: $preto

@media screen and (max-width: 768px)
  #login-container
    #login-avatar
      width: 10rem
      height: 10rem
</style>
