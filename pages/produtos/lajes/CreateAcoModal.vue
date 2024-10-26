<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const { createItems, getItems, updateItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])

definePageMeta({
    middleware: 'auth'
})

const form = ref({})
const activeName = ref('geral')

const onSubmit = async () => {
    try {
        if (!props.data.id) {
            await createItems({
                collection: 'produto',
                items: {
                    "tipo_produto": "aco",
                    "preco_m_linear": form.value.preco_m_linear,
                    "tipo_laje": props.tipo,
                    "tipo_aco": form.value.tipo_aco,
                    "diametro_do_aco": form.value.diametro_do_aco,
                    "peso_por_metro_linear": form.value.peso_por_metro_linear
                }
            })
        } else {
            await updateItem({
                collection: 'produto',
                id: props.data.id,
                item: {
                    "preco_m_linear": form.value.preco_m_linear,
                    "tipo_laje": props.tipo,
                    "tipo_aco": form.value.tipo_aco,
                    "diametro_do_aco": form.value.diametro_do_aco,
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

const diametro_do_aco = [
    {
        "text": "4.2mm",
        "value": "4.2"
    },
    {
        "text": "5.0mm",
        "value": "5.0"
    },
    {
        "text": "6.0mm",
        "value": "6.0"
    },
    {
        "text": "6.3mm",
        "value": "6.3"
    },
    {
        "text": "7.0mm",
        "value": "7.0"
    },
    {
        "text": "8.0mm",
        "value": "8.0"
    },
    {
        "text": "9.0mm",
        "value": "9.0"
    },
    {
        "text": "10.0mm",
        "value": "10.0"
    },
    {
        "text": "12.5mm",
        "value": "12.5"
    }
];

const tipo_aco = await getItems({ collection: 'tipo_aco' })

onMounted(() => {
    if (props.data.id) {
        form.value = {
            "preco_m_linear": parseFloat(props.data.preco_m_linear).toFixed(2),
            "tipo_laje": props.tipo,
            "tipo_aco": props.data.tipo_aco.id,
            "diametro_do_aco": props.data.diametro_do_aco,
            "peso_por_metro_linear": props.data.peso_por_metro_linear
        }
    }
})

</script>

<template>
    <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
        <h2 class="text-[#FD4C0C] text-2xl font-bold">Cadastro do Aço</h2>
    </div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Geral" name="geral">

            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Tipo de Aço</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.tipo_aco">
                        <option v-for="(item, index) in tipo_aco" :key="index" :value="item.id">
                            {{ item.nome }}
                        </option>
                    </select>
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">
                        Peso por metro linear
                    </label>
                    <el-input-number type="number" v-model="form.peso_por_metro_linear" :precision="2" :min="1"
                        :max="10" :step="0.1" :controls="false" />
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Diametro</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.diametro_do_aco">
                        <option v-for="(item, index) in diametro_do_aco" :key="index" :value="item.value">{{ item.text
                            }}
                        </option>
                    </select>
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Preço Metro Linear.L</label>
                    <input id="name" type="text" class="form-input" v-money="money" v-model="form.preco_m_linear" />
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
                        <option v-for="(item, index) in diametro_do_aco" :key="index" :value="item.value">{{ item.text
                            }}
                        </option>
                    </select>
                </div>
                <div class="col-span-3">
                    <label class="text-xs placeholder:text-xs" for="name">Situação Tributária</label>
                    <select id="situacao_tributaria" class="form-select text-white-dark"
                        v-model="form.situacao_tributaria">
                        <option v-for="(item, index) in diametro_do_aco" :key="index" :value="item.value">{{ item.text
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
                        <option v-for="(item, index) in diametro_do_aco" :key="index" :value="item.value">{{ item.text
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
                        <option v-for="(item, index) in diametro_do_aco" :key="index" :value="item.value">{{ item.text
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
                        <option v-for="(item, index) in diametro_do_aco" :key="index" :value="item.value">{{ item.text
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
        <button @click.prevent="cancel" class="btn btn-dark">
            <icon-archive class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" /> Cancelar
        </button>

        <button @click.prevent="onSubmit" class="btn btn-primary px-4 py-2">
            <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
            Salvar
        </button>
    </div>
</template>
