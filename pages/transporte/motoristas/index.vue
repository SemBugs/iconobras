<script lang="ts" setup>
import type { Motorista } from '@/types/types';

const { getItems, updateItem } = useDirectusItems();

const router = useRouter();

const results = ref<Motorista[]>([]);

const actionApagar = async (id: number) => {
    await updateItem({ collection: 'motorista', id: id, item: { status: 'draft' } });
    getResults();
};

const getResults = async () => {
    results.value = await getItems<any>({
        collection: "motorista", params: {
            filter: {
                status: { '_eq': 'published' },
                tipo: { '_eq': 'm' }
            }
        }
    });
};

onMounted(() => {
    getResults();
});

</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Motoristas</h2>
                <div class="flex gap-5">
                    <NuxtLink to="/transporte/motoristas/create">
                        <button class="btn btn-primary">
                            Novo motorista
                        </button>
                    </NuxtLink>
                    <div>
                        <div class="relative">
                            <input type="text" placeholder="Pesquisar"
                                class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                            <div
                                class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                <NuxtLink to="/faturarparamotorista/filtro">
                                    <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF" stroke-width="1.5"
                                            opacity="0.5"></circle>
                                        <path d="M18.5 18.5L22 22" stroke="#983AAF" stroke-width="1.5"
                                            stroke-linecap="round"></path>
                                    </svg>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TabelaGrande -->
            <div v-if="results.length <= 0"
                class="table-responsive items-center justify-center flex flex-col w-auto mt-12 rounded-md py-20 space-y-6 bg-[#f3f3f3]">
                <button class="w-10">
                    <icon-box />
                </button>
                <p class="font-bold text-xl">Nenhum registro encontrado</p>
            </div>

            <div v-if="results.length > 0">
                <div class="table-responsive">
                    <table class="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th width="150" class="!text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item in results" :key="item.id">
                                <tr>
                                    <td>
                                        <div class="flex w-max items-center">
                                            <div
                                                class="grid h-8 w-8 place-content-center rounded-full bg-primary text-sm font-semibold text-white ltr:mr-2 rtl:ml-2 uppercase">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="shrink-0 group-hover:!text-primary">
                                                    <circle opacity="0.5" cx="15" cy="6" r="3" fill="currentColor">
                                                    </circle>
                                                    <ellipse opacity="0.5" cx="16" cy="17" rx="5" ry="3"
                                                        fill="currentColor"></ellipse>
                                                    <circle cx="9.00098" cy="6" r="4" fill="currentColor"></circle>
                                                    <ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="currentColor">
                                                    </ellipse>
                                                </svg>
                                            </div>

                                            <div>{{ item.nome }}</div>
                                        </div>
                                    </td>
                                    <td>{{ item.documento }}</td>
                                    <td class="whitespace-nowrap">{{ item.telefone }}</td>
                                    <td>
                                        <el-dropdown size="large" type="primary">
                                            <button type="button" class="btn btn-outline-primary dropdown-toggle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 rotate-90 opacity-70">
                                                    <circle cx="5" cy="12" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                    <circle cx="19" cy="12" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                </svg>
                                            </button>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item
                                                        @click="router.push('/transporte/motoristas/' + item.id)">
                                                        Editar
                                                    </el-dropdown-item>
                                                    <el-dropdown-item @click="actionApagar(item.id)">
                                                        Apagar
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>

                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
