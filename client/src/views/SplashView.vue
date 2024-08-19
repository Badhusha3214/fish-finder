
<template>
    
    <div class="flex flex-col relative gap-6 w-full h-full">
    
      <div class="absolute -z-10 backdrop w-screen h-screen">
        <img class="w-full h-full" src="/img/splash.png" alt="">
      </div>

      <div class="flex flex-col items-center justify-center w-screen h-screen">
        <img src="/img/white_logo.png" class="w-52 h-52" alt="logo">
      </div>

    </div>

</template>


<script>
export default {
  name: "SplashView",
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "Home" });
    }, 3000);
  },
};
</script>


<style>
  .backdrop {
    background: linear-gradient(169deg, #011235 0%, #03359B 100%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>