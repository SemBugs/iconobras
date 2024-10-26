<script lang="ts" setup>
import type { ArquivoProjeto, Empresa, Orcamento } from '@/types/types';
import { useDirectusFlow } from '@/stores/directus-flow';
import { useAppStore } from '@/stores/index';

const route = useRoute();
const modalEditarLuminaria = ref(false);
const modalItem = ref<ArquivoProjeto>({} as ArquivoProjeto);
const indexModal = ref(0);
const orcamento = ref<Orcamento>({} as Orcamento);
const { updateItem } = useDirectusItems();
const store = useAppStore();
const pdfContent = ref(null);
const fontPagina = ref(null);
const form = ref({})
const tipo = ref(0);

const editarVao = (item: ArquivoProjeto, index: number) => {
    modalItem.value = JSON.parse(JSON.stringify(item));
    indexModal.value = index;
    modalEditarLuminaria.value = true;
}

const vaos = ref<ArquivoProjeto[]>();
const agrupadoVigas = ref<ArquivoProjeto[]>();

const getOrcamento = async () => {
    orcamento.value = {};
    vaos.value = [];
    const flow = useDirectusFlow();
    const flowData = await flow.get('a2db6a28-52d5-4d38-bdfe-ccd57b48e7e3', { chave: route.params.id });
    orcamento.value = flowData;

    vaos.value = flowData.vaos;

    agruparVaos(vaos.value);
}

const agruparVaos = (items) => {
    let agrupado = {};

    // Itera sobre cada viga no array de items
    items.forEach(viga => {
        let id = viga.comprimento_viga;
        let tipo = viga.enchimento;

        // Se não houver uma entrada para este tipo, inicializa-a como um objeto vazio
        if (!agrupado[tipo]) {
            agrupado[tipo] = {};
        }

        // Se já existe um agrupamento para este comprimento_viga e tipo
        if (agrupado[tipo][id]) {
            // Soma a quantidade de vigas
            agrupado[tipo][id].quantidade_vigas += viga.quantidade_vigas;

            // Soma a quantidade de luminárias
            agrupado[tipo][id].luminaria += parseInt(viga.luminaria, 10);

            // Concatena os arrays de locação de luminárias
            agrupado[tipo][id].locacao_luminarias = [
                ...agrupado[tipo][id].locacao_luminarias,
                ...viga.locacao_luminarias
            ];
        } else {
            // Caso contrário, inicializa com a viga atual
            agrupado[tipo][id] = { ...viga, luminaria: parseInt(viga.luminaria, 10) };
        }
    });

    // Converte o objeto agrupado em um array plano de objetos
    agrupadoVigas.value = Object.keys(agrupado).flatMap(tipo =>
        Object.keys(agrupado[tipo]).map(comprimento_viga => agrupado[tipo][comprimento_viga])
    );
}

const addLuminaria = () => {
    modalItem.value.locacao_luminarias.push({
        "luminaria_viga": 1,
        "luminarias": 1,
        "lights": []
    })
}

const removeLuminaria = (index: number) => {
    modalItem.value.locacao_luminarias.splice(index, 1);
}

const salvarModal = async () => {
    await updateItem({ collection: 'arquivo_projeto', id: modalItem.value.id.toString(), item: modalItem.value });
    getOrcamento();
    modalEditarLuminaria.value = false;
}

const salvarEngaste = async () => {
    try {
        for (const item of vaos.value) {
            await updateItem({
                collection: 'arquivo_projeto',
                id: item.id.toString(),
                item: form.value,
            });
        }

        form.value = {};
        getOrcamento();
    } catch (error) {
        console.error("Erro ao salvar engaste:", error);
    }
}

const imprimir = () => {
    store.isShowMainLoader = true;
    const content = pdfContent.value;
    content.setAttribute('class', 'container-print-box');
    fontPagina.value = -3;
    html2pdf().from(content)
        .set({
            margin: [0, -3, 0, 0],
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            compressPDF: true
        })
        .toPdf().get('pdf').then(function (pdfObj) {
            content.removeAttribute('class', 'container-print-box');
            fontPagina.value = null;
            store.isShowMainLoader = false;
            pdfObj.autoPrint();
            window.open(pdfObj.output('bloburl'), '_blank');
        });
}

onMounted(() => {
    getOrcamento();
})

</script>

<template>
    <div class="container mx-auto">
        <div data-html2canvas-ignore="true">
            <button @click="imprimir()"
                class="mb-4 float-end rounded-lg bg-[#008ED6] px-8 py-3 text-sm font-bold text-[white]">
                + Imprimir
            </button>

            <div class="clear-both"></div>
        </div>

        <div ref="pdfContent">
            <font :size="fontPagina">
                <client-only>
                    <div class="animation p-6 panel">
                        <div class="flex items-center justify-between">
                            <b class="mb-2 text-xl">ORDEM DE PRODUÇÃO</b>
                            <b class="text-xl">N° {{ orcamento.id }}</b>
                        </div>
                        <hr />

                        <div class="my-4 space-y-2">
                            <span class="font-semibold text-primary">ENDEREÇO DE ENTREGA</span>
                            <div class="grid grid-cols-2 gap-1">
                                <span>Cliente: {{ orcamento.endereco_completo }}</span>
                                <span></span>
                                <span>Data de Saída: {{ $filters.formatDate(orcamento.prazo_final) }}</span>
                                <span class="font-semibold">Vendido Por: {{ store.empresa?.nome }}</span>
                            </div>
                        </div>

                        <div class="my-4" data-html2canvas-ignore="true">
                            <span class="font-semibold text-primary">A VIGA É ENGASTADA</span>
                            <div class="items-center py-6 max-w-[200px]">
                                <div class="px-2">
                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="engaste">
                                        Engaste
                                    </label>

                                    <icon-engaste></icon-engaste>
                                </div>

                                <div class="grid grid-cols-3">
                                    <input id="engaste" v-model="form.engaste_a" type="text" placeholder="5Cm"
                                        class="form-input text-[#1B5870]" />
                                    <div></div>
                                    <input id="engaste" v-model="form.engaste_b" type="text" placeholder="5Cm"
                                        class="form-input text-[#1B5870]" />

                                    <div class="col-span-3">
                                        <el-button v-if="form.engaste_a && form.engaste_b" class="w-full mt-2"
                                            type="primary" @click="salvarEngaste()">
                                            Aplicar em todos
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <el-radio-group data-html2canvas-ignore="true" v-model="tipo">
                            <el-radio :value="0">TODOS</el-radio>
                            <el-radio :value="2">POR VÃO/CÔMODO</el-radio>
                            <el-radio :value="1">RESUMO DE VIGAS</el-radio>
                        </el-radio-group>

                        <div v-if="tipo == 0 || tipo == 2" class="my-4 space-y-4">
                            <span class="font-semibold text-primary">PRODUÇÃO DE VIGAS POR VÃO</span>
                            <div class="table-responsive rounded-2xl bg-[#f3f3f3]">
                                <table>
                                    <thead class="text-boton text-normal">
                                        <tr>
                                            <th>
                                                ID Laje
                                            </th>
                                            <th>Tipo de Viga</th>
                                            <th>Treliça</th>
                                            <th>SC/M²</th>
                                            <th>Sobrecarga</th>
                                            <th>QTD</th>
                                            <th>Viga</th>
                                            <th>Adicional</th>
                                            <th>Luminárias</th>
                                            <th>Engaste</th>
                                            <th data-html2canvas-ignore="true"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        <template v-for="(item, index) in vaos" :key="index">
                                            <tr>
                                                <td>
                                                    {{ item.nome }}
                                                </td>
                                                <td>
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
                                                </td>
                                                <td>
                                                    {{ item.viga.tipo_trelica.nome }}
                                                </td>
                                                <td>
                                                    {{ item?.sobrecarga?.sobrecarga_min }}KG
                                                </td>
                                                <td>
                                                    {{ item.area_m?.toFixed(2) }} m²
                                                </td>
                                                <td>
                                                    {{ item.quantidade_vigas }}
                                                </td>
                                                <td>
                                                    {{ item.comprimento_viga?.toFixed(2) }}
                                                </td>
                                                <td>
                                                    {{ item.quantidade_aco1 }} ¢{{ item.diametro_aco1?.diametro_do_aco
                                                    }} +
                                                    {{ item.quantidade_aco2 }} ¢{{ item.diametro_aco2?.diametro_do_aco
                                                    }} +
                                                    {{ item.quantidade_aco3 }} ¢{{ item.diametro_aco3?.diametro_do_aco
                                                    }}
                                                </td>
                                                <td>
                                                    {{ item.luminaria }}
                                                </td>
                                                <td>
                                                    {{ item.engaste_a }}cm / {{ item.engaste_b }}cm
                                                </td>
                                                <td data-html2canvas-ignore="true">
                                                    <button @click="editarVao(item, index)">
                                                        <icon-pencil-fill v-tippy="'Editar'" class="cursor-pointer" />
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="11" class="pb-10 figura">
                                                    <div v-if="item.locacao_luminarias.length > 0"
                                                        class="max-w-[450px] no-page-break">
                                                        <div v-for="(t, i) in item.locacao_luminarias" :key="i"
                                                            class="pb-5">
                                                            <font :size="null">
                                                                <luminaria-figura :disabled="true"
                                                                    :tamalho="item.comprimento_viga"
                                                                    v-model="item.locacao_luminarias[i]"></luminaria-figura>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div v-if="tipo == 0 || tipo == 1" class="my-4 space-y-4">
                            <span class="font-semibold text-primary">RESUMO PRODUÇÃO VIGAS</span>
                            <div class="table-responsive rounded-2xl bg-[#f3f3f3]">
                                <table>
                                    <thead class="text-boton text-normal">
                                        <tr>
                                            <th>Tipo de Viga</th>
                                            <th>Treliça</th>
                                            <th>SC/M²</th>
                                            <th>Sobrecarga</th>
                                            <th>QTD</th>
                                            <th>Viga</th>
                                            <th>Adicional</th>
                                            <th>Luminárias</th>
                                            <th>Engaste</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        <template v-for="(item, index) in agrupadoVigas" :key="index">
                                            <tr>
                                                <td>
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
                                                </td>
                                                <td>
                                                    {{ item.viga.tipo_trelica.nome }}
                                                </td>
                                                <td>
                                                    {{ item?.sobrecarga?.sobrecarga_min }}KG
                                                </td>
                                                <td>
                                                    {{ item.area_m?.toFixed(2) }} m²
                                                </td>
                                                <td>
                                                    {{ item.quantidade_vigas }}
                                                </td>
                                                <td>
                                                    {{ item.comprimento_viga?.toFixed(2) }}
                                                </td>
                                                <td>
                                                    {{ item.quantidade_aco1 }} ¢{{ item.diametro_aco1?.diametro_do_aco
                                                    }} +
                                                    {{ item.quantidade_aco2 }} ¢{{ item.diametro_aco2?.diametro_do_aco
                                                    }} +
                                                    {{ item.quantidade_aco3 }} ¢{{ item.diametro_aco3?.diametro_do_aco
                                                    }}
                                                </td>
                                                <td>
                                                    {{ item.luminaria }}
                                                </td>
                                                <td>
                                                    {{ item.engaste_a }}cm / {{ item.engaste_b }}cm
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="11" class="pb-10 figura">
                                                    <div v-if="item.locacao_luminarias.length > 0"
                                                        class="max-w-[450px] no-page-break">
                                                        <div v-for="(t, i) in item.locacao_luminarias" :key="i"
                                                            class="pb-5">
                                                            <font :size="null">
                                                                <luminaria-figura :disabled="true"
                                                                    :tamalho="item.comprimento_viga"
                                                                    v-model="item.locacao_luminarias[i]"></luminaria-figura>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <el-dialog v-model="modalEditarLuminaria" title="Editar" class="max-w-[600px]">
                        <div v-if="modalEditarLuminaria">
                            <div class="my-4">
                                <span class="font-semibold text-primary">A VIGA É ENGASTADA</span>
                                <div class="items-center py-6 max-w-[200px]">
                                    <div class="px-2">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="engaste">
                                            Engaste
                                        </label>

                                        <icon-engaste></icon-engaste>
                                    </div>

                                    <div class="grid grid-cols-3">
                                        <input id="engaste" v-model="modalItem.engaste_a" type="text" placeholder="5Cm"
                                            class="form-input text-[#1B5870]" />
                                        <div></div>
                                        <input id="engaste" v-model="modalItem.engaste_b" type="text" placeholder="5Cm"
                                            class="form-input text-[#1B5870]" />
                                    </div>
                                </div>
                            </div>

                            <div class="font-semibold text-primary pb-6">
                                LOCAÇÃO DE LUMINÁRIAS
                                <div class="clear-both"></div>
                            </div>

                            <div v-if="modalItem.locacao_luminarias.length > 0">
                                <div v-for="(item, index) in modalItem.locacao_luminarias" :key="index"
                                    class="pb-10 flex">
                                    <div class="flex-1">
                                        <luminaria-figura v-model="modalItem.locacao_luminarias[index]"
                                            :tamalho="modalItem.comprimento_viga"></luminaria-figura>
                                    </div>

                                    <div class="relative w-[30px] px-2">
                                        <icon-recycle-bin-fill @click="removeLuminaria(index)" v-tippy="'Deletar'"
                                            class="cursor-pointer bottom-6 absolute" />
                                    </div>
                                </div>
                            </div>

                            <a href="javascript:;" @click="addLuminaria()">Adicionar mais um item</a>
                        </div>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="modalEditarLuminaria = false">Cancelar</el-button>
                                <el-button type="primary" @click="salvarModal()">
                                    Salvar
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>
                </client-only>
            </font>
        </div>
    </div>
</template>

<style scoped>
.container-print-box td,
.container-print-box th {
    padding: 5px 2px !important;
}

.container-print-box .panel {
    box-shadow: none !important;
}

.container-print-box .figura {
    padding: 0px !important;
}
</style>