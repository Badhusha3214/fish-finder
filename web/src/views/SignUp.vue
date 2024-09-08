<template>
    <div class="flex flex-col md:flex-row h-screen">
        <div class="bg-primary flex-1 flex items-center justify-center ">
            
            <div class="text-center text-white p-6">
                <h2 class="text-3xl font-bold mb-4">Welcome to our Fish Finder</h2>
                <p class="text-lg">Sign up to get started</p>
            </div>

        </div>
        <div class="flex-1 flex items-center justify-center px-4 py-8 md:px-0">
            <div class="w-full max-w-md">
                <!-- <h2 class="text-2xl font-bold mb-6 text-center ">Sign Up</h2> -->
                
                <div class="border rounded px-6 py-8">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="first-name">
                            First Name
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="first-name" type="text" placeholder="Enter your first name" v-model="firstName"
                            required />
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="last-name">
                            Last Name
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="last-name" type="text" placeholder="Enter your last name" v-model="lastName"
                            required />
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="mobile">Mobile Number</label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="mobile" type="number" placeholder="Enter your mobile number" v-model="mobile"
                            required />
                            <span v-if="verifyMobile" class="text-red-500 text-sm">Please check if your mobile number is correct</span>
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 font-bold mb-2" for="email">Email Address</label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="email" placeholder="Enter your email address" v-model="email" required />
                        <span v-if="verifyEmail" class="text-red-500 text-sm">Your email does not look right</span>
                    </div>
                    
                    <div class="mb-4 relative">
                        <label class="block text-gray-700 font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                            :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password"
                            v-model="password" required />
                        
                            <button type="button"
                                class="absolute inset-y-0 right-0 mt-8 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                @click="showPassword = !showPassword">

                                <template v-if="showPassword">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </template>
                            </button>
                        </div>
                        <p v-if="verifyPassword" class="text-red-500 mb-3 text-sm">Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number</p>

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 font-bold mb-2" for="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                            :type="showConfirmPassword ? 'text' : 'password'" id="confirm-password"
                            placeholder="Confirm your password" v-model="confirmPassword" required />
                        
                        <button type="button"
                            class="absolute inset-y-0 right-0 mt-8 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            @click="showConfirmPassword = !showConfirmPassword">

                            <template v-if="showConfirmPassword">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </template>
                            <template v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </template>
                        </button>
                    </div>
                    <p v-if="passwordMismatch" class="text-red-500 mb-3 text-sm">Passwords do not match.</p>


                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="dob">
                            Date of Birth
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dob" type="date" v-model="dob" required />
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="gender">
                            Gender
                        </label>
                        <select
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="gender" v-model="gender" required>
                            <option v-for="option in genderOptions" :value="option.value">{{ option.text }}</option>
                        </select>
                    </div>

                    <div class="flex items-center justify-between">
                        <p v-if="error" class="text-center text-red-500 mb-4 text-sm">{{ error }}</p>
                        <button
                            class="bg-primary hover:bg-primary2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            :class="firstName && lastName && mobile && email && password && confirmPassword && dob && gender ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
                            @click="userRegister"
                            type="submit">
                            Sign Up
                        </button>
                    </div>

                    <div class="flex items center justify-between mt-4">
                        <a href="/login" class="text-primary text-sm">Already have an account? Login</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { userRegister } from '@/API/index.js'

    export default {
        name: "SignUp",
        data() {
            return {
                firstName: null,
                lastName: null,
                mobile: null,
                email: null,
                password: null,
                confirmPassword: null,
                dob: null,
                gender: null,

                showPassword: false,
                showConfirmPassword: false,
                verifyMobile: null,
                verifyEmail: null,
                verifyPassword: null,
                passwordMismatch: null,
                error: null,

                genderOptions: [
                    { text: 'Select Gender', value: null },
                    { text: 'Male', value: "male" },
                    { text: 'Female', value: "female" },
                    { text: 'Other', value: "other" }
                ],
            };
        },
        mounted() {
            if (document.cookie.includes('token')) {
                this.$router.push('/');
            }
        },
        methods: {
            async userRegister() {
                let user = {
                    "first_name": this.firstName,
                    "last_name": this.lastName,
                    "mobile": this.mobile,
                    "email": this.email,
                    "password": this.password,
                    "dob": this.dob,
                    "gender": this.gender
                }

                await userRegister(user).then((response) => {
                    if (response.status === 200) {
                        this.$router.push('/login');
                    } else {
                        this.error = response.error;
                    }
                }).catch((error) => {
                    this.error = error;
                });
            },
        },
        watch: {
            mobile: function () {
                const mobileRegex = /^[0-9]{10}$/;
                this.verifyMobile = !mobileRegex.test(this.mobile);
            },
            email: function () {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                this.verifyEmail = !emailRegex.test(this.email);
            },
            password: function () {
                this.verifyPassword = this.password.length < 8;
                if (this.password.length >= 8) {
                    const upperCase = /[A-Z]/;
                    const lowerCase = /[a-z]/;
                    const numbers = /[0-9]/;
                    this.verifyPassword = !upperCase.test(this.password) || !lowerCase.test(this.password) || !numbers.test(this.password);
                }
            },
            confirmPassword: function () {
                this.passwordMismatch = this.password !== this.confirmPassword;
            },

        },
    };
</script>