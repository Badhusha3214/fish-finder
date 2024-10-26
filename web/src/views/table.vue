<template>
    <DashboardLayout>
        <div class="container mx-auto p-4">
            <!-- Loading Spinner -->
            <loading-spinner v-if="loading" />

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

            <!-- Table -->
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-800">
                    <!-- Table header remains the same -->
                    <thead class="text-xs uppercase bg-gray-100">
                        <tr>
                            <th class="px-6 py-3">Common Name</th>
                            <th class="px-6 py-3">Scientific Name</th>
                            <th class="px-6 py-3">Images</th>
                            <th class="px-6 py-3 hidden md:table-cell">Description</th>
                            <th class="px-6 py-3">Category</th>
                            <th class="px-6 py-3 hidden lg:table-cell">Vernacular Names</th>
                            <th class="px-6 py-3 hidden lg:table-cell">More Info</th>
                            <th class="px-6 py-3">Created by</th>
                            <th class="px-6 py-3">Updated by</th>
                            <th class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.item_id" class="bg-white border-b hover:bg-gray-50">
                            <!-- Table body content remains the same -->
                            <td class="px-6 py-4 font-medium">{{ item.common_name }}</td>
                            <td class="px-6 py-4">{{ item.scientific_name }}</td>
                            <td class="px-6 py-4">
                                <img v-if="item.images?.[0]?.image?.[0]" :src="item.images[0].image[0]"
                                    class="w-10 h-10 object-cover rounded" :alt="item.common_name">
                            </td>
                            <td class="px-6 py-4 hidden md:table-cell">
                                {{ truncateText(item.description, 50) }}
                            </td>
                            <td class="px-6 py-4">{{ item.category }}</td>
                            <td class="px-6 py-4 hidden lg:table-cell">
                                <table>
                                    <tr v-for="(vernacularName, index) in item.vernacular_names" :key="index">
                                        <td class="font-medium text-gray-600 pr-2">{{ vernacularName.place }}:</td>
                                        <td>{{ vernacularName.name }}</td>
                                    </tr>
                                </table>
                            </td>
                            <td class="px-6 py-4 hidden lg:table-cell">
                                <a v-if="item.more_info" :href="item.more_info" target="_blank"
                                    class="text-blue-600 hover:underline">
                                    Link
                                </a>
                            </td>
                            <td class="px-6 py-4">{{ item.created_by }}</td>
                            <td class="px-6 py-4">{{ item.updated_by }}</td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <button @click="editItem(item)" class="text-gray-600 hover:text-gray-900">
                                        Edit
                                    </button>
                                    <button @click="deleteItem(item.item_id)" class="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination section remains the same -->
            <div class="flex items-center justify-between mt-4">
                <div class="text-sm text-gray-700">
                    Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
                </div>
                <div class="flex gap-2">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50">
                        Previous
                    </button>
                    <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="[
                        'px-4 py-2 border rounded',
                        currentPage === page
                            ? 'bg-gray-800 text-white'
                            : 'bg-white hover:bg-gray-50'
                    ]">
                        {{ page }}
                    </button>
                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>

            <!-- Updated Add/Edit Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center z-50 justify-center">
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
                            <textarea v-model="formData.description" class="w-full p-2 border rounded"
                                rows="3"></textarea>
                        </div>

                        <!-- Images Section -->
                        <div class="space-y-4">
                            <h3 class="font-semibold">Images</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Image Upload -->
                                <div>
                                    <label class="block mb-2">Image</label>
                                    <input type="file" @change="handleImageUpload($event, 'image')" accept="image/*"
                                        class="w-full p-2 border rounded">
                                    <div v-if="formData.images[0].image" class="mt-2">
                                        <img :src="getImagePreview(formData.images[0].image)"
                                            class="h-24 w-24 object-cover rounded">
                                        <button @click="removeImage('image')" type="button"
                                            class="text-red-600 text-sm mt-1">
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <!-- Diagram Upload -->
                                <div>
                                    <label class="block mb-2">Diagram</label>
                                    <input type="file" @change="handleImageUpload($event, 'diagram')" accept="image/*"
                                        class="w-full p-2 border rounded">
                                    <div v-if="formData.images[0].diagram" class="mt-2">
                                        <img :src="getImagePreview(formData.images[0].diagram)"
                                            class="h-24 w-24 object-cover rounded">
                                        <button @click="removeImage('diagram')" type="button"
                                            class="text-red-600 text-sm mt-1">
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
                                <button type="button" @click="addVernacularName"
                                    class="text-blue-600 hover:text-blue-800">
                                    + Add Name
                                </button>
                            </div>
                            <div v-for="(name, index) in formData.vernacular_names" :key="index"
                                class="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded">
                                <div>
                                    <label class="block mb-2">Name</label>
                                    <input v-model="formData.vernacular_names[index].name"
                                        class="w-full p-2 border rounded">
                                </div>
                                <div>
                                    <label class="block mb-2">Place</label>
                                    <input v-model="formData.vernacular_names[index].place"
                                        class="w-full p-2 border rounded">
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
                            <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
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
import { getitem, additem, deleteitem, edititem } from "@/API/index";

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



        // Form state management
        getInitialFormState() {
            return {
                common_name: "",
                scientific_name: "",
                description: "",
                category: "marine",
                more_info: "",
                images: [{
                    image: null,
                    diagram: null,
                    imageFile: null,
                    diagramFile: null
                }],
                vernacular_names: [{ name: "", place: "" }]
            };
        },

        // Image handling methods
        handleImageUpload(event, type) {
            const file = event.target.files[0];
            if (!file) return;

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should not exceed 5MB');
                event.target.value = '';
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                event.target.value = '';
                return;
            }

            // Store file and create preview
            if (type === 'image') {
                this.formData.images[0].imageFile = file;
            } else {
                this.formData.images[0].diagramFile = file;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'image') {
                    this.formData.images[0].image = e.target.result;
                } else {
                    this.formData.images[0].diagram = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        },

        removeImage(type) {
            if (type === 'image') {
                this.formData.images[0].image = null;
                this.formData.images[0].imageFile = null;
            } else {
                this.formData.images[0].diagram = null;
                this.formData.images[0].diagramFile = null;
            }
        },

        getImagePreview(imageData) {
            return imageData || '';
        },

        // Vernacular names methods
        addVernacularName() {
            if (Array.isArray(this.formData.vernacular_names)) {
                this.formData.vernacular_names.push({ name: "", place: "" });
            } else {
                this.formData.vernacular_names = [{ name: "", place: "" }];
            }
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
                if (response.status === 200) {
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

        editItem(item) {
            this.isEditing = true;
            this.editingId = item.item_id;

            // Handle vernacular names parsing
            let parsedVernacularNames = [];
            try {
                if (typeof item.vernacular_names === 'string') {
                    parsedVernacularNames = JSON.parse(item.vernacular_names);
                } else if (Array.isArray(item.vernacular_names)) {
                    parsedVernacularNames = item.vernacular_names;
                }
            } catch (e) {
                console.error('Error parsing vernacular names:', e);
                parsedVernacularNames = [{ name: "", place: "" }];
            }

            // Ensure we have at least one empty entry if no vernacular names exist
            if (!parsedVernacularNames.length) {
                parsedVernacularNames = [{ name: "", place: "" }];
            }

            // Set up the form data
            this.formData = {
                common_name: item.common_name || '',
                scientific_name: item.scientific_name || '',
                description: item.description || '',
                category: item.category || 'marine',
                more_info: item.more_info || '',
                images: [{
                    image: item.images?.[0]?.image || null,
                    diagram: item.images?.[0]?.diagram || null,
                    imageFile: null,
                    diagramFile: null
                }],
                vernacular_names: parsedVernacularNames.map(vn => ({
                    name: vn.name || '',
                    place: vn.place || ''
                }))
            };

            console.log('Editing form data:', this.formData);
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
            this.isEditing = false;
            this.editingId = null;
            this.formData = this.getInitialFormState();
        },

        // Form submission
        async submitForm() {
            if (!this.validateForm()) return;

            this.loading = true;
            try {
                const formDataToSubmit = new FormData();

                // Add basic fields
                const basicFields = {
                    common_name: this.formData.common_name,
                    scientific_name: this.formData.scientific_name,
                    description: this.formData.description,
                    category: this.formData.category,
                    more_info: this.formData.more_info
                };

                if (this.isEditing) {
                    formDataToSubmit.append('_method', 'PATCH');
                }

                // Append basic fields
                Object.keys(basicFields).forEach(key => {
                    if (basicFields[key]) {
                        formDataToSubmit.append(key, basicFields[key]);
                    }
                });

                // Handle vernacular names
                const validVernacularNames = this.formData.vernacular_names.filter(vn =>
                    vn && typeof vn === 'object' && (vn.name?.trim() || vn.place?.trim())
                );

                // Append each vernacular name separately without stringifying
                validVernacularNames.forEach((vn, index) => {
                    formDataToSubmit.append(`vernacular_names[${index}][name]`, vn.name?.trim() || '');
                    formDataToSubmit.append(`vernacular_names[${index}][place]`, vn.place?.trim() || '');
                });

                // Handle images
                if (this.formData.images[0].imageFile) {
                    formDataToSubmit.append('image', this.formData.images[0].imageFile);
                }
                if (this.formData.images[0].diagramFile) {
                    formDataToSubmit.append('diagram', this.formData.images[0].diagramFile);
                }

                const response = await (this.isEditing
                    ? edititem(this.editingId, formDataToSubmit)
                    : additem(formDataToSubmit));

                if (response.status === 200 || response.status === 201) {
                    this.closeModal();
                    await this.fetchItems(this.currentPage);
                } else {
                    throw new Error('Unexpected response status: ' + response.status);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                this.handleSubmissionError(error);
            } finally {
                this.loading = false;
            }
        },

        handleSubmissionError(error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('Scientific Name Already Exists.');
                } else if (error.response.status === 502) {
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
                if (response.status === 200) {
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