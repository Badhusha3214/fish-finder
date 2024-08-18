
<template>
    <div class="flex flex-col p-5 w-full h-full">

        <h1 class="text-2xl text-primary uppercase font-bold text-center">{{ item?.scientific_name }}</h1>

        <!-- <template v-for="(value, key) in item?.images">
            <img :src="value" class="w-full max-h-48 h-auto rounded-xl object-cover" :alt="item?.common_name">
        </template> -->

        <img :src="item?.images[0]" class="w-full max-h-48 h-auto rounded-xl object-cover" :alt="item?.common_name">

        <p class="text-sm text-secondary">{{ item?.description }}</p>

        <table>
            <thead>
                <tr class="border border-primary w-full">
                    <th class="border-r border-primary w-1/2 p-2">District</th>
                    <th class="w-1/2 p-2">Name</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(value, key) in item?.vernacular_names">
                    <tr class="border-b border-x border-primary w-full">
                        <td class="border-r border-primary w-1/2 p-2">{{ value.place }}</td>
                        <td class="w-1/2 p-2">{{ value.name }}</td>
                    </tr>

                </template>
            </tbody>
        </table>

    </div>
</template>


<script>
import { getSingleItem } from '@/API/index.js'

export default {
    name: "ItemView",
    components: {

    },
    data() {
        return {
            id: '4xsVbOISF_v6MUq1NoqFJ',
            item: null
        }
    },
    async mounted() {
        await this.getSingleItemData()
    },
    methods: {
        async getSingleItemData() {
            try {
                const res = await getSingleItem(this.id)
                this.item = res.data;

                console.log(this.item);
                
            } catch (err) {
                console.log(err)
            }
        },
    },
};
</script>
