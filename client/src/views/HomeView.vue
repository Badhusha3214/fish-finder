<template>
    <HomeLayout>
      <div class="flex flex-col h-full w-full">
        <div class="flex flex-col py-6 items-center justify-center">
          <img src="/img/logo.png" class="w-40 h-40" alt="logo">
        </div>
  
        <h1 class="text-xl font-bold text-primary">Choose Category</h1>
  
        <div class="w-full h-full">
          <swiper
            :slides-per-view="1"
            :loop="true"
            @slideChange="activeCategory = categories[$event.activeIndex]"
          >
            <template v-for="(category, index) in categories">
              <swiper-slide>
                <div 
                  class="relative flex flex-col mt-4 w-full h-full cursor-pointer transition-transform duration-200 hover:scale-105" 
                  @click="openPage(category)"
                  @mousedown="onMouseDown"
                  @mouseup="onMouseUp"
                >
                  <img :src="category.image" alt="">
                </div>
              </swiper-slide>
            </template>
          </swiper>
        </div>
  
        <div class="relative flex flex-col mt-4 w-full h-full">
          <button
            class="py-3 w-full mt-4 custom-search text-white text-lg font-bold rounded-full transition-all duration-200 hover:brightness-110 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
            @click="openPage(activeCategory)"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
          >
            <span>Search</span>
          </button>
  
          <div class="absolute left-0 top-0 -z-10 w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="316" height="78" viewBox="0 0 316 78" fill="none">
                        <g filter="url(#filter0_d_72_187)">
                            <path d="M5.5 46.2857C5.5 32.3208 16.8208 21 30.7857 21H124.277C136.497 21 147.804 14.5328 154 4C160.196 14.5328 171.503 21 183.723 21H285.214C299.179 21 310.5 32.3208 310.5 46.2857C310.5 60.2506 299.179 71.5714 285.214 71.5714H30.7857C16.8208 71.5714 5.5 60.2506 5.5 46.2857Z" fill="url(#paint0_linear_72_187)"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_72_187" x="0.5" y="0" width="315" height="77.5714" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="2.5"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_72_187"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_72_187" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_72_187" x1="2" y1="46.2857" x2="307" y2="46.2857" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#0A1F44"/>
                                <stop offset="1" stop-color="#194DAA"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                
            </div>

      </div>
    </HomeLayout>
  </template>
  

  
  <script>
  import HomeLayout from '@/layouts/HomeLayout.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  
  export default {
    name: "HomeView",
    components: {
      Swiper,
      SwiperSlide,
      HomeLayout
    },
    data() {
      return {
        categories: [
          {
            id: "brackish",
            title: "Brackish Water",
            description: "Brackish water fish thrive in mixed fresh- water and seawater environments.",
            image: "/img/category/brackish.png"
          },
          {
            id: "freshwater",
            title: "Fresh Water",
            description: "Freshwater fish live in rivers, lakes, and streams, adapting to low salt environments.",
            image: "/img/category/freshwater.png"
          },
          {
            id: "marine",
            title: "Marine",
            description: "Marine fish live in oceans and seas, thriving in saltwater environments.",
            image: "/img/category/marine.png"
          }
        ],
        activeCategory: null
      }
    },
    methods: {
      openPage(category) {
        window.location.href = `/${category.id}/search`;
      },
      onMouseDown(event) {
        event.currentTarget.style.transform = 'scale(0.95)';
      },
      onMouseUp(event) {
        event.currentTarget.style.transform = 'scale(1)';
      }
    }
  };
  </script>
  
  <style>
  .custom-search {
    background: linear-gradient(90deg, #0A1F44 -1.15%, #194DAA 98.85%);
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  }
  </style>