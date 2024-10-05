<template>
    <div id="card">
        <slot></slot>
    </div>
    <!--card-->
</template>

<script>
export default {
    name: 'Card',
};
</script>

<style lang="sass" scoped>
  @import '@/assets/sass/main.sass' // Usando o alias definido

  #card
    border-radius: 0.625rem
    background: $branco2
    box-shadow: 0px 4px 3.5px -1px rgba(0,0,0,0.75)

    padding: 0.625rem 0.625rem 1.25rem 0.625rem
</style>

