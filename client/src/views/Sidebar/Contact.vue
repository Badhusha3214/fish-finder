<template>
    <div class="flex flex-col gap-6 p-5 w-full h-full relative">
      <!-- Centered Toast Message -->
      <div v-if="toastMessage" class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div :class="['flex items-center max-w-xs p-4 text-white bg-primary rounded-lg shadow dark:text-gray-400 dark:bg-gray-800', { 'border-green-500': !isError, 'border-red-500': isError }]" role="alert">
          <div :class="['inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg', isError ? 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200' : 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200']">
            <svg v-if="!isError" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <svg v-else class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
          </div>
          <div class="ms-3 text-sm font-normal">{{ toastMessage }}</div>
        </div>
      </div>
  
      <div class="flex items-center justify-between w-full">
        <button @click="$router.go(-1)" class="flex items-center text-primary rounded-full cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
  
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl text-primary uppercase font-bold text-center">Contact Us</h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            You can share your feedback with us. <br> Happy to connect!
          </p>
          <form @submit.prevent="sendContact" class="space-y-8">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" v-model="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required>
            </div>
            <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" v-model="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" v-model="message" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." required></textarea>
            </div>
            <button type="submit" :disabled="isSubmitting" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {{ isSubmitting ? 'Sending...' : 'Send message' }}
            </button>
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { sendContact } from '@/API';
  
  export default {
    name: "Contact",
    data() {
      return {
        email: '',
        subject: '',
        message: '',
        toastMessage: '',
        isError: false,
        isSubmitting: false
      }
    },
    methods: {
      async sendContact() {
        this.isSubmitting = true;
        this.toastMessage = '';
        this.isError = false;
  
        try {
          const data = {
            email: this.email,
            subject: this.subject,
            message: this.message
          };
          
          const response = await sendContact(data);
          console.log(response);
          
          this.toastMessage = 'Message sent successfully.';
          this.resetForm();
        } catch (error) {
          console.error('Error sending contact:', error);
          this.isError = true;
          this.toastMessage = 'Failed to send message. Please try again.';
        } finally {
          this.isSubmitting = false;
          this.showToast();
        }
      },
      resetForm() {
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      showToast() {
        setTimeout(() => {
          this.toastMessage = '';
        }, 1000); // Hide toast after 5 seconds
      }
    }
  };
  </script>