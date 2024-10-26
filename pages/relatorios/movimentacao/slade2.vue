<template> 
	<section class="mx-auto max-w-7xl">
	<TabPanel>
                <div class="mx-auto max-w-7xl">
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
                </TabPanel>
                <div class="gap-5 px-4 py-4  flex">
                    <button class="bg-slate-300 px-3 py-3"><</button>
                    <NuxtLink to="movimentacao/slade1"> 
                    <button class="bg-slate-400 px-3 py-3">1</button>
                    </NuxtLink>
                    <NuxtLink to="movimentacao/slade2"> 
                    <button class="bg-slate-300 px-3 py-3">2</button>
                    </NuxtLink>
                    <button class="bg-slate-300 px-3 py-3">></button>
                </div>
	</section>
</template>
<script setup>
    let nome ="27/03/2024"
</script>