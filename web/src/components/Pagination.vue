<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <a 
          @click.prevent="$emit('changePage', currentPage - 1)"
          :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
          href="#" 
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a 
          @click.prevent="$emit('changePage', currentPage + 1)"
          :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
          href="#" 
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
            to
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, total) }}</span>
            of
            <span class="font-medium">{{ total }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a 
              @click.prevent="$emit('changePage', currentPage - 1)"
              :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
              href="#" 
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
              </svg>
            </a>
            <template v-for="page in displayedPages" :key="page">
              <a 
                v-if="page !== '...'"
                @click.prevent="$emit('changePage', page)"
                :class="{ 'bg-indigo-600 text-white': page === currentPage, 'text-gray-900': page !== currentPage }"
                href="#" 
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {{ page }}
              </a>
              <span v-else class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">
                ...
              </span>
            </template>
            <a 
              @click.prevent="$emit('changePage', currentPage + 1)"
              :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
              href="#" 
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    computed: {
      displayedPages() {
        const range = [];
        const rangeWithDots = [];
        const delta = 2;
  
        for (let i = Math.max(2, this.currentPage - delta); i <= Math.min(this.totalPages - 1, this.currentPage + delta); i++) {
          range.push(i);
        }
  
        if (range[0] > 2) {
          rangeWithDots.push(1, '...');
        } else {
          rangeWithDots.push(1);
        }
  
        rangeWithDots.push(...range);
  
        if (range[range.length - 1] < this.totalPages - 1) {
          rangeWithDots.push('...', this.totalPages);
        } else if (range[range.length - 1] !== this.totalPages) {
          rangeWithDots.push(this.totalPages);
        }
  
        return rangeWithDots;
      }
    }
  };
  </script>