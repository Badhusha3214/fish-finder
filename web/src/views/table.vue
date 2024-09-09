<template>
  <DashboardLayout>
    <div class="min-h-screen">
      <div class="container mx-auto p-4 sm:p-6">
        <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <input v-model="searchTerm" type="text" placeholder="Search..." class="p-2 px-4 border rounded w-full sm:w-auto">
          <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition w-full sm:w-auto">Add Entry</button>
        </div>
        <div class="overflow-x-auto rounded">
          <table class="w-full bg-white shadow-md rounded">
            <thead class="bg-gray-700 text-white uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-4 text-left">Scientific Name</th>
                <th class="py-3 px-4 text-left hidden sm:table-cell">Vernacular Names</th>
                <th class="py-3 px-4 text-center">Images</th>
                <th class="py-3 px-4 text-left hidden md:table-cell">Description</th>
                <th class="py-3 px-4 text-center hidden lg:table-cell">External Link</th>
                <th class="py-3 px-4 text-center">Category</th>
                <th class="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-white bg-gray-800 text-sm font-light">
              <tr v-for="(entry, index) in filteredEntries" :key="index" class="border-b border-gray-900 hover:bg-gray-600">
                <td class="py-3 px-4 text-left">
                  <div class="font-medium">{{ entry.scientificName }}</div>
                  <div class="text-xs text-gray-400 sm:hidden">{{ entry.vernacularNames[0]?.name || 'N/A' }}</div>
                </td>
                <td class="py-3 px-4 text-left hidden sm:table-cell">
                  <ul class="list-disc list-inside">
                    <li v-for="(name, num) in entry.vernacularNames.slice(0, 2)" :key="num">
                      {{ name.place }}: {{ name.name }}
                    </li>
                  </ul>
                </td>
                <td class="py-3 px-4 text-center">
                  <div class="flex justify-center space-x-2">
                    <img v-for="(img, imgIndex) in entry.images.slice(0, 1)" :key="imgIndex" :src="img" :alt="`${entry.scientificName} ${imgIndex + 1}`" class="w-12 h-12 rounded-full">
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
                  <div class="flex item-center justify-center">
                    <button @click="editEntry(index)" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button @click="deleteEntry(index)" class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Attractive Modal -->
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div class="relative w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl">
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 class="text-2xl font-semibold mb-6 text-gray-800">{{ editIndex === null ? 'Add New Entry' : 'Edit Entry' }}</h3>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="commonName">Common Name</label>
                  <input v-model="formData.common_name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="commonName" type="text" placeholder="E.g., Atlantic Cod" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="scientificName">Scientific Name</label>
                  <input v-model="formData.scientific_name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="scientificName" type="text" placeholder="E.g., Gadus morhua" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Vernacular Names</label>
                  <TransitionGroup name="list" tag="div" class="space-y-2">
                    <div v-for="(name, index) in formData.vernacular_names" :key="index" class="flex space-x-2">
                      <input v-model="name.place" class="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" placeholder="Place" required>
                      <input v-model="name.name" class="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" placeholder="Name" required>
                    </div>
                  </TransitionGroup>
                  <button type="button" @click="addVernacularName" class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Name
                  </button>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <TransitionGroup name="list" tag="div" class="space-y-2">
                    <div v-for="(image, index) in formData.images" :key="index">
                      <input v-model="formData.images[index]" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="url" placeholder="https://example.com/image.jpg" required>
                    </div>
                  </TransitionGroup>
                  <button type="button" @click="addImageField" class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Image
                  </button>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Description</label>
                  <textarea v-model="formData.description" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="description" rows="3" placeholder="Enter a description" required></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="externalLink">External Link</label>
                  <input v-model="formData.more_info" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="externalLink" type="url" placeholder="https://example.com" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="category">Category</label>
                  <select v-model="formData.category" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="category" required>
                    <option value="">Select category</option>
                    <option value="brackish">Brackish</option>
                    <option value="freshwater">Freshwater</option>
                    <option value="marine">Marine</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end space-x-3">
                <button @click="closeModal" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="button">
                  Cancel
                </button>
                <button class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                  {{ editIndex === null ? 'Submit' : 'Update' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </DashboardLayout>
</template>
<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { getitem, additem, deleteitem, edititem } from '@/API/index';

export default {
  name: 'Dashboard',
  components: {
    DashboardLayout,
  },
  data() {
    return {
      entries: [],
      showModal: false,
      formData: {
        common_name: "",
        scientific_name: "",
        vernacular_names: [{ place: "", name: "" }],
        images: [""],
        description: "",
        more_info: "",
        category: ""
      },
      editIndex: null,
      searchTerm: ""
    };
  },
  computed: {
    filteredEntries() {
      return this.entries.filter(entry =>
        entry.scientificName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        entry.vernacularNames.some(vn => 
          vn.place.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          vn.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ) ||
        entry.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  async mounted() {
    await this.getitem();
  },
  methods: {
    async getitem() {
      try {
        const res = await getitem();
        const data = res.data.data.items;
        this.entries = data.map(item => ({
          item_id: item.item_id,
          scientificName: item.scientific_name,
          vernacularNames: item.vernacular_names.map(name => ({
            place: name.place,
            name: name.name
          })),
          images: item.images.length > 0 ? item.images : ['https://via.placeholder.com/100'],
          description: item.description,
          externalLink: item.more_info || '',
          category: item.category || 'Not specified'
        }));
      } catch (error) {
        console.log(error);
      }
    },
    addVernacularName() {
      this.formData.vernacular_names.push({ place: "", name: "" });
    },
    addImageField() {
      this.formData.images.push("");
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        common_name: "",
        scientific_name: "",
        vernacular_names: [{ place: "", name: "" }],
        images: [""],
        description: "",
        more_info: "",
        category: ""
      };
      this.editIndex = null;
    },
    async submitForm() {
      try {
        if (this.editIndex === null) {
          const res = await additem(this.formData);
          console.log(res);
          await this.getitem(); // Refresh the list after adding
        } else {
          const entryToUpdate = this.entries[this.editIndex];
          const updatedData = {
            common_name: this.formData.common_name,
            scientific_name: this.formData.scientific_name,
            vernacular_names: this.formData.vernacular_names,
            images: this.formData.images,
            description: this.formData.description,
            more_info: this.formData.more_info,
            category: this.formData.category,
          };
          const res = await edititem(entryToUpdate.item_id, updatedData);
          console.log(res);
          await this.getitem(); // Refresh the list after updating
        }
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    editEntry(index) {
      this.editIndex = index;
      const entry = this.entries[index];
      this.formData = {
        common_name: entry.vernacularNames[0]?.name || '',
        scientific_name: entry.scientificName,
        vernacular_names: entry.vernacularNames,
        images: entry.images,
        description: entry.description,
        more_info: entry.externalLink,
        category: entry.category
      };
      this.showModal = true;
    },
    async deleteEntry(index) {
      if (confirm("Are you sure you want to delete this entry?")) {
        try {
          const entryToDelete = this.entries[index];
          await deleteitem(entryToDelete.item_id);
          this.entries.splice(index, 1);
          await this.getitem(); // Refresh the list after deleting
        } catch (error) {
          console.log(error);
          alert("Failed to delete entry. Please try again later.");
          console.error("Failed to delete entry:", error);
        }
      }
    }
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>