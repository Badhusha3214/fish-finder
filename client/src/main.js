import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { App as CapApp } from '@capacitor/app'; // Import Capacitor App plugin
import 'flowbite';

const app = createApp(App);

app.use(router);

app.mount('#app');

let firstPressDetected = false;
let pressTimer = null;

// Mobile: Handle back button press with Capacitor
CapApp.addListener('backButton', ({ canGoBack }) => {
  if (firstPressDetected) {
    console.log("Second back button press detected. Simulated exit.");
    CapApp.exitApp()
    firstPressDetected = false; // Reset the flag after the second press
  } else {
    console.log("First back button press detected.");
    router.push('/home'); // Navigate to the home route

    firstPressDetected = true; // Set flag for the first press
    pressTimer = setTimeout(() => {
      firstPressDetected = false; // Reset the flag after 1 second
    }, 1000);
  }
});
