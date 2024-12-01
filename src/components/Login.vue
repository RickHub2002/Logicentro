<template>
  <section id="login-container">
    <div id="login-avatar"></div>
    <div id="line"></div>

    <form id="login-form" @submit.prevent="handleSubmit">
    <!-- Primeiro input -->
    <div class="input-group">
      <input
        id="username"
        type="text"
        v-model="username"
        required
        placeholder=" "
      />
      <label for="username">Digite seu usuário</label>
    </div>

    <!-- Segundo input -->
    <div class="input-group">
      <input
        id="password"
        type="password"
        v-model="password"
        required
        placeholder=" "
      />
      <label for="password">Digite sua senha</label>
    </div>

    <button type="submit" class="btn-submit">
      <span>Entrar</span>
    </button>

  </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '@/api/auth'; // Supondo que o login é uma função que faz a chamada à API

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']), // Mapeia a ação 'login' do Vuex

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

      const credentials = {
        email: this.username, // Enviar como email no back-end
        password: this.password,
      };

      try {
        const { data } = await login(credentials); // Chamada à API

        // Verifique se os tokens estão disponíveis
        if (data?.access && data?.refresh) {
          this.login(data); // Atualiza o Vuex com os dados do login
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          this.$router.push('/registros-pendentes');
        } else {
          throw new Error('Credenciais inválidas ou conta inativa.');
        }
      } catch (error) {
        console.error(error.message || error);
        alert(error.message || 'Erro ao tentar fazer login.');
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
    gap: 1.875rem
    width: 80%

    .input-group
      position: relative
      margin-bottom: 1.5rem

      input
        width: 100%
        padding: 1rem
        border: 1.5px solid #ccc
        border-radius: 8px
        background: transparent
        font-size: 1rem
        color: #fff
        outline: none
        transition: border-color 0.3s ease

        &:focus
          border-color: #1a73e8

        &:focus ~ label,
        &:not(:placeholder-shown) ~ label
          transform: translateY(-3rem) scale(0.9)
          color: #1a73e8
          padding: 0 0.2rem

      label
        position: absolute
        top: 50%
        left: 1rem
        transform: translateY(-50%)
        background: transparent
        padding: 0 0.1rem
        color: #aaa
        font-size: 1rem
        pointer-events: none
        transition: all 0.3s ease

  button
    padding: 0.8rem 1.5rem
    font-size: 1rem
    font-weight: bold
    border: 2px solid $branco
    border-radius: 8px
    background: transparent
    color: $branco
    cursor: pointer
    transition: all 0.3s ease

    &:hover
      background: $branco
      color: $azul3
      transform: scale(1.05)



@media screen and (max-width: 768px)
  #login-container
    #login-avatar
      width: 10rem
      height: 10rem
</style>