<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRoleBySlug } from '~/utils/directus.js';
import * as sweetalert2 from 'sweetalert2';

definePageMeta({
    layout: 'auth-layout'
});

const { login, createUser } = useDirectusAuth();
const { createItems } = useDirectusItems();
const router = useRouter();

const form = ref({
    first_name: '',
    email: '',
    contato_1: '',
    role: getRoleBySlug('gestor'),
    documento: '',
    password: '',
    checkbox: ''
});

const setRole = (role: string) => {
    form.value.role = getRoleBySlug(role);
};

// create a computed to give classes if role is active
const isActiveRoleClass = (role: string) => {
    return form.value.role === role ? 'bg-[#ff9400] py-2 text-xs text-white md:text-sm' : 'py-2 text-xs md:text-sm';
};

const submit = async () => {
    try {
        await createUser(form.value);
        await login(form.value);

        const items = [
            {
                documento: form.value.documento.replace(/[^0-9]/g, ''),
                email: form.value.email,
                whatsapp: form.value.contato_1
            }
        ];

        const company = await createItems({ collection: 'empresa', items });

        const cookie = useCookie('company');
        cookie.value = JSON.stringify(company[0]);

        await router.push('/users/user-account-settings');
    } catch (e: any) {
        await sweetalert2.default.fire({
            title: 'Erro ao cadastrar usuário',
            text: e.message,
            icon: 'error'
        });
    }
};
</script>

<template>
    <section>
        <header
            class="container relative mx-auto flex max-w-6xl flex-col overflow-hidden px-4 py-4 text-slate-700 lg:flex-row lg:items-center">
            <a href="#" class="flex items-center whitespace-nowrap text-2xl font-black">
                <span class="mr-2 w-8">
                    <img src="/assets/images/logo.svg" alt="Imagem do logotipo" />
                </span>
                <span class="font-bold text-black">icon</span>
            </a>
            <input type="checkbox" class="peer hidden" id="navbar-open" />
            <label class="absolute right-5 top-5 cursor-pointer lg:hidden" for="navbar-open">
                <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </label>
            <nav aria-label="Header Navigation"
                class="flex max-h-0 w-full flex-col items-center overflow-hidden transition-all peer-checked:max-h-60 peer-checked:pt-8 lg:ml-24 lg:max-h-full lg:flex-row">
                <ul class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
                    <li class="text-red-500 lg:mr-12">
                        <a class="" href="#">Início</a>
                    </li>
                    <li class="lg:mr-12">
                        <a class="" href="#">Planos</a>
                    </li>
                    <li class="lg:mr-12">
                        <a class="" href="#">Soluções</a>
                    </li>
                    <li class="lg:mr-12">
                        <a class="" href="#">Ajuda</a>
                    </li>
                </ul>
                <hr class="mt-4 w-full lg:hidden" />
                <div class="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
                    <NuxtLink to="/auth/login" title=""
                        class="whitespace-nowrap rounded-xl border border-red-500 px-5 py-2 font-medium text-red-500">
                        Entrar
                    </NuxtLink>
                </div>
            </nav>
        </header>

        <div class="lg:bg-[#1E1E1F] h-[calc(100vh-132px)]">
            <div
                class="mx-auto flex max-w-6xl justify-center px-4 pt-6 md:pt-12 lg:grid lg:grid-cols-12 lg:pt-20 2xl:px-0">
                <div class="col-span-6 hidden lg:block">
                    <h1 class="mb-10 font-bold text-white lg:text-5xl">
                        2 milhões de <br />
                        pedidos em <br />
                        apenas um mês
                    </h1>
                    <p class="mb-16 text-2xl text-white">
                        Faça parte desse quadro e encurte o <br />
                        tempo de pedidos x vendas na icon.
                    </p>
                    <div class="flex items-center gap-4">
                        <div class="flex -space-x-3">
                            <img class="rounded-[50%] border-[3px] border-white bg-cover"
                                src="/assets/images/profile-11.jpeg " alt="imagem de avatar1"
                                style="object-fit: cover; width: 44px; height: 44px" />
                            <img class="rounded-[50%] border-[3px] border-white bg-cover"
                                src="/assets/images/profile-4.jpeg " alt="imagem de avata2"
                                style="object-fit: cover; width: 44px; height: 44px" />
                            <img class="rounded-[50%] border-[3px] border-white bg-cover"
                                src="/assets/images/profile-14.jpeg " alt="imagem de avatar3"
                                style="object-fit: cover; width: 44px; height: 44px" />
                        </div>

                        <div class="md:blockspace-y-1 hidden text-white md:block">
                            <p class="text-lg font-bold">Somos mais de 10k de clientes</p>
                            <div class="flex items-center gap-2 text-base">
                                <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.4603 5.88426C15.4131 5.7454 15.3264 5.6234 15.2107 5.5333C15.095 5.4432 14.9554 5.38895 14.8093 5.37726L10.5335 5.03751L8.68327 0.941755C8.62434 0.809839 8.5285 0.697796 8.4073 0.619148C8.28611 0.5405 8.14474 0.498609 8.00026 0.49853C7.85578 0.49845 7.71437 0.540187 7.59309 0.618701C7.47181 0.697216 7.37584 0.809154 7.31677 0.941005L5.46652 5.03751L1.19077 5.37726C1.04711 5.38864 0.909773 5.44116 0.795186 5.52855C0.680599 5.61594 0.593614 5.7345 0.54464 5.87003C0.495665 6.00556 0.486773 6.15233 0.519028 6.29278C0.551284 6.43324 0.62332 6.56142 0.72652 6.66201L3.88627 9.74226L2.76877 14.5813C2.73484 14.7277 2.74571 14.881 2.79998 15.0212C2.85426 15.1615 2.94942 15.2821 3.07312 15.3676C3.19682 15.453 3.34336 15.4994 3.49371 15.5005C3.64406 15.5016 3.79128 15.4576 3.91627 15.374L8.00002 12.6515L12.0838 15.374C12.2115 15.4588 12.3622 15.5025 12.5155 15.4991C12.6688 15.4958 12.8174 15.4455 12.9413 15.3552C13.0652 15.2649 13.1585 15.1387 13.2086 14.9938C13.2587 14.8489 13.2632 14.6921 13.2215 14.5445L11.8498 9.74451L15.2518 6.68301C15.4745 6.48201 15.5563 6.16851 15.4603 5.88426Z"
                                            fill="#F2C94C" />
                                    </svg>
                                </span>
                                <span>4,8</span>
                                <span class="text-[#FEA7A7]">(12.5k classificação)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="col-span-4 mb-4 flex flex-col space-y-2 px-3 md:col-span-4 md:mb-0 md:justify-center lg:col-span-6 lg:space-y-0 lg:px-0">
                    <ul
                        class="grid grid-cols-4 divide-x bg-white text-center text-base text-[#FF9400] lg:shadow-[20px_0px_0px_0px_rgba(0,0,0,1)]">
                        <li class="bg-[#ff9400] py-2 text-xs text-white md:text-sm">Fornecedor</li>
                        <li :class="isActiveRoleClass('cliente')" @click.prevent="setRole('cliente')"
                            class="py-2 text-xs md:text-sm">Cliente
                        </li>
                        <li :class="isActiveRoleClass('vendedor')" @click.prevent="setRole('vendedor')"
                            class="py-2 text-xs md:text-sm">Vendedor
                        </li>
                        <li :class="isActiveRoleClass('profissional')" @click.prevent="setRole('profissional')"
                            class="py-2 text-xs md:text-sm">
                            Profissional
                        </li>
                    </ul>

                    <div
                        class="rounded-t-2xl bg-white px-4 lg:rounded-t-none lg:px-0 lg:shadow-[20px_0px_0px_0px_rgba(0,0,0,1)]">
                        <div class="lg:p-6">
                            <div
                                class="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                            </div>
                            <h4 class="mb-2 text-2xl font-bold text-[#2F2F2F]">Cadastre seu estabelecimento</h4>
                            <p class="mb-6 font-medium text-[#2F2F2F]">Faça seu primeiro pedido online!</p>

                            <form @submit.prevent="submit()" id="" class="mb-4" action="#" method="POST">
                                <div class="mb-4">
                                    <label for="name" class="mb-2 inline-block text-xs font-medium">Nome
                                        Completo</label>
                                    <input v-model="form.first_name" type="text"
                                        class="bg--100 block w-full cursor-text appearance-none rounded-md border px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                                        id="name" name="name" placeholder="João da Silva" />
                                </div>
                                <div class="mb-4">
                                    <label for="email" class="mb-2 inline-block text-xs font-medium">E-mail</label>
                                    <input v-model="form.email" type="email"
                                        class="bg--100 block w-full cursor-text appearance-none rounded-md border px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                                        id="email" name="email-username" placeholder="email@email.com.br" />
                                </div>
                                <div class="mb-4">
                                    <label for="text" class="mb-2 inline-block text-xs font-medium">Cnpj</label>
                                    <input v-model="form.documento" type="text"
                                        class="bg--100 block w-full cursor-text appearance-none rounded-md border px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                                        id="cnpj" name="cnpj" placeholder="XX.XXX.XXX/0001-XX"
                                        v-mask="['###.###.###-##', '##.###.###/####-##']" />
                                </div>
                                <div class="mb-4">
                                    <div class="flex justify-between">
                                        <label class="mb-2 inline-block text-xs font-medium" for="password">Celular (com
                                            DDD)</label>
                                    </div>
                                    <div class="relative flex w-full flex-wrap items-stretch">
                                        <input v-model="form.contato_1" type="tel" id="telefone"
                                            class="bg--100 relative block flex-auto cursor-text appearance-none rounded-md border px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                                            name="telefone" placeholder="(00) 00000-0000" v-mask="'(##) #####-####'" />
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <div class="flex justify-between">
                                        <label class="mb-2 inline-block text-xs font-medium"
                                            for="password">Senha</label>
                                    </div>
                                    <div class="relative flex w-full flex-wrap items-stretch">
                                        <input v-model="form.password" type="password" id="senha"
                                            class="bg--100 relative block flex-auto cursor-text appearance-none rounded-md border px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                                            name="telefone" placeholder="********" />
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <div class="block space-x-2">
                                        <input v-model="form.checkbox" type="checkbox" id="termo" name="termo"
                                            style="color: #ff9400" value="termo" />
                                        <span>Eu concordo com os termos de uso e politica de privacidade da icon</span>
                                    </div>
                                </div>
                                <div class="">
                                    <button
                                        class="grid w-full cursor-pointer select-none rounded-3xl border bg-gradient-to-r from-[#FF9400] to-[#FD1A16] px-5 py-4 text-center align-middle text-sm text-white shadow focus:text-white focus:shadow-none"
                                        type="submit">
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer class="mx-auto flex max-w-6xl flex-col items-center py-3 text-base md:flex-row md:justify-between md:px-4">
        <img src="/assets/images/logo.svg" alt="" class="mb-2 w-12 md:mb-0" />
        <p class="text-neutral-500">Termos I Política de Privacidade</p>
        <p class="mt-2 md:mt-0">2024 - Todos os direitos reservados à icon</p>
    </footer>
</template>

<style scoped>
body {
    scroll-behavior: smooth;
    background-color: white;
}
</style>
