<!-- LoadingSpinner.vue -->
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div class="relative w-16 h-16">
        <div class="absolute top-0 left-0 w-full h-full">
          <div 
            v-for="(dot, index) in 8" 
            :key="index"
            class="w-4 h-4 absolute rounded-full bg-gray-800"
            :class="positionClasses[index]"
            :style="{ 
              animation: 'bounce 1s infinite',
              animationDelay: `${index * 100}ms`
            }"
          ></div>
        </div>
      </div>
      <span class="ml-4 text-lg font-medium text-gray-600">Loading...</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingSpinner',
    data() {
      return {
        positionClasses: [
          'top-0 left-0 right-0 mx-auto',
          'top-[14px] right-[14px]',
          'right-0 top-0 bottom-0 my-auto',
          'bottom-[14px] right-[14px]',
          'bottom-0 left-0 right-0 mx-auto',
          'bottom-[14px] left-[14px]',
          'left-0 top-0 bottom-0 my-auto',
          'top-[14px] left-[14px]'
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  @keyframes bounce {
    0%, 100% {
      transform: scale(0.5);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
  </style>