<script setup>

    definePageMeta({
        layout: 'auth-layout'
    });

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const companies = ref([]);

    const selectCompany = (company) => {
        localStorage.setItem('empresa', JSON.stringify(company));
        router.push('/');
    };

    onMounted(() => {
        companies.value = localStorage.getItem('empresas') ? JSON.parse(localStorage.getItem('empresas')) : store.company;
        // filter only companies that is active
        companies.value = companies.value.filter(company => company.status === 'published');
    });
</script>

<template>
    <div class="container">

        <h1 class="text-lg font-bold py-4">Selecione a sua empresa</h1>

        <div class="grid grid-cols-4 gap-10 place-items-center  w-full">

            <div v-for="company in companies" :key="company.razao_social"
                 class="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div class="py-7 px-6 space-y-4">
                    <h5 class="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{{ company.razao_social
                        }}</h5>
                    <h6 class="text-white-dark">{{ company.documento }}</h6>
                    <button @click="selectCompany(company)" class="btn btn-primary">Selecionar</button>
                </div>


            </div>

        </div>
    </div>
</template>
