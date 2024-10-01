<template>
    <DashboardLayout>
        <div class="min-h-screen bg-white rounded-lg">
            <div class="container mx-auto p-4 sm:p-6">
                <h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-btn">Contacts</h1>
                <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert">
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline"> {{ error }}</span>
                </div>
                <div v-if="isLoading" class="text-center"><Loader /></div>
                <div v-else-if="contactList.length === 0" class="text-center">No contacts available.</div>
                <div v-else>
                    <!-- <input v-model="searchTerm" placeholder="Search contacts..."
                        class="w-full p-2 mb-4 border rounded" /> -->
                    <div class="overflow-x-auto rounded">
                        <table class="w-full bg-white shadow-md rounded">
                            <thead>
                                <tr class="bg-btn text-white uppercase text-sm leading-normal">
                                    <th class="py-3 px-4 text-left">Email</th>
                                    <th class="py-3 px-4 text-left">Subject</th>
                                    <th class="py-3 px-4 text-left hidden sm:table-cell">Message</th>
                                    <th class="py-3 px-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-black bg-btn bg-opacity-10 text-sm font-light">
                                <tr v-for="contact in filteredContacts" :key="contact._id"
                                    class="odd:bg-white oddbg-btn hover:bg-btn hover:bg-opacity-30">
                                    <td class="py-3 px-4 text-left">{{ contact.email }}</td>
                                    <td class="py-3 px-4 text-left">{{ contact.subject }}</td>
                                    <td class="py-3 px-4 text-left hidden sm:table-cell">{{ contact.message }}</td>
                                    <td class="py-3 px-4 text-center">
                                        <div class="flex item-center justify-center">
                                            <!-- <button @click="markAsRead(contact._id)"
                                                class="w-4 mr-2 transform hover:scale-110"
                                                :disabled="contact.status === 'done'">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    :class="{ 'text-green-500': contact.status === 'done', 'hover:text-blue-500': contact.status !== 'done' }">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button> -->
                                            <button @click="deleteContact(contact.message_id)"
                                                class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
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
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Loader from '@/components/Loader.vue';
import { deleteContact, getContact } from '@/API/index'

export default {
    name: 'Contacts',
    components: {
        DashboardLayout,
        Loader
    },
    data() {
        return {
            contactList: [],
            error: null,
            isLoading: true,
            searchTerm: '',
        };
    },
    computed: {
        filteredContacts() {
            return this.contactList.filter(contact =>
                contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                contact.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                contact.message.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            if (!document.cookie.includes('token')) {
                this.$router.push('/');
            } else {
                this.fetchContacts();
            }
        },
        async fetchContacts() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await getContact();
                console.log('API Response:', response);

                if (response.status === 200 && response.data && response.data.data && Array.isArray(response.data.data.messages)) {
                    this.contactList = response.data.data.messages;
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
                this.error = 'Failed to fetch contacts. Please try again later.';
                this.contactList = [];
            } finally {
                this.isLoading = false;
            }
        },
        async deleteContact(message_id) {
            if (confirm("Are you sure you want to delete this feedback?")) {
                try {
                    // console.log('Deleting Contact:', _id);
                    const response = await deleteContact(message_id );
                    console.log('Delete Contact response:', response);

                    if (response && response.status === 200) {
                        // Remove the feedback from the local state
                        this.contactList = this.contactList.filter(f => f.message_id !== message_id);
                        console.log('Contact deleted successfully');
                        await this.getContact
                    } else {
                        throw new Error('Unexpected response from server');
                    }
                } catch (error) {
                    console.error('Error deleting contact:', error);
                    this.error = `Failed to delete contact: ${error.message}`;
                }
            }
        },
    }
};
</script>