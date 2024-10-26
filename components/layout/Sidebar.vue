<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300">
            <div class="h-full bg-white dark:bg-[#0e1726]">
                <div class="flex items-center justify-between px-4 py-3">
                    <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
                        <img class="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="" />
                        <img class="ml-2 inline w-14 rtl:-mr-1" src="/assets/images/nomeicon.svg" alt="" />
                    </NuxtLink>
                    <a href="javascript:;"
                        class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                        @click="store.toggleSidebar()">
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>
                <client-only>
                    <perfect-scrollbar :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }" class="relative h-[calc(100vh-80px)]">
                        <ul class="relative space-y-0.5 p-4 py-8 font-semibold">
                            <li class="menu nav-item">
                                <NuxtLink to="/" type="button" class="nav-link group w-full">
                                    <div class="flex items-center">
                                        <icon-menu-dashboard class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                            <NuxtLink to="/" @click="toggleMobileMenu">{{ $t('dashboard') }}</NuxtLink>
                                        </span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <h2
                                class="-mx-4 mb-1 flex items-center bg-red-50 px-7 py-3 font-bold text-primary dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('apps') }}</span>
                            </h2>

                            <li class="nav-item">
                                <!--Menu-->
                                <ul>
                                    <li class="nav-item">
                                        <NuxtLink to="/clientes" class="group" @click="toggleMobileMenu">
                                            <div class="flex items-center">
                                                <icon-menu-contacts class="shrink-0 group-hover:!text-primary" />

                                                <span
                                                    class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                                    Clientes
                                                </span>
                                            </div>
                                        </NuxtLink>
                                    </li>

                                    <li class="nav-item">
                                        <NuxtLink to="" class="group" @click="toggleMobileMenu">
                                            <div class="flex items-center">
                                                <icon-menu-notes class="shrink-0 group-hover:!text-primary" />

                                                <span
                                                    class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                        $t('notes')
                                                    }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="" class="group" @click="toggleMobileMenu">
                                            <div class="flex items-center">
                                                <icon-menu-calendar class="shrink-0 group-hover:!text-primary" />

                                                <span
                                                    class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                        $t('calendar')
                                                    }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </li>

                            <h2
                                class="-mx-4 mb-1 flex items-center bg-red-50 px-7 py-3 font-bold text-primary dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('user_interface') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <!--Faturamento-->
                                <button type="button" class="nav-link group w-full"
                                    :class="{ active: activeDropdown === 'invoice' }"
                                    @click="activeDropdown === 'invoice' ? (activeDropdown = null) : (activeDropdown = 'invoice')">
                                    <div class="flex items-center">
                                        <icon-menu-invoice class="shrink-0 group-hover:!text-primary" />

                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                $t('invoice')
                                            }}</span>
                                    </div>
                                    <div :class="{ '-rotate-90 rtl:rotate-90': activeDropdown !== 'invoice' }">
                                        <icon-caret-down />
                                    </div>
                                </button>
                                <vue-collapsible :isOpen="activeDropdown === 'invoice'">
                                    <ul class="sub-menu text-gray-500">
                                        <li>
                                            <NuxtLink to="/vendas/orcamentos/list" @click="toggleMobileMenu">
                                                {{ $t('Orçamentos') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/vendas/ordem-de-producao" @click="toggleMobileMenu">
                                                {{ $t('Ordem de produção') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/vendas/pedidos-de-clientes" @click="toggleMobileMenu">
                                                {{ $t('Pedidos de clientes') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/vendas/notas" @click="toggleMobileMenu">
                                                {{ $t('Nota Fiscal') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/vendas/vendedores" @click="toggleMobileMenu">{{
                                                $t('Vendedores') }}</NuxtLink>
                                        </li>
                                    </ul>
                                </vue-collapsible>
                            </li>
                            <li class="menu nav-item">
                                <NuxtLink to="/produtos">
                                    <button type="button" class="nav-link group w-full">
                                        <div class="flex items-center">
                                            <icon-menu-components class="shrink-0 group-hover:!text-primary" />

                                            <span
                                                class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                                {{ $t('Produtos') }}
                                            </span>
                                        </div>
                                    </button>
                                </NuxtLink>
                            </li>
                            <li class="menu nav-item">
                                <button type="button" class="nav-link group w-full"
                                    :class="{ active: activeDropdown === 'shopping' }"
                                    @click="activeDropdown === 'shopping' ? (activeDropdown = null) : (activeDropdown = 'shopping')">
                                    <div class="flex items-center">
                                        <icon-menu-forms class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                $t('shopping')
                                            }}</span>
                                    </div>
                                    <div :class="{ '-rotate-90 rtl:rotate-90': activeDropdown !== 'shopping' }">
                                        <icon-caret-down />
                                    </div>
                                </button>
                                <vue-collapsible :isOpen="activeDropdown === 'shopping'">
                                    <ul class="sub-menu text-gray-500">
                                        <li>
                                            <NuxtLink to="/compras/ordem-compra" @click="toggleMobileMenu">
                                                {{ $t('Ordem de Compra') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/compras/fornecedores" @click="toggleMobileMenu">
                                                {{ $t('Fornecedores') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/compras/fiscal" @click="toggleMobileMenu">
                                                {{ $t('NF de Compra') }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </vue-collapsible>
                            </li>
                            <li class="menu nav-item">
                                <button type="button" class="nav-link group w-full"
                                    :class="{ active: activeDropdown === 'transport' }"
                                    @click="activeDropdown === 'transport' ? (activeDropdown = null) : (activeDropdown = 'transport')">
                                    <div class="flex items-center">
                                        <icon-menu-transport class="shrink-0 group-hover:!text-primary" />
                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                $t('transport')
                                            }}</span>
                                    </div>
                                    <div :class="{ '-rotate-90 rtl:rotate-90': activeDropdown !== 'transport' }">
                                        <icon-caret-down />
                                    </div>
                                </button>
                                <vue-collapsible :isOpen="activeDropdown === 'transport'">
                                    <ul class="sub-menu text-gray-500">
                                        <li>
                                            <NuxtLink to="/transporte/transportadoras/" @click="toggleMobileMenu">
                                                {{ $t('Transportadoras') }}
                                            </NuxtLink>
                                        </li>

                                        <li>
                                            <NuxtLink to="/transporte/motoristas" @click="toggleMobileMenu">
                                                {{ $t('Motoristas') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/transporte/veiculos" @click="toggleMobileMenu">
                                                {{ $t('Veículos e Reboques') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/transporte/manifesto" @click="toggleMobileMenu">
                                                {{ $t('Manifesto de Transporte') }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </vue-collapsible>
                            </li>

                            <li class="menu nav-item">
                                <button type="button" class="nav-link group w-full"
                                    :class="{ active: activeDropdown === 'elements' }"
                                    @click="activeDropdown === 'elements' ? (activeDropdown = null) : (activeDropdown = 'elements')">
                                    <div class="flex items-center">
                                        <icon-menu-charts class="shrink-0 group-hover:!text-primary" />

                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                $t('Relatórios')
                                            }}</span>
                                    </div>
                                    <div :class="{ '-rotate-90 rtl:rotate-90': activeDropdown !== 'elements' }">
                                        <icon-caret-down />
                                    </div>
                                </button>
                                <vue-collapsible :isOpen="activeDropdown === 'elements'">
                                    <ul class="sub-menu text-gray-500">
                                        <li>
                                            <NuxtLink to="/relatorios/fluxo" @click="toggleMobileMenu">
                                                {{ $t('Fluxo de Caixa') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/relatorios/vendas" @click="toggleMobileMenu">{{ $t('Vendas')
                                                }} </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/relatorios/vendas-vendedor" @click="toggleMobileMenu">
                                                {{ $t('Vendas por Vendedor') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/relatorios/fiscal" @click="toggleMobileMenu">
                                                {{ $t('Relatório Fiscal') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/relatorios/inventario" @click="toggleMobileMenu">
                                                {{ $t('Inventário de produto') }}
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/relatorios/movimentacao" @click="toggleMobileMenu">
                                                {{ $t('Movimentação de produto') }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </vue-collapsible>
                            </li>

                            <h2
                                class="-mx-4 mb-1 flex items-center bg-red-50 px-7 py-3 font-bold text-primary dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('user_and_pages') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <button type="button" class="nav-link group w-full"
                                    :class="{ active: activeDropdown === 'users' }"
                                    @click="activeDropdown === 'users' ? (activeDropdown = null) : (activeDropdown = 'users')">
                                    <div class="flex items-center">
                                        <icon-menu-users class="shrink-0 group-hover:!text-primary" />

                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                $t('users') }}</span>
                                    </div>
                                    <div :class="{ '-rotate-90 rtl:rotate-90': activeDropdown !== 'users' }">
                                        <icon-caret-down />
                                    </div>
                                </button>
                                <vue-collapsible :isOpen="activeDropdown === 'users'">
                                    <ul class="sub-menu text-gray-500">
                                        <li>
                                            <NuxtLink to="/" @click="toggleMobileMenu">{{ $t('profile') }}</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/users/user-account-settings" @click="toggleMobileMenu">
                                                {{ $t('account_settings') }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </vue-collapsible>
                            </li>

                            <h2
                                class="-mx-4 mb-1 flex items-center bg-red-50 px-7 py-3 font-bold text-primary dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('supports') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <a href="https://red7.com.br" target="_blank" class="nav-link group">
                                    <div class="flex items-center">
                                        <icon-menu-documentation class="shrink-0 group-hover:!text-primary" />

                                        <span
                                            class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{{
                                                $t('documentation')
                                            }}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </perfect-scrollbar>
                </client-only>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useAppStore } from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';

const store = useAppStore();
const activeDropdown: any = ref('');
const subActive: any = ref('');

onMounted(() => {
    setTimeout(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');

        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];

                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    });
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
