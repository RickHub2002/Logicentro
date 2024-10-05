<template>
  <section id="login-container"> <!-- Contêiner para centralização -->
    <div id="login-avatar"></div>
    <div id="line"></div>
    <!--Login-avatar-->

    <form id="login-form">
      <input type="text" value="" placeholder="Digite seu usuário..." />
      <input type="password" value="" placeholder="Digite sua senha..." />
    
      <button type="submit">
        <img src="@/assets/imagens/fi-sr-angle-right.svg" />
      </button>
    </form>
    <!--login-form-->
  </section>
  <!--login-container-->
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {    
      mensagem: 'Ola'
    };
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido

#login-container
  background-color: $azul3

  @include centralizar() // Aplicando o mixin aqui
  flex-direction: column
  height: 100vh // Para centralizar verticalmente, se necessário

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
        box-shadow: 0 0 0 4px $branco// Usando box-shadow para criar um efeito de "borda"
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

@media screen and (max-width: 768px)
  #login-avatar
    width: 10rem
    height: 10rem
</style>
