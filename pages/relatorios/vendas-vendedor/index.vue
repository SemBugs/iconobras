<script setup>
    definePageMeta({
        middleware: 'auth'
    });
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Relatório de Vendas por Vendedor
                </h2>
                <div class="flex gap-5">
                    <button
                        class="btn btn-primary gap-x-2">
                        <icon-printer />
                        Imprimir
                    </button>
                    <div class=" gap-3 bg-white text-gray-400 rounded-md border flex items-center justify-center">
                        <icon-calendar class="ml-2" />
                        <input type="text" placeholder="30/03/2024"
                               class="w-28 flex items-center justify-center rounded-md border-none px-2 py-2 " />
                        <span class="">Ate</span>
                        <input type="text" placeholder="30/03/2024"
                               class="w-28 flex items-center justify-center rounded-md border-none px-2 py-2 ">
                    </div>
                    <select class="w-8 rounded-md">
                        <option>Sem dados</option>
                    </select>
                </div>
            </div>

            <!-- TabelaGrande -->
            <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                <div class="py-4 px-4">
                    <p> Empresa: CT DA VE</p>
                    <p>CNPJ: 47.457.515/0001-89</p>
                    <p>Período: 30/03/2024 ate 30/03/2024</p>
                </div>
                <table>
                    <thead class="text-boton text-normal">
                    <tr>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                </table>
                <div class="p-4 space-y-3">
                    <h1 class="text-xl">Resumo</h1>
                    <p>Preço de total das vendas: R$0,00</p>
                    <p>Comissão: R$0,00</p>
                </div>
            </div>
        </div>
    </section>
</template>
