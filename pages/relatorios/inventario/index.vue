<script setup>
    definePageMeta({
        middleware: 'auth'
    });
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Inventário de Produtos</h2>
                <button
                    class="btn btn-primary gap-x-2">
                    <icon-printer />
                    Imprimir
                </button>
            </div>

            <!-- TabelaGrande -->
            <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                <div class="py-4 px-4">
                    <p class="text-2xl"> Resumo</p>
                    <p> Preço de custo total: R$ 69.180,00</p>
                    <p>Preço de venda total: R$ 84.780,00</p>
                    <p> Quantidade de Produtos neste relatório: 2305</p>
                </div>
                <div class="py-4 px-4">
                    <p class="text-2xl"> Observações sobre este relatório</p>
                    <p>1) Este relatório não computa eventual saldo em consignação existente na data base (01/04/2024)
                        do relatório</p>
                    <p> 2) Os valores relatodos (preços de custo e custo médio, unitários e totais) são valores vigentes
                        nesta data (01/04/2024), mesmo que a data base do estoque do relatório seja retroativa. </p>
                    <p class="text-red-500 mt-5"> ATENÇÃO: na sua base de produtos foram encontrados 1 itens com estoque
                        negativo na data base solicitada para o relatório. </p>
                </div>
            </div>
            <div class="table-responsive">
                <table>
                    <thead>
                    <tr>
                        <th rowspan="2">Produto</th>
                        <th rowspan="2">NCM</th>
                        <th rowspan="2">
                            Estoque em<br />
                        </th>
                        <th colspan="2" class="vs-red-th">Preço de custo</th>
                        <th colspan="2" class="vs-green-th">Custo Médio</th>
                    </tr>
                    <tr>
                        <th class="vs-red-th">Unitário</th>
                        <th class="vs-red-th">Total</th>
                        <th class="vs-green-th">Unitário</th>
                        <th class="vs-green-th">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="i in 10">
                        <td>
                            laje
                        </td>
                        <td>
                            1000.000
                        </td>
                        <td>
                            R$ 50,00
                        </td>
                        <td class="vs-red">
                            R$ 50.000,00
                        </td>
                        <td class="vs-red">
                            R$ 60,00
                        </td>
                        <td class="vs-green">
                            R$ 60.000,00
                        </td>
                        <td class="vs-green">
                            R$ 12.000,00
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
