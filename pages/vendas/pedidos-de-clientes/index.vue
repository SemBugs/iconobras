<script lang="ts" setup>
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import type { Orcamento } from '@/types/types';
import { useAppStore } from '@/stores/index';
const { getItems } = useDirectusItems();
import { useDirectusFlow } from '@/stores/directus-flow';
const results = ref<Orcamento[]>([]);

const flow = useDirectusFlow();

const getOrcamentos = async () => {
    results.value = await getItems({
        collection: 'orcamento',
        params: {
            filter: {
                status: { '_eq': 'aprovado' }
            }
        }
    })
}

onMounted(() => {
    getOrcamentos();
})

</script>

<template>
    <TabPanel>
        <div class="mx-auto bg-white panel">
            <div class="mx-auto flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold">PEDIDO</h2>
                    <h2 class="font-semibold">PEDIDOS CLIENTE E FORNECEDORES</h2>
                </div>
                <NuxtLink to="/vendas/orcamentos/step/novo" class="btn btn-primary px-4 py-2" type="button">
                    <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                    Novo Orçamento
                </NuxtLink>
            </div>

            <div class="mt-5 space-y-5 dark:bg-[#0e1726]">
                <div>
                    <div class="cursor-pointer rounded-t-md">
                        <form class="space-y-5">
                            <div class="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                                <div>
                                    <label for="gridEmail">Selecione o fornecedor</label>
                                    <div class="relative">
                                        <input type="text" placeholder="Buscar"
                                            class="peer form-input py-2 ltr:pr-11 rtl:pl-11" v-model="search_trelica"
                                            @change="changeTab(0)" />
                                        <div
                                            class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                            <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF" stroke-width="1.5"
                                                    opacity="0.5"></circle>
                                                <path d="M18.5 18.5L22 22" stroke="#983AAF" stroke-width="1.5"
                                                    stroke-linecap="round"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- TabelaGrande -->
            <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                <table>
                    <thead class="text-boton text-normal">
                        <tr>
                            <th>N°</th>
                            <th>CONTATO</th>
                            <th>TELFONE</th>
                            <th>VALOR</th>
                            <th>STATUS</th>
                            <th>DATA</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="(item, index) in results" :key="index">
                            <td>
                                ID {{ item.id }}
                            </td>
                            <td>
                                {{ item.responsavel }}
                            </td>
                            <td>
                                {{ item.telefone }}
                            </td>
                            <td>
                                {{ $filters.moedaBRL(item.valor) }}
                            </td>
                            <td class="text-[#4AB858]">
                                APROVADO
                            </td>
                            <td>
                                {{ $filters.formatDate(item.date_created) }}
                            </td>
                            <td class="max-w-[40px]">
                            </td>
                            <td>
                                <el-dropdown size="large" type="primary">
                                    <button type="button" class="btn btn-outline-primary dropdown-toggle">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90 opacity-70">
                                            <circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                            <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>
                                                <NuxtLink :to="`/vendas/orcamentos/step/${item.id}?step=4`">
                                                    Editar Vigas
                                                </NuxtLink>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <NuxtLink :to="`/vendas/orcamentos/step/${item.id}?step=4`">
                                                    Editar Orçamento
                                                </NuxtLink>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <NuxtLink :to="`/vendas/orcamentos/step/${item.id}?step=4`">
                                                    Editar Treliça
                                                </NuxtLink>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <NuxtLink :to="`/vendas/orcamentos/step/${item.id}?step=4`">
                                                    Editar Isopor
                                                </NuxtLink>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </TabPanel>
</template>