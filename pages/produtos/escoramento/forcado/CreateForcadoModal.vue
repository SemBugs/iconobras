<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const { createItems, getItems, updateItem, getSingletonItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])

definePageMeta({
    middleware: 'auth'
})

const form = ref({
    "tipo_peca": props.data.tipo_peca,
    "comprimento": props.data.comprimento,
    "preco": props.data.preco,
    "possui_peca_auxiliar":props.data.possui_peca_auxiliar

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
            await createItems({ collection: 'produto', items: form.value })
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
const enchimento = [] 
// await getItems<any>({
//     collection: 'escoras',
//     params: {
//         'filter': filters
//     }
// })

const createField = (label, value, type, btnDelete) => {
    return { label, value, type, btnDelete };
};

const formFields = ref([
    createField('Possui peça auxiliar?', props.data.diamentro, 'select', false),
    createField('Preço', parseFloat(props.data.preco).toFixed(2), 'text', false),
]);
const addFields = () => {
    formFields.value.push(createField('Possui peça auxiliar?', props.data.diamentro, 'select', false))
    formFields.value.push(createField('Preço', parseFloat(props.data.preco).toFixed(2), 'text', true))
};

const remove = (id) => {
    let lastIndex = formFields.length;

    formFields.value.splice(lastIndex - 1, 2);
}

onMounted(() => {
    if (props.data.id) {
        form.value = {
            "tipo_peca": props.data.tipo_peca,
            "diamentro": props.data.diamentro,
            "preco": props.data.preco,
            "possui_peca_auxiliar":props.data.possui_peca_auxiliar

        }
    }
})

</script>

<template>
    <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
    </div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Geral" name="geral">
            <h2 class="text-[#FD4C0C] font-bold mb-2">
                {{ data.id ? 'Editar Peça Auxiliar de Escoras' : 'Cadastro de Peça Auxiliar de Escoras ' }}
            </h2>
            <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                <div v-for="(field, index ) in formFields" :key="index">
                    <div class="col-span-1" :id="'escoras' + index">
                        <label class="text-xs placeholder:text-xs" for="name">{{ field.label }} *</label>
                        <select v-if="field.type == 'select'" id="fck_concreto" class="form-select text-white-dark"
                            v-model="field.value">
                            <option v-for="(item, index) in enchimento" :key="index" :value="item.id">
                                {{ item.nome }}
                            </option>
                        </select>
                        <div v-else class="flex flex-1">
                            <input id="name" type="text" class="form-input" v-money="money" v-model="field.value" />
                            <button v-if="index > 1" @click.prevent="remove" class="btn -ma-0 px-4 py-2"
                                type="button">
                                <svg class="h-[24px] w-[24px]" width="24" height="26" viewBox="0 0 24 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22.7998 5.98061C18.8038 5.58461 14.7839 5.38062 10.7759 5.38062C8.39991 5.38062 6.02392 5.50061 3.64794 5.74061L1.19995 5.98061"
                                        stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M7.80029 4.76906L8.06429 3.19707C8.25629 2.05707 8.40029 1.20508 10.4283 1.20508H13.5723C15.6002 1.20508 15.7562 2.10507 15.9362 3.20907L16.2002 4.76906"
                                        stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M20.2207 9.77332L19.4407 21.8572C19.3087 23.7412 19.2007 25.2052 15.8527 25.2052H8.14873C4.80076 25.2052 4.69276 23.7412 4.56076 21.8572L3.78076 9.77332"
                                        stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9.99634 18.6047H13.9923" stroke="#95979B" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.99927 13.8046H14.9992" stroke="#95979B" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="col-span-1 justify-end">
                        <button v-if="formFields.length == index + 1" @click.prevent="addFields()"
                            class="btn mt-3 btn-primary mr-3" type="button">
                            <icon-plus class="w-5 h-5" /> Adicionar
                        </button>
                    </div>
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
