<script setup lang="ts">
import { ElNotification } from 'element-plus';
const { deleteItem, createItem, getItems, updateItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])
import { useAppStore } from '@/stores/index';
import type { AcoAdicional } from '~/types';
import { ArrowDown } from '@element-plus/icons-vue'

const store = useAppStore();

definePageMeta({
    middleware: 'auth'
})

const initialValues = {
    marca: '',
    tipo_densidade: '',
    a: '',
    b: '',
    c: '',
    d: '',
    produto: props.data.id
};

const form = ref({ ...initialValues });

const newItem = ref(false)

const results = ref([])

const getItens = async () => {
    store.isShowMainLoader = true;

    results.value = [];
    const filters = {
        "produto": { "_eq": `${props.data.id}` }
    };
    results.value = await getItems({
        collection: 'enchimento', params: { "filter": filters }
    });

    store.isShowMainLoader = false;
}

const onSubmit = async () => {
    try {
        store.isShowMainLoader = true;

        if (!form.value.id) {
            createItem({ collection: 'enchimento', items: form.value }).then((req) => {
                store.isShowMainLoader = false;
                ElNotification({
                    title: 'Sucesso!',
                    message: 'Enchimento adicionado com sucesso!',
                    type: 'success',
                });

                getItens();

                form.value = { ...initialValues };
                newItem.value = false;
            }).catch(error => {
                store.isShowMainLoader = false;
            });
        } else {
            updateItem({ collection: 'enchimento', id: form.value.id, item: form.value }).then((req) => {
                store.isShowMainLoader = false;
                ElNotification({
                    title: 'Sucesso!',
                    message: 'Enchimento atualizado com sucesso!',
                    type: 'success',
                });

                form.value = { ...initialValues };
                newItem.value = false;
                getItens();
            }).catch(error => {
                store.isShowMainLoader = false;
            });

        }

    } catch (error) {
        console.log(error)
    }
}

const cancel = () => {
    form.value = {}
    $emit('close')
}

const editAco = (item: AcoAdicional) => {
    form.value = item;
    newItem.value = true;
}

const remove = async (produtoId: any) => {
    await deleteItems({ collection: 'enchimento', items: [produtoId] });

    getItens();
};

const tipo_densidade = [
    {
        "text": "T1 - 12Kg/M²",
        "value": "T1 - 12Kg/M²"
    },
    {
        "text": "T2 - 13Kg/M²",
        "value": "T2 - 13Kg/M²"
    },
    {
        "text": "T3 - 14Kg/M²",
        "value": "T3 - 14Kg/M²"
    },
    {
        "text": "T4 - 15Kg/M²",
        "value": "T4 - 15Kg/M²"
    }
];

onMounted(() => {
    getItens()
})

</script>

<template>
    <div>
        <div v-if="newItem">
            <div class="mx-auto mb-10 flex max-w-7xl items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-[#1B5870]">Cadastrar Enchimento Tijolo</h2>
                    <p class="mt-2 text-sm">Laje Treliça / Tijolo Cerâmico - H8644</p>
                </div>
                <div>
                    <button
                        class="flex items-center space-x-2 rounded bg-green-200 px-4 py-1 text-sm font-bold text-green-600">
                        <icon-excel class="w-8" />
                        <span>Subir sua Planilha com dados</span>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-5 lg:grid-cols-8">
                <div class="col-span-4">
                    <label class="text-sm" for="name">Marca do Tijolo</label>
                    <input id="name" type="text" class="form-input" v-model="form.marca" />
                </div>
                <div class="col-span-4">
                    <label class="text-sm" for="name">Tipo de Resistencia</label>
                    <select id="regime_fiscal" class="form-select text-white-dark" v-model="form.tipo_densidade">
                        <option v-for="(item, index) in tipo_densidade" :key="index" :value="item.value">{{ item.text }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="mx-auto my-6 max-w-7xl items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Dimensões da Peça do Tijolo</h2>
                <p class="text-xs">Coloque as medidas da peça conforme ilustração</p>
            </div>

            <icon-tijolo-dimensoes />

            <div class="grid grid-cols-1 gap-5 lg:grid-cols-4">
                <div class="col-span-1">
                    <label class="text-sm" for="name">A</label>
                    <input id="name" type="text" class="form-input" v-model="form.a" />
                </div>
                <div class="col-span-1">
                    <label class="text-sm" for="name">B</label>
                    <input id="name" type="text" class="form-input" v-model="form.b" />
                </div>
                <div class="col-span-1">
                    <label class="text-sm" for="name">C</label>
                    <input id="name" type="text" class="form-input" v-model="form.c" />
                </div>
                <div class="col-span-1">
                    <label class="text-sm" for="name">D</label>
                    <input id="name" type="text" class="form-input" v-model="form.d" />
                </div>
            </div>
        </div>

        <div v-if="newItem" class="flex justify-end pt-5">
            <button @click.prevent="newItem = false"
                class="bg-gray-600 text-sm rounded-full px-4 py-2 text-[white] ml-4 font-bold">
                Cancelar
            </button>

            <button @click.prevent="onSubmit()"
                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                + Incluir
            </button>
        </div>

        <div v-if="!newItem">
            <div class="mx-auto max-w-7xl items-center justify-between flex">
                <h2 class="text-2xl font-bold text-[#1B5870]">Listagem do Enchimento Tijolo</h2>

                <div class="flex justify-end pt-5">
                    <button @click.prevent="cancel"
                        class="bg-gray-600 text-sm rounded-full px-4 py-2 text-[white] ml-4 font-bold">
                        Fechar
                    </button>

                    <button @click.prevent="newItem = true"
                        class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                        + Incluir
                    </button>
                </div>
            </div>

            <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                <table>
                    <thead class="text-boton text-normal">
                        <tr>
                            <th class="text-xs">Marca</th>
                            <th class="text-xs">Dimensões</th>
                            <th class="text-xs">Tipo de Densidade</th>
                            <th class="text-xs">Preço da Peça</th>
                            <th class="text-xs"></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="(item, index) in results" :key="index">
                            <td>{{ item.marca }}</td>
                            <td>{{ item.a }} x {{ item.b }} x {{ item.c }} x {{ item.d }}</td>
                            <td>{{ item.tipo_densidade }}</td>
                            <td>{{ props.data.preco_por_peca }}</td>
                            <td>
                                <div class="flex items-center space-x-5">
                                    <button @click="editAco(item)">
                                        <icon-edit />
                                    </button>
                                    <button @click="remove(item.id)">
                                        <icon-trash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
