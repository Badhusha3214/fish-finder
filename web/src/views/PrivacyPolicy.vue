<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <router-link to="/" class="fixed top-6 left-6 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
      <ArrowLeftIcon class="w-6 h-6 text-blue-800" />
    </router-link>
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <!-- Header -->
          <h1 class="text-4xl font-bold text-blue-900 mb-4">Privacy Policy</h1>
          <p class="text-gray-600 mb-8">Last updated: December 26, 2024</p>
  
          <!-- Introduction -->
          <div class="prose prose-blue max-w-none">
            <p class="text-gray-700 mb-6">
              At Meenmozhi, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we handle the limited data we collect when you choose to contact us or provide suggestions.
            </p>
  
            <!-- Data Collection Section -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-blue-800 mb-6">Information We Collect</h2>
              
              <div class="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 class="text-xl font-semibold text-blue-700 mb-4">Contact Form Data</h3>
                <p class="text-gray-700 mb-4">
                  We only collect personal information when you voluntarily provide it to us through our contact form. This includes:
                </p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Your name (when you choose to provide it)</li>
                  <li>Your email address (for responding to your message)</li>
                  <li>Any message content you choose to share</li>
                </ul>
              </div>
  
              <div class="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 class="text-xl font-semibold text-blue-700 mb-4">Suggestions and Feedback</h3>
                <p class="text-gray-700 mb-4">
                  When you submit suggestions or feedback, we may collect:
                </p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Your name (optional)</li>
                  <li>Email address (if you want us to follow up)</li>
                  <li>Your suggestion or feedback content</li>
                </ul>
              </div>
            </section>
  
            <!-- How We Use Information -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-blue-800 mb-6">How We Use Your Information</h2>
              <div class="bg-blue-50 p-6 rounded-lg">
                <p class="text-gray-700 mb-4">We use the information you provide solely for:</p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Responding to your inquiries or messages</li>
                  <li>Addressing your suggestions or feedback</li>
                  <li>Improving our application based on your feedback</li>
                </ul>
                <p class="text-gray-700 mt-4">
                  We do not use your information for marketing purposes or share it with third parties.
                </p>
              </div>
            </section>
  
            <!-- Data Retention -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-blue-800 mb-6">Data Retention</h2>
              <div class="bg-blue-50 p-6 rounded-lg">
                <p class="text-gray-700">
                  We retain your contact information and message content only for the duration necessary to address your inquiry or implement your suggestion. Once the purpose is fulfilled, we securely delete your personal information.
                </p>
              </div>
            </section>
  
            <!-- Security Section -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-blue-800 mb-6">Security of Your Information</h2>
              <div class="bg-blue-50 p-6 rounded-lg">
                <p class="text-gray-700">
                  We implement appropriate security measures to protect the limited personal information you provide through our contact and suggestion forms. Your data is accessed only by authorized personnel for the specific purpose of addressing your communication.
                </p>
              </div>
            </section>
  
            <!-- Your Rights -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-blue-800 mb-6">Your Rights</h2>
              <div class="bg-blue-50 p-6 rounded-lg">
                <p class="text-gray-700 mb-4">You have the right to:</p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Request access to your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Withdraw your consent at any time</li>
                </ul>
              </div>
            </section>
  
            <!-- Contact Section -->
            <section class="mb-12">
              <h2 class="text-2xl font-bold text-blue-800 mb-6">Contact Us</h2>
              <p class="text-gray-700 mb-4">If you have any questions about this Privacy Policy or how we handle your information, please contact us:</p>
              <div class="bg-blue-50 p-6 rounded-lg">
                <ul class="space-y-4">
                  <li class="flex items-center">
                    <MailIcon class="w-5 h-5 text-blue-600 mr-3" />
                    <a href="mailto:meenmozhiofficial@gmail.com" class="text-blue-600 hover:text-blue-800">
                      meenmozhiofficial@gmail.com
                    </a>
                  </li>
                  <li class="flex items-center">
                    <PhoneIcon class="w-5 h-5 text-blue-600 mr-3" />
                    <a href="tel:8281571028" class="text-blue-600 hover:text-blue-800">
                      8281571028
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { MailIcon, PhoneIcon, ArrowLeftIcon } from 'lucide-vue-next'
  
  </script>
  
  <style>
  .prose h2 {
    @apply text-2xl font-bold text-blue-800 mb-6;
  }
  
  .prose h3 {
    @apply text-xl font-semibold text-blue-700 mb-4;
  }
  
  .prose h4 {
    @apply text-lg font-semibold text-blue-800 mb-3;
  }
  
  .prose p {
    @apply text-gray-700 mb-4;
  }
  
  .prose ul {
    @apply space-y-2 mb-6;
  }
  
  .prose li {
    @apply text-gray-700;
  }
  </style>