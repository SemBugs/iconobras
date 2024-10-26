<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const { createItems, getItems, updateItem, getSingletonItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])

definePageMeta({
    middleware: 'auth'
})

const form = ref({

    "bomba": props.data.bomba,
    "codigo": props.data.codigo,
    "min_bombeado": props.data.min_bombeado,
    "nao_trabalha_sarramento": props.data.nao_trabalha_sarramento,
    "preco_m3": props.data.preco_m3,
    "sarramento": props.data.sarramento,
    "taxa_extra": props.data.taxa_extra,
    "taxa_m3_faltante": props.data.taxa_m3_faltante,
    "taxa_minima": props.data.taxa_minima,
    "taxa_minima_sarramento": props.data.taxa_minima_sarramento,
    "taxa_sarramento_m_excedente": props.data.taxa_sarramento_m_excedente,
    "valor": props.data.valor,
    "valor_cobrado_a_parte": props.data.valor_cobrado_a_parte,
    "valor_incluso": props.data.valor_incluso


})
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
    console.log(form.value)
    try {
        if (!props.data.id) {
            // await createItems({ collection: 'produto', items: form.value })
        } else {
            await updateItem<any>({
                collection: 'produto', id: props.data.id, item: form.value
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


const filters = { 'tipo': { "_eq": `${props.tipo}` } };
// const enchimento = await getItems<any>({
//     collection: 'escoras',
//     params: {
//         'filter': filters
//     }
// })

const createField = (label, value, type, btnDelete) => {
    return { label, value, type, btnDelete };
};


const remove = (id) => {
    document.getElementById(`${id}`)?.remove()
}

onMounted(() => {
    if (props.data.id) {
        form.value = {
            "bomba": props.data.bomba,
            "codigo": props.data.codigo,
            "min_bombeado": props.data.min_bombeado,
            "nao_trabalha_sarramento": props.data.nao_trabalha_sarramento,
            "preco_m3": props.data.preco_m3,
            "sarramento": props.data.sarramento,
            "taxa_extra": props.data.taxa_extra,
            "taxa_m3_faltante": props.data.taxa_m3_faltante,
            "taxa_minima": props.data.taxa_minima,
            "taxa_minima_sarramento": props.data.taxa_minima_sarramento,
            "taxa_sarramento_m_excedente": props.data.taxa_sarramento_m_excedente,
            "valor": props.data.valor,
            "valor_cobrado_a_parte": props.data.valor_cobrado_a_parte,
            "valor_incluso": props.data.valor_incluso
        }
    }
})

</script>

<template>
    <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
    </div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane label="Geral" name="geral">
            <h2 class="text-[#FD4C0C] font-bold mb-5">
                {{ data.id ? 'Editar Bombeamento de concreto' : 'Cadastro de Bombeamento de concreto' }}
            </h2>
            <h3 class="text-[#979797] font-bold mb-3 border-b-2">
                Bomba Estacionária
            </h3>
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-5">
                <div class="col-span-1">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa mínima de bombeamento</label>
                    <input id="name" type="text" class="form-input" v-money="money" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Limite de m³ bombeado sem taxa extra</label>
                    <input id="name" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa bombeamento por m³ excedente</label>
                    <input id="name" type="text" class="form-input" />
                </div>
            </div>
            <h3 class="text-[#979797] font-bold mb-3 border-b-2">
                Bomba Lança
            </h3>
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-5">
                <div class="col-span-1">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa mínima de bombeamento</label>
                    <input id="name" type="text" class="form-input" v-money="money" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Limite de m³ bombeado sem taxa
                        extra</label>
                    <input id="name" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa bombeamento por m³ excedente</label>
                    <input id="name" type="text" class="form-input" />
                </div>
            </div>
            <h2 class="text-[#19161561] text-sm font-bold mt-4 mb-3">
                {{ 'A empresa faz sarrafeamento do concreto?' }}
            </h2>
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-2">
                    <input id="name" type="checkbox" v-model="form.valor_incluso"> Sim, valor incluso <input>
                </div>
                <div class="col-span-2">
                    <input id="name" type="checkbox" v-model="form.valor_cobrado_a_parte"> Sim, valor cobrado à parte
                    <input>
                </div>
                <div class="col-span-2">
                    <input id="name" type="checkbox" v-model="form.nao_trabalha_sarramento"> Não trabalha com
                    sarrafeamento <input>
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa mínima de Sarrafeamento</label>
                    <input id="name" type="text" class="form-input" v-model="form.taxa_minima_sarramento"
                        v-money="money" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Limite de sarrafeamento</label>
                    <input id="name" type="text" class="form-input" v-model="form.sarramento" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="name">Taxa de sarrafeamento por m³ excedente</label>
                    <input id="name" type="text" class="form-input" v-model="form.taxa_sarramento_m_excedente" />
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
