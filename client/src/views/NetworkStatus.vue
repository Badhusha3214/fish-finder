<template>
    <div>
      <div v-if="!isOnline" class="network-error">
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <div class="mb-8">
        <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="mb-4 text-2xl font-bold text-gray-800">Oops! Network Error</h1>
      <p class="mb-8 text-gray-600">We're having trouble connecting to the server. Please check your internet connection and try again.</p>
      
    </div>
  </div>
      </div>
      <slot v-else></slot>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Network } from '@capacitor/network';
  
  export default {
    name: 'NetworkStatus',
    setup() {
      const isOnline = ref(true);
  
      const checkNetworkStatus = async () => {
        const status = await Network.getStatus();
        isOnline.value = status.connected;
      };
  
      let networkListener;
  
      onMounted(async () => {
        await checkNetworkStatus();
  
        networkListener = Network.addListener('networkStatusChange', status => {
          isOnline.value = status.connected;
        });
      });
  
      onUnmounted(() => {
        if (networkListener) {
          networkListener.remove();
        }
      });
  
      return {
        isOnline
      };
    }
  };
  </script>
  
  