<template>
    <div class="mx-auto bg-white panel">
        <div class="mx-auto flex items-center justify-between">
            <h2 class="text-2xl font-bold">Vigas e Perfis</h2>
            <button @click.prevent="isCreateVigasOpen = true" class="btn btn-primary px-4 py-2" type="button">
                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                Adicionar novo
            </button>
        </div>
        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
            <table>
                <thead class="text-boton text-normal">
                    <tr>
                        <th>Tipo de Peça</th>
                        <th>Comprimento</th>
                        <th>Diâmetro</th>
                        <th>Preço</th>
                        <th>Código</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="(item, index) in results" :key="index">
                        <td>
                            {{ item.tipo_peca }}
                        </td>
                        <td>
                            {{ item.comprimento }}
                        </td>
                        <td>
                            {{ item.diamentro }}
                        </td>
                        <td>
                            {{ $filters.moedaBRL(item.preco) }}
                        </td>
                        <td>
                            {{ item.codigo }}
                        </td>
                        <td class="w-[60px]">
                            <div class="flex gap-5">
                                <button @click="editVigas(item)">
                                    <svg class="h-[25px] w-[25px]" width="30" height="31" viewBox="0 0 30 31"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>

                                <button @click="(deleteModal = true), (itemId = item.id)">
                                    <svg class="h-[24px] w-[24px]" width="24" height="26" viewBox="0 0 24 26"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.7998 5.98061C18.8038 5.58461 14.7839 5.38062 10.7759 5.38062C8.39991 5.38062 6.02392 5.50061 3.64794 5.74061L1.19995 5.98061"
                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M7.80029 4.76906L8.06429 3.19707C8.25629 2.05707 8.40029 1.20508 10.4283 1.20508H13.5723C15.6002 1.20508 15.7562 2.10507 15.9362 3.20907L16.2002 4.76906"
                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M20.2207 9.77332L19.4407 21.8572C19.3087 23.7412 19.2007 25.2052 15.8527 25.2052H8.14873C4.80076 25.2052 4.69276 23.7412 4.56076 21.8572L3.78076 9.77332"
                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M9.99634 18.6047H13.9923" stroke="#95979B" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.99927 13.8046H14.9992" stroke="#95979B" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        <!-- Modal -->
        <TransitionRoot appear :show="isCreateVigasOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-5xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                            <CreateConcretoModal @close="closeVigasModal" :tipo="'escora'" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogOverlay, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot } from '@headlessui/vue';

import CreateConcretoModal from './CreateVigasModal.vue';

const { getItems, deleteItem } = useDirectusItems();

const isCreateVigasOpen = ref(false);
const form = ref({});

const results = ref([
    {
        id: 1,
        tipo_peca: 'testes nome',
        diamentro: 'stamp',
        comprimento:'1.30',
        preco: '100.9',
        codigo: '1234',
    },
    {
        id: 2,
        tipo_peca: 'testes nome 1',
        diamentro: 'stamp',
        comprimento:'1.30',
        preco: '100.9',
        codigo: '1234',
    },
    {
        id: 3,
        tipo_peca: 'testes nome 2',
         diamentro: 'stamp',
         comprimento:'1.30',
        preco: '100.9',
        codigo: '1234',
    },
]);

const editVigas = (item) => {
    console.log(item)
    form.value = item;
    isCreateVigasOpen.value = true;
};

const closeVigasModal = () => {
    isCreateVigasOpen.value = false
    form.value = {}
    changeTab(0)
};
</script>