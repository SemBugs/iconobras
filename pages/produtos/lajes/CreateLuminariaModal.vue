<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const { createItems, getItems, updateItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])

definePageMeta({
    middleware: 'auth'
})

const form = ref({})

const money = {
    decimal: ',',
    thousands: '.',
    precision: 2,
    masked: false,
}

const enchimento = await getItems({
    collection: 'enchimento_da_laje'
})

const moneyDecimal = (val) => {
    return val.replace(".", "").replace(',', '.');
}

const onSubmit = async () => {
    try {
        if (!props.data.id) {
            await createItems({
                collection: 'produto', items: {
                    "preco_por_peca": moneyDecimal(form.value.preco_por_peca),
                    "marca": form.value.marca,
                    "enchimento": form.value.enchimento,
                    "tipo_produto": "luminaria",
                }
            })
        } else {
            await updateItem({
                collection: 'produto', id: props.data.id, item: {
                    "preco_por_peca": moneyDecimal(form.value.preco_por_peca),
                    "marca": form.value.marca,
                    "enchimento": form.value.enchimento,
                    "tipo_produto": "luminaria",
                }
            });
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

const tipo_trelica = await getItems({ collection: 'tipo_trelica' })


onMounted(() => {
    if (props.data.id) {
        form.value = {
            "preco_por_peca": parseFloat(props.data.preco_por_peca).toFixed(2),
            "marca": props.data.marca,
            "enchimento": props.data.enchimento.id,
            "tipo_produto": "luminaria",
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
                {{ data.id ? 'Editar Luminária' : 'Cadastrar Luminária' }}
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

        <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-6">
            <div class="col-span-3">
                <label class="text-xs placeholder:text-xs" for="name">Marca</label>
                <input id="name" type="text" class="form-input" v-model="form.marca" />
            </div>

            <div class="col-span-3">
                <label class="text-xs placeholder:text-xs" for="name">Preço por Peça</label>
                <input id="name" type="text" class="form-input" v-model="form.preco_por_peca" v-money="money" />
            </div>

            <div class="col-span-full">
                <label class="text-xs placeholder:text-xs" for="name">Tipo *</label>

                <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.enchimento">
                    <option v-for="(item, index) in enchimento" :key="index" :value="item.id">
                        {{ item.nome }}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex justify-end mt-5 space-x-4">

            <button @click.prevent="cancel" class="btn btn-dark">
                <icon-archive class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" /> Cancelar
            </button>

            <button @click.prevent="onSubmit" class="btn btn-primary px-4 py-2">
                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                Salvar
            </button>
        </div>
    </div>

</template>
