<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const { createItems, getItems, updateItem, getSingletonItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])

definePageMeta({
    middleware: 'auth'
})

const form = ref({})
const activeName = ref('geral')

const money = {
    decimal: ',',
    thousands: '.',
    precision: 2,
    masked: false,
}

const moneyDecimal = (val) => {
    return val.replace(".", "").replace(',', '.');
}

const onSubmit = async () => {
    try {
        if (!props.data.id) {
            await createItems({
                collection: 'produto', items: {
                    "preco_m_trelica_sapata": moneyDecimal(form.value.preco_m_trelica_sapata),
                    "custo_por_km": moneyDecimal(form.value.custo_por_km),
                    "tipo_laje": props.tipo,
                    "largura_sapa_viga": form.value.largura_sapa_viga,
                    "m_maxima_de_transporte": form.value.m_maxima_de_transporte,
                    "prazo_de_entrega": form.value.prazo_de_entrega,
                    "taxa_de_entrega": moneyDecimal(form.value.taxa_de_entrega),
                    "obs": form.value.obs,
                    "tipo_trelica": form.value.tipo_trelica,
                    "tipo_produto": "viga",
                    "enchimento": form.value.enchimento,
                    "peso_por_metro_linear": form.value.peso_por_metro_linear
                }
            })
        } else {
            await updateItem({
                collection: 'produto', id: props.data.id, item: {
                    "preco_m_trelica_sapata": moneyDecimal(form.value.preco_m_trelica_sapata),
                    "custo_por_km": moneyDecimal(form.value.custo_por_km),
                    "tipo_laje": props.tipo,
                    "largura_sapa_viga": form.value.largura_sapa_viga,
                    "m_maxima_de_transporte": form.value.m_maxima_de_transporte,
                    "prazo_de_entrega": form.value.prazo_de_entrega,
                    "taxa_de_entrega": moneyDecimal(form.value.taxa_de_entrega),
                    "obs": form.value.obs,
                    "tipo_trelica": form.value.tipo_trelica,
                    "tipo_produto": "viga",
                    "enchimento": form.value.enchimento,
                    "peso_por_metro_linear": form.value.peso_por_metro_linear
                }
            })
        }

        form.value = {}
        $emit('close')
    } catch (error) {
        console.log(error)
    }
}

const cancel = () => {
    form.value = {}
    $emit('close')
}

const largura_sapata = [
    {
        "text": "12cm",
        "value": "0.12"
    },
    {
        "text": "13cm",
        "value": "0.13"
    },
    {
        "text": "25cm",
        "value": "0.25"
    },
    {
        "text": "0.50cm",
        "value": "0.50"
    },
    {
        "text": "1,20m",
        "value": "1.20"
    }
];

const tipo_trelica = await getSingletonItem<any>({ collection: 'tipo_trelica' })


const filters = { 'tipo': { "_eq": `${props.tipo}` } };
const enchimento = await getItems<any>({
    collection: 'enchimento_da_laje',
    params: {
        'filter': filters
    }
})

onMounted(() => {
    if (props.data.id) {
        form.value = {
            "preco_m_trelica_sapata": parseFloat(props.data.preco_m_trelica_sapata).toFixed(2),
            "custo_por_km": parseFloat(props.data.custo_por_km).toFixed(2),
            "tipo_laje": props.tipo,
            "largura_sapa_viga": props.data.largura_sapa_viga,
            "m_maxima_de_transporte": props.data.m_maxima_de_transporte,
            "prazo_de_entrega": props.data.prazo_de_entrega,
            "taxa_de_entrega": parseFloat(props.data.taxa_de_entrega).toFixed(2),
            "obs": props.data.obs,
            "tipo_trelica": props.data.tipo_trelica.id,
            "tipo_produto": "viga",
            "enchimento": props.data.enchimento.id,
            "peso_por_metro_linear": props.data.peso_por_metro_linear
        }
    }
})

</script>

<template>
    <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
        <h2 class="text-[#FD4C0C] text-2xl font-bold">

            {{ data.id ? 'Editar Viga' : 'Cadastro de Viga' }}
        </h2>
    </div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Geral" name="geral">

            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-full">
                    <label class="text-xs placeholder:text-xs" for="name">Tipo de Viga *</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.enchimento"
                        @change="getSapata()">
                        <option v-for="(item, index) in enchimento" :key="index" :value="item.id">
                            {{ item.nome }}
                        </option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Largura da Sapata *</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.largura_sapa_viga">
                        <option v-for="(item, index) in largura_sapata" :key="index" :value="item.value">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Tipo de Treliça *</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.tipo_trelica">
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.id">
                            {{ item.nome }}
                        </option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">
                        Preço por M.I treliça+sapata
                    </label>
                    <input id="name" type="text" class="form-input" v-money="money"
                        v-model="form.preco_m_trelica_sapata" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">
                        Peso por metro linear
                    </label>
                    <el-input-number type="number" v-model="form.peso_por_metro_linear" :precision="2" :min="1"
                        :max="10" :step="0.1" :controls="false" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">
                        M² Máxima de Transporte
                    </label>
                    <input id="name" type="text" class="form-input" v-model="form.m_maxima_de_transporte" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Custo por KM</label>
                    <input id="name" type="text" class="form-input" v-money="money" v-model="form.custo_por_km" />
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa de Entrega</label>
                    <input id="name" type="text" class="form-input" v-money="money" v-model="form.taxa_de_entrega" />
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Prazo de Entrega</label>
                    <input id="name" type="text" class="form-input" v-model="form.prazo_de_entrega" />
                </div>
                <div class="col-span-full">
                    <label class="text-xs placeholder:text-xs" for="name">Observações</label>
                    <textarea placeholder="Normal" id="name" type="text" class="form-input" v-model="form.obs" />
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Fiscal" name="fiscal">
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">NCM</label>
                    <input id="name" type="text" class="form-input" v-model="form.ncm" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">CFOP</label>
                    <input id="name" type="text" class="form-input" v-model="form.cfop" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">CEST</label>
                    <input id="name" type="text" class="form-input" v-model="form.cest" />
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="ICMS" name="icms">
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Origem da Mercadoria</label>
                    <select id="origem_mercadoria" class="form-select text-white-dark" v-model="form.origem_mercadoria">
                        <option v-for="(item, index) in enchimento" :key="index" :value="item.value">{{ item.nome
                            }}
                        </option>
                    </select>
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Situação Tributária</label>
                    <select id="situacao_tributaria" class="form-select text-white-dark"
                        v-model="form.situacao_tributaria">
                        <option v-for="(item, index) in enchimento" :key="index" :value="item.value">{{ item.nome
                            }}
                        </option>
                    </select>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="IPI" name="ipi">
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Origem da Mercadoria</label>
                    <select id="origem_mercadoria" class="form-select text-white-dark"
                        v-model="form.ipi_origem_mercadoria">
                        <option v-for="(item, index) in enchimento" :key="index" :value="item.value">{{ item.nome
                            }}
                        </option>
                    </select>
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Código de enquadramento</label>
                    <input id="name" type="text" class="form-input" v-model="form.codigo_enquadramento" />
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="PIS" name="pis">
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-6">
                    <label class="text-xs placeholder:text-xs" for="name">Código da situação tributária do PIS
                        (CST)</label>
                    <select id="origem_mercadoria" class="form-select text-white-dark" v-model="form.pis_cst">
                        <option v-for="(item, index) in enchimento" :key="index" :value="item.value">{{ item.nome
                            }}
                        </option>
                    </select>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="COFINS" name="cofins">
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-6">
                    <label class="text-xs placeholder:text-xs" for="name">Código da situação tributária do COFINS
                        (CST)</label>
                    <select id="origem_mercadoria" class="form-select text-white-dark" v-model="form.cofins_cst">
                        <option v-for="(item, index) in enchimento" :key="index" :value="item.value">{{ item.nome
                            }}
                        </option>
                    </select>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Venda em Atacado" name="venda-atacado">
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Quantidade mínima p/ Atacado</label>
                    <input id="name" type="number" class="form-input" v-model="form.qtd_atacato" />
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Valor</label>
                    <input id="name" type="text" class="form-input" v-money="money" v-model="form.valor" />
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Composição" name="composicao">Composição</el-tab-pane>
    </el-tabs>
    <div class="flex justify-end mt-5 space-x-4">
        <button @click.prevent="cancel" type="button" class="btn btn-dark">
            <icon-archive class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" /> Cancelar
        </button>

        <button @click.prevent="onSubmit" class="btn btn-primary px-4 py-2" type="button">
            <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
            Salvar
        </button>
    </div>
</template>
