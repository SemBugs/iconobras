<script setup>
import { onMounted } from 'vue';

import { useAppStore } from '@/stores/index';
const store = useAppStore();

const { user } = useDirectusUsers();

const tab = ref('home')

definePageMeta({
    middleware: 'auth',
})

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

</script>

<template>
    <!-- <img class="h-14 w-14 overflow-hidden rounded-full object-cover" src="/assets/images/profile-12.jpeg" alt="" /> -->

    <div class="min-w-3xl max-w-6xl mx-auto mt-10">
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a class="text-primary hover:underline">Dashboard</a>
            </li>
            <!--            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">-->
            <!--                <span>Sales</span>-->
            <!--            </li>-->
        </ul>

        <div class="max-w-7xl mt-10">

            <div class="grid grid-cols-12 items-start gap-20">

                <div class="col-span-7 space-y-14">

                    <section v-if="user" class="flex items-center space-x-4">
                        <img v-if="user.avatar" class="w-12 h-12 aspect-[4/9] rounded-full"
                            :src="`https://api.iconobras.com/assets/${user.avatar}`" :alt="user?.first_name">
                        <h2 v-if="user.first_name" class="text-3xl font-semibold">Bem vindo, {{ user?.first_name }}</h2>
                    </section>

                    <section class="grid grid-cols-4 gap-8">

                        <div class="p-4 rounded-lg bg-white shadow-lg">
                            <div class="flex flex-col items-center space-y-2 font-medium text-gray-400">
                                <IconCalendar class="w-12 h-12 text-purple-500 bg-purple-500/10 p-3 rounded-full" />
                                <span>Pedidos</span>
                            </div>
                        </div>

                        <div class="p-4 rounded-lg bg-white shadow-lg">
                            <div class="flex flex-col items-center space-y-2 font-medium text-gray-400">
                                <IconWheel class="w-12 h-12 text-orange-500 bg-orange-500/10 p-3 rounded-full" />
                                <span>Entregas</span>
                            </div>
                        </div>

                        <div class="p-4 rounded-lg bg-white shadow-lg">
                            <div class="flex flex-col items-center space-y-2 font-medium text-gray-400">
                                <IconUsers class="w-12 h-12 text-cyan-500 bg-cyan-500/10 p-3 rounded-full" />
                                <span>Pedidos</span>
                            </div>
                        </div>

                        <div class="p-4 rounded-lg bg-white shadow-lg">
                            <div class="flex flex-col items-center space-y-2 font-medium text-gray-400">
                                <IconShoppingBag class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-full" />
                                <span>Pedidos</span>
                            </div>
                        </div>

                    </section>

                    <section class="grid grid-cols-2 gap-10 items-center">

                        <div>
                            <div class="flex items-start space-x-4">
                                <IconShoppingBag class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-lg" />
                                <div>
                                    <p class="text-gray-400">Entregas hoje</p>
                                    <h3 class="text-lg font-semibold">234</h3>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-start space-x-4">
                                <IconShoppingBag class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-lg" />
                                <div>
                                    <p class="text-gray-400">Faturados</p>
                                    <h3 class="text-lg font-semibold">R$ 10,596.80</h3>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-start space-x-4">
                                <IconShoppingBag class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-lg" />
                                <div>
                                    <p class="text-gray-400">Total no mês</p>
                                    <h3 class="text-lg font-semibold">R$ 5.250,90</h3>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-start space-x-4">
                                <IconShoppingBag class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-lg" />
                                <div>
                                    <p class="text-gray-400">Produtos</p>
                                    <h3 class="text-lg font-semibold">15</h3>
                                </div>
                            </div>
                        </div>

                    </section>

                    <section>
                    </section>

                </div>

                <div class="col-span-4 space-y-14">

                    <section>

                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-semibold">Clientes recentes</h3>
                                <p class="text-gray-400">18 atual</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <IconPencil class="w-5 h-5 text-primary" />
                                <IconSearch class="w-5 h-5 text-primary" />
                            </div>
                        </div>

                    </section>

                    <section class="space-y-6">

                        <div>
                            <h3 class="text-lg font-semibold">Entrou hoje</h3>
                        </div>

                        <div
                            class="flex justify-between items-center p-4 rounded-lg bg-white border border-gray-100 shadow-md">

                            <div class="flex space-x-4 font-semibold items-center">
                                <IconMastercard />
                                <span>Débito</span>
                            </div>

                            <div class="space-x-1">
                                <span class="font-semibold text-gray-400">R$</span>
                                <span class="font-bold">1.500,00</span>
                            </div>

                        </div>

                        <div class="flex flex-col p-4 space-y-4 rounded-lg bg-white border border-gray-100 shadow-md">

                            <div class="flex space-x-4 font-semibold items-center">
                                <img src="https://randomuser.me/api/portraits/women/91.jpg" class="w-6 h-6 rounded-full"
                                    alt="image">
                                <span class="font-medium text-gray-500">Janete Souza Aguiar</span>
                            </div>

                            <div class="space-x-1">
                                <span class="font-semibold text-2xl text-gray-400">R$</span>
                                <span class="font-bold text-2xl">1.500,00</span>
                            </div>

                        </div>

                        <div class="space-y-5">
                            <div class="flex justify-between items-center">
                                <div class="flex space-x-4 font-semibold items-center">
                                    <img src="https://randomuser.me/api/portraits/women/91.jpg"
                                        class="w-6 h-6 rounded-full" alt="image">
                                    <span class="font-medium text-gray-500">Janete Souza Aguiar</span>
                                </div>

                                <div>
                                    <IconPlus class="w-6 h-6 text-red-500 bg-red-500/10 p-0.5 rounded-full" />
                                </div>
                            </div>

                            <button type="button" class="btn btn-primary w-full">Ver Vendas</button>
                        </div>

                        <div>
                            <p class="text-gray-400">Lembretes para Hoje</p>
                            <ul class="divide-y">
                                <li v-for="item in 2">
                                    <div class="my-3">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <IconBolt class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-lg" />
                                                <div>
                                                    <p class="text-lg">Copaza</p>
                                                    <h3 class="text-green-500 text-sm">pago</h3>
                                                </div>
                                            </div>
                                            <span class="text-red-500">- R$ 280,00</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <p class="text-gray-400">Amanhã</p>
                            <ul class="divide-y">
                                <li v-for="item in 4">
                                    <div class="my-3">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <IconBolt class="w-12 h-12 text-red-500 bg-red-500/10 p-3 rounded-lg" />
                                                <div>
                                                    <p class="text-lg">Copaza</p>
                                                    <h3 class="text-green-500 text-sm">pago</h3>
                                                </div>
                                            </div>
                                            <span class="text-red-500">- R$ 280,00</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </section>

                </div>

            </div>

        </div>


    </div>
</template>
