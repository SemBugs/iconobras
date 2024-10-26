<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import type { Orcamento, Empresa, ArquivoProjeto, Enchimento, Produto } from '@/types/types';

const { getItems, getItemById, updateItem } = useDirectusItems();
const $emit = defineEmits(['close'])

const form = ref<Orcamento>({
    step: 0
} as Orcamento);

const props = defineProps(['vao']);

const empresa = ref<Empresa>({} as Empresa);
const pavimento = ref<ArquivoProjeto>({
    apoio_viga: 0.15,
    apoio_vao: 0.15
} as ArquivoProjeto);
const vaos = ref([]);
const vao = ref({});
const aco_adicional = ref([]);
const marca_enchimento = ref({});
const arquivos = ref([]);

const apoio_viga = [
    { label: '10cm', value: 0.10 },
    { label: '15cm', value: 0.15 },
    { label: '20cm', value: 0.20 },
    { label: '25cm', value: 0.25 },
    { label: '30cm', value: 0.30 },
    { label: '35cm', value: 0.35 },
    { label: '40cm', value: 0.40 },
    { label: '45cm', value: 0.45 },
    { label: '50cm', value: 0.50 },
];

const luminaria = ref<Produto[]>([]);

const getOrcamento = async () => {
    let tipo = "isopor";

    if (pavimento.enchimento === 2) {
        tipo = 'tijolo';
    }

    if (pavimento.enchimento === 3) {
        tipo = 'painel-macico';
    }

    if (pavimento.enchimento === 4) {
        tipo = 'painel-aliviado';
    }

    getEnchimento(tipo);

    getVaos();
}

const eps = ref([]);

const cancelar = () => {
    $emit('close');
};

const getEnchimento = async (tipoEnchimento: any) => {
    if (tipoEnchimento == 'painel-aliviado') {
        eps.value = await getItems({
            collection: 'enchimento', params: {
                filter: {
                    "produto": { "tipo_produto": { "_eq": 'isopor' }, "utilizacao": { "_eq": "aliviado" } },
                }
            }
        });
    } else {
        eps.value = await getItems({
            collection: 'enchimento', params: {
                filter: {
                    "produto": { "tipo_produto": { "_eq": tipoEnchimento } }
                }
            }
        });
    }

    getMarcaEnchimento(pavimento.value.marca_enchimento);
}

onMounted(() => {

    pavimento.value = props.vao;
    pavimento.value.viga = pavimento.value?.viga?.id;
    getAco(pavimento.value?.viga);
    setViga(pavimento.value?.enchimento, pavimento.value)
    getOrcamento();
    empresa.value = JSON.parse(localStorage.getItem('empresa') as string);

})

const getAco = async (id: number) => {
    aco_adicional.value = await getItems({
        collection: 'aco_adicional', params: {
            filter: {
                "produto": { "_eq": `${id}` }
            },
            fields: "*"
        }
    });
}

const salvarPavimento = async () => {
    const vigaT: Produto = await getItemById({ collection: "produto", id: pavimento.value.viga });

    let marca_enchimentoT: Enchimento = {};
    let enchimentoT: Produto = {};

    if (pavimento.value.enchimento != 3) {
        marca_enchimentoT = await getItemById({ collection: "enchimento", id: pavimento.value.marca_enchimento });
        enchimentoT = await getItemById({ collection: "produto", id: marca_enchimentoT.produto });
    }

    const diametro_aco1T: Produto = await getItemById({ collection: "produto", id: pavimento.value.diametro_aco1 });
    const diametro_aco2T: Produto = await getItemById({ collection: "produto", id: pavimento.value.diametro_aco2 });
    const diametro_aco3T: Produto = await getItemById({ collection: "produto", id: pavimento.value.diametro_aco3 });

    const C: number = pavimento.value?.vao_oposto; // Apoio do oposto
    const AV: number = pavimento.value?.apoio_vao // apoio do vão
    const VB: number = vigaT.largura_sapa_viga; // Campo Largura da sapada da viga
    let BE: number = 0; // Campo A do enchimento / por 100 que converte em cm
    let BA: number = 0; // Campo B do enchimento / por 100 que converte em cm
    let BC: number = 0; // Campo C do enchimento / por 100 que converte em cm

    if (pavimento.value.enchimento != 3) {
        BE = marca_enchimentoT.a / 100; // Campo A do enchimento / por 100 que converte em cm
        BA = marca_enchimentoT.b / 100; // Campo B do enchimento / por 100 que converte em cm
        BC = marca_enchimentoT.c / 100; // Campo C do enchimento / por 100 que converte em cm
    }
    const O: number = C + AV; // Apoio do oposto + apoio do vão
    const I: number = pavimento.value?.comprimento_viga + pavimento.value?.apoio_viga // Comprimento da viga + apoio da viga;
    const VA: number = pavimento.value?.viga_adicional;

    let H: number = Math.round((O / (VB + BE)) + VA);

    if (pavimento.value.enchimento == 4) {
        H = Math.round(O / VB + VA);
    }

    const Q: number = H * I;
    const PF: number = vigaT.preco_m_trelica_sapata;
    const T: number = Q * PF;
    const R: number = (I * O); // Apoio do oposto * (Apoio do oposto + apoio do vão) arredonda
    let P: number = 0;

    if (pavimento.value.enchimento != 3 && pavimento.value.enchimento != 4) {
        P = (R / (VB + BE)) / BC; // Quantidade de enchimento
    } else {
        P = (R / VB) / BC; // Quantidade de enchimento
    }

    let S: number = 0;
    let PM: number = 0;
    if (pavimento.value.enchimento != 3) {
        PM = enchimentoT.preco_por_m;
        S = P * ((BE * BA * BC) * PM);
    }
    let AD1: number = 0;
    let AD2: number = 0;
    let AD3: number = 0;
    let pesoAco: number = 0;

    if (pavimento.value?.quantidade_aco1) {
        AD1 = Q * pavimento.value?.quantidade_aco1 * diametro_aco1T.preco_m_linear;
        pesoAco += pavimento.value?.quantidade_aco1 * diametro_aco1T.peso_por_metro_linear;
    }
    if (pavimento.value?.quantidade_aco2) {
        AD2 = Q * pavimento.value?.quantidade_aco2 * diametro_aco2T.preco_m_linear;
        pesoAco += pavimento.value?.quantidade_aco2 * diametro_aco2T.peso_por_metro_linear;
    }
    if (pavimento.value?.quantidade_aco2) {
        AD3 = Q * pavimento.value?.quantidade_aco3 * diametro_aco3T.preco_m_linear;
        pesoAco += pavimento.value?.quantidade_aco3 * diametro_aco3T.peso_por_metro_linear;
    }

    const U: number = (AD1 + AD2 + AD3);

    let valor_luminaria: number = 0;

    if (pavimento.value.marca_luminaria) {
        const luminaria: Produto = await getItemById({ collection: "produto", id: pavimento.value.marca_luminaria });
        valor_luminaria = parseFloat(pavimento.value.luminaria * luminaria.preco_por_peca);
    }

    pavimento.value.med_vigas_com_apoio = I; // Passo 1
    pavimento.value.vao_opo_com_apoio = O; // Passo 2
    pavimento.value.quantidade_vigas = H; // Passo 3
    pavimento.value.met_linear_de_vigas = Q; // Passo 4
    pavimento.value.preco_vigas = T; // Passo 5
    pavimento.value.area_m = R; // Passo 6
    pavimento.value.qtd_enchimento = P.toFixed(2); // Passo 7
    pavimento.value.preco_enchimento = S.toFixed(2); // Passo 8 arredonda
    pavimento.value.preco_aco_adicional = U.toFixed(2);
    pavimento.value.valor_luminaria = valor_luminaria;
    pavimento.value.valor_total = (valor_luminaria + T + S + U).toFixed(2);
    pavimento.value.peso_aco = pesoAco;
    pavimento.value.peso_viga = vigaT.peso_por_metro_linear;
    pavimento.value.peso_total = pesoAco + vigaT.peso_por_metro_linear;

    await updateItem({ collection: 'arquivo_projeto', id: pavimento.value.id.toString(), item: pavimento.value });
    $emit('close');
}

const getVaos = async () => {
    vaos.value = [];
    vaos.value = await getItems({
        collection: "arquivo_projeto",
        params: { "fields": "*, arquivo.*", "filter": { "orcamento": { "_eq": `${form.value.id}` }, "vao": { "_eq": "true" } } }
    });
}

const getLuminaria = async (tipo: any) => {
    luminaria.value = await getItems({
        collection: 'produto', params: {
            filter: {
                "enchimento": { "_eq": tipo },
                "tipo_produto": { "_eq": 'luminaria' },
            }
        }
    });
};

const getMarcaEnchimento = (id: number) => {
    const epsF = eps.value.filter((item: any) => {
        return item.id == id;
    });

    marca_enchimento.value = epsF[0];
}

const diametro_do_aco = await getItems({
    collection: 'produto',
    params: {
        filter: {
            "tipo_produto": {
                "_eq": "aco"
            }
        },
        fields: "id, tipo_aco.nome, diametro_do_aco"
    }
});

const vigas = ref([]);

const setViga = async (id: number, pavimento: any) => {
    getLuminaria(id);

    pavimento.enchimento = id;

    vigas.value = [];

    const products = await getItems({
        collection: 'produto',
        params: {
            filter: { "enchimento": { "_eq": `${id}` }, "tipo_produto": { "_eq": "viga" } },
            fields: '*, tipo_trelica.nome, tipo_trelica.id, enchimento.nome, enchimento.id',
        }
    });

    vigas.value = await Promise.all(products.map(async (item: any) => {
        item.aco_adicional = await getItems({
            collection: 'aco_adicional',
            params: {
                filter: {
                    "produto": { "_eq": `${item.id}` }
                },
                fields: "*, diametro_aco1.id, diametro_aco2.id, diametro_aco3.id, diametro_aco1.tipo_aco.nome, diametro_aco1.diametro_do_aco, diametro_aco2.diametro_do_aco, diametro_aco3.diametro_do_aco, diametro_aco2.tipo_aco.nome, diametro_aco3.tipo_aco.nome"
            }
        });
        return item;
    }));

    let tipo = "isopor";

    if (id === 2) {
        tipo = 'tijolo';
    }

    if (id === 3) {
        tipo = 'painel-macico';
    }

    if (id === 4) {
        tipo = 'painel-aliviado';
    }

    getEnchimento(tipo);
}
</script>

<template>
    <div>
        <div class="space-y-6">
            <div class="space-y-6">
                <div class="space-y-2">
                    <input id="name" v-model="pavimento.nome"
                        placeholder="Coloque o ID desse pavimento : (ex: Pavimento Elevação 3 metros)" type="text"
                        class="form-input text-white-dark " />
                </div>
            </div>

            <div v-if="pavimento.id" class="mb-5">
                <div
                    class="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:justify-start mt-3 mb-5 sm:space-x-3 rtl:space-x-reverse">
                    <div>
                        <a href="javascript:;" @click="setViga(1, pavimento)"
                            class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary grayscale-0': pavimento.enchimento == 1 }">
                            <icon-trelica-esp />
                            Treliça / Eps
                        </a>
                    </div>
                    <div>
                        <a href="javascript:;" @click="setViga(2, pavimento)"
                            class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary grayscale-0': pavimento.enchimento == 2 }">
                            <icon-trelica-cer />
                            Treliça / Cer
                        </a>
                    </div>
                    <div>
                        <a href="javascript:;" @click="setViga(3, pavimento)"
                            class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary grayscale-0': pavimento.enchimento == 3 }">
                            <icon-painel-macico />
                            Painel Maciço
                        </a>
                    </div>
                    <div>
                        <a href="javascript:;" @click="setViga(4, pavimento)"
                            class="panel flex w-40 flex-col items-center justify-center gap-2 rounded-md border border-transparent p-4 text-center !outline-none grayscale hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary grayscale-0': pavimento.enchimento == 4 }">
                            <icon-painel-aliviado />
                            Painel Aliviado
                        </a>
                    </div>
                </div>
                <div v-if="pavimento?.enchimento" class="flex-1 text-sm">
                    <div>
                        <h4 class="font-semibold text-xl mb-4">

                            <span v-if="pavimento.enchimento == 1">Treliça / Eps</span>
                            <span v-if="pavimento.enchimento == 2">Treliça / Cer</span>
                            <span v-if="pavimento.enchimento == 3">Painel Maciço</span>
                            <span v-if="pavimento.enchimento == 4">Painel Aliviado</span>
                        </h4>
                        <div>
                            <div>
                                <div class="grid grid-cols-6 gap-4 pb-10">
                                    <div class=" col-span-2">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                            for="name">Treliça</label>
                                        <select id="pavimento" v-model="pavimento.viga"
                                            class="form-select bg-[#E0EAFE] text-[#1B5870DB]"
                                            @change="getAco(pavimento.viga)">
                                            <option v-for="item in vigas" :key="item.id" :value="item.id">
                                                {{ item.tipo_trelica.nome }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class=" col-span-2">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                            for="name">Sobrecarga</label>
                                        <select id="pavimento" v-model="pavimento.sobrecarga"
                                            class="form-select bg-[#E0EAFE] text-[#1B5870DB]">
                                            <option v-for="(item, index) in aco_adicional" :value="item.id"
                                                :key="index">
                                                {{ item.sobrecarga_max }} KG
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-span-2">
                                        <div class="pt-1">
                                            <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                                ÁREA M²
                                            </label>
                                            <input id="pavimento" v-model="pavimento.area_m"
                                                class="form-input bg-[#EEEEEE] text-[#1B5870DB]" />
                                        </div>
                                    </div>

                                    <div class="py-2 col-span-6" v-if="pavimento?.sobrecarga">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                            Aço Adicional Manual
                                        </label>
                                        <div class="flex gap-7">
                                            <div
                                                class="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] p-3 rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                <label class="text-sm pb-1" for="name">Aço 1</label>
                                                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
                                                    <input v-if="pavimento?.sobrecarga"
                                                        class="form-input  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                        v-model="pavimento.quantidade_aco1" :min="1" />

                                                    <div v-if="pavimento.sobrecarga" class="">
                                                        <select
                                                            class="form-select  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                            v-model="pavimento.diametro_aco1">
                                                            <option v-for="(item, index) in diametro_do_aco"
                                                                :key="item.id" :value="item.id">
                                                                ¢{{ item.diametro_do_aco }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                class="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] p-3 rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                <label class="text-sm pb-1" for="name">Aço 2</label>
                                                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
                                                    <input v-if="pavimento?.sobrecarga"
                                                        class="form-input  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                        v-model="pavimento.quantidade_aco2" :min="1" />

                                                    <div class="">
                                                        <select
                                                            class="form-select  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                            v-model="pavimento.diametro_aco2">
                                                            <option v-for="(item, index) in diametro_do_aco"
                                                                :key="item.id" :value="item.id">
                                                                ¢{{ item.diametro_do_aco }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                class="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] p-3 rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                <label class="text-sm pb-1" for="name">Aço 3</label>
                                                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
                                                    <input v-if="pavimento?.sobrecarga"
                                                        class="form-input  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                        v-model="pavimento.quantidade_aco3" :min="1" />

                                                    <select class="form-select  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                        v-model="pavimento.diametro_aco3">
                                                        <option v-for="(item, index) in diametro_do_aco" :key="item.id"
                                                            :value="item.id">
                                                            ¢{{ item.diametro_do_aco }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="pavimento.enchimento != 3" class="col-span-2">
                                        <label class=" text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                            Marca Enchimento
                                        </label>

                                        <select id="pavimento" v-model="pavimento.marca_enchimento"
                                            @change="getMarcaEnchimento(pavimento.marca_enchimento)"
                                            class="form-select bg-[#EEEEEE] text-[#1B5870DB]">
                                            <option v-for="(item, index) in eps" :key="index" :value="item.id"
                                                placeholder="1 Pavimento">
                                                {{ item?.marca }}
                                            </option>
                                        </select>
                                    </div>

                                    <div v-if="pavimento.enchimento != 3 && marca_enchimento" class=" col-span-2">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                            for="name">Dimensões</label>
                                        <div class="form-input bg-[#EEEEEE] text-[#1B5870DB]">
                                            <span v-if="marca_enchimento?.a">
                                                {{ marca_enchimento?.a }}
                                            </span>
                                            <span v-if="marca_enchimento?.b">
                                                x {{ marca_enchimento?.b }}
                                            </span>
                                            <span v-if="marca_enchimento?.c">
                                                x {{ marca_enchimento?.c }}
                                            </span>
                                            <span v-if="marca_enchimento?.d">
                                                x {{ marca_enchimento?.d }}
                                            </span>
                                        </div>
                                    </div>

                                    <div v-if="pavimento.enchimento != 2 && pavimento.enchimento != 3 && marca_enchimento"
                                        class=" col-span-2">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                            for="name">Tipo</label>
                                        <div class="form-input bg-[#EEEEEE] text-[#1B5870DB]">
                                            {{ marca_enchimento?.tipo_densidade }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid gap-x-8 grid-cols-4 col-span-2">
                                <div>
                                    <icon-luminaria />
                                    <label class="text-xs pt-5 text-[#008ED6] placeholder:text-xs" for="name">
                                        VIGA ADICIONAL
                                    </label>
                                    <input id="name" type="text" v-model="pavimento.viga_adicional"
                                        class="form-input bg-[#EEEEEE]" />
                                </div>

                                <div>
                                    <icon-luminaria />
                                    <label class="text-xs pt-5 text-[#008ED6] placeholder:text-xs"
                                        for="name">LUMINÁRIA</label>
                                    <input id="name" type="text" v-model="pavimento.luminaria"
                                        class="form-input bg-[#EEEEEE]" />
                                </div>

                                <div>
                                    <div>
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="name"></label>
                                        <icon-apoio-viga />
                                    </div>
                                    <div>
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                            Apoio Viga
                                        </label>

                                        <client-only>
                                            <el-select v-model="pavimento.apoio_viga" placeholder="Selecione"
                                                size="large">
                                                <el-option v-for="item in apoio_viga" :key="item.value"
                                                    :label="item.label" :value="item.value" />

                                            </el-select>
                                        </client-only>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="name"></label>
                                        <icon-apoio-vao />
                                    </div>

                                    <div class="col-span-1 pt-1">
                                        <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                            Apio Vão
                                        </label>

                                        <client-only>
                                            <el-select v-model="pavimento.apoio_vao" placeholder="Selecione"
                                                size="large">
                                                <el-option v-for="item in apoio_viga" :key="item.value"
                                                    :label="item.label" :value="item.value" />
                                            </el-select>
                                        </client-only>
                                    </div>
                                </div>

                                <div class="pt-16">
                                    <label class=" text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                        MARCA LUMINÁRIA
                                    </label>


                                    <select id="pavimento" v-model="pavimento.marca_luminaria"
                                        class="form-select bg-[#EEEEEE] text-[#1B5870DB]">
                                        <option v-for="(item, index) in luminaria" :key="index" :value="item.id"
                                            placeholder="1 Pavimento">
                                            {{ item?.marca }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-span-1 space-y-2 pt-6">
                                    <svg width="98" height="31" viewBox="0 0 98 31" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <line x1="-0.000244141" y1="2.06519" x2="97.4497" y2="2.06519" stroke="#1B5870"
                                            stroke-width="4" />
                                        <path d="M5.53368 22.1751L13.5468 3.53235L21.5598 22.1751H5.53368Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M23.2494 22.1751L31.2625 3.53235L39.2755 22.1751H23.2494Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M41.6097 22.1751L49.6228 3.53235L57.6359 22.1751H41.6097Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M60.2579 22.1751L68.271 3.53235L76.2841 22.1751H60.2579Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M78.4321 22.1751L86.4452 3.53235L94.4583 22.1751H78.4321Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path
                                            d="M0.213989 19.4971H97.448V25.5571C97.448 27.2139 96.1049 28.5571 94.448 28.5571H3.21399C1.55714 28.5571 0.213989 27.2139 0.213989 25.5571V19.4971Z"
                                            fill="#C4C4C4" />
                                        <path
                                            d="M0.213989 19.4971H97.448V25.5571C97.448 27.2139 96.1049 28.5571 94.448 28.5571H3.21399C1.55714 28.5571 0.213989 27.2139 0.213989 25.5571V19.4971Z"
                                            stroke="#444444" />
                                    </svg>

                                    <label>COMP. VIGA</label>

                                    <client-only>
                                        <el-input-number type="number" v-model="pavimento.comprimento_viga"
                                            :precision="2" :min="1" :max="10" :step="0.1" :controls="false" />
                                    </client-only>
                                </div>
                                <div class="col-span-1 space-y-2  pt-6">
                                    <svg width="98" height="31" viewBox="0 0 98 31" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <line x1="-0.000244141" y1="2.06519" x2="97.4497" y2="2.06519" stroke="#1B5870"
                                            stroke-width="4" />
                                        <path d="M5.53368 22.1751L13.5468 3.53235L21.5598 22.1751H5.53368Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M23.2494 22.1751L31.2625 3.53235L39.2755 22.1751H23.2494Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M41.6097 22.1751L49.6228 3.53235L57.6359 22.1751H41.6097Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M60.258 22.1751L68.2711 3.53235L76.2842 22.1751H60.258Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path d="M78.4321 22.1751L86.4452 3.53235L94.4583 22.1751H78.4321Z"
                                            stroke="#1B5870" stroke-width="2" />
                                        <path
                                            d="M0.21582 19.4971H97.4499V25.5571C97.4499 27.2139 96.1067 28.5571 94.4499 28.5571H3.21582C1.55897 28.5571 0.21582 27.2139 0.21582 25.5571V19.4971Z"
                                            fill="#C4C4C4" />
                                        <path
                                            d="M0.21582 19.4971H97.4499V25.5571C97.4499 27.2139 96.1067 28.5571 94.4499 28.5571H3.21582C1.55897 28.5571 0.21582 27.2139 0.21582 25.5571V19.4971Z"
                                            stroke="#444444" />
                                    </svg>

                                    <label>VÃO VIGA</label>

                                    <client-only>
                                        <el-input-number type="number" v-model="pavimento.vao_viga" :precision="2"
                                            :min="1" :max="10" :step="0.1" :controls="false" />
                                    </client-only>
                                </div>
                                <div class="col-span-1 space-y-2  pt-14">
                                    <label>VÃO OPOSTO</label>

                                    <client-only>
                                        <el-input-number type="number" v-model="pavimento.vao_oposto" :precision="2"
                                            :min="1" :max="10" :step="0.1" :controls="false" />
                                    </client-only>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end pt-5">
            <button @click.prevent="cancelar()"
                class="bg-gray-600 text-sm rounded-full px-4 py-2 text-[white] ml-4 font-bold">
                Cancelar
            </button>

            <button @click="salvarPavimento()"
                class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                Salvar
            </button>
        </div>
    </div>
</template>