<script setup>
    definePageMeta({
        middleware: 'auth'
    });
</script>

<template>
    <section class="mx-auto max-w-7xl">
        <div class="mx-auto flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#1B5870]">Movimentação de Produtos</h2>
            <div class="flex gap-5">
                <div class="relative">
                    <input type="text" placeholder="Pesquisar"
                           class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                    <div
                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                        <NuxtLink to="/faturarparacliente/filtro">
                            <svg class="mx-auto" width="16" height="16"
                                 viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                        stroke-width="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                      stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
                <select class="w-10 h-10 rounded-md">
                    <option>Entrada</option>
                    <option>Saída</option>
                </select>
            </div>

        </div>

        <!-- TabelaGrande -->
        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
            <table class="space-y-3">
                <thead class="text-boton text-normal">
                <tr>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Quantidade Movimentada</th>
                    <th>Tipo de Movimentação</th>
                    <th>Descrição</th>
                </tr>
                </thead>
                <tbody v-for="n in 10" class="">
                <td class="py-2 px-4">José Bastos</td>
                <td class="py-2 px-4">laje</td>
                <td class="py-2 px-4">1000</td>
                <td class="py-2 px-4">Entrada</td>
                <td class="py-2 px-4">Cadastro de novo produto</td>
                </tbody>

            </table>
        </div>
        <ul class="inline-flex items-center mt-2 space-x-1 rtl:space-x-reverse m-auto">
            <li>
                <button
                    type="button"
                    class="
        flex
        justify-center
        font-semibold
        px-3.5
        py-2
        rounded
        transition
        bg-white-light
        text-dark
        hover:text-white hover:bg-primary
        dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary
      "
                >
                    <
                </button>
            </li>
            <li>
                <button
                    type="button"
                    class="
        flex
        justify-center
        font-semibold
        px-3.5
        py-2
        rounded
        transition
        bg-white-light
        text-dark
        hover:text-white hover:bg-primary
        dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary
      "
                >
                    1
                </button>
            </li>
            <li>
                <button type="button"
                        class="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-primary text-white dark:text-white-light dark:bg-primary">
                    2
                </button>
            </li>
            <li>
                <button
                    type="button"
                    class="
        flex
        justify-center
        font-semibold
        px-3.5
        py-2
        rounded
        transition
        bg-white-light
        text-dark
        hover:text-white hover:bg-primary
        dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary
      "
                >
                    3
                </button>
            </li>
            <li>
                <button
                    type="button"
                    class="
        flex
        justify-center
        font-semibold
        px-3.5
        py-2
        rounded
        transition
        bg-white-light
        text-dark
        hover:text-white hover:bg-primary
        dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary
      "
                >
                    >
                </button>
            </li>
        </ul>
    </section>
</template>
