<template>
    <div>
      <div v-if="!isOnline" class="network-error">
        <h1>Network Error</h1>
        <p>Please check your internet connection and try again.</p>
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
  
  <style scoped>
  .network-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fee2e2; /* Light red background */
  }
  
  .network-error h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #dc2626; /* Red text */
    margin-bottom: 1rem;
  }
  
  .network-error p {
    color: #ef4444; /* Slightly lighter red text */
  }
  </style>