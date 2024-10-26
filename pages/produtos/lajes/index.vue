<script setup lang="ts">
import { Dialog, DialogOverlay, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot } from '@headlessui/vue';
import CreateVigaModal from './CreateVigaModal.vue';
import CreateAcoModal from './CreateAcoModal.vue';
import CreateEpsModal from './CreateEpsModal.vue';
import CreateCeramicoModal from './CreateCeramicoModal.vue';
import AcoAdicionalModal from './AcoAdicionalModal.vue';
import EnchimentoEpsModal from './EnchimentoEpsModal.vue';
import EnchimentoCeramicoModal from './EnchimentoCeramicoModal.vue';
import CreateLuminariaModal from './CreateLuminariaModal.vue';

const { getItems, deleteItem } = useDirectusItems();

const dialogVisible = ref(false);

definePageMeta({
    middleware: 'auth',
});

useHead({ title: 'Produtos Lajes' });

const form = ref({});
const selectedCategory = ref('');
const results = ref([]);
const search_viga = ref('');
const search_trelica = ref('');
const selectedTab = ref(0);
const itemId = ref('');

// Modals
const deleteModal = ref(false);
const isCreateVigaOpen = ref(false);
const isCreateAcoOpen = ref(false);
const isCreateAcoAdicionalOpen = ref(false);
const isCreateIsopoOpen = ref(false);
const isCreateTijoloOpen = ref(false);
const isEpsAdicionalOpen = ref(false);
const isCeramicoAdicionalOpen = ref(false);
const isCreateLuminariaOpen = ref(false);

const getResults = async (params: any) => {
    results.value = [];
    const products = await getItems({ collection: 'produto', params });
    results.value = await Promise.all(products.map(async (item: any) => {
        const filters = { "produto": { "_eq": `${item.id}` } };
        item.enchimento_laje = await getItems({ collection: 'enchimento', params: {
            'filter': filters
        }});
        return item;
    }));
};

const editViga = (item: any) => {
    form.value = item;
    isCreateVigaOpen.value = true;
};

const editEps = (item: any) => {
    form.value = item
    isCreateIsopoOpen.value = true
};

const editCeramico = (item: any) => {
    form.value = item
    isCreateTijoloOpen.value = true
};

const editLuminaria = (item: any) => {
    form.value = item
    isCreateLuminariaOpen.value = true
};

const editAco = (item: any) => {
    form.value = item;
    isCreateAcoOpen.value = true;
};

const closeVigaModal = () => {
    isCreateVigaOpen.value = false
    isCreateAcoAdicionalOpen.value = false
    form.value = {}
    changeTab(0)
};

const closeAcoModal = () => {
    isCreateAcoOpen.value = false
    form.value = {}
    changeTab(1)
};

const closeEpsModal = () => {
    isCreateIsopoOpen.value = false
    form.value = {}
    changeTab(2)
};

const closeCeramicoModal = () => {
    isCreateTijoloOpen.value = false
    form.value = {}
    changeTab(3)
};

const closeLuminariaModal = () => {
    isCreateLuminariaOpen.value = false
    form.value = {}
    changeTab(4)
}

const closeEpsEnchimento = () => {
    isEpsAdicionalOpen.value = false
    form.value = {}
    changeTab(2)
}

const closeCeramicoEnchimento = () => {
    isCeramicoAdicionalOpen.value = false
    form.value = {}
    changeTab(3)
}


const remove = async (produtoId: any) => {
    await deleteItems({ collection: 'produto', items: [produtoId] });

    deleteModal.value = false;
    changeTab(selectedTab.value);
};

const changeTab = (step: any) => {
    let filterQuery = '';

    switch (step) {
        case 0:
            filterQuery = `{ "tipo_laje": {"_eq": "${selectedCategory.value}"}, "tipo_produto": {"_eq": "viga"}`;

            if (search_viga.value) {
                filterQuery += `, "enchimento": {"nome":  {"_icontains": "${search_viga.value}" } }`;
            }

            if (search_trelica.value) {
                filterQuery += `, "tipo_trelica": {"nome":  {"_icontains": "${search_trelica.value}" } }`;
            }

            filterQuery += '}';

            getResults({
                filter: JSON.parse(filterQuery),
                fields: '*, tipo_trelica.nome, tipo_trelica.id, enchimento.nome, enchimento.id',
            });
            break;
        case 1:
            filterQuery = `{ "tipo_laje": {"_eq": "${selectedCategory.value}"}, "tipo_produto": {"_eq": "aco"}`;
            if (search_viga.value) {
                filterQuery += `, "enchimento": {"nome":  {"_icontains": "${search_viga.value}" } }`;
            }

            if (search_trelica.value) {
                filterQuery += `, "tipo_trelica": {"nome":  {"_icontains": "${search_trelica.value}" } }`;
            }

            filterQuery += '}';

            getResults({
                filter: JSON.parse(filterQuery),
                fields: '*, tipo_aco.nome, tipo_aco.id',
            });
            break;
        case 2:
            filterQuery = `{ "tipo_laje": {"_eq": "${selectedCategory.value}"}, "tipo_produto": {"_eq": "isopor"}`;
            if (search_viga.value) {
                filterQuery += `, "enchimento": {"nome":  {"_icontains": "${search_viga.value}" } }`;
            }

            if (search_trelica.value) {
                filterQuery += `, "tipo_trelica": {"nome":  {"_icontains": "${search_trelica.value}" } }`;
            }

            filterQuery += '}';

            getResults({
                filter: JSON.parse(filterQuery),
                fields: '*, tipo_trelica.nome, tipo_trelica.id, enchimento.nome, enchimento.id, dados_enchimento.enchimento_id.*',
            });
            break;
        case 3:
            filterQuery = `{ "tipo_laje": {"_eq": "${selectedCategory.value}"}, "tipo_produto": {"_eq": "tijolo"}`;
            if (search_viga.value) {
                filterQuery += `, "enchimento": {"nome":  {"_icontains": "${search_viga.value}" } }`;
            }

            if (search_trelica.value) {
                filterQuery += `, "tipo_trelica": {"nome":  {"_icontains": "${search_trelica.value}" } }`;
            }

            filterQuery += '}';

            getResults({
                filter: JSON.parse(filterQuery),
                fields: '*, tipo_trelica.nome, tipo_trelica.id, enchimento.nome, enchimento.id',
            });

        default:
            getResults({
                filter: { "tipo_produto": { "_eq": "luminaria" } },
                fields: '*, tipo_trelica.nome, tipo_trelica.id, enchimento.nome, enchimento.id',
                search: search_viga.value
            });
    }

    selectedTab.value = step;
};
</script>

<template>
    <div class="mx-auto">
        <!-- Category Switch -->
        <div class="my-10 grid grid-cols-2 gap-x-5">
            <div @click.prevent="(selectedCategory = 'trelicada'), changeTab(0)"
                :class="{ '!border-primary text-primary grayscale-0': selectedCategory == 'trelicada' }"
                class="flex cursor-pointer items-center justify-center space-x-4 rounded-2xl border-gray-100 panel p-3 grayscale">
                <icon-laje-trelicada />
                <div>
                    <span class="text-xl">Cadastrar Composição da</span>
                    <h2 class="text-2xl font-bold">Laje Treliçada</h2>
                </div>
            </div>
            <div @click.prevent="(selectedCategory = 'protendida'), changeTab(0)"
                :class="{ '!border-primary text-primary grayscale-0': selectedCategory == 'protendida' }"
                class="flex cursor-pointer items-center justify-center space-x-4 rounded-2xl border-gray-100 panel p-3 grayscale">
                <icon-laje-protendida />
                <div>
                    <span class="text-xl">Cadastrar Composição da</span>
                    <h2 class="text-2xl font-bold">Laje Protendida</h2>
                </div>
            </div>
        </div>
        <!-- Category Switch -->

        <!-- Tabs -->
        <TabGroup v-if="selectedCategory" :selectedIndex="selectedTab" @change="changeTab">
            <TabList
                class="mb-5 flex overflow-y-auto whitespace-nowrap font-semibold dark:border-[#191e3a] flex space-x-4">
                <Tab as="template" v-slot="{ selected }">
                    <a href="javascript:;"
                        class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                        :class="{ '!border-primary text-primary grayscale-0': selected }">
                        <icon-viga />
                        Viga
                    </a>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <a href="javascript:;"
                        class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                        :class="{ '!border-primary text-primary grayscale-0': selected }">
                        <icon-aco />
                        Aço
                    </a>
                </Tab>
                <Tab v-show="selectedCategory == 'trelicada'" as="template" v-slot="{ selected }">
                    <a href="javascript:;"
                        class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                        :class="{ '!border-primary text-primary grayscale-0': selected }">
                        <icon-isopor />
                        Isopor
                    </a>
                </Tab>
                <Tab v-show="selectedCategory == 'trelicada'" as="template" v-slot="{ selected }">
                    <a href="javascript:;"
                        class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                        :class="{ '!border-primary text-primary grayscale-0': selected }">
                        <icon-tijolo />
                        Tijolo Cerâmico
                    </a>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <a href="javascript:;"
                        class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                        :class="{ '!border-primary text-primary grayscale-0': selected }">
                        <icon-tijolo />
                        Luminária
                    </a>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div class="mx-auto bg-white panel">
                        <div class="mx-auto flex items-center justify-between">
                            <h2 class="text-2xl font-bold">Viga</h2>
                            <!-- <button @click.prevent="isCreateVigaOpen = true"
                                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                                + Adicionar novo
                            </button> -->
                            <button @click.prevent="isCreateVigaOpen = true" class="btn btn-primary px-4 py-2"
                                type="button">
                                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                Adicionar novo
                            </button>
                        </div>

                        <div class="mt-5 space-y-5 dark:bg-[#0e1726]">
                            <div>
                                <div class="cursor-pointer rounded-t-md">
                                    <form class="space-y-5">
                                        <div class="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                                            <div>
                                                <label for="gridEmail">Buscar por nome da viga</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Viga"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11"
                                                        v-model="search_viga" @change="changeTab(0)" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24"
                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                stroke-width="1.5" opacity="0.5"></circle>
                                                            <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                stroke-width="1.5" stroke-linecap="round"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label for="gridEmail">Buscar pelo Cód da Treliça</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Treliça"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11"
                                                        v-model="search_trelica" @change="changeTab(0)" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24"
                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                stroke-width="1.5" opacity="0.5"></circle>
                                                            <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                stroke-width="1.5" stroke-linecap="round"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- TabelaGrande -->
                        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                            <table>
                                <thead class="text-boton text-normal">
                                    <tr>
                                        <th>Nome da Viga</th>
                                        <th>Treliça</th>
                                        <th>Valor</th>
                                        <th>Aço Adicional</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr v-for="(item, index) in results" :key="index">
                                        <td>
                                            {{ item.enchimento?.nome }}
                                        </td>
                                        <td>
                                            {{ item.tipo_trelica?.nome }}
                                        </td>
                                        <td>
                                            {{ $filters.moedaBRL(item.preco_m_trelica_sapata) }}
                                        </td>
                                        <td class="max-w-[40px]">
                                            <div class="flex gap-5">
                                                <svg class="h-[25px] w-[25px]" width="24" height="23"
                                                    viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2242_17486)">
                                                        <circle cx="12.0001" cy="11.2051" r="11.0384" fill="#33C830" />
                                                        <rect x="8.04224" y="10.1012" width="6.24549" height="2.20769"
                                                            rx="1.10384" transform="rotate(45 8.04224 10.1012)"
                                                            fill="white" />
                                                        <rect x="18.8909" y="8.3512" width="11.0384" height="2.20769"
                                                            rx="1.10384" transform="rotate(135 18.8909 8.3512)"
                                                            fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2242_17486">
                                                            <rect width="22.0769" height="22.0769" fill="white"
                                                                transform="translate(0.96167 0.166626)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <button @click="isCreateAcoAdicionalOpen = true; form = item">
                                                    <svg class="h-[25px] w-[25px]" width="24" height="25"
                                                        viewBox="0 0 24 25" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="0.705078" width="23" height="23" rx="11.5"
                                                            stroke="#FF9400" />
                                                        <path d="M7.09082 12.2051H16.909" stroke="#FF9400"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M12 17.1142V7.29602" stroke="#FF9400"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="editViga(item)">
                                                    <svg class="h-[25px] w-[25px]" width="30" height="31"
                                                        viewBox="0 0 30 31" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                        <path
                                                            d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="(deleteModal = true), (itemId = item.id)">
                                                    <svg class="h-[24px] w-[24px]" width="24" height="26"
                                                        viewBox="0 0 24 26" fill="none"
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
                                                        <path d="M9.99634 18.6047H13.9923" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M8.99927 13.8046H14.9992" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="mx-auto panel">
                        <div class="mx-auto flex items-center justify-between">
                            <h2 class="text-2xl font-bold">Aço</h2>
                            <!-- <button @click.prevent="isCreateAcoOpen = true"
                                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                                + Adicionar novo
                            </button> -->
                            <button @click.prevent="isCreateAcoOpen = true" class="btn btn-primary px-4 py-2"
                                type="button">
                                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                Adicionar novo
                            </button>
                        </div>

                        <div class="mt-5 space-y-5 dark:bg-[#0e1726]">
                            <div>
                                <div class="cursor-pointer rounded-t-md">
                                    <form class="space-y-5">
                                        <div class="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                                            <div>
                                                <label for="gridEmail">Buscar por Nome do Aço</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Aço"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <NuxtLink to="/faturarparacliente/filtro">
                                                            <svg class="mx-auto" width="16" height="16"
                                                                viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                    stroke-width="1.5" opacity="0.5"></circle>
                                                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                    stroke-width="1.5" stroke-linecap="round"></path>
                                                            </svg>
                                                        </NuxtLink>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label for="gridEmail">Buscar pelo Diâmetro</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Diametro"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <NuxtLink to="/faturarparacliente/filtro">
                                                            <svg class="mx-auto" width="16" height="16"
                                                                viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                    stroke-width="1.5" opacity="0.5"></circle>
                                                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                    stroke-width="1.5" stroke-linecap="round"></path>
                                                            </svg>
                                                        </NuxtLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- TabelaGrande -->
                        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                            <table>
                                <thead class="text-boton text-normal">
                                    <tr>
                                        <th>Tipo de Aço</th>
                                        <th>Diâmetro</th>
                                        <th>Valor</th>
                                        <th>Data de cadasto</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr v-for="(item, index) in results" :key="index">
                                        <td>
                                            {{ item.tipo_aco?.nome }}
                                        </td>
                                        <td>
                                            {{ item.diametro_do_aco }}
                                        </td>
                                        <td>
                                            {{ $filters.moedaBRL(item.preco_m_linear) }}
                                        </td>
                                        <td>
                                            {{ $filters.formatDate(item.date_created) }}
                                        </td>
                                        <td class="w-[60px]">
                                            <div class="flex gap-5">
                                                <button @click="editAco(item)">
                                                    <svg class="h-[25px] w-[25px]" width="30" height="31"
                                                        viewBox="0 0 30 31" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                        <path
                                                            d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="(deleteModal = true), (itemId = item.id)">
                                                    <svg class="h-[24px] w-[24px]" width="24" height="26"
                                                        viewBox="0 0 24 26" fill="none"
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
                                                        <path d="M9.99634 18.6047H13.9923" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M8.99927 13.8046H14.9992" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="mx-auto panel">
                        <div class="mx-auto flex items-center justify-between">
                            <h2 class="text-2xl font-bold">Enchimento EPS - Isopor</h2>
                            <!-- <button @click.prevent="isCreateIsopoOpen = true"
                                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                                + Adicionar novo
                            </button> -->
                            <button @click.prevent="isCreateIsopoOpen = true" class="btn btn-primary px-4 py-2"
                                type="button">
                                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                Adicionar novo
                            </button>
                        </div>

                        <div class="mt-5 space-y-5 dark:bg-[#0e1726]">
                            <div>
                                <div class="cursor-pointer rounded-t-md">
                                    <form class="space-y-5">
                                        <div class="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                                            <div>
                                                <label for="gridEmail">Buscar por nome da viga</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Viga"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <NuxtLink to="/faturarparacliente/filtro">
                                                            <svg class="mx-auto" width="16" height="16"
                                                                viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                    stroke-width="1.5" opacity="0.5"></circle>
                                                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                    stroke-width="1.5" stroke-linecap="round"></path>
                                                            </svg>
                                                        </NuxtLink>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label for="gridEmail">Buscar pelo Cód da Treliça</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Treliça"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <NuxtLink to="/faturarparacliente/filtro">
                                                            <svg class="mx-auto" width="16" height="16"
                                                                viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                    stroke-width="1.5" opacity="0.5"></circle>
                                                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                    stroke-width="1.5" stroke-linecap="round"></path>
                                                            </svg>
                                                        </NuxtLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- TabelaGrande -->
                        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                            <table>
                                <thead class="text-boton text-normal">
                                    <tr>
                                        <th>Marca</th>
                                        <th>Tipo de Densidade</th>
                                        <th>Medidas</th>
                                        <th>Valor</th>
                                        <th>Data do cadastro</th>
                                        <th>Tipo de Treliça</th>
                                        <th>Viga com Isopor</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr v-for="(item, index) in results" :key="index">
                                        <td>
                                            {{ item.enchimento_laje[0]?.marca ?? '-' }}
                                        </td>
                                        <td>
                                            {{ item.enchimento_laje[0]?.tipo_densidade ?? '-' }}
                                        </td>
                                        <td>
                                            <span v-if="item.enchimento_laje.length > 0">
                                                {{ `${item.enchimento_laje[0]?.a} x ${item.enchimento_laje[0]?.b} x
                                                ${item.enchimento_laje[0]?.b}` }}
                                            </span>
                                        </td>
                                        <td>{{ $filters.moedaBRL(item.preco_por_peca) }}</td>
                                        <td>{{ $filters.formatDate(item.date_created) }}</td>
                                        <td>
                                            {{ item.tipo_trelica?.nome }}
                                        </td>
                                        <td>
                                            <svg v-if="item.enchimento_laje.length > 0" class="h-[25px] w-[25px]"
                                                width="24" height="23" viewBox="0 0 24 23" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2242_17486)">
                                                    <circle cx="12.0001" cy="11.2051" r="11.0384" fill="#33C830" />
                                                    <rect x="8.04224" y="10.1012" width="6.24549" height="2.20769"
                                                        rx="1.10384" transform="rotate(45 8.04224 10.1012)"
                                                        fill="white" />
                                                    <rect x="18.8909" y="8.3512" width="11.0384" height="2.20769"
                                                        rx="1.10384" transform="rotate(135 18.8909 8.3512)"
                                                        fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2242_17486">
                                                        <rect width="22.0769" height="22.0769" fill="white"
                                                            transform="translate(0.96167 0.166626)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <svg v-if="item.enchimento_laje.length <= 0" width="24" height="23"
                                                viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12.0001" cy="11.2051" r="11.0384" fill="#E33030" />
                                                <rect x="8.87817" y="6.52173" width="11.0384" height="2.20769"
                                                    rx="1.10384" transform="rotate(45 8.87817 6.52173)" fill="white" />
                                                <rect x="16.6836" y="8.08301" width="11.0384" height="2.20769"
                                                    rx="1.10384" transform="rotate(135 16.6836 8.08301)" fill="white" />
                                            </svg>
                                        </td>
                                        <td>
                                            <div class="flex gap-5">
                                                <button @click="isEpsAdicionalOpen = true; form = item">
                                                    <svg class="h-[25px] w-[25px]" width="24" height="25"
                                                        viewBox="0 0 24 25" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="0.705078" width="23" height="23" rx="11.5"
                                                            stroke="#FF9400" />
                                                        <path d="M7.09082 12.2051H16.909" stroke="#FF9400"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M12 17.1142V7.29602" stroke="#FF9400"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="editEps(item)">
                                                    <svg class="h-[25px] w-[25px]" width="30" height="31"
                                                        viewBox="0 0 30 31" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                        <path
                                                            d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="(deleteModal = true), (itemId = item.id)">
                                                    <svg class="h-[24px] w-[24px]" width="24" height="26"
                                                        viewBox="0 0 24 26" fill="none"
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
                                                        <path d="M9.99634 18.6047H13.9923" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M8.99927 13.8046H14.9992" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="mx-auto panel">
                        <div class="mx-auto flex items-center justify-between">
                            <h2 class="text-2xl font-bold">Enchimento Tijolo Cerâmico</h2>
                            <!-- <button @click.prevent="isCreateTijoloOpen = true"
                                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                                + Adicionar novo
                            </button> -->
                            <button @click.prevent="isCreateTijoloOpen = true" class="btn btn-primary px-4 py-2"
                                type="button">
                                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                Adicionar novo
                            </button>
                        </div>

                        <div class="mt-5 space-y-5 dark:bg-[#0e1726]">
                            <div>
                                <div class="cursor-pointer rounded-t-md">
                                    <form class="space-y-5">
                                        <div class="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                                            <div>
                                                <label for="gridEmail">Buscar por Nome do Tijolo</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Tijolo"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <NuxtLink to="/faturarparacliente/filtro">
                                                            <svg class="mx-auto" width="16" height="16"
                                                                viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                    stroke-width="1.5" opacity="0.5"></circle>
                                                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                    stroke-width="1.5" stroke-linecap="round"></path>
                                                            </svg>
                                                        </NuxtLink>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label for="gridEmail">Buscar pela Marca</label>
                                                <div class="relative">
                                                    <input type="text" placeholder="Marca"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                        <NuxtLink to="/faturarparacliente/filtro">
                                                            <svg class="mx-auto" width="16" height="16"
                                                                viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                    stroke-width="1.5" opacity="0.5"></circle>
                                                                <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                    stroke-width="1.5" stroke-linecap="round"></path>
                                                            </svg>
                                                        </NuxtLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- TabelaGrande -->
                        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                            <table>
                                <thead class="text-boton text-normal">
                                    <tr>
                                        <th>Marca</th>
                                        <th>Tipo de Densidade</th>
                                        <th>Medidas</th>
                                        <th>Valor</th>
                                        <th>Data do cadastro</th>
                                        <th>Viga com Tijolo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr v-for="(item, index) in results" :key="index">
                                        <td>
                                            {{ item.enchimento_laje[0]?.marca ?? '-' }}
                                        </td>
                                        <td>
                                            {{ item.enchimento_laje[0]?.tipo_densidade ?? '-' }}
                                        </td>
                                        <td>
                                            <span v-if="item.enchimento_laje.length > 0">
                                                {{ `${item.enchimento_laje[0]?.a} x ${item.enchimento_laje[0]?.b} x
                                                ${item.enchimento_laje[0]?.b}` }}
                                            </span>
                                        </td>
                                        <td>{{ $filters.moedaBRL(item.preco_por_peca) }}</td>
                                        <td>{{ $filters.formatDate(item.date_created) }}</td>
                                        <td>
                                            <svg v-if="item.enchimento_laje.length > 0" class="h-[25px] w-[25px]"
                                                width="24" height="23" viewBox="0 0 24 23" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2242_17486)">
                                                    <circle cx="12.0001" cy="11.2051" r="11.0384" fill="#33C830" />
                                                    <rect x="8.04224" y="10.1012" width="6.24549" height="2.20769"
                                                        rx="1.10384" transform="rotate(45 8.04224 10.1012)"
                                                        fill="white" />
                                                    <rect x="18.8909" y="8.3512" width="11.0384" height="2.20769"
                                                        rx="1.10384" transform="rotate(135 18.8909 8.3512)"
                                                        fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2242_17486">
                                                        <rect width="22.0769" height="22.0769" fill="white"
                                                            transform="translate(0.96167 0.166626)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <svg v-if="item.enchimento_laje.length <= 0" width="24" height="23"
                                                viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12.0001" cy="11.2051" r="11.0384" fill="#E33030" />
                                                <rect x="8.87817" y="6.52173" width="11.0384" height="2.20769"
                                                    rx="1.10384" transform="rotate(45 8.87817 6.52173)" fill="white" />
                                                <rect x="16.6836" y="8.08301" width="11.0384" height="2.20769"
                                                    rx="1.10384" transform="rotate(135 16.6836 8.08301)" fill="white" />
                                            </svg>
                                        </td>
                                        <td>
                                            <div class="flex gap-5">
                                                <button @click="isCeramicoAdicionalOpen = true; form = item">
                                                    <svg class="h-[25px] w-[25px]" width="24" height="25"
                                                        viewBox="0 0 24 25" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="0.705078" width="23" height="23" rx="11.5"
                                                            stroke="#FF9400" />
                                                        <path d="M7.09082 12.2051H16.909" stroke="#FF9400"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M12 17.1142V7.29602" stroke="#FF9400"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="editCeramico(item)">
                                                    <svg class="h-[25px] w-[25px]" width="30" height="31"
                                                        viewBox="0 0 30 31" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                        <path
                                                            d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="(deleteModal = true), (itemId = item.id)">
                                                    <svg class="h-[24px] w-[24px]" width="24" height="26"
                                                        viewBox="0 0 24 26" fill="none"
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
                                                        <path d="M9.99634 18.6047H13.9923" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M8.99927 13.8046H14.9992" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="mx-auto panel">
                        <div class="mx-auto flex items-center justify-between">
                            <h2 class="text-2xl font-bold">Luminária</h2>
                            <!-- <button @click.prevent="isCreateTijoloOpen = true"
                                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                                + Adicionar novo
                            </button> -->
                            <button @click.prevent="isCreateLuminariaOpen = true" class="btn btn-primary px-4 py-2"
                                type="button">
                                <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                Adicionar novo
                            </button>
                        </div>

                        <div class="mt-5 space-y-5 dark:bg-[#0e1726]">
                            <div>
                                <div class="cursor-pointer rounded-t-md">
                                    <form class="space-y-5">
                                        <div class="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                                            <div>
                                                <label for="gridEmail">Buscar</label>
                                                <div class="relative">
                                                    <input type="text" v-model="search_viga" placeholder=""
                                                        @change="changeTab(4)"
                                                        class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                    <div
                                                        class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">

                                                        <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24"
                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                                stroke-width="1.5" opacity="0.5"></circle>
                                                            <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                                stroke-width="1.5" stroke-linecap="round"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- TabelaGrande -->
                        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                            <table>
                                <thead class="text-boton text-normal">
                                    <tr>
                                        <th>Marca</th>
                                        <th>Valor</th>
                                        <th>Tipo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr v-for="(item, index) in results" :key="index">
                                        <td>
                                            {{ item?.marca ?? '-' }}
                                        </td>
                                        <td>{{ $filters.moedaBRL(item.preco_por_peca) }}</td>
                                        <td>
                                            {{ item.enchimento.nome }}
                                        </td>
                                        <td>
                                            <div class="flex gap-5">
                                                <button @click="editLuminaria(item)">
                                                    <svg class="h-[25px] w-[25px]" width="30" height="31"
                                                        viewBox="0 0 30 31" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.7493 2.70544H11.2493C4.99927 2.70544 2.49927 5.20544 2.49927 11.4554V18.9554C2.49927 25.2054 4.99927 27.7054 11.2493 27.7054H18.7493C24.9993 27.7054 27.4993 25.2054 27.4993 18.9554V16.4554"
                                                            stroke="#95979B" stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M20.0501 3.98027L10.2001 13.8303C9.82509 14.2053 9.45009 14.9428 9.37509 15.4803L8.83759 19.2428C8.63759 20.6053 9.60009 21.5553 10.9626 21.3678L14.7251 20.8303C15.2501 20.7553 15.9876 20.3803 16.3751 20.0053L26.2251 10.1553C27.9251 8.45527 28.7251 6.48027 26.2251 3.98027C23.7251 1.48027 21.7501 2.28027 20.0501 3.98027Z"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                        <path
                                                            d="M18.6377 5.39258C19.4752 8.38008 21.8127 10.7176 24.8127 11.5676"
                                                            stroke="#95979B" stroke-width="1.5" stroke-miterlimit="10"
                                                            stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button @click="(deleteModal = true), (itemId = item.id)">
                                                    <svg class="h-[24px] w-[24px]" width="24" height="26"
                                                        viewBox="0 0 24 26" fill="none"
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
                                                        <path d="M9.99634 18.6047H13.9923" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M8.99927 13.8046H14.9992" stroke="#95979B"
                                                            stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
    <!-- Tabs -->

    <!-- Modal apagar -->
    <client-only>
        <el-dialog title="Confirmação" v-model="deleteModal"
            class="panel w-full max-w-2xl max-w-[400px] overflow-hidden !rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
            <div class="mx-auto mb-5 flex items-center justify-between">
                <p>Deseja realmente apagar?</p>
            </div>

            <template #footer>
                <div class="mt-5 flex justify-end">
                    <button @click="deleteModal = false"
                        class="ml-4 rounded-full bg-gray-600 px-4 py-2 text-sm font-bold text-[white]">Não</button>

                    <button @click="remove(itemId)"
                        class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">Sim</button>
                </div>
            </template>
        </el-dialog>
    </client-only>

    <!-- Modal -->
    <TransitionRoot appear :show="isCreateVigaOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-4xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                            <CreateVigaModal @close="closeVigaModal" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isCreateAcoOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-4xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                            <CreateAcoModal @close="closeAcoModal" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isCreateIsopoOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-4xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                            <CreateEpsModal @close="closeEpsModal" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isCreateTijoloOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-4xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                            <CreateCeramicoModal @close="closeCeramicoModal" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isCreateAcoAdicionalOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-5xl overflow-hidden rounded-2xl border-0 text-black dark:text-white-dark">
                            <AcoAdicionalModal @close="closeVigaModal" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Eps Enchimento Modal -->
    <TransitionRoot appear :show="isEpsAdicionalOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-5xl overflow-hidden rounded-2xl border-0 text-black dark:text-white-dark">
                            <EnchimentoEpsModal @close="closeEpsEnchimento" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Tijolo Enchimento Modal  -->
    <TransitionRoot appear :show="isCeramicoAdicionalOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-5xl overflow-hidden rounded-2xl border-0 text-black dark:text-white-dark">
                            <EnchimentoCeramicoModal @close="closeCeramicoEnchimento" :tipo="selectedCategory"
                                :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isCreateLuminariaOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[white]/80" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel w-full max-w-2xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                            <CreateLuminariaModal @close="closeLuminariaModal" :tipo="selectedCategory" :data="form" />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Modal -->
</template>
