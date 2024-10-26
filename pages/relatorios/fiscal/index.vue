<script setup>
    definePageMeta({
        middleware: 'auth'
    });
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Relatório Fiscal
                </h2>
                <div class="flex gap-5">
                    <button
                        class="btn btn-primary gap-x-2">
                        <icon-printer />
                        Imprimir
                    </button>
                    <button
                        class="btn btn-primary gap-x-2">
                        <icon-download />
                        Baixar
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
                        <option>NF-e</option>
                        <option>NFC-e</option>
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
                        <th>Data de Emisão</th>
                        <th>Número</th>
                        <th>Serie</th>
                        <th>Chave</th>
                        <th>Status</th>
                        <th>Valor</th>
                    </tr>
                    </thead>
                </table>
                <div class="py-10">
                    <table>
                        <thead class="text-boton text-normal">
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Valor total cancelada</th>
                            <th>Valor total regular</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white">
                        <tr>
                            <td class="font-bold">Vendas</td>
                            <td>Nº Notas: 0</td>
                            <td>C-Canceladas: 0</td>
                            <td>R$ 0,00</td>
                            <td>R$ 0,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
