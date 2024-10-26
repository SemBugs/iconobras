<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const { createItem, updateItem,getSingletonItem } = useDirectusItems();
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
    const items = {
                "preco_por_peca": moneyDecimal(form.value.preco_por_peca),
                "tipo_laje": props.tipo,
                "tipo_trelica": form.value.tipo_trelica,
                "preco_por_m": moneyDecimal(form.value.preco_por_m),
                "tipo_produto": "tijolo",
            }
    try {
        if (!props.data.id) {
            await createItem({ collection: 'produto', items })
        } else {
            await updateItem({ collection: 'produto', id: props.data.id, item: items })
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

const tipo_trelica = await getSingletonItem({collection: 'tipo_trelica'})


onMounted(() => {
    if (props.data.id) {
        form.value = {
            "preco_por_peca": parseFloat(props.data.preco_por_peca).toFixed(2),
            "preco_por_m": parseFloat(props.data.preco_por_m).toFixed(2),
            "tipo_trelica": props.data.tipo_trelica.id,
            "tipo_produto": "viga"
        }
    }
})

const getTrelica = (id: any) => {
    const result = tipo_trelica.filter((item: any) => item.id === id);

    return result[0].nome;
}

</script>

<template>
    <div>
        <div class="mx-auto mb-5 max-w-7xl items-center justify-between">
            <h2 class="text-2xl font-bold text-[#1B5870]">
                {{ data.id ? 'Editar Tijolo Cerâmico' : 'Cadastrar Tijolo Cerâmico' }}
            </h2>

            <div class="flex gap-2">
                <p class="mt-2 mb-2 text-sm">
                    {{ props.tipo == 'trelicada' ? 'Laje Treliçada' : 'Laje Protendida' }}

                    <span v-if="form.tipo_trelica" class="mt-2 mb-2 text-sm">
                        / Tijolo Cerâmico - {{ getTrelica(form.tipo_trelica) }}
                    </span>
                </p>
            </div>
        </div>


    </div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Geral" name="geral">

            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Preço por M³ </label>
                    <input id="name" type="text" class="form-input" v-model="form.preco_por_m" v-money="money" />
                </div>

                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Preço por Peça</label>
                    <input id="name" type="text" class="form-input" v-model="form.preco_por_peca" v-money="money" />
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Tipo de Treliça *</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.tipo_trelica">
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.id">
                            {{ item.nome }}
                        </option>
                    </select>
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
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.value">{{ item.nome }}
                        </option>
                    </select>
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Situação Tributária</label>
                    <select id="situacao_tributaria" class="form-select text-white-dark"
                        v-model="form.situacao_tributaria">
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.value">{{ item.nome }}
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
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.value">{{ item.nome }}
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
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.value">{{ item.nome }}
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
                        <option v-for="(item, index) in tipo_trelica" :key="index" :value="item.value">{{ item.nome }}
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

        <button @click.prevent="cancel" class="btn btn-dark">
            <icon-archive class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" /> Cancelar
        </button>

        <button @click.prevent="onSubmit" class="btn btn-primary px-4 py-2">
            <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
            Salvar
        </button>
    </div>
</template>
