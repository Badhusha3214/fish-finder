<template>
  <DashboardLayout>
    <div class="min-h-screen bg-white rounded-lg">

      <!-- Error Alert -->
      <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="error = null">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </span>
      </div>
      
      <!-- Success Alert -->
      <div v-if="successMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">{{ successMessage }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="successMessage = null">
          <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </span>
      </div>

      <template v-if="loading">
        <h1 class="text-xl font-bold p-5 text-gray-500">Items are loading</h1>
        <Loader />
      </template>
      <div v-else class="container mx-auto p-4 sm:p-6">
        <div class="mb-4 bg-btn p-5 rounded-lg bg-opacity-10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <input v-model="searchTerm" type="text" placeholder="Search..." class="p-2 px-4 border border-btn rounded w-full sm:w-auto">
          <button @click="showModal = true" class="bg-btn text-white px-4 py-2 rounded-lg hover:bg-btnh transition w-full sm:w-auto">Add Entry</button>
        </div>
        <div class="overflow-x-auto rounded-lg">
          <table class="w-full bg-white shadow-md rounded">
            <thead class="bg-btn text-white uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-4 text-left">Scientific Name</th>
                <th class="py-3 px-4 text-left hidden sm:table-cell">Vernacular Names</th>
                <th class="py-3 px-4 text-center">Images</th>
                <th class="py-3 px-4 text-left hidden md:table-cell">Description</th>
                <th class="py-3 px-4 text-center hidden lg:table-cell">External Link</th>
                <th class="py-3 px-4 text-center">Category</th>
                <th class="py-3 px-4 text-center">Created by</th>
                <th class="py-3 px-4 text-center">Updated by</th>
                <th class="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-black bg-btn bg-opacity-10 text-sm font-light">
              <tr v-for="(entry, index) in filteredEntries" :key="index" class="odd:bg-white hover:bg-btn hover:bg-opacity-30">
                <td class="py-3 px-4 text-left">
                  <div class="font-medium">{{ entry.scientificName }}</div>
                </td>
                <td class="py-3 px-4 text-left hidden sm:table-cell">
                  <table class="min-w-full divide-y divide-gray-200">
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(name, place) in entry.vernacularNames" :key="place" class="text-xs">
                        <td class="py-1 pr-2 font-medium text-gray-600">{{ place }}:</td>
                        <td class="py-1">{{ name }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Mobile view -->
                  <div class="sm:hidden text-xs text-gray-600">
                    {{ Object.values(entry.vernacularNames)[0] || 'N/A' }}
                  </div>
                </td>
                <!-- Rest of the columns remain the same -->
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
                  {{ entry.created_by }}
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.updated_by }}
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

  <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
      <h3 class="text-lg font-bold mb-4 text-black">{{ editIndex === null ? 'Add New Entry' : 'Edit Entry' }}</h3>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="commonName">Common Name</label>
          <input v-model="formData.common_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="commonName" type="text" placeholder="Common Name" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="scientificName">Scientific Name</label>
          <input v-model="formData.scientific_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="scientificName" type="text" placeholder="Scientific Name" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="description">Description</label>
          <textarea v-model="formData.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" required></textarea>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="category">Category</label>
          <select v-model="formData.category" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="category" required>
            <option value="">Select category</option>
            <option value="brackish">Brackish</option>
            <option value="freshwater">Freshwater</option>
            <option value="marine">Marine</option>
          </select>
        </div>
        <div>
            <label class="block text-black text-sm font-bold mb-2">Vernacular Names</label>
            <div v-for="(name, index) in vernacularNames" :key="index" class="flex space-x-2 mb-2">
              <input
                v-model="name.place"
                class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Place"
                required
              >
              <input
                v-model="name.name"
                class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                required
              >
              <button
                @click="removeVernacularName(index)"
                type="button"
                class="bg-red text-black px-2 rounded hover:bg-red-600"
              >
                ×
              </button>
            </div>
            <button
              @click="addVernacularName"
              type="button"
              class="bg-btn text-white px-4 py-2 rounded hover:bg-btnh w-full"
            >
              Add Vernacular Name
            </button>
          </div>
          
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="moreInfo">More Info</label>
          <input v-model="formData.more_info" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="moreInfo" type="url" placeholder="https://example.com" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="image">Image</label>
          <input @change="handleFileUpload($event, 'image')" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" accept="image/*" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="diagram">Diagram</label>
          <input @change="handleFileUpload($event, 'diagram')" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="diagram" type="file" accept="image/*" required>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <button @click="closeModal" class="bg-gray-200 hover:bg-red hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto" type="button">
            Cancel
          </button>
          <button class="bg-btn hover:bg-btnh text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto" type="submit">
            <span v-if="!loading">{{ editIndex === null ? 'Submit' : 'Update' }}</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
          </button>
        </div>
      </form>
    </div>
  </div>
    </div>
  </DashboardLayout>
</template>



<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Loader from '@/components/Loader.vue'
import { getitem, additem, deleteitem, edititem } from '@/API/index';

export default {
  name: 'ItemTable',
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
      vernacularNames: [{ place: '', name: '' }],
      formData: {
        common_name: "",
        scientific_name: "",
        description: "",
        category: "",
        more_info: "",
        images: [{ image: null, diagram: null }]
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
        Object.entries(entry.vernacularNames).some(([place, name]) => 
          place.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ) ||
        entry.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  async created() {
    await this.initializeData();
  },
  methods: {
    async initializeData() {
      try {
        this.loading = true;
        if (!document.cookie.includes('token')) {
          this.showError('Authentication failed. Please log in.');
          this.$router.push('/login');
          return;
        }
        await this.getItems();
      } catch (error) {
        this.showError('Failed to initialize data. Please refresh the page.');
        console.error('Initialization error:', error);
      } finally {
        this.loading = false;
      }
    },
    showError(message, timeout = 5000) {
      this.error = message;
      setTimeout(() => {
        this.error = null;
      }, timeout);
    },
    showSuccess(message, timeout = 5000) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, timeout);
    },
    async getItems() {
      try {
        const res = await getitem();
        const data = res.data.data.items;
        this.entries = data.map(item => {
          let vernacularNames = {};
          
          try {
            const cleanedJsonString = item.vernacular_names[0].replace(/,\s*$/, "");
            vernacularNames = JSON.parse(cleanedJsonString);
          } catch (error) {
            console.error("Error parsing vernacular names:", error);
          }
          
          return {
            item_id: item.item_id,
            scientificName: item.scientific_name,
            vernacularNames: vernacularNames,
            images: item.images[0].image,
            description: item.description,
            externalLink: item.more_info || '',
            category: item.category || 'Not specified',
            created_by: item.created_by,
            updated_by: item.updated_by
          };
        });
      } catch (error) {
        console.error("Error fetching items:", error);
        this.showError('Failed to fetch items. Please try again later.');
        throw error;
      }
    },
    handleFileUpload(event, type) {
      try {
        const file = event.target.files[0];
        if (!file) {
          this.showError(`No ${type} file selected`);
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          this.showError(`Invalid file type for ${type}. Please select an image file.`);
          return;
        }
        
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          this.showError(`${type} file is too large. Maximum size is 5MB.`);
          return;
        }
        
        this.formData.images[0][type] = file;
      } catch (error) {
        console.error(`Error handling ${type} file upload:`, error);
        this.showError(`Failed to process ${type} file. Please try again.`);
      }
    },
    addVernacularName() {
      this.vernacularNames.push({ place: '', name: '' });
    },
    removeVernacularName(index) {
      if (this.vernacularNames.length > 1) {
        this.vernacularNames.splice(index, 1);
      }
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        common_name: "",
        scientific_name: "",
        description: "",
        category: "",
        more_info: "",
        images: [{ image: null, diagram: null }]
      };
      this.vernacularNames = [{ place: '', name: '' }];
      this.editIndex = null;
    },
    async submitForm() {
      try {
        this.loading = true;
        const formData = new FormData();
        
        for (const key in this.formData) {
          if (key === 'images') {
            if (this.formData.images[0].image) {
              formData.append('image', this.formData.images[0].image);
            }
            if (this.formData.images[0].diagram) {
              formData.append('diagram', this.formData.images[0].diagram);
            }
          } else {
            formData.append(key, this.formData[key]);
          }
        }
        
        const vernacularNamesObject = {};
        this.vernacularNames.forEach(({ place, name }) => {
          if (place && name) {
            vernacularNamesObject[place] = name;
          }
        });
        formData.append('vernacular_names', JSON.stringify(vernacularNamesObject));

        if (this.editIndex === null) {
          await additem(formData);
          this.showSuccess('Item added successfully!');
        } else {
          const entryToUpdate = this.entries[this.editIndex];
          await edititem(entryToUpdate.item_id, formData);
          this.showSuccess('Item updated successfully!');
        }
        await this.getItems();
        this.closeModal();
      } catch (error) {
        console.error("Error submitting form:", error);
        this.showError('Failed to submit form. Please check your inputs and try again.');
      } finally {
        this.loading = false;
      }
    },
    editEntry(index) {
      try {
        this.editIndex = index;
        const entry = this.entries[index];
        this.formData = {
          common_name: entry.commonName,
          scientific_name: entry.scientificName,
          description: entry.description,
          more_info: entry.externalLink,
          category: entry.category,
          images: [{ image: null, diagram: null }]
        };
        
        this.vernacularNames = Object.entries(entry.vernacularNames).map(([place, name]) => ({
          place,
          name
        }));
        
        if (this.vernacularNames.length === 0) {
          this.vernacularNames.push({ place: '', name: '' });
        }
        
        this.showModal = true;
      } catch (error) {
        console.error("Error editing entry:", error);
        this.showError('Failed to load entry for editing. Please try again.');
      }
    },
    async deleteEntry(index) {
      if (confirm("Are you sure you want to delete this entry?")) {
        try {
          this.loading = true;
          const entryToDelete = this.entries[index];
          await deleteitem(entryToDelete.item_id);
          this.showSuccess('Item deleted successfully!');
          await this.getItems();
        } catch (error) {
          console.error("Failed to delete entry:", error);
          this.showError('Failed to delete entry. Please try again later.');
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>