<script lang="ts" setup>
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import type { ArquivoProjeto, Orcamento } from '@/types/types';
import { useAppStore } from '@/stores/index';
import { useDirectusFlow } from '@/stores/directus-flow';
const store = useAppStore();

const modal1 = ref(false);
const modal2 = ref(false);
const modal3 = ref(false);
const orcamento = ref<Orcamento>({} as Orcamento);
const vaos = ref<ArquivoProjeto[]>();

const { getItems } = useDirectusItems();


const results: Orcamento[] = await getItems({
    collection: 'orcamento',
    params: {
        filter: {
            status: { '_eq': 'aprovado' }
        }
    }
});

const entrega = async (item: Orcamento) => {
    orcamento.value = {};
    vaos.value = [];
    const flow = useDirectusFlow();
    const flowData = await flow.get('a2db6a28-52d5-4d38-bdfe-ccd57b48e7e3', { chave: item.chave });
    orcamento.value = flowData;

    vaos.value = flowData.vaos;

    orcamento.value = item;
    modal3.value = true;
}

</script>

<template>
    <div class="panel mx-auto max-w-7xl bg-white">
        <div class="mx-auto flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold">PEDIDO</h2>
                <h2 class="font-semibold">PEDIDOS CLIENTE E FORNECEDORES</h2>
            </div>
            <button @click.prevent="isCreateVigaOpen = true" class="btn btn-primary px-4 py-2" type="button">
                <icon-plus class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                Novo Orçamento
            </button>
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
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="(item, index) in results" :key="index">
                        <td>ID {{ item.id }}</td>
                        <td>
                            <NuxtLink :to="`/vendas/ordem-de-producao/${item.chave}`">
                                {{ item.responsavel }}
                            </NuxtLink>
                        </td>
                        <td>{{ item.telefone }}</td>
                        <td>{{ $filters.moedaBRL(item.valor) }}</td>
                        <td class="text-[#4AB858]">APROVADO</td>
                        <td>{{ $filters.formatDate(item.date_created) }}</td>
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
                                        <NuxtLink :to="`/vendas/ordem-de-producao/${item.chave}`">
                                            <el-dropdown-item>
                                                Ir para Produção
                                            </el-dropdown-item>
                                        </NuxtLink>
                                        <el-dropdown-item @click="entrega(item)"> Comanda Entrega</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <TransitionRoot appear :show="modal3" as="template">
            <Dialog as="div" @close="modal3 = false" class="relative z-50">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-start justify-center px-4 py-8">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="panel w-full max-w-4xl overflow-hidden rounded-lg border-0 p-8 text-black dark:text-white-dark">
                                <button class="btn btn-primary space-x-2">
                                    <icon-printer />
                                    <span>Imprimir</span>
                                </button>

                                <icon-logo class="my-5 h-20" />

                                <div class="flex items-center justify-between">
                                    <div class="text-4xl font-semibold">
                                        <p class="text-primary">Comanda Entrega</p>
                                        <p>Laje <span class="text-primary">+</span> Isopor <span
                                                class="text-primary">+</span>
                                            Aço</p>
                                    </div>
                                    <icon-truck class="h-20" />
                                </div>

                                <div class="my-5 flex items-center justify-between text-3xl font-semibold">
                                    <span>DATA DE ENTREGA</span>
                                    <span>{{ $filters.formatDate(orcamento.prazo_final) }}</span>
                                </div>

                                <hr />

                                <div class="my-5">
                                    <span class="font-semibold text-primary">ENDEREÇO DE ENTREGA</span>
                                    <div class="grid grid-cols-4 gap-2">
                                        <span class="col-span-4">{{ orcamento.endereco_completo }}</span>

                                        <span class="col-span-2 font-semibold">Data de Entrega : {{
                                            $filters.formatDate(orcamento.prazo_inicial) }} á
                                            {{ $filters.formatDate(orcamento.prazo_final) }}</span>
                                        <span class="font-semibold">Contato : {{ orcamento.telefone }}</span>
                                        <span class="font-semibold"></span>
                                        <span class="font-semibold">VENDA : {{ store.empresa?.nome }}</span>
                                        <span class="font-semibold">PEDIDO : {{ orcamento.id }}</span>
                                    </div>
                                </div>

                                <div class="my-5 space-y-2">
                                    <span class="font-semibold text-primary">MATERIAL</span>
                                    <div class="grid grid-cols-6 gap-2 text-sm">
                                        <span class="text-center">QTD</span>
                                        <span class="text-center">TIPO LAJE</span>
                                        <span class="text-center">TRELIÇA</span>
                                        <span class="text-center">COMPRI. DE VIGAS</span>
                                        <span class="text-center">SOBRECARGA</span>
                                        <span class="text-center">AÇO ADICIONAL</span>
                                    </div>
                                    <div v-for="(item, index) in vaos" :key="index">
                                        <div class="grid grid-cols-6 gap-2 text-sm">
                                            <span class="text-center">
                                                {{ item.quantidade_vigas }}
                                            </span>
                                            <span class="text-center">
                                                <span v-if="item.enchimento == 1">
                                                    Treliça / Eps
                                                </span>
                                                <span v-if="item.enchimento == 2">
                                                    Treliça / Cer
                                                </span>
                                                <span v-if="item.enchimento == 3">
                                                    Painel Maciço
                                                </span>
                                                <span v-if="item.enchimento == 4">
                                                    Painel Aliviado
                                                </span>
                                            </span>
                                            <span class="text-center">
                                                {{ item.viga.tipo_trelica.nome }}
                                            </span>
                                            <span class="text-center">
                                                {{ item.comprimento_viga?.toFixed(2) }}
                                            </span>
                                            <span class="text-center">
                                                {{ item?.sobrecarga?.sobrecarga_min }}KG
                                            </span>
                                            <span class="text-center">
                                                {{ item.quantidade_aco1 }} ¢{{ item.diametro_aco1?.diametro_do_aco
                                                }} +
                                                {{ item.quantidade_aco2 }} ¢{{ item.diametro_aco2?.diametro_do_aco
                                                }} +
                                                {{ item.quantidade_aco3 }} ¢{{ item.diametro_aco3?.diametro_do_aco
                                                }}
                                            </span>
                                        </div>

                                        <div class="flex justify-around">
                                            <div v-for="item in 32" class="h-4 w-6 rounded border border-gray-400">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="my-5">
                                    <span class="font-semibold text-primary">ENCHIMENTO</span>
                                    <hr />
                                </div>
                                <div class="table-responsive rounded-2xl bg-[#f3f3f3]">
                                    <table>
                                        <thead class="text-boton text-normal">
                                            <tr>
                                                <th>ENCHIMENTO</th>
                                                <th>MARCA</th>
                                                <th>DIMENSÕES</th>
                                                <th>TIPO</th>
                                                <th>QUANTIDADE</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr>
                                                <td>TIJOLOS</td>
                                                <td>ISOFORT</td>
                                                <td>330 X 70 X 1000 MM</td>
                                                <td>T2</td>
                                                <td>300</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="my-5">
                                    <span class="font-semibold text-primary">BARRAS DE AÇO</span>
                                    <hr />
                                </div>
                                <div class="table-responsive rounded-2xl bg-[#f3f3f3]">
                                    <table>
                                        <thead class="text-boton text-normal">
                                            <tr>
                                                <th>MARCA</th>
                                                <th>TIPO</th>
                                                <th>DIAMETRÔ</th>
                                                <th>COMPRIMENTO</th>
                                                <th>QUANTIDADE</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr>
                                                <td>AÇO CA60</td>
                                                <td>CA 60</td>
                                                <td>4.2MM</td>
                                                <td>12M</td>
                                                <td>100</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
