<script setup lang="ts">
import { ElNotification } from 'element-plus';
const { deleteItem, createItem, createItems, readItems, updateItem } = useDirectusItems();
const $emit = defineEmits(['close', 'create'])
const props = defineProps(['tipo', 'data'])
import { useAppStore } from '@/stores/index';
import type { AcoAdicional } from '~/types';
import { ArrowDown } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx';

const store = useAppStore();

definePageMeta({
    middleware: 'auth'
})

const initialValues = {
    produto: props.data.id,
    quantidade_aco1: 1,
    quantidade_aco2: 1,
    quantidade_aco3: 1,
    sobrecarga_min: 1,
    sobrecarga_max: 1,
    medida_viga_min: 1,
    medida_viga_max: 1,
};

const form = ref<AcoAdicional>({ ...initialValues });

const newItem = ref(false)

const results = ref<AcoAdicional[]>([])

const getItens = async () => {
    store.isShowMainLoader = true;

    results.value = [];
    results.value = await readItems('aco_adicional', {
        filter: {
            "produto": { "_eq": props.data.id }
        },
        fields: "*, diametro_aco1.id, diametro_aco2.id, diametro_aco3.id, diametro_aco1.tipo_aco.nome, diametro_aco1.diametro_do_aco, diametro_aco2.diametro_do_aco, diametro_aco3.diametro_do_aco, diametro_aco2.tipo_aco.nome, diametro_aco3.tipo_aco.nome"
    });

    console.log(results.value);

    store.isShowMainLoader = false;
}

const onSubmit = async () => {
    try {
        store.isShowMainLoader = true;

        if (!form.value.id) {
            createItems<any>({collection: 'aco_adicional',items: form.value}).then((req) => {
                store.isShowMainLoader = false;
                ElNotification({
                    title: 'Sucesso!',
                    message: 'Aço adicionado com sucesso! ',
                    type: 'success',
                });

                getItens();

                form.value = { ...initialValues };
                newItem.value = false;
            }).catch(error => {
                store.isShowMainLoader = false;

                ElNotification({
                    title: 'Erro!',
                    message: 'Aço adicionado com sucesso!',
                    type: 'error',
                });
            });
        } else {
            updateItem('aco_adicional', form.value.id, form.value).then((req) => {
                store.isShowMainLoader = false;
                ElNotification({
                    title: 'Sucesso!',
                    message: 'Aço adicionado com sucesso!',
                    type: 'success',
                });

                form.value = { ...initialValues };
                newItem.value = false;
                getItens();
            }).catch(error => {
                store.isShowMainLoader = false;

                ElNotification({
                    title: 'Erro!',
                    message: 'Aço adicionado com sucesso!',
                    type: 'error',
                });
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
    form.value = {
        id: item.id,
        diametro_aco1: item.diametro_aco1?.id,
        diametro_aco2: item.diametro_aco2?.id,
        diametro_aco3: item.diametro_aco3?.id,
        quantidade_aco1: item.quantidade_aco1,
        quantidade_aco2: item.quantidade_aco2,
        quantidade_aco3: item.quantidade_aco3,
        sobrecarga_min: item.sobrecarga_min,
        sobrecarga_max: item.sobrecarga_max,
        medida_viga_min: item.medida_viga_min,
        medida_viga_max: item.medida_viga_max,
    };

    newItem.value = true;
}

const remove = async (produtoId: any) => {
    await deleteItems({ collection: 'aco_adicional', items: [produtoId] });

    getItens();
};

const diametro_do_aco = await readItems('produto', {
    filter: {
        "tipo_produto": {
            "_eq": "aco"
        }
    },
    fields: "id, tipo_aco.nome, diametro_do_aco"
});

onMounted(() => {
    getItens()
})

const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const results = [];
    reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const xlsData = XLSX.utils.sheet_to_json(sheet).map((r) => {
            return {
                sobrecarga_min: r.sobrecarga_min_laje,
                sobrecarga_max: r.sobrecarga_max_laje,
                medida_viga_min: r.vig_max,
                medida_viga_max: r.viga_min,
                quantidade_aco1: r.qtd_aco1,
                quantidade_aco2: r.qtd_aco2,
                quantidade_aco3: r.qtd_aco3,
            };
        })


        store.isShowMainLoader = true;

        createItems('aco_adicional', xlsData).then((req) => {
            getItens();
            store.isShowMainLoader = false;
            ElNotification({
                title: 'Sucesso!',
                message: 'Planilha com sucesso!',
                type: 'success',
            });
        })
    };

    reader.readAsArrayBuffer(file);
};

const fileInput = ref(null)

const selectFile = () => {
    fileInput.value.click();
};

</script>

<template>
    <div>
        <div v-if="newItem" class="mx-auto mb-10 flex max-w-6xl items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold">Cadastrar Aço na Viga</h2>
                <p class="mt-2 text-sm">
                    Tipo Viga: {{ data.enchimento?.nome }} |
                    Tipo Trelica: {{ data.tipo_trelica?.nome }}
                </p>
            </div>
        </div>

        <div v-if="newItem">
            <div class="grid grid-cols-1 gap-5 lg:grid-cols-8">
                <div class="col-span-2">
                    <label class="text-sm" for="name">Sobrecarga Min</label>
                    <client-only>
                        <el-input-number v-model="form.sobrecarga_min" :min="1" class="w-full" />
                    </client-only>
                </div>
                <div class="col-span-2">
                    <label class="text-sm" for="name">Sobrecarga Max</label>
                    <client-only>
                        <el-input-number v-model="form.sobrecarga_max" :min="1" class="w-full" />
                    </client-only>
                </div>
            </div>

            <div class="pt-14 pb-7 flex">
                <h2 class="text-xl font-bold flex-1 pt-3">
                    Insira o aço adicional da Sobrecarga
                </h2>
            </div>

            <div class="grid grid-cols-1 gap-5 lg:grid-cols-4">
                <div>
                    <label class="text-sm" for="name">Medida Viga Min</label>
                    <client-only>
                        <el-input-number v-model="form.medida_viga_min" :min="1" class="w-full" />
                    </client-only>
                </div>
                <div>
                    <label class="text-sm" for="name">Medida Viga Max</label>
                    <client-only>
                        <el-input-number v-model="form.medida_viga_max" :min="1" class="w-full" />
                    </client-only>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-5 pt-10">
                <div
                    class="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] p-3 rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <label class="text-sm pb-1" for="name">Aço 1</label>
                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div>
                            <client-only>
                                <el-input-number v-model="form.quantidade_aco1" :min="1" class="w-full" />
                            </client-only>
                        </div>
                        <div>
                            <select class="form-select text-white-dark" v-model="form.diametro_aco1">
                                <option v-for="(item, index) in diametro_do_aco" :key="item.id" :value="item.id">
                                    {{ item.diametro_do_aco }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    class="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] p-3 rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <label class="text-sm pb-1" for="name">Aço 2</label>
                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div>
                            <client-only>
                                <el-input-number v-model="form.quantidade_aco2" :min="1" class="w-full" />
                            </client-only>
                        </div>
                        <div>
                            <select class="form-select text-white-dark" v-model="form.diametro_aco2">
                                <option v-for="(item, index) in diametro_do_aco" :key="item.id" :value="item.id">
                                    {{ item.diametro_do_aco }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    class="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] p-3 rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <label class="text-sm pb-1" for="name">Aço 3</label>
                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div>
                            <client-only>
                                <el-input-number v-model="form.quantidade_aco3" :min="1" class="w-full" />
                            </client-only>
                        </div>
                        <div>
                            <select class="form-select text-white-dark" v-model="form.diametro_aco3">
                                <option v-for="(item, index) in diametro_do_aco" :key="item.id" :value="item.id">
                                    {{ item.diametro_do_aco }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end pt-5">
                <button @click.prevent="newItem = false"
                    class="bg-gray-600 text-sm rounded-full px-4 py-2 text-[white] ml-4 font-bold">
                    Cancelar
                </button>

                <button @click.prevent="onSubmit()"
                    class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                    Salvar
                </button>
            </div>
        </div>

        <div v-if="!newItem" class="mx-auto max-w-7xl items-center justify-between flex">
            <h2 class="text-2xl font-bold text-[#1B5870]">Listagem do Aço Adicional</h2>

            <div class="flex justify-end pt-5">
                <button @click.prevent="cancel"
                    class="bg-gray-600 text-sm rounded-full px-4 py-2 text-[white] ml-4 font-bold">
                    Fechar
                </button>

                <button @click="selectFile"
                    class="ml-4 rounded-full  space-x-2 bg-green-200 flex px-4 text-sm font-bold text-green-600">
                    <icon-excel class="w-5" />
                    <span class="py-3">Importar planilha</span>
                    <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xls,.xlsx"
                        style="display: none">
                </button>

                <button @click.prevent="newItem = true"
                    class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                    + Incluir
                </button>
            </div>
        </div>

        <!-- TabelaGrande -->
        <div v-if="!newItem" class="table-responsive mt-5 rounded-2xl bg-[#f3f3f3]">
            <table>
                <thead class="text-boton text-normal">
                    <tr>
                        <th class="text-xs">Sobrecarga Min</th>
                        <th class="text-xs">Sobrecarga Max</th>
                        <th class="text-xs">Viga Min</th>
                        <th class="text-xs">Viga Max</th>
                        <th class="text-xs"></th>
                        <th class="text-xs"></th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="(item, index) in results" :key="index">
                        <td>{{ item.sobrecarga_min }}</td>
                        <td>{{ item.sobrecarga_min }}</td>
                        <td>{{ item.medida_viga_min }}</td>
                        <td>{{ item.medida_viga_max }}</td>
                        <td>
                            <div class="flex items-center space-x-5">
                                <span v-if="item.diametro_aco1">
                                    {{ item.quantidade_aco1 }} ø {{ item.diametro_aco1?.diametro_do_aco }}
                                </span>

                                <span v-if="item.diametro_aco2">
                                    {{ item.quantidade_aco2 }} ø {{ item.diametro_aco2?.diametro_do_aco }}
                                </span>

                                <span v-if="item.diametro_aco3">
                                    {{ item.quantidade_aco3 }} ø {{ item.diametro_aco3?.diametro_do_aco }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div class="flex gap-5">
                                <button @click="editAco(item)">
                                    <svg class="h-[25px] w-[25px]" width="30" height="31" viewBox="0 0 30 31"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>

                                <button @click="remove(item.id)">
                                    <svg class="h-[24px] w-[24px]" width="24" height="26" viewBox="0 0 24 26"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
