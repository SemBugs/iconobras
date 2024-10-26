<script setup lang="ts">
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import type { Empresa } from '~/types/types';

const modal1 = ref(true);
const cookie = useCookie<Empresa>('company');
const companies = ref([] as Empresa[]);
const company = ref(cookie.value);


</script>

<template>
    <!-- Modal -->
    <TransitionRoot appear :show="false" as="template">
        <Dialog as="div" @close="modal1 = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="modal1 = false">
                                <svg> ...</svg>
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Selecione a empresa
                            </div>
                            <div class="p-5">
                                <ul>
                                    <li v-for="company in useCookie('company').value">{{ company }}</li>
                                </ul>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped></style>
