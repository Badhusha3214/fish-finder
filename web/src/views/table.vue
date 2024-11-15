<template>
    <DashboardLayout>
        <div class="container mx-auto p-4">
            <!-- Loading Spinner -->
            <loading-spinner v-if="loading" class="z-50" />

            <!-- Add New Item Button -->
            <div class="mb-4 flex justify-center justify-between ">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-bold text-btn">Fish details</h1>
                </div>
                <button @click="openAddModal"
                    class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                    Add New Item
                </button>
            </div>

            <!-- Table with horizontal scroll -->
            <div class="custom-scrollbar relative">
                <div class="w-full overflow-x-auto border rounded-lg shadow">
                    <table class="min-w-[1200px] w-full text-sm text-left text-gray-800">
                        <!-- Table header -->
                        <thead class="text-xs uppercase bg-gray-100 sticky top-0">
                            <tr>
                                <th class="px-6 py-3 whitespace-nowrap">Common Name</th>
                                <th class="px-6 py-3 whitespace-nowrap">Scientific Name</th>
                                <th class="px-6 py-3 whitespace-nowrap">Images</th>
                                <th class="px-6 py-3 whitespace-nowrap">Description</th>
                                <th class="px-6 py-3 whitespace-nowrap">Category</th>
                                <th class="px-6 py-3 whitespace-nowrap">Vernacular Names</th>
                                <th class="px-6 py-3 whitespace-nowrap">More Info</th>
                                <th class="px-6 py-3 whitespace-nowrap">Created by</th>
                                <th class="px-6 py-3 whitespace-nowrap">Updated by</th>
                                <th class="px-6 py-3 whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Table body content -->
                            <tr v-for="item in items" :key="item.item_id" class="bg-white border-b hover:bg-gray-50">
                                <td class="px-6 py-4 font-medium whitespace-nowrap">{{ item.common_name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ item.scientific_name }}</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <img v-if="item.image != ' '" :src="item.image"
                                            class="w-10 h-10 object-cover rounded" :alt="item.common_name">
                                        <img v-if="item.diagram != ' '" :src="item.diagram"
                                            class="w-10 h-10 object-cover rounded" :alt="item.common_name">
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    {{ truncateText(item.description, 50) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ item.category }}</td>
                                <td class="px-6 py-4">
                                    <table>
                                        <tr v-for="(vernacularName, index) in item.vernacular_names" :key="index">
                                            <td class="font-medium text-gray-600 pr-2">{{ vernacularName.place }}:</td>
                                            <td>{{ vernacularName.name }}</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="px-6 py-4">
                                    <a v-if="item.more_info" :href="item.more_info" target="_blank"
                                        class="text-blue-600 hover:underline">
                                        Link
                                    </a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ item.created_by }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ item.updated_by }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex gap-2">
                                        <button @click="editItem(item)" class="text-gray-600 hover:text-gray-900">
                                            Edit
                                        </button>
                                        <button @click="deleteItem(item.item_id)"
                                            class="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal Form -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
                <div class="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h2>
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <!-- Basic Information -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-2">Common Name*</label>
                                <input v-model="formData.common_name" class="w-full p-2 border rounded" required>
                            </div>
                            <div>
                                <label class="block mb-2">Scientific Name*</label>
                                <input v-model="formData.scientific_name" class="w-full p-2 border rounded" required>
                            </div>
                            <div>
                                <label class="block mb-2">Category*</label>
                                <select v-model="formData.category" class="w-full p-2 border rounded" required>
                                    <option value="marine">Marine</option>
                                    <option value="freshwater">Freshwater</option>
                                    <option value="brackish">Brackish</option>
                                </select>
                            </div>
                            <div>
                                <label class="block mb-2">More Info URL</label>
                                <input v-model="formData.more_info" type="url" class="w-full p-2 border rounded">
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block mb-2">Description</label>
                            <textarea v-model="formData.description" class="w-full p-2 border rounded" rows="3"></textarea>
                        </div>

                        <!-- Images Section -->
                        <div class="space-y-4">
                            <h3 class="font-semibold">Images</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Image Upload -->
                                <div>
                                    <label class="block mb-2">Image</label>
                                    <input id="image-input" type="file" @change="handleImageUpload($event, 'image')"
                                        accept="image/*" class="w-full  border rounded">
                                    <div v-if="formData.image != ' '" class="mt-2">
                                        <img :src="formData.image" class="h-24 w-24 object-cover rounded" alt="Selected image">
                                        <button @click="removeImage('image')" type="button" class="text-red-600 text-sm mt-1">
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <!-- Diagram Upload -->
                                <div>
                                    <label class="block mb-2">Diagram</label>
                                    <input id="diagram-input" type="file" @change="handleImageUpload($event, 'diagram')"
                                        accept="image/*" class="w-full  border rounded">
                                    <div v-if="formData.diagram != ' '" class="mt-2">
                                        <img :src="formData.diagram" class="h-24 w-24 object-cover rounded" alt="Selected diagram">
                                        <button @click="removeImage('diagram')" type="button" class="text-red-600 text-sm mt-1">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Vernacular Names Section -->
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <h3 class="font-semibold">Vernacular Names</h3>
                                <button type="button" @click="addVernacularName" class="text-blue-600 hover:text-blue-800">
                                    + Add Name
                                </button>
                            </div>
                            <div v-for="(name, index) in formData.vernacular_names" :key="index"
                                class="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded">
                                <div>
                                    <label class="block mb-2">Name</label>
                                    <input v-model="name.name" class="w-full p-2 border rounded">
                                </div>
                                <div>
                                    <label class="block mb-2">Place</label>
                                    <input v-model="name.place" class="w-full p-2 border rounded">
                                </div>
                                <button type="button" @click="removeVernacularName(index)"
                                    class="text-red-600 hover:text-red-800 md:col-span-2">
                                    Remove
                                </button>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="closeModal" class="px-4 py-2 border rounded hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                                :disabled="formSubmitting">
                                {{ isEditing ? 'Update' : 'Add' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { getitem, additem, imgtourl, deleteitem, edititem } from "@/API/index";

export default {
    name: 'ProductTable',
    components: {
        DashboardLayout,
        LoadingSpinner
    },
    data() {
        return {
            items: [],
            loading: false,
            showModal: false,
            isEditing: false,
            editingId: null,
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10,
            formSubmitting: false,
            formData: this.getInitialFormState()
        }
    },

    computed: {
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
        }
    },

    methods: {

        async urlToFile(url, filename = 'image.jpg', mimeType = 'image/jpeg') {
            try {
                const response = await fetch(url, {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });

                // If the fetch fails due to CORS, return null without throwing an error
                if (!response.ok) {
                    console.warn(`Unable to fetch image from ${url}. Using existing URL.`);
                    return null;
                }

                const blob = await response.blob();
                return new File([blob], filename, { type: mimeType });
            } catch (error) {
                console.warn(`Unable to convert image URL to File: ${error.message}`);
                return null;
            }
        },
        updateFileInput(fileInputRef, file) {
            // Create a DataTransfer object
            const dataTransfer = new DataTransfer();
            if (file) {
                dataTransfer.items.add(file);
            }

            // Update the file input's files property
            const fileInput = document.querySelector(fileInputRef);
            if (fileInput) {
                fileInput.files = dataTransfer.files;
            }
        },


        // Form state management
        getInitialFormState() {
            return {
                common_name: "",
                scientific_name: "",
                description: "",
                category: "marine",
                more_info: "",
                image: "",
                diagram: "",
                vernacular_names: [{ name: "", place: "" }]
            };
        },

        // Image handling methods

        async handleImageUpload(event, type) {
            const file = event.target.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should not exceed 5MB');
                event.target.value = '';
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                event.target.value = '';
                return;
            }

            try {
                const formData = new FormData();
                formData.append('image', file);
                const response = await imgtourl(formData);
                const imageUrl = response.data.image;

                // Store URL directly in formData
                this.formData[type] = imageUrl;

            } catch (error) {
                console.error(`Error handling ${type} upload:`, error);
                alert(`Failed to upload ${type}. Please try again.`);
                event.target.value = '';
            }
        },

        removeimg() {
            const currentImages = [...this.formData.images];
            currentImages[0] = {
                ...currentImages[0],
                image: [],
                imageFile: null
            };
            this.formData.images = currentImages;
            this.formData.imageUrl = ''; // Clear the URL for new items
            this.updateFileInput('#image-input', null);
        },

        removeImage(type) {
            this.formData[type] = " ";
            const fileInput = document.querySelector(`#${type}-input`);
            if (fileInput) {
                fileInput.value = '';
            }
        },


        getImagePreview(imageData) {
            if (Array.isArray(imageData) && imageData.length > 0) {
                return imageData[0];
            }
            return '';
        },

        hasImage(type) {
            return Array.isArray(this.formData.images[0]?.[type]) &&
                this.formData.images[0]?.[type].length > 0;
        },

        // Vernacular names methods
        addVernacularName() {
            if (Array.isArray(this.formData.vernacular_names)) {
                this.formData.vernacular_names.push({ name: "", place: "" });
            } else {
                this.formData.vernacular_names = [{ name: "", place: "" }];
            }
        },

        visiblePages() {
            const delta = 2; // Number of pages to show on each side of current page
            let range = [];

            for (
                let i = Math.max(2, currentPage - delta);
                i <= Math.min(totalPages - 1, currentPage + delta);
                i++
            ) {
                range.push(i);
            }

            return range;
        },

        shouldShowFirst() {
            return this.totalPages > 1;
        },

        shouldShowLast() {
            return this.totalPages > 1 && this.totalPages !== this.currentPage;
        },

        shouldShowLeftEllipsis() {
            return this.currentPage > 3;
        },

        shouldShowRightEllipsis() {
            return this.currentPage < this.totalPages - 2;
        },


        removeVernacularName(index) {
            if (Array.isArray(this.formData.vernacular_names) &&
                this.formData.vernacular_names.length > 1) {
                this.formData.vernacular_names.splice(index, 1);
            }
        },

        // Data fetching and pagination
        async fetchItems(page = 1) {
            this.loading = true;
            try {
                const response = await getitem(page);
                if (response.data.status === 200) {
                    const { items, meta } = response.data.data;
                    this.items = items;
                    this.totalItems = meta.total;
                    this.totalPages = meta.pages;
                    this.currentPage = meta.page;
                } else {
                    throw new Error('Failed to fetch items');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
                // alert('Failed to load items. Please try again.');
                window.location.href = '/login';
            } finally {
                this.loading = false;
            }
        },

        async changePage(page) {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                await this.fetchItems(page);
            }
        },

        // Modal and form handling
        openAddModal() {
            this.isEditing = false;
            this.editingId = null;
            this.formData = this.getInitialFormState();
            this.showModal = true;
        },

        async editItem(item) {
            this.isEditing = true;
            this.editingId = item.item_id;
            
            this.formData = {
                common_name: item.common_name || '',
                scientific_name: item.scientific_name || '',
                description: item.description || '',
                category: item.category || 'marine',
                more_info: item.more_info || '',
                image: item.image || '',
                diagram: item.diagram || '',
                vernacular_names: Array.isArray(item.vernacular_names) ? item.vernacular_names : [{ name: "", place: "" }]
            };

            this.showModal = true;
        },

        async urlToFile(url, filename = 'image.jpg', mimeType = 'image/jpeg') {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                return new File([blob], filename, { type: mimeType });
            } catch (error) {
                console.error('Error converting URL to File:', error);
                return null;
            }
        },


        updateFileInput(fileInputRef, file) {
            try {
                const dataTransfer = new DataTransfer();
                if (file) {
                    dataTransfer.items.add(file);
                }

                const fileInput = document.querySelector(fileInputRef);
                if (fileInput) {
                    fileInput.files = dataTransfer.files;
                }
            } catch (error) {
                console.error('Error updating file input:', error);
            }
        },



        closeModal() {
            this.showModal = false;
            this.isEditing = false;
            this.editingId = null;
            this.formSubmitting = false;
            this.formData = this.getInitialFormState();
        },

        async fetchImageAsBlob(url) {
            try {
                const response = await fetch(url, {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.data.statusText}`);
                }

                return await response.blob();
            } catch (error) {
                console.error('Error fetching image:', error);
                throw error;
            }
        },


       // Update the submitForm method
       async submitForm() {
            try {
                this.formSubmitting = true;

                const formDataToSubmit = {
                    common_name: this.formData.common_name,
                    scientific_name: this.formData.scientific_name,
                    description: this.formData.description,
                    category: this.formData.category,
                    more_info: this.formData.more_info,
                    image: this.formData.image,
                    diagram: this.formData.diagram,
                    vernacular_names: this.formData.vernacular_names.filter(
                        vn => vn.name?.trim() || vn.place?.trim()
                    )
                };

                if (this.isEditing) {
                    const response = await edititem(this.editingId, formDataToSubmit);
                    if (response.data.status === 200) {
                        this.closeModal();
                        await this.fetchItems(this.currentPage);
                    }
                } else {
                    const response = await additem(formDataToSubmit);
                    if (response.data.status === 200) {
                        this.closeModal();
                        await this.fetchItems(this.currentPage);
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                this.handleSubmissionError(error);
            } finally {
                this.formSubmitting = false;
            }
        },


        handleSubmissionError(error) {
            if (error.response) {
                if (error.response.data.status === 400) {
                    alert('Scientific Name Already Exists.');
                } else if (error.response.data.status === 502) {
                    alert('Server error. Please check your form data and try again.');
                } else {
                    alert(`Error: ${error.response.data?.message || 'Failed to save item. Please try again.'}`);
                }
            } else {
                alert('Network error. Please check your connection and try again.');
            }
        },

        // Form validation
        validateForm() {
            if (!this.formData.common_name.trim()) {
                alert('Common name is required');
                return false;
            }
            if (!this.formData.scientific_name.trim()) {
                alert('Scientific name is required');
                return false;
            }
            if (!this.formData.category) {
                alert('Category is required');
                return false;
            }
            return true;
        },

        // Utility methods
        truncateText(text, length) {
            if (!text) return '';
            return text.length > length ? `${text.substring(0, length)}...` : text;
        },

        async deleteItem(id) {
            if (!confirm('Are you sure you want to delete this item?')) return;

            this.loading = true;
            try {
                const response = await deleteitem(id);
                if (response.data.status === 200) {
                    // If deleting last item on page, go to previous page
                    if (this.items.length === 1 && this.currentPage > 1) {
                        await this.fetchItems(this.currentPage - 1);
                    } else {
                        await this.fetchItems(this.currentPage);
                    }
                } else {
                    throw new Error('Failed to delete item');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete item. Please try again.');
            } finally {
                this.loading = false;
            }
        }
    },

    mounted() {
        this.fetchItems();
    }
}
</script>
<style>
.custom-scrollbar {
    position: relative;
    margin-bottom: 12px;
    /* Space for the scrollbar */
}

.custom-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* For Firefox */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
}
</style>