<script setup lang="ts">
import type { VeiculoReboque } from '~/types/types';
import sweetalert2 from 'sweetalert2';
import { ElNotification } from 'element-plus';

const { getItems, deleteItems } = useDirectusItems();

const veiculos = ref([] as VeiculoReboque[]);

const deleteVeiculo = async (veiculo: VeiculoReboque) => {
    try {
        sweetalert2
            .fire({
                title: 'Você tem certeza?',
                text: 'Você não poderá reverter isso!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
            })
            .then(async (result: { isConfirmed: any }) => {
                if (result.isConfirmed) {
                    await deleteItems({ collection: 'veiculo_reboque', items: [veiculo.id] });
                    veiculos.value = veiculos.value.filter((v: VeiculoReboque) => v.id !== veiculo.id);
                    await sweetalert2.fire('Deletado!', 'Veículo deletado com sucesso.', 'success');
                }
            });
    } catch (e) {
        await sweetalert2.fire({
            icon: 'error',
            title: 'Erro ao deletar veículo',
            text: 'Tente novamente',
        });
    }
};

onMounted(async () => {
    veiculos.value = await getItems({ collection: 'veiculo_reboque' });
});
</script>

<template>
    <section>
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Veículos e Reboques</h2>
                <div class="flex gap-5">
                    <NuxtLink to="/transporte/veiculos/create">
                        <button class="btn btn-primary">Novo veículo</button>
                    </NuxtLink>
                    <!--                    <button-->
                    <!--                        class=" rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">-->
                    <!--                        <icon-instagram />-->
                    <!--                    </button>-->
                    <!--                    <button-->
                    <!--                        class=" rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">-->
                    <!--                        <icon-instagram />-->
                    <!--                    </button>-->
                    <div>
                        <div class="relative">
                            <input type="text" placeholder="Pesquisar"
                                class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                            <div
                                class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                <NuxtLink to="/faturarparacliente/filtro">
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
            <div v-if="veiculos.length > 0" class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                <table>
                    <thead class="text-boton text-normal">
                        <tr>
                            <th>Placa</th>
                            <th>Renavam</th>
                            <th>Tipo de Veículo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="veiculo in veiculos" :key="veiculo.id">
                            <td>{{ veiculo.placa }}</td>
                            <td>{{ veiculo.renavam }}</td>
                            <td>{{ veiculo.tipo_de_veiculo }}</td>
                            <td class="flex gap-3">
                                <NuxtLink :to="'/transporte/veiculos/' + veiculo.id">
                                    <icon-pencil-fill class="cursor-pointer" />
                                </NuxtLink>

                                <icon-recycle-bin-fill @click.prevent="deleteVeiculo(veiculo)" class="cursor-pointer" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="veiculos.length === 0"
                class="table-responsive mt-12 flex w-auto flex-col items-center justify-center space-y-6 rounded-md bg-[#f3f3f3] bg-slate-100 py-20">
                <button class="w-10">
                    <icon-box />
                </button>
                <p class="text-xl font-bold">Nenhum registro encontrado</p>
            </div>
        </div>
    </section>
</template>
