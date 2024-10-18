<template>
  <Layout>
    <section id="main-content">
      <div id="image-container">
        <img :src="imageSrc" id="imagem"/>
        <svg @click="uploadImage"  width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_261_232)">
<path d="M23.1708 26.117C22.5904 25.5362 21.9012 25.0755 21.1426 24.7612C20.3841 24.4468 19.571 24.285 18.7499 24.285C17.9288 24.285 17.1158 24.4468 16.3572 24.7612C15.5987 25.0755 14.9095 25.5362 14.3291 26.117L0.0791016 40.367C0.271728 42.9797 1.44349 45.4234 3.36009 47.2095C5.27668 48.9955 7.79683 49.9922 10.4166 50.0004H39.5833C41.6244 50 43.6198 49.3962 45.3187 48.265L23.1708 26.117Z" fill="black"/>
<path d="M37.4997 16.6673C39.8008 16.6673 41.6663 14.8018 41.6663 12.5006C41.6663 10.1995 39.8008 8.33398 37.4997 8.33398C35.1985 8.33398 33.333 10.1995 33.333 12.5006C33.333 14.8018 35.1985 16.6673 37.4997 16.6673Z" fill="black"/>
<path d="M39.5833 0H10.4167C7.65501 0.00330804 5.00741 1.10184 3.05462 3.05463C1.10184 5.00741 0.00330804 7.65501 0 10.4167L0 34.5542L11.3833 23.1708C12.3506 22.2033 13.4991 21.4357 14.7631 20.9121C16.0271 20.3884 17.3818 20.1189 18.75 20.1189C20.1182 20.1189 21.4729 20.3884 22.7369 20.9121C24.0009 21.4357 25.1494 22.2033 26.1167 23.1708L48.2646 45.3188C49.3958 43.6198 49.9996 41.6244 50 39.5833V10.4167C49.9967 7.65501 48.8982 5.00741 46.9454 3.05463C44.9926 1.10184 42.345 0.00330804 39.5833 0V0ZM37.5 20.8333C35.8518 20.8333 34.2407 20.3446 32.8702 19.4289C31.4998 18.5132 30.4317 17.2117 29.801 15.689C29.1703 14.1663 29.0052 12.4908 29.3268 10.8742C29.6483 9.25774 30.442 7.77288 31.6074 6.60744C32.7729 5.44201 34.2577 4.64833 35.8742 4.32679C37.4908 4.00525 39.1663 4.17027 40.689 4.801C42.2117 5.43173 43.5132 6.49984 44.4289 7.87025C45.3446 9.24066 45.8333 10.8518 45.8333 12.5C45.8333 14.7101 44.9554 16.8298 43.3926 18.3926C41.8298 19.9554 39.7101 20.8333 37.5 20.8333Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_261_232">
<rect width="50" height="50" fill="white"/>
</clipPath>
</defs>
        </svg>
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>
      <!--image-container-->
      <form id="form-container">
        <div class="input-group">
            <label for="nome-usuario">Nome:</label>
            <input type="text" id="nome-usuario" placeholder="@Usuário" />
        </div>
        <div class="input-group">
            <label for="senha-atual">Senha atual:</label>
            <input type="password" id="senha-atual" placeholder="Digite a senha atual..." />
        </div>
        <div class="input-group">
            <label for="nova-senha">Nova senha:</label>
            <input type="password" id="nova-senha" placeholder="Digite a nova senha..." />
        </div>
        <button type="submit">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.05267 15.0001C4.05291 14.735 4.15842 14.4808 4.34601 14.2934L9.46067 9.17876C9.61548 9.02399 9.73829 8.84024 9.82208 8.638C9.90586 8.43576 9.94898 8.219 9.94898 8.00009C9.94898 7.78119 9.90586 7.56442 9.82208 7.36219C9.73829 7.15995 9.61548 6.9762 9.46067 6.82143L4.35267 1.71009C4.17052 1.52149 4.06972 1.26889 4.072 1.00669C4.07428 0.744495 4.17945 0.493682 4.36485 0.308274C4.55026 0.122866 4.80108 0.0176971 5.06327 0.0154187C5.32547 0.0131402 5.57807 0.113935 5.76667 0.296093L10.8747 5.40343C11.5615 6.0916 11.9472 7.02416 11.9472 7.99643C11.9472 8.9687 11.5615 9.90125 10.8747 10.5894L5.76001 15.7041C5.62035 15.8438 5.44244 15.9391 5.2487 15.9778C5.05497 16.0165 4.85411 15.997 4.67147 15.9217C4.48882 15.8464 4.33257 15.7187 4.22245 15.5546C4.11232 15.3906 4.05324 15.1977 4.05267 15.0001V15.0001Z" fill="currentColor"/>
          </svg>

        </button>
      </form>
      <!--form-container-->
    </section>
    <!--main-content-->
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'Perfil',
  components: {
    Layout,
  },
  data() {
    return {
      imageSrc: 'default-image-url.png', // URL da imagem padrão
    };
  },
  methods: {
    uploadImage() {
      // Dispara o clique no input de arquivo
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result; // Atualiza a imagem com o novo src
        };
        reader.readAsDataURL(file); // Lê a imagem como uma URL de dados
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido

#main-content
  @include centralizar()
  flex-direction: column
  justify-content: flex-start

  background-color:  $branco2
  border-radius: 0.625rem

  width: 100%
  max-width: 1400px
  height: 80%
  max-height: 804px

  #image-container 
    margin-top: 1.25rem

    text-align: center

    #imagem 
      display: block

      position: relative

      object-fit: cover

      background: $cinza5
      height: 226px
      width: 226px
      border-radius: 50%

    svg
      position: absolute

      cursor: pointer

      transform: translateX(100%) translateY(-450%)


  #form-container
    @include centralizar()
    flex-direction: column
    align-items: center
    gap: 1.25rem

    margin-top: 2.5rem

    width: 80%
    max-width: 616px

    .input-group
      display: flex
      flex-direction: column
      gap: 0.625rem
      width: 100%

      label
        @include label-styles
      input
        height: 30px
        padding-left: 0.313rem

        border-radius: 5px
        border: $borda-04

button
  width: 140px
  height: 24px

  border: 0
  border-radius: 5px

  cursor: pointer

  background-color: $preto

  transition: 0.1s ease-out

  &:hover
    width: calc(140px + 10px)

  svg
    color: $branco2
</style>