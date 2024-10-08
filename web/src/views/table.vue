<template>
  <DashboardLayout>
    <div class="min-h-screen bg-white rounded-lg">
      <h1 class="text-2xl sm:text-3xl font-bold sm:mb-6 text-btn p-4">
        List your fish
      </h1>
      <!-- Error Alert -->
      <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
        <button @click="error = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>

      <!-- Success Alert -->
      <div v-if="successMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative"
        role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">{{ successMessage }}</span>
        <button @click="successMessage = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>

      <template v-if="loading">
        <h1 class="text-xl font-bold p-5 text-gray-500">Items are loading</h1>
        <Loader />
      </template>
      <div v-else class="container mx-auto p-4 sm:p-6">
        <div
          class="mb-4 bg-btn p-5 rounded-lg bg-opacity-10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <input v-model="searchTerm" type="text" placeholder="Search..."
            class="p-2 px-4 border border-btn rounded w-full sm:w-auto" />
          <button @click="showModal = true"
            class="bg-btn text-white px-4 py-2 rounded-lg hover:bg-btnh transition w-full sm:w-auto">
            Add Entry
          </button>
        </div>
        <div class="overflow-x-auto rounded-lg">
          <table class="w-full bg-white shadow-md rounded">
            <thead class="bg-btn text-white uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-4 text-left">Scientific Name</th>
                <th class="py-3 px-4 text-left hidden sm:table-cell">
                  Vernacular Names
                </th>
                <th class="py-3 px-4 text-center">Images</th>
                <th class="py-3 px-4 text-left hidden md:table-cell">
                  Description
                </th>
                <th class="py-3 px-4 text-center hidden lg:table-cell">
                  External Link
                </th>
                <th class="py-3 px-4 text-center">Category</th>
                <th class="py-3 px-4 text-center">Created by</th>
                <th class="py-3 px-4 text-center">Updated by</th>
                <th class="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-black bg-btn bg-opacity-10 text-sm font-light">
              <tr v-for="(entry, index) in filteredEntries" :key="entry.item_id"
                class="odd:bg-white hover:bg-btn hover:bg-opacity-30">
                <td class="py-3 px-4 text-left">
                  <div class="font-medium">{{ entry.scientificName }}</div>
                </td>
                <td class="py-3 px-4 text-left hidden sm:table-cell">
                  <table class="min-w-full divide-y divide-gray-200">
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(vernacularName, index) in entry.vernacularNames" :key="index" class="text-xs">
                        <td class="py-1 pr-2 font-medium text-gray-600">
                          {{ vernacularName.place }}:
                        </td>
                        <td class="py-1">{{ vernacularName.name }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td class="py-3 px-4 text-center">
                  <div class="flex justify-center space-x-2">
                    <img v-for="(img, imgIndex) in entry.images.slice(0, 1)" :key="imgIndex" :src="img"
                      :alt="`${entry.scientificName} ${imgIndex + 1}`" class="w-12 h-12 rounded-full" />
                  </div>
                </td>
                <td class="py-3 px-4 text-left hidden md:table-cell">
                  {{ entry.description.slice(0, 50) }}...
                </td>
                <td class="py-3 px-4 text-center hidden lg:table-cell">
                  <a :href="entry.externalLink" target="_blank" class="hover:underline">Link</a>
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.category }}
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.created_by }}
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.updated_by }}
                </td>
                <td class="py-3 px-4 text-center">
                  <div class="flex item-center justify-center">
                    <button @click="editEntry(index)" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button @click="deleteEntry(index)" class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4">
        <div class="relative mx-auto p-8 border border-gray-300 w-full max-w-3xl shadow-lg rounded-lg my-8 bg-white">
          <h3 class="text-3xl font-bold mb-6 text-black">
            {{ editIndex === null ? "Add New Entry" : "Edit Entry" }}
          </h3>
          <form @submit.prevent="submitForm" class="space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div class="space-y-5">
              <div class="flex space-x-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="commonName">Common Name</label>
                  <input v-model="formData.common_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    id="commonName" type="text" placeholder="Common Name" required />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="scientificName">Scientific Name</label>
                  <input v-model="formData.scientific_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    id="scientificName" type="text" placeholder="Scientific Name" required />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700" for="description">Description</label>
                <textarea v-model="formData.description"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                  id="description" placeholder="Description" rows="4" required></textarea>
              </div>

              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700">Vernacular Names</label>
                <button @click="addVernacularName" type="button"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Add Vernacular Name
                </button>
              </div>
              <div class="space-y-2">
                <div v-for="(name, index) in vernacularNames" :key="index" class="flex space-x-2">
                  <select v-model="name.place"
                    class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    required>
                    <option value="">Select place</option>
                    <option v-for="place in keralaPlaces" :key="place" :value="place">
                      {{ place }}
                    </option>
                  </select>
                  <input v-model="name.name"
                    class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    type="text" placeholder="Name" required />
                  <button @click="removeVernacularName(index)" type="button"
                    class="p-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex space-x-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="category">Category</label>
                  <select v-model="formData.category"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    id="category" required>
                    <option value="">Select category</option>
                    <option value="brackish">Brackish</option>
                    <option value="freshwater">Freshwater</option>
                    <option value="marine">Marine</option>
                  </select>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="moreInfo">More Info</label>
                  <input v-model="formData.more_info"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                    id="moreInfo" type="url" placeholder="https://example.com" />
                </div>
              </div>

              <div class="flex space-x-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="image">Image</label>
                  <input @change="handleFileUpload($event, 'image')"
                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    id="image" type="file" accept="image/*" :required="editIndex === null" />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="diagram">Diagram</label>
                  <input @change="handleFileUpload($event, 'diagram')"
                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    id="diagram" type="file" accept="image/*" />
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
              <button @click="closeModal" type="button"
                class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Cancel
              </button>
              <button type="submit"
                class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <span v-if="!loading">{{
                  editIndex === null ? "Submit" : "Update"
                }}</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Loading...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Pagination Component -->
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || pageLoading" :class="{
            'cursor-not-allowed opacity-50': currentPage === 1 || pageLoading,
          }"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span v-if="!pageLoading">Previous</span>
            <span v-else class="flex items-center space-x-2">
              <svg class="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </span>
          </button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages || pageLoading" :class="{
            'cursor-not-allowed opacity-50':
              currentPage === totalPages || pageLoading,
          }"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span v-if="!pageLoading">Next</span>
            <span v-else class="flex items-center space-x-2">
              <svg class="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </span>
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700" v-if="!pageLoading">
              Showing
              <span class="font-medium">{{
                (currentPage - 1) * itemsPerPage + 1
              }}</span>
              to
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, total)
              }}</span>
              of
              <span class="font-medium">{{ total }}</span>
              results
            </p>
            <p class="text-sm text-gray-700" v-else>Loading...</p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || pageLoading" :class="{
                'cursor-not-allowed opacity-50':
                  currentPage === 1 || pageLoading,
              }"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <template v-for="page in displayedPages" :key="page">
                <button v-if="page !== '...'" @click="changePage(page)" :disabled="pageLoading" :class="[
                  page === currentPage
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-900',
                  pageLoading
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-50',
                ]" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20">
                  <span v-if="!pageLoading || page !== currentPage">{{
                    page
                  }}</span>
                  <svg v-else class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </button>
                <span v-else class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">
                  ...
                </span>
              </template>
              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages || pageLoading" :class="{
                'cursor-not-allowed opacity-50':
                  currentPage === totalPages || pageLoading,
              }"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
                </svg>  
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Loader from "@/components/Loader.vue";
import { getitem, additem, deleteitem, edititem } from "@/API/index";

export default {
  name: "ItemTable",
  components: {
    DashboardLayout,
    Loader,
  },
  data() {
    return {
      entries: [],
      showModal: false,
      loading: true,
      error: null,
      successMessage: null,
      vernacularNames: [{ name: "", place: "" }],
      formData: {
        common_name: "",
        scientific_name: "",
        description: "",
        category: "",
        more_info: "",
        images: [{ image: null, diagram: null }],
      },
      editIndex: null,
      currentItemId: null,
      searchTerm: "",
      keralaPlaces: [
        "Thiruvananthapuram",
        "Kollam",
        "Pathanamthitta",
        "Alappuzha",
        "Kottayam",
        "Idukki",
        "Ernakulam",
        "Thrissur",
        "Palakkad",
        "Malappuram",
        "Kozhikode",
        "Wayanad",
        "Kannur",
        "Kasaragod",
      ],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
      total: 0,
      loading: false,
      pageLoading: false,
    };
  },
  computed: {
    filteredEntries() {
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.entries.filter(
        (entry) =>
          entry.scientificName.toLowerCase().includes(searchTermLower) ||
          entry.description.toLowerCase().includes(searchTermLower) ||
          Object.entries(entry.vernacularNames).some(
            ([place, name]) =>
              name.toLowerCase().includes(searchTermLower) ||
              place.toLowerCase().includes(searchTermLower)
          ) ||
          entry.category.toLowerCase().includes(searchTermLower)
      );
    },
    displayedPages() {
      const range = [];
      const rangeWithDots = [];
      const delta = 2;

      for (
        let i = Math.max(2, this.currentPage - delta);
        i <= Math.min(this.totalPages - 1, this.currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (range[0] > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (range[range.length - 1] < this.totalPages - 1) {
        rangeWithDots.push("...", this.totalPages);
      } else if (range[range.length - 1] !== this.totalPages) {
        rangeWithDots.push(this.totalPages);
      }

      return rangeWithDots;
    },
  },
  async created() {
    try {
      await this.initializeData();
    } catch (error) {
      console.error("Error initializing data:", error);
      this.showError("Failed to initialize data. Please try again later.");
    }
  },
  methods: {
    async initializeData() {
      this.loading = true;
      try {
        await this.getItems();
      } catch (error) {
        console.error("Error in initializeData:", error);
        this.showError("Failed to initialize data. Please try again later.");
      } finally {
        this.loading = false;
      }
    },
    formatVernacularNames(entry) {
      if (!entry.vernacular_names) return [];

      // Handle both string and array cases
      let names = entry.vernacular_names;
      if (typeof names === 'string') {
        try {
          names = JSON.parse(names);
        } catch (error) {
          console.error('Error parsing vernacular names:', error);
          return [];
        }
      }

      // Ensure it's an array and has the correct structure
      if (Array.isArray(names)) {
        return names.map(({ place, name }) => ({
          place,
          name
        }));
      }

      return [];
    },

    async getItems() {
      try {
        const res = await getitem(this.currentPage, this.itemsPerPage);
        const meta = res.data.data.meta;

        this.currentPage = meta.page;
        this.itemsPerPage = meta.limit;
        this.totalPages = meta.pages;
        this.total = meta.total;

        const data = res.data.data.items;

        this.entries = data.map((item) => {
          // Replace your existing vernacular names parsing with the new method
          const vernacularNames = this.formatVernacularNames(item);

          return {
            item_id: item.item_id,
            scientificName: item.scientific_name,
            common_name: item.common_name,
            vernacularNames: vernacularNames, // Use the formatted names
            images: item.images[0].image,
            description: item.description,
            externalLink: item.more_info || "",
            category: item.category || "Not specified",
            created_by: item.created_by,
            updated_by: item.updated_by,
          };
        });
      } catch (error) {
        console.error("Error fetching items:", error);
        this.showError("Failed to fetch items. Please try again later.");
        throw error;
      }
    },

    async changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages && !this.pageLoading) {
        this.pageLoading = true;
        try {
          this.currentPage = newPage;
          await this.getItems();
        } catch (error) {
          console.error("Error changing page:", error);
          this.showError("Failed to load page. Please try again.");
        } finally {
          this.pageLoading = false;
        }
      }
    },
    editEntry(index) {
      this.editIndex = index;
      const entry = this.filteredEntries[index];
      this.currentItemId = entry.item_id;

      // Populate basic form fields
      this.formData = {
        common_name: entry.common_name || '',
        scientific_name: entry.scientificName || '',
        description: entry.description || '',
        category: entry.category === 'Not specified' ? '' : entry.category,
        more_info: entry.externalLink || '',
        images: [{ image: null, diagram: null }], // Keep null for file inputs
      };

      // Handle vernacular names
      if (entry.vernacularNames && Array.isArray(entry.vernacularNames)) {
        // If vernacularNames is already in the correct format
        this.vernacularNames = entry.vernacularNames.map(name => ({
          name: name.name || '',
          place: name.place || ''
        }));
      } else if (typeof entry.vernacularNames === 'object') {
        // If vernacularNames is an object
        this.vernacularNames = Object.entries(entry.vernacularNames).map(([place, name]) => ({
          place,
          name
        }));
      } else {
        // Fallback to empty vernacular name
        this.vernacularNames = [{ name: '', place: '' }];
      }

      // Ensure at least one vernacular name entry exists
      if (this.vernacularNames.length === 0) {
        this.vernacularNames = [{ name: '', place: '' }];
      }

      // Show the modal with populated data
      this.showModal = true;
    },

    async submitForm() {
      try {
        this.loading = true;
        const formData = new FormData();

        // Append form data
        for (const key in this.formData) {
          if (key === "images") {
            if (this.formData.images[0].image) {
              formData.append("image", this.formData.images[0].image);
            }
            if (this.formData.images[0].diagram) {
              formData.append("diagram", this.formData.images[0].diagram);
            }
          } else {
            formData.append(key, this.formData[key]);
          }
        }

        this.vernacularNames.forEach((item, index) => {
          formData.append(`vernacular_names[${index}][place]`, item.place);
          formData.append(`vernacular_names[${index}][name]`, item.name);
        });

        let response;
        if (this.editIndex === null) {
          response = await additem(formData);
          this.showSuccess("Item added successfully!");
        } else {
          if (!this.currentItemId) {
            throw new Error("No item ID found for update");
          }
          response = await edititem(this.currentItemId, formData);
          this.showSuccess("Item updated successfully!");
        }

        await this.getItems();
        this.closeModal();
      } catch (error) {
        console.error("Error submitting form:", error);
        this.showError(`Failed to submit form: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },
    async deleteEntry(index) {
      if (confirm("Are you sure you want to delete this entry?")) {
        try {
          this.loading = true;
          const entryToDelete = this.entries[index];
          await deleteitem(entryToDelete.item_id);
          this.showSuccess("Item deleted successfully!");
          await this.getItems();
        } catch (error) {
          console.error("Failed to delete entry:", error);
          this.showError("Failed to delete entry. Please try again later.");
        } finally {
          this.loading = false;
        }
      }
    },

    showError(message) {
      this.error = message;
      setTimeout(() => {
        this.error = null;
      }, 5000);
    },
    showSuccess(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, 5000);
    },
    closeModal() {
      this.showModal = false;
      this.editIndex = null;
      this.currentItemId = null;
      this.formData = {
        common_name: "",
        scientific_name: "",
        description: "",
        category: "",
        more_info: "",
        images: [{ image: null, diagram: null }],
      };
      this.vernacularNames = [{ name: "", place: "" }];
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      if (file) {
        this.formData.images[0][type] = file;
      }
    },
    addVernacularName() {
      this.vernacularNames.push({ name: "", place: "" });
    },
    removeVernacularName(index) {
      this.vernacularNames.splice(index, 1);
    },
  },
  watch: {
    loading(newVal) {
      if (!newVal) {
        // Ensure pageLoading is also reset when main loading is done
        this.pageLoading = false;
      }
    },
  },
};
</script>
