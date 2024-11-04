<template>
  <SearchLayout>
    <transition-group name="fade" appear tag="div" class="flex flex-col gap-2 w-full h-full">
      <div key="main-content" class="flex flex-col gap-7 w-full h-full">
        <h1 key="title" class="text-2xl text-primary uppercase font-bold text-center">{{ selectedCategory?.value }}</h1>
        
        <div key="search" class="flex items-center gap-2 border rounded-full px-3">
          <input
            type="search"
            inputmode="search"
            enterkeyhint="search"
            placeholder="Search fish..."
            class="w-full h-10 text-secondary py-2 border border-none focus:outline-none focus:ring-0"
            v-model="search"
            @input="handleSearch"
            @keyup.enter="performSearch"
          />
          
          <button 
            class="text-secondary touch-manipulation"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
            @click="performSearch"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
      
      <template v-if="isLoading && search.length > 0">
        <div key="skeleton" class="flex flex-col w-full h-full border rounded-xl py-2">
          <div v-for="n in 3" :key="n" class="px-3 py-2">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </template>
      
      <template v-else-if="suggestions.length > 0 && search.length > 0">
        <div key="suggestions" class="flex flex-col w-full h-full border rounded-xl py-2">
          <template v-for="suggestion in suggestions">
            <div
              class="flex items-center gap-2 px-3 py-2 touch-manipulation"
              @touchstart="onTouchStart"
              @touchend="onTouchEnd"
              @click="openDetailedView(suggestion?.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M8.85215 8.14238L7.1527 6.44792C7.70101 5.74938 7.99853 4.88675 7.99742 3.99871C7.99742 3.20784 7.7629 2.43473 7.32352 1.77715C6.88414 1.11956 6.25962 0.607038 5.52895 0.304386C4.79828 0.00173257 3.99428 -0.0774552 3.2186 0.0768359C2.44293 0.231127 1.73043 0.611967 1.1712 1.1712C0.611967 1.73043 0.231127 2.44293 0.0768359 3.2186C-0.0774552 3.99428 0.00173257 4.79828 0.304386 5.52895C0.607038 6.25962 1.11956 6.88414 1.77715 7.32352C2.43473 7.7629 3.20784 7.99742 3.99871 7.99742C4.88675 7.99853 5.74938 7.70101 6.44792 7.1527L8.14238 8.85215C8.18884 8.899 8.24413 8.93618 8.30504 8.96156C8.36595 8.98694 8.43128 9 8.49726 9C8.56325 9 8.62858 8.98694 8.68949 8.96156C8.7504 8.93618 8.80568 8.899 8.85215 8.85215C8.899 8.80568 8.93618 8.7504 8.96156 8.68949C8.98694 8.62858 9 8.56325 9 8.49726C9 8.43128 8.98694 8.36595 8.96156 8.30504C8.93618 8.24413 8.899 8.18884 8.85215 8.14238ZM0.99968 3.99871C0.99968 3.40556 1.17557 2.82573 1.50511 2.33254C1.83465 1.83935 2.30303 1.45496 2.85103 1.22797C3.39903 1.00098 4.00204 0.941587 4.5838 1.05731C5.16555 1.17302 5.69993 1.45865 6.11935 1.87808C6.53877 2.2975 6.8244 2.83188 6.94012 3.41363C7.05584 3.99539 6.99645 4.59839 6.76946 5.14639C6.54247 5.6944 6.15808 6.16278 5.66489 6.49232C5.1717 6.82186 4.59187 6.99775 3.99871 6.99775C3.20332 6.99775 2.4405 6.68178 1.87808 6.11935C1.31565 5.55692 0.99968 4.79411 0.99968 3.99871Z" fill="#8E8E8E"/>
              </svg>
              <span class="text-sm text-secondary">{{ suggestion.name }}</span>
            </div>
          </template>
        </div>
      </template>

      <template v-else-if="suggestions.length === 0 && search.length > 0 && !isLoading">
        <div key="no-results" class="flex flex-col w-full h-full border rounded-xl py-2">
          <div class="flex items-center gap-2 px-3 py-2 justify-center">
            <span class="text-sm text-secondary">Result not found</span>
          </div>
        </div>
      </template>
    </transition-group>
  </SearchLayout>
</template>

<script>
import { getSearchSuggestions } from '@/API/index.js'
import SearchLayout from '@/layouts/SearchLayout.vue'

export default {
  name: "SearchView",
  components: {
    SearchLayout
  },
  data() {
    return {
      debounce: null,
      category: null,
      search: "",
      suggestions: [],
      selectedCategory: null,
      categories: [
        { name: "marine", value: "Marine" },
        { name: "freshwater", value: "Fresh water" },
        { name: "brackish", value: "Brackish" }
      ],
      isLoading: false,
      minSearchLength: 1  // Minimum characters before searching
    }
  },
  mounted() {
    let category = this.$route.params.category;
    this.selectedCategory = this.categories.find(c => c.name === category);
  },
  methods: {
    async searchItem() {
      if (this.search.length < this.minSearchLength) {
        this.suggestions = [];
        return;
      }
      try {
        this.isLoading = true;
        const res = await getSearchSuggestions(this.selectedCategory?.name, this.search)
        this.suggestions = res.data
      } catch (error) {
        console.log(error)
        this.suggestions = [];
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch(event) {
      // Clear any existing timeout
      clearTimeout(this.debounce);
      
      // Set a new timeout
      this.debounce = setTimeout(() => {
        this.searchItem();
      }, 200); // Reduced debounce time for better responsiveness
    },
    openDetailedView(id) {
      this.search = ""
      window.location.href = `/item/${id}`
    },
    onTouchStart(event) {
      event.currentTarget.style.opacity = '0.6';
      event.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    },
    onTouchEnd(event) {
      event.currentTarget.style.opacity = '1';
      event.currentTarget.style.backgroundColor = 'transparent';
    },
    performSearch() {
      clearTimeout(this.debounce);
      this.searchItem();
    }
  }
};
</script>

<style scoped>
.touch-manipulation {
  touch-action: manipulation;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active:nth-child(2) {
  transition-delay: 0.1s;
}

.fade-enter-active:nth-child(3) {
  transition-delay: 0.2s;
}

.fade-enter-active:nth-child(4) {
  transition-delay: 0.3s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>