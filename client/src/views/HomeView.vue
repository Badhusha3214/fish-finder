<template>
  <HomeLayout>
    <transition name="slide" mode="out-in">
      <div class="flex flex-col h-full w-full overflow-y-auto">
        <div class="flex flex-col py-6 items-center justify-center">
          <img src="/img/logo.png" class="w-40 h-40" alt="logo" />
        </div>

        <h1 class="text-xl font-bold text-primary">Choose Category</h1>

        <div class="w-full mt-4 relative swiper-container">
          <swiper
            :slides-per-view="1.4"
            :centered-slides="true"
            :loop="false"
            :space-between="5"
            :pagination="{ clickable: true, el: '.swiper-pagination' }"
            @slideChange="onSlideChange"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide
              v-for="(category, index) in categories"
              :key="category.id"
            >
              <div class="slide-content">
                <div
                  class="relative flex flex-col mt-4 w-full h-full touch-manipulation"
                  @click="openPage(category)"
                >
                  <img
                    :src="category.image"
                    :alt="category.title"
                    :key="category.id"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </swiper-slide>
          </swiper>
          
          <div class="swiper-pagination"></div>
        </div>
        
        <div class="relative flex flex-col w-full mt-10 mb-6">
          <button
            class="py-4 w-full mt-4  text-white text-xl font-bold rounded-full touch-manipulation active:opacity-80"
            @touchstart="onTouchStart2"
            @touchend="onTouchEnd"
            @click="openPage(activeCategory)"
          >
            <span>Search</span>
          </button>
          <div
            class="absolute left-0 top-0 -z-10 w-full h-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="316"
              height="78"
              viewBox="0 0 316 78"
              fill="none"
            >
              <g filter="url(#filter0_d_72_187)">
                <path
                  d="M5.5 46.2857C5.5 32.3208 16.8208 21 30.7857 21H124.277C136.497 21 147.804 14.5328 154 4C160.196 14.5328 171.503 21 183.723 21H285.214C299.179 21 310.5 32.3208 310.5 46.2857C310.5 60.2506 299.179 71.5714 285.214 71.5714H30.7857C16.8208 71.5714 5.5 60.2506 5.5 46.2857Z"
                  fill="url(#paint0_linear_72_187)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_72_187"
                  x="0.5"
                  y="0"
                  width="315"
                  height="77.5714"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_72_187"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_72_187"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_72_187"
                  x1="2"
                  y1="46.2857"
                  x2="307"
                  y2="46.2857"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0A1F44" />
                  <stop offset="1" stop-color="#194DAA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </HomeLayout>
</template>
  


  
  <script>

  import HomeLayout from "@/layouts/HomeLayout.vue";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination, EffectCoverflow } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/effect-coverflow";
  
  export default {
    name: "HomeView",
    components: {
      Swiper,
      SwiperSlide,
      HomeLayout,
    },
    setup() {
      return {
        modules: [Pagination, EffectCoverflow],
      };
    },
    data() {
      return {
        categories: [
          {
            id: "brackish",
            title: "Brackish Water",
            description:
              "Brackish water fish thrive in mixed fresh- water and seawater environments.",
            image: "/img/category/brackish.png",
          },
          {
            id: "freshwater",
            title: "Fresh Water",
            description:
              "Freshwater fish live in rivers, lakes, and streams, adapting to low salt environments.",
            image: "/img/category/Fresh.png",
          },
          {
            id: "marine",
            title: "Marine",
            description:
              "Marine fish live in oceans and seas, thriving in saltwater environments.",
            image: "/img/category/marine.png",
          },
        ],
        activeCategory: null,
      };
    },
    mounted() {
      this.activeCategory = this.categories[0];
    },
    methods: {
      openPage(category) {
        if (category) {
          this.$router.push({
            path: `/${category.id}/search`,
            query: { animation: 'slide' }
          });
        }
      },
      // onTouchStart(event) {
      //   event.currentTarget.style.opacity = "0.8";
      // },
      // onTouchEnd(event) {
      //   event.currentTarget.style.opacity = "1";
      // },
      // onTouchStart2(event) {
      //   event.currentTarget.style.opacity = "0";
      // },
      onSlideChange(swiper) {
        this.activeCategory = this.categories[swiper.activeIndex];
      },
    },
  };
  </script>
  
  <style scoped>
  .swiper {
    overflow: visible;
  }
  
  .swiper-slide {
    transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
  }
  
  .swiper-container {
    padding-bottom: 40px;
    overflow: hidden;
    touch-action: pan-y;
  }
  
  .swiper-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
  
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background-color: #0A1F44;
    opacity: 0.5;
    margin: 0 5px;
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }
  
  .swiper-pagination-bullet::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(10, 31, 68, 0.8) 0%, rgba(10, 31, 68, 0.3) 70%, transparent 100%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease-out;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
    transform: scale(1.5);
    box-shadow: 0 0 10px rgba(10, 31, 68, 0.5);
  }
  
  .swiper-pagination-bullet-active::before {
    animation: liquidBullet 2s infinite ease-in-out;
  }
  
  @keyframes liquidBullet {
    0%, 100% {
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  .swiper-slide-active {
    transform: scale(1.1);
    z-index: 2;
    animation: fluidPulse 2s infinite ease-in-out;
  }
  
  .swiper-slide-prev,
  .swiper-slide-next {
    transform: scale(0.9);
    opacity: 0.8;
  }
  
  .swiper-slide:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @keyframes fluidPulse {
    0% { transform: scale(1.1); }
    50% { transform: scale(1.12); }
    100% { transform: scale(1.1); }
  }
  
  .slide-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .slide-content img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .custom-search {
    background: linear-gradient(90deg, #0a1f44 -1.15%, #194daa 98.85%);
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  }
  
  .touch-manipulation {
    touch-action: manipulation;
  }
  
  /* Page transition animation */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease-out;
  }
  
  .slide-enter-from {
    transform: translateX(100%);
  }
  
  .slide-leave-to {
    transform: translateX(-100%);
  }
  
  /* Updated styles for scrolling */
  :global(html), :global(body) {
    overflow-y: auto;
    overscroll-behavior-y: contain;
    height: 100%;
  }
  
  /* Ensure the main container takes up the full height */
  :global(#app), :global(.home-layout) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  /* Allow vertical scrolling for the main content */
  .flex.flex-col.h-full.w-full {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  </style>