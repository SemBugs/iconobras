<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'

import type { Orcamento, Fornecedor, Empresa, Enchimento, Produto, ArquivoProjeto, Cliente } from '@/types/types';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElNotification } from 'element-plus';
import { useDirectusFile } from '@/stores/directus-file';

const { getItems, getItemById, createItems, updateItem, deleteItems } = useDirectusItems();
const { uploadFiles } = useDirectusFile()

const form = ref<Orcamento>({
    step: 0,
    como_sera_pago: 1,
} as Orcamento);

const empresa = ref<Empresa>({} as Empresa);
const route = useRoute();
const router = useRouter();
const pavimento = ref({});
const vaos = ref([]);
const vao = ref({});
const openVaoModal = ref(false);
const aco_adicional = ref([]);
const fornecedores: Fornecedor[] = await getItems({ collection: 'fornecedor' });
const tipo_obra = [
    {
        "text": "Residencial",
        "value": "residencial"
    },
    {
        "text": "Predial",
        "value": "predial"
    }
];
const luminaria = ref<Produto[]>([]);
const estados = ref([]);
const cidades = ref([]);
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

const formasPagamentos = [
    {
        "text": "Dinheiro",
        "value": "01"
    },
    {
        "text": "Transferência bancária",
        "value": "18"
    },
    {
        "text": "Pix",
        "value": "17"
    },
    {
        "text": "Cartão de Debito",
        "value": "04"
    },
    {
        "text": "Cartão de Crédito",
        "value": "03"
    },
    {
        "text": "Cheque",
        "value": "02"
    },
    {
        "text": "Crédito Loja",
        "value": "05"
    },
    {
        "text": "Vale Alimentação",
        "value": "10"
    },
    {
        "text": "Vale Presente",
        "value": "12"
    },
    {
        "text": "Vale Refeição",
        "value": "11"
    },
    {
        "text": "Vale Combustível",
        "value": "13"
    },
    {
        "text": "Boleto Bancário",
        "value": "15"
    },
    {
        "text": "Depósito Bancário",
        "value": "16"
    },
    {
        "text": "Sem pagamento",
        "value": "90"
    },
    {
        "text": "Outros",
        "value": "99"
    }
];

const valorTotal = async () => {
    try {
        let valor = vaos.value.reduce((resultado, item) => resultado + item.valor_total, 0);

        await updateItem({
            collection: 'orcamento',
            id: form.value.id.toString(),
            item: { valor },
        });
    } catch (error) {
        console.error("Erro:", error);
    }

}

const closeVaoModal = () => {
    vao.value = {};
    openVaoModal.value = false;
    getVaos();
}

const arquivo_projeto = ref({});
const listArquivos = ref<UploadUserFile[]>([])
const arquivos = ref([]);

const salvar = async () => {
    if (route.params.id === 'novo') {
        form.value.step = 1;
        form.value.empresa = empresa.value.id;
        form.value = await createItems({ collection: 'orcamento', items: form.value });
        router.push(`/vendas/orcamentos/step/${form.value.id}`);
    } else {
        form.value.step = 1;
        form.value = await updateItem({ collection: 'orcamento', id: form.value.id, item: form.value });
    }
}

const setStep = async (step: number) => {
    form.value.step = step;

    form.value = await updateItem({ collection: 'orcamento', id: form.value.id, item: form.value });
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

const getEnchimento = async (tipoEnchimento: any) => {
    if (tipoEnchimento == 'painel-aliviado') {
        eps.value = await getItems({
            collection: 'enchimento', params: {
                filter: {
                    "produto": { "tipo_produto": { "_eq": 'isopor' }, "utilizacao": { "_eq": "aliviado" } },
                }
            }
        });
    }
    else if (tipoEnchimento == 'isopor') {
        eps.value = await getItems({
            collection: 'enchimento', params: {
                filter: {
                    "produto": { "tipo_produto": { "_eq": 'isopor' }, "utilizacao": { "_eq": "trelicado" } },
                }
            }
        });
    }
    else {
        eps.value = await getItems({
            collection: 'enchimento', params: {
                filter: {
                    "produto": { "tipo_produto": { "_eq": tipoEnchimento } }
                }
            }
        });
    }
}


const getOrcamento = async () => {
    if (route.params.id !== 'novo') {
        form.value = await getItemById({
            collection: 'orcamento',
            id: route.params.id
        });

        if (route.query.step) {
            form.value.step = route.query.step;
        }

        getArquivos();
        getVaos();
        getPavimento();
    }
}

const getPavimento = async () => {
    if (form.value.pavimento) {
        pavimento.value = await getItemById({
            collection: 'arquivo_projeto',
            id: form.value.pavimento,
            params: {
                fields: "*, enchimento.*, marca_enchimento.*"
            }
        });

        if (pavimento.value.viga) {
            getAco(pavimento.value.viga);
        }
    }
}

onMounted(() => {
    empresa.value = JSON.parse(localStorage.getItem('empresa') as string);
    getEstados();
    getOrcamento();
})

const salvarPavimento = async () => {
    await updateItem({ collection: 'arquivo_projeto', id: pavimento.value.id, item: pavimento.value });
    form.value.pavimento = pavimento.value.id;

    pavimento.value = await getItemById({
        collection: 'arquivo_projeto', id: form.value.pavimento, params: {
            fields: "*, enchimento.*, marca_enchimento.*"
        }
    });
    setStep(4);
}

const getVaos = async () => {
    vaos.value = [];
    vaos.value = await getItems({
        collection: "arquivo_projeto",
        params: {
            "fields": ["*", "arquivo.*", "viga.*"],
            "filter": { "orcamento": { "_eq": `${form.value.id}` }, "vao": { "_eq": "true" } },
            "sort": ["id"]
        }
    });

    valorTotal();
}

const apagarVao = async (id: number) => {
    await deleteItems({ collection: "arquivo_projeto", items: [id] });
    getVaos();

    ElNotification({
        title: 'Sucesso!',
        message: 'Vão removido com sucesso!',
        type: 'success',
    });
};

const getFileMsg = (content: any) => {
    const formData = new FormData();
    formData.append('file', content.file);

    arquivo_projeto.value.arquivo = formData;

    addArquivo();
};

const handleUploadChange = (file: any) => {
    listArquivos.value = [file];
};

const diametro_do_aco = await getItems({
    collection: 'produto', params: {
        filter: {
            "tipo_produto": {
                "_eq": "aco"
            }
        },
        fields: "id, tipo_aco.nome, diametro_do_aco"
    }
});

const addArquivo = async () => {
    listArquivos.value[0].percentage = 50;
    listArquivos.value[0].status = 'uploading';

    const arquivo = await uploadFiles(arquivo_projeto.value.arquivo);

    listArquivos.value[0].percentage = 100;
    listArquivos.value[0].status = 'success';

    await createItems({
        collection: 'arquivo_projeto',
        items: {
            "nome": arquivo_projeto.value.nome,
            "arquivo": arquivo.id,
            "empresa": empresa.value.id,
            "orcamento": form.value.id,
        }
    });

    arquivo_projeto.value = {};
    listArquivos.value = [];

    ElNotification({
        title: 'Sucesso!',
        message: 'Arquivo adicionado com sucesso!',
        type: 'success',
    });

    getArquivos();
}

const getArquivos = async () => {
    arquivos.value = await getItems({ collection: "arquivo_projeto", params: { "fields": "*, arquivo.*", "filter": { "orcamento": { "_eq": `${form.value.id}` } } } });

    pavimento.value = arquivos.value[0];
}

const editarVao = (item) => {
    vao.value = item;
    openVaoModal.value = true;
}

const validarPavimento = async () => {
    if (arquivos.value.length <= 0) {
        pavimento.value = await createItems({
            collection: 'arquivo_projeto',
            items: {
                "nome": 'Sem nome',
                "empresa": empresa.value.id,
                "orcamento": form.value.id,
            }
        });

        arquivos.value.push(pavimento.value);
    }

    setStep(3);
}

const removerArquivo = async (id: number) => {
    await deleteItems({ collection: "arquivo_projeto", items: [id] });
    getArquivos();

    ElNotification({
        title: 'Sucesso!',
        message: 'Arquivo removido com sucesso!',
        type: 'success',
    });
}

const vigas = ref([]);

const setViga = async (id: number, pavimento: any) => {
    pavimento.enchimento = id;

    vigas.value = [];

    const products = await getItems({
        collection: 'produto', params: {
            filter: { "enchimento": { "_eq": `${id}` }, "tipo_produto": { "_eq": "viga" } },
            fields: '*, tipo_trelica.nome, tipo_trelica.id, enchimento.nome, enchimento.id',
        }
    });

    vigas.value = await Promise.all(products.map(async (item: any) => {
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
    getLuminaria(id);
}

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

const salvarVao = async () => {
    const obj: ArquivoProjeto = {
        ...vao.value,
        "vao": true,
        "orcamento": pavimento.value.orcamento,
        "empresa": pavimento.value.empresa,
        "id_pavimento": pavimento.value.id_pavimento,
        "quantidade_aco1": pavimento.value.quantidade_aco1,
        "quantidade_aco2": pavimento.value.quantidade_aco2,
        "quantidade_aco3": pavimento.value.quantidade_aco3,
        "diametro_aco1": pavimento.value.diametro_aco1,
        "diametro_aco2": pavimento.value.diametro_aco2,
        "diametro_aco3": pavimento.value.diametro_aco3,
        "viga_adicional": pavimento.value.viga_adicional,
        "luminaria": pavimento.value.luminaria,
        "apoio_viga": pavimento.value.apoio_viga,
        "apoio_vao": pavimento.value.apoio_vao,
        "marca_luminaria": pavimento.value.marca_luminaria,
        "viga": pavimento.value.viga,
        'sobrecarga': pavimento.value.sobrecarga,
        "enchimento": pavimento.value?.enchimento?.id,
        "marca_enchimento": pavimento.value?.marca_enchimento?.id,
        "med_vigas_com_apoio": parseFloat(pavimento.value?.comprimento_viga) + parseFloat(pavimento.value?.apoio_viga)
    };

    const vigaT: Produto = await getItemById({ collection: "produto", id: obj.viga });
    let marca_enchimentoT: Enchimento = {};
    let enchimentoT: Produto = {};

    if (obj.enchimento != 3) {
        marca_enchimentoT = await getItemById({ collection: "enchimento", id: obj.marca_enchimento });
        enchimentoT = await getItemById({ collection: "produto", id: marca_enchimentoT.produto });
    }

    const diametro_aco1T: Produto = await getItemById({ collection: "produto", id: obj.diametro_aco1 });
    const diametro_aco2T: Produto = await getItemById({ collection: "produto", id: obj.diametro_aco2 });
    const diametro_aco3T: Produto = await getItemById({ collection: "produto", id: obj.diametro_aco2 });

    const C: number = obj.vao_oposto; // Apoio do oposto
    const AV: number = obj.apoio_vao // apoio do vão
    const VB: number = vigaT.largura_sapa_viga; // Campo Largura da sapada da viga
    let BE: number = 0; // Campo A do enchimento / por 100 que converte em cm
    let BA: number = 0; // Campo B do enchimento / por 100 que converte em cm
    let BC: number = 0; // Campo C do enchimento / por 100 que converte em cm

    if (obj.enchimento != 3) {
        BE = marca_enchimentoT.a / 100; // Campo A do enchimento / por 100 que converte em cm
        BA = marca_enchimentoT.b / 100; // Campo B do enchimento / por 100 que converte em cm
        BC = marca_enchimentoT.c / 100; // Campo C do enchimento / por 100 que converte em cm
    }

    const O: number = C + AV; // Apoio do oposto + apoio do vão
    const I: number = obj.comprimento_viga + obj.apoio_viga // Comprimento da viga + apoio da viga;
    const VA: number = obj.viga_adicional;
    let H: number = Math.round((O / (VB + BE)) + VA);

    if (obj.enchimento == 4 || obj.enchimento == 3) {
        H = Math.round(O / VB + VA);
    }

    const Q: number = H * I;
    const PF: number = vigaT.preco_m_trelica_sapata;
    const T: number = Q * PF;
    const R: number = (I * O); // Apoio do oposto * (Apoio do oposto + apoio do vão)
    let P: number = 0;
    if (obj.enchimento === 3) {
        P = (R / (VB + BE)) / BC; // Quantidade de enchimento
    } else {
        P = (R / VB) / BC; // Quantidade de enchimento
    }

    let S: number = 0;
    let PM: number = 0;
    if (obj.enchimento !== 3) {
        PM = enchimentoT.preco_por_m;

        S = P * ((BE * BA * BC) * PM);
    }

    let AD1: number = 0;
    let AD2: number = 0;
    let AD3: number = 0;
    let pesoAco: number = 0;

    if (obj.quantidade_aco1) {
        AD1 = Q * obj.quantidade_aco1 * diametro_aco1T.preco_m_linear;
        pesoAco += obj.quantidade_aco1 * diametro_aco1T.peso_por_metro_linear;
    }
    if (obj.quantidade_aco2) {
        AD2 = Q * obj.quantidade_aco2 * diametro_aco2T.preco_m_linear;
        pesoAco += obj.quantidade_aco2 * diametro_aco2T.peso_por_metro_linear;
    }
    if (obj.quantidade_aco2) {
        AD3 = Q * obj.quantidade_aco3 * diametro_aco3T.preco_m_linear;
        pesoAco += obj.quantidade_aco3 * diametro_aco3T.peso_por_metro_linear;
    }

    const U: number = (AD1 + AD2 + AD3);

    let valor_luminaria: number = 0;

    if (pavimento.value.marca_luminaria) {
        const luminaria: Produto = await getItemById({ collection: "produto", id: pavimento.value.marca_luminaria });
        valor_luminaria = parseFloat(pavimento.value.luminaria * luminaria.preco_por_peca);
    }

    obj.med_vigas_com_apoio = I; // Passo 1
    obj.vao_opo_com_apoio = O; // Passo 2
    obj.quantidade_vigas = H; // Passo 3
    obj.met_linear_de_vigas = Q; // Passo 4
    obj.preco_vigas = T; // Passo 5
    obj.area_m = R; // Passo 6
    obj.qtd_enchimento = P.toFixed(2); // Passo 7
    obj.preco_enchimento = S.toFixed(2); // Passo 8
    obj.preco_aco_adicional = U.toFixed(2);
    obj.valor_luminaria = valor_luminaria;
    obj.valor_total = (valor_luminaria + T + S + U).toFixed(2);
    obj.peso_aco = pesoAco;
    obj.peso_viga = vigaT.peso_por_metro_linear;
    obj.peso_total = pesoAco + vigaT.peso_por_metro_linear;

    const pvao = await createItems({ collection: 'arquivo_projeto', items: obj });

    vaos.value.push(pvao);
    vao.value = {};
    valorTotal();
};

const eps = ref([]);

const total_m = computed(() => {
    return vaos.value.reduce((acumulador, objeto) => acumulador + parseFloat(objeto.area_m), 0);
});

const finalizarOrcamento = async () => {
    form.value = await updateItem({ collection: 'orcamento', id: form.value.id, item: form.value });

    ElNotification({
        title: 'Sucesso!',
        message: 'Orçamento cadastrado com sucesso!',
        type: 'success',
    });

    router.push(`/vendas/orcamentos/list`);
}

const getEstados = () => {
    axios.get('https://brasilapi.com.br/api/ibge/uf/v1').then((req) => {
        estados.value = req.data;
    })
}

const getCidades = (uf: String) => {
    axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`).then((req) => {
        cidades.value = req.data;
    })
}

const setCliente = (cliente: Cliente) => {
    form.value.responsavel = cliente.nome;
    form.value.cidade = cliente.cidade;
    form.value.estado = cliente.estado;
    form.value.telefone = cliente.telefone;
    form.value.endereco_completo = `${cliente.endereco} Nº${cliente.numero}, ${cliente.bairro}`;
}

</script>


<template>
    <div>
        <div class="mx-auto max-w-7xl">
            <div class="animation p-6 panel">
                <div v-if="form.step === 0">
                    <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
                        <svg width="104" height="104" viewBox="0 0 104 104" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M52 97.5C77.129 97.5 97.5 77.129 97.5 52C97.5 26.871 77.129 6.5 52 6.5C26.871 6.5 6.5 26.871 6.5 52C6.5 77.129 26.871 97.5 52 97.5Z"
                                fill="#FF9400" fill-opacity="0.08" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M41.2188 38.25C41.2188 32.0195 46.2695 26.9688 52.5 26.9688C58.7305 26.9688 63.7812 32.0195 63.7812 38.25C63.7812 44.4805 58.7305 49.5312 52.5 49.5312C46.2695 49.5312 41.2188 44.4805 41.2188 38.25ZM52.5 30.5312C48.2371 30.5312 44.7812 33.9871 44.7812 38.25C44.7812 42.5129 48.2371 45.9688 52.5 45.9688C56.7629 45.9688 60.2188 42.5129 60.2188 38.25C60.2188 33.9871 56.7629 30.5312 52.5 30.5312Z"
                                fill="#FF9400" />
                            <path
                                d="M41.6281 59.204C38.8841 60.772 37.6562 62.6667 37.6562 64.375C37.6562 66.0833 38.8841 67.978 41.6281 69.546C44.3217 71.0851 48.1617 72.0938 52.5 72.0938C55.4298 72.0938 58.1456 71.6332 60.437 70.8512C61.3681 70.5334 62.3804 71.0306 62.6981 71.9616C63.0159 72.8926 62.5187 73.905 61.5877 74.2227C58.8993 75.1402 55.7922 75.6562 52.5 75.6562C47.6566 75.6562 43.1841 74.5382 39.8606 72.6391C36.5875 70.7687 34.0938 67.9134 34.0938 64.375C34.0938 60.8366 36.5875 57.9813 39.8606 56.1109C43.1841 54.2118 47.6566 53.0938 52.5 53.0938C58.9842 53.0938 64.9151 55.1073 68.2201 58.425C68.9144 59.1219 68.9123 60.2497 68.2153 60.944C67.5184 61.6383 66.3905 61.6362 65.6963 60.9392C63.2812 58.5149 58.4053 56.6562 52.5 56.6562C48.1617 56.6562 44.3217 57.6649 41.6281 59.204Z"
                                fill="#FF9400" />
                            <path
                                d="M75.2659 65.4877C75.8805 64.7196 75.7559 63.5986 74.9877 62.9841C74.2196 62.3695 73.0986 62.4941 72.4841 63.2623L68.9773 67.6457L68.8503 67.5187L68.0095 66.678C67.3139 65.9823 66.1861 65.9823 65.4905 66.678C64.7948 67.3736 64.7948 68.5014 65.4905 69.197L67.8655 71.572C68.2237 71.9303 68.7176 72.119 69.2235 72.091C69.7294 72.063 70.1994 71.8209 70.5159 71.4252L75.2659 65.4877Z"
                                fill="#FF9400" />
                        </svg>

                        <h2 class="text-xl font-bold">Dados Básicos do Cliente</h2>
                    </div>
                    <div class="gap-5 space-y-5 px-6">
                        <h1 class="pb-3 text-lg font-bold">Link Id - A2W5UG1MXF9Y2Q</h1>
                        <div v-if="form.step == 0">
                            <label class="text-xs placeholder:text-xs" for="name">
                                Cliente
                            </label>

                            <input-contato :data="form.cliente" label='cliente' @selecionado="setCliente"
                                :tipo="['c', 'f']"></input-contato>
                        </div>

                        <div class="grid grid-cols-2 gap-6 pb-5">
                            <div>
                                <label class="text-xs placeholder:text-xs" for="name">
                                    Estado
                                </label>
                                <client-only>
                                    <el-select v-model="form.estado" class="w-full" size="large" filterable
                                        @change="getCidades(form.estado)">
                                        <el-option v-for="item in estados" :key="item.id" :label="item.nome"
                                            :value="item.sigla" />
                                    </el-select>
                                </client-only>
                            </div>

                            <div>
                                <label class="text-xs placeholder:text-xs" for="name">
                                    Cidade
                                </label>
                                <client-only>
                                    <el-select v-model="form.cidade" class="w-full" size="large" filterable>
                                        <el-option v-for="item in cidades" :key="item.id" :label="item.nome"
                                            :value="item.nome" />
                                    </el-select>
                                </client-only>
                            </div>

                        </div>

                        <div class="grid grid-cols-2 gap-6 pb-2">
                            <div>
                                <label class="placeholder: text-xs" for="name">Endereço completo</label>
                                <input v-model="form.endereco_completo" id="name" placeholder="" type="text"
                                    class="form-input" />
                            </div>
                            <div>
                                <label class="placeholder: text-xs" for="name">Telefone (WhatsApp)</label>
                                <input v-model="form.telefone" id="name" placeholder="(31) 00000.00000" type="text"
                                    class="form-input" />
                            </div>
                        </div>

                        <h1 class="font-bold">Informações Básicas da Obra</h1>
                        <div class="">
                            <label class="text-xs placeholder:text-xs" for="name">Tipo de Obra</label>

                            <client-only>
                                <el-select v-model="form.tipo_obra" placeholder="Selecione">
                                    <el-option v-for="(item, index) in tipo_obra" :key="index" :label="item.text"
                                        :value="item.value" />
                                </el-select>
                            </client-only>
                        </div>
                        <div class="">
                            <label class="text-xs placeholder:text-xs" for="name">O que será
                                realizado</label>
                            <input v-model="form.sera_realizado" id="name" placeholder="" type="text"
                                class="form-input" />
                        </div>
                    </div>

                    <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">

                        <NuxtLink to="/vendas/orcamentos/list" class="btn btn-outline-primary btn-lg">
                            Cancelar
                        </NuxtLink>


                        <button @click="salvar()" type="button" class="btn btn-primary btn-lg">
                            Salvar e Continuar
                        </button>
                    </div>


                </div>

                <div v-if="form.step == 1">
                    <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
                        <svg width="104" height="104" viewBox="0 0 104 104" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M52 97.5C77.129 97.5 97.5 77.129 97.5 52C97.5 26.871 77.129 6.5 52 6.5C26.871 6.5 6.5 26.871 6.5 52C6.5 77.129 26.871 97.5 52 97.5Z"
                                fill="#FF9400" fill-opacity="0.08" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M62.8457 32.867C60.6315 31.9947 58.4918 32.5852 56.9771 33.9323C55.4997 35.2463 54.6042 37.2706 54.6042 39.4167V47.75C54.6042 49.7635 56.2365 51.3958 58.25 51.3958H66.5834C68.7295 51.3958 70.7537 50.5003 72.0677 49.0229C73.4148 47.5083 74.0053 45.3685 73.133 43.1544C71.2829 38.4581 67.5419 34.7171 62.8457 32.867ZM57.7292 47.75V39.4167C57.7292 38.111 58.281 36.9547 59.0539 36.2674C59.7895 35.6132 60.7028 35.3816 61.7003 35.7745C65.5902 37.307 68.6931 40.4098 70.2255 44.2998C70.6184 45.2972 70.3868 46.2106 69.7326 46.9462C69.0453 47.719 67.889 48.2708 66.5834 48.2708H58.25C57.9624 48.2708 57.7292 48.0377 57.7292 47.75Z"
                                fill="#FF9400" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M49.9068 34.979C48.6349 34.155 47.4045 33.9178 46.0536 34.1534C44.9063 34.3534 43.6782 34.9038 42.3712 35.4895L42.2304 35.5526C41.1432 36.0395 40.0939 36.6186 39.0946 37.2863C35.5829 39.6327 32.8459 42.9678 31.2297 46.8698C29.6134 50.7717 29.1906 55.0653 30.0145 59.2076C30.8385 63.3499 32.8723 67.1549 35.8587 70.1413C38.8451 73.1278 42.6501 75.1615 46.7924 75.9855C50.9347 76.8095 55.2283 76.3866 59.1303 74.7703C63.0322 73.1541 66.3673 70.4171 68.7137 66.9054C69.3814 65.9061 69.9605 64.8568 70.4474 63.7697L70.5105 63.6288C71.0962 62.3218 71.6466 61.0937 71.8466 59.9465C72.0822 58.5955 71.845 57.3651 71.021 56.0932C70.1326 54.722 68.9164 54.052 67.4291 53.7484C66.1085 53.4788 64.4583 53.479 62.5671 53.4791L59.2917 53.4791C57.2833 53.4791 55.9343 53.4758 54.9279 53.3405C53.9666 53.2113 53.5551 52.9879 53.2836 52.7164C53.0121 52.4449 52.7887 52.0335 52.6595 51.0721C52.5242 50.0658 52.5209 48.7167 52.5209 46.7083L52.5209 43.4329C52.5211 41.5417 52.5212 39.8915 52.2517 38.5709C51.948 37.0836 51.278 35.8674 49.9068 34.979ZM43.5076 38.4047C45.0059 37.7337 45.8744 37.3568 46.5904 37.2319C47.1437 37.1354 47.5784 37.1941 48.2077 37.6017C48.7376 37.9451 49.0181 38.3549 49.1898 39.1959C49.3884 40.1688 49.3959 41.4967 49.3959 43.5833L49.3959 46.8166C49.3958 48.6884 49.3958 50.2494 49.5623 51.4885C49.7382 52.7964 50.125 53.9772 51.0739 54.9261C52.0228 55.875 53.2036 56.2618 54.5115 56.4377C55.7506 56.6043 57.3115 56.6042 59.1833 56.6042L62.4167 56.6041C64.5033 56.6041 65.8312 56.6116 66.8041 56.8102C67.6451 56.9819 68.0549 57.2624 68.3983 57.7924C68.8059 58.4216 68.8646 58.8563 68.7681 59.4097C68.6432 60.1256 68.2664 60.9941 67.5953 62.4924C67.1797 63.4205 66.6854 64.3162 66.1154 65.1692C64.1123 68.167 61.2653 70.5035 57.9344 71.8832C54.6034 73.2629 50.9381 73.6239 47.402 72.9205C43.8659 72.2172 40.6178 70.481 38.0684 67.9316C35.519 65.3822 33.7828 62.1341 33.0795 58.598C32.3761 55.0619 32.7371 51.3966 34.1168 48.0656C35.4965 44.7347 37.833 41.8877 40.8308 39.8847C41.6839 39.3146 42.5795 38.8203 43.5076 38.4047Z"
                                fill="#FF9400" />
                        </svg>
                        <h2 class="text-xl font-bold">Escolha o Fornecedor</h2>
                    </div>

                    <div class="space-y-6 px-6">
                        <h1 class="text-lg font-bold">Escolha o Fornecedor abaixo</h1>
                        <div class="space-y-6">
                            <div class="space-y-2">
                                <label class="text-xs placeholder:text-xs" for="name">Vigotas</label>

                                <el-select v-model="form.vigas" placeholder="Select" size="large" class="w-full">
                                    <el-option v-for="item in fornecedores" :key="item.id" :label="item.nome"
                                        :value="item.id" />
                                </el-select>
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs placeholder:text-xs" for="name">Encimento</label>
                                <el-select v-model="form.enchimento" placeholder="Select" size="large" class="w-full">
                                    <el-option v-for="item in fornecedores" :key="item.id" :label="item.nome"
                                        :value="item.id" />
                                </el-select>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">
                        <button @click="setStep(0)" type="button" class="btn btn-outline-primary btn-lg">
                            Voltar
                        </button>

                        <button @click="setStep(2)" type="button" class="btn btn-primary btn-lg">Salvar e
                            Continuar</button>
                    </div>
                </div>

                <div v-if="form.step === 2">
                    <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
                        <svg width="104" height="104" viewBox="0 0 104 104" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M52 97.5C77.129 97.5 97.5 77.129 97.5 52C97.5 26.871 77.129 6.5 52 6.5C26.871 6.5 6.5 26.871 6.5 52C6.5 77.129 26.871 97.5 52 97.5Z"
                                fill="#FF9400" fill-opacity="0.08" />
                            <path
                                d="M46.4362 70.5474H57.5644C66.8379 70.5474 70.5473 66.838 70.5473 57.5645V46.4363C70.5473 37.1628 66.8379 33.4534 57.5644 33.4534H46.4362C37.1626 33.4534 33.4532 37.1628 33.4532 46.4363V57.5645C33.4532 66.838 37.1626 70.5474 46.4362 70.5474Z"
                                stroke="#FF9400" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M46.4359 51.0911L52 56.6552L57.5641 51.0911" stroke="#FF9400"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M52 56.6547V41.8171" stroke="#FF9400" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M40.8722 60.365C48.087 62.7761 55.9138 62.7761 63.1286 60.365" stroke="#FF9400"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <h2 class="text-xl font-bold">Faça o Upload dos Projetos</h2>
                        <p class="pb-3 text-sm mt-2">Projetos Estrutural feito pelo Engeheiro</p>
                    </div>
                    <div class="space-y-6 px-6">
                        <div class="">
                            <label class="pb-2 text-xs text-[#1B5870] placeholder:text-xs" for="name">
                                Nome do arquivo
                            </label>
                            <input id="name" v-model="arquivo_projeto.nome" type="text" placeholder="ESTRUTUAL 1° PVTO"
                                class="form-input" />
                        </div>

                        <client-only>
                            <el-upload class="upload-demo" ref="upload" drag :file-list="listArquivos" action="#"
                                :http-request="getFileMsg" :on-change="handleUploadChange">
                                <el-icon class="el-icon--upload">
                                    <upload-filled />
                                </el-icon>
                                <div class="el-upload__text flex items-center justify-center">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14.984 3.90755L10.016 3.90755C5.87606 3.90755 4.22007 5.44086 4.22007 9.27416L4.22007 13.8741C4.22007 17.7074 5.87606 19.2407 10.016 19.2407L14.984 19.2407C19.1239 19.2407 20.7799 17.7074 20.7799 13.8741L20.7799 9.27416C20.7799 5.44087 19.1239 3.90755 14.984 3.90755Z"
                                            stroke="#FF9400" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M14.9834 11.9497L12.4994 9.64973L10.0154 11.9497" stroke="#FF9400"
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.5 9.64981L12.5 15.7831" stroke="#FF9400" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17.4683 8.11646C14.2474 7.1198 10.7533 7.1198 7.53236 8.11645"
                                            stroke="#FF9400" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                    <p class="text-[#ff9400]">SUBIR ARQUIVO CAD</p>
                                </div>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        Arquivos jpg/png com tamanho inferior a 500kb
                                    </div>
                                </template>
                            </el-upload>
                        </client-only>
                    </div>

                    <!-- TabelaGrande -->
                    <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                        <table>
                            <thead class="text-boton text-normal text-[#1B5870]">
                                <tr>
                                    <th>Nome do arquivo</th>
                                    <th>Arquivo</th>
                                    <th class="w-[20px]"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="" v-for="(item, index) in arquivos" :key="index">
                                    <td class="text-sm">
                                        {{ item.nome || 'Sem nome' }}
                                    </td>
                                    <td class="text-sm">
                                        <a :href="`https://api.iconobras.com/assets/${item?.arquivo?.id}`"
                                            target="_blank">
                                            {{ item?.arquivo?.filename_download }}
                                        </a>
                                    </td>
                                    <td class="flex items-center space-x-2">
                                        <button @click="removerArquivo(item.id)">
                                            <icon-trash />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">
                        <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">
                            <button @click="setStep(1)" type="button" class="btn btn-outline-primary btn-lg">
                                Voltar
                            </button>
                            <button @click="validarPavimento()" type="button" class="btn btn-primary btn-lg">
                                Salvar e Continuar
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="form.step == 3">

                    <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
                        <svg width="104" height="104" viewBox="0 0 104 104" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M52 97.5C77.129 97.5 97.5 77.129 97.5 52C97.5 26.871 77.129 6.5 52 6.5C26.871 6.5 6.5 26.871 6.5 52C6.5 77.129 26.871 97.5 52 97.5Z"
                                fill="#FF9400" fill-opacity="0.08" />
                            <path
                                d="M49.6654 28.6672H44.9987C33.3321 28.6672 28.6654 33.3339 28.6654 45.0006V59.0006C28.6654 70.6672 33.3321 75.3339 44.9987 75.3339H58.9987C70.6654 75.3339 75.3321 70.6672 75.3321 59.0006V54.3339"
                                stroke="#FF9400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M61.4269 31.047L43.0402 49.4337C42.3402 50.1337 41.6402 51.5103 41.5002 52.5137L40.4969 59.537C40.1235 62.0803 41.9202 63.8537 44.4635 63.5037L51.4869 62.5003C52.4669 62.3603 53.8435 61.6603 54.5669 60.9603L72.9535 42.5737C76.1269 39.4003 77.6202 35.7137 72.9535 31.047C68.2869 26.3803 64.6002 27.8737 61.4269 31.047Z"
                                stroke="#FF9400" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M58.7903 33.6833C60.3537 39.26 64.717 43.6233 70.317 45.21" stroke="#FF9400"
                                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                        <h2 class="text-xl font-bold">Adiconar laje Principal</h2>
                    </div>

                    <div class="space-y-6 px-6">
                        <div class="space-y-6">
                            <div v-if="arquivos.length > 1" class="space-y-2">
                                <label class="text-xs placeholder:text-xs" for="name">Qual o Pavimento?</label>
                                <select v-model="pavimento" id="pavimento" class="form-select text-white-dark">
                                    <option v-for="(item, index) in arquivos" :value="item" :key="index">
                                        {{ item.nome || `Sem nome - ${item.arquivo.filename_download}` }}
                                    </option>
                                </select>
                            </div>

                            <div class="space-y-2">
                                <input id="name" v-model="pavimento.id_pavimento"
                                    placeholder="Coloque o ID desse pavimento : (ex: Pavimento Elevação 3 metros)"
                                    type="text" class="form-input text-white-dark " />
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
                                                <div class=" col-span-3">
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

                                                <div class=" col-span-3">
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

                                                <div class="py-2 col-span-6" v-if="pavimento?.sobrecarga">
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name">
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

                                                                <select
                                                                    class="form-select  bg-[#E0EAFE] w-full text-[#1B5870DB]"
                                                                    v-model="pavimento.diametro_aco3">
                                                                    <option v-for="(item, index) in diametro_do_aco"
                                                                        :key="item.id" :value="item.id">
                                                                        ¢{{ item.diametro_do_aco }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-if="pavimento.enchimento != 3" class="col-span-2">
                                                    <label class=" text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name">
                                                        Marca Enchimento
                                                    </label>

                                                    <select id="pavimento" v-model="pavimento.marca_enchimento"
                                                        class="form-select bg-[#EEEEEE] text-[#1B5870DB]">
                                                        <option v-for="(item, index) in eps" :key="index" :value="item"
                                                            placeholder="1 Pavimento">
                                                            {{ item?.marca }}
                                                        </option>
                                                    </select>
                                                </div>


                                                <div v-if="pavimento.enchimento != 3 && pavimento.marca_enchimento"
                                                    class=" col-span-2">
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name">Dimensões</label>
                                                    <div class="form-input bg-[#EEEEEE] text-[#1B5870DB]">
                                                        <span v-if="pavimento?.marca_enchimento?.a">
                                                            {{ pavimento?.marca_enchimento?.a }}
                                                        </span>
                                                        <span v-if="pavimento?.marca_enchimento?.b">
                                                            x {{ pavimento?.marca_enchimento?.b }}
                                                        </span>
                                                        <span v-if="pavimento?.marca_enchimento?.c">
                                                            x {{ pavimento?.marca_enchimento?.c }}
                                                        </span>
                                                        <span v-if="pavimento?.marca_enchimento?.d">
                                                            x {{ pavimento?.marca_enchimento?.d }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div v-if="pavimento.enchimento != 2 && pavimento.enchimento != 3 && pavimento.marca_enchimento"
                                                    class=" col-span-2">
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name">Tipo</label>
                                                    <div class="form-input bg-[#EEEEEE] text-[#1B5870DB]">
                                                        {{ pavimento?.marca_enchimento?.tipo_densidade }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grid gap-x-8 grid-cols-5 col-span-2">
                                            <div class="pt-12">
                                                <label class=" text-xs text-[#1B5870DB] placeholder:text-xs" for="name">
                                                    MARCA LUMINÁRIA
                                                </label>

                                                <select id="pavimento" v-model="pavimento.marca_luminaria"
                                                    class="form-select bg-[#EEEEEE] text-[#1B5870DB]">
                                                    <option v-for="(item, index) in luminaria" :key="index"
                                                        :value="item.id" placeholder="1 Pavimento">
                                                        {{ item?.marca }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <icon-luminaria />
                                                <label class="text-xs pt-5 text-[#008ED6] placeholder:text-xs"
                                                    for="name">LUMINÁRIA</label>
                                                <input id="name" placeholder="1" type="text"
                                                    v-model="pavimento.luminaria" class="form-input bg-[#EEEEEE]" />
                                            </div>

                                            <div>
                                                <icon-luminaria />
                                                <label class="text-xs pt-5 text-[#008ED6] placeholder:text-xs"
                                                    for="name">
                                                    VIGA ADICIONAL
                                                </label>
                                                <input id="name" placeholder="2" type="text"
                                                    v-model="pavimento.viga_adicional"
                                                    class="form-input bg-[#EEEEEE]" />
                                            </div>

                                            <div>
                                                <div>
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name"></label>
                                                    <icon-apoio-viga />
                                                </div>
                                                <div>
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name">
                                                        Apoio Viga
                                                    </label>
                                                    <client-only>
                                                        <el-select v-model="pavimento.apoio_viga"
                                                            placeholder="Selecione" size="large">
                                                            <el-option v-for="item in apoio_viga" :key="item.value"
                                                                :label="item.label" :value="item.value" />

                                                        </el-select>
                                                    </client-only>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name"></label>
                                                    <icon-apoio-vao />
                                                </div>

                                                <div class="col-span-1 pt-1">
                                                    <label class="text-xs text-[#1B5870DB] placeholder:text-xs"
                                                        for="name">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">
                        <button @click="setStep(2)" type="button" class="btn btn-outline-primary btn-lg">
                            Voltar
                        </button>

                        <button @click="salvarPavimento()" type="button" class="btn btn-primary btn-lg">
                            Salvar e Continuar
                        </button>
                    </div>
                </div>

                <div v-if="form.step == 4">
                    <div class="mx-auto max-w-7xl">
                        <h1 class="pb-6 text-[#FF9400] text-2xl">Orçamento da laje N°: {{ form.id }}</h1>

                        <div class="mb-4 rounded-lg divide-y space-y-5 border p-4">
                            <div class="flex justify-between">
                                <div class="">
                                    <div class="flex items-center gap-2">
                                        <h1 class="py-1 text-[#1B5870]">
                                            {{ form.responsavel }}
                                        </h1>
                                        <icon-info-fill />
                                    </div>
                                    <div>
                                        <h1 class="text-sm">
                                            {{ pavimento?.enchimento?.nome }} -
                                            {{ pavimento?.marca_enchimento?.tipo_densidade }} -
                                            APOIO
                                            VIGA: {{ pavimento?.apoio_viga }} APOIO VÃO: {{ pavimento?.apoio_vao }} -
                                            INT: 0,46
                                        </h1>
                                        <p class="text-xs">Orçamento criado dia {{
                                            $filters.formatDate(pavimento?.date_created) }}</p>
                                    </div>
                                </div>
                                <div
                                    class="bg-[#F3F3F3] space-y-2 flex flex-col p-4 rounded-md items-end justify-center">
                                    <p>M² Total:</p>
                                    <p class="font-bold">
                                        {{ total_m }} M²
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="grid grid-cols-7 bg-[#FBFBFB] border mb-8 gap-2 place-items-center rounded-lg p-4 mx-auto text-sm items-end">
                            <div class="col-span-2">
                                <label>ID DA</label>
                                <input v-model="vao.nome" id="name" placeholder="" type="text"
                                    class="form-input bg-[#E0EAFE] " />
                            </div>
                            <div class="col-span-1 space-y-2">
                                <svg width="98" height="31" viewBox="0 0 98 31" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="-0.000244141" y1="2.06519" x2="97.4497" y2="2.06519" stroke="#1B5870"
                                        stroke-width="4" />
                                    <path d="M5.53368 22.1751L13.5468 3.53235L21.5598 22.1751H5.53368Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M23.2494 22.1751L31.2625 3.53235L39.2755 22.1751H23.2494Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M41.6097 22.1751L49.6228 3.53235L57.6359 22.1751H41.6097Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M60.2579 22.1751L68.271 3.53235L76.2841 22.1751H60.2579Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M78.4321 22.1751L86.4452 3.53235L94.4583 22.1751H78.4321Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path
                                        d="M0.213989 19.4971H97.448V25.5571C97.448 27.2139 96.1049 28.5571 94.448 28.5571H3.21399C1.55714 28.5571 0.213989 27.2139 0.213989 25.5571V19.4971Z"
                                        fill="#C4C4C4" />
                                    <path
                                        d="M0.213989 19.4971H97.448V25.5571C97.448 27.2139 96.1049 28.5571 94.448 28.5571H3.21399C1.55714 28.5571 0.213989 27.2139 0.213989 25.5571V19.4971Z"
                                        stroke="#444444" />
                                </svg>

                                <label>COMP. VIGA</label>

                                <client-only>
                                    <el-input-number type="number" v-model="vao.comprimento_viga" :precision="2"
                                        :min="1" :max="10" :step="0.1" :controls="false" />
                                </client-only>
                            </div>
                            <div class="col-span-1 space-y-2">
                                <svg width="98" height="31" viewBox="0 0 98 31" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="-0.000244141" y1="2.06519" x2="97.4497" y2="2.06519" stroke="#1B5870"
                                        stroke-width="4" />
                                    <path d="M5.53368 22.1751L13.5468 3.53235L21.5598 22.1751H5.53368Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M23.2494 22.1751L31.2625 3.53235L39.2755 22.1751H23.2494Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M41.6097 22.1751L49.6228 3.53235L57.6359 22.1751H41.6097Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M60.258 22.1751L68.2711 3.53235L76.2842 22.1751H60.258Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path d="M78.4321 22.1751L86.4452 3.53235L94.4583 22.1751H78.4321Z" stroke="#1B5870"
                                        stroke-width="2" />
                                    <path
                                        d="M0.21582 19.4971H97.4499V25.5571C97.4499 27.2139 96.1067 28.5571 94.4499 28.5571H3.21582C1.55897 28.5571 0.21582 27.2139 0.21582 25.5571V19.4971Z"
                                        fill="#C4C4C4" />
                                    <path
                                        d="M0.21582 19.4971H97.4499V25.5571C97.4499 27.2139 96.1067 28.5571 94.4499 28.5571H3.21582C1.55897 28.5571 0.21582 27.2139 0.21582 25.5571V19.4971Z"
                                        stroke="#444444" />
                                </svg>

                                <label>VÃO VIGA</label>

                                <client-only>
                                    <el-input-number type="number" v-model="vao.vao_viga" :precision="2" :min="1"
                                        :max="10" :step="0.1" :controls="false" />
                                </client-only>
                            </div>
                            <div class="col-span-1 space-y-2">
                                <label>VÃO OPOSTO</label>

                                <client-only>
                                    <el-input-number type="number" v-model="vao.vao_oposto" :precision="2" :min="1"
                                        :max="10" :step="0.1" :controls="false" />
                                </client-only>
                            </div>
                            <div class="col-span-2 justify-center">
                                <button @click="salvarVao()" type="button" class="btn btn-primary">
                                    + Adicionar na Lista
                                </button>
                            </div>
                        </div>

                        <client-only>
                            <el-dialog v-model="openVaoModal" :before-close="closeVaoModal" title="Editar Vão"
                                class="panel w-full overflow-hidden !rounded-2xl border-0 text-black dark:text-white-dark max-w-[1200px]">
                                <div v-if="openVaoModal">
                                    <Vao :vao="vao" @close="closeVaoModal()"></Vao>
                                </div>
                            </el-dialog>
                        </client-only>

                        <div class="mx-auto flex max-w-7xl items-center justify-between">
                            <h2 class="text-2xl font-bold">
                                Informações do vâo da laje
                            </h2>
                        </div>

                        <!-- TabelaGrande -->
                        <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                            <table>
                                <thead class="text-boton text-normal text-[#1B5870]">
                                    <tr>
                                        <th>Id da Laje</th>
                                        <th>Tipo</th>
                                        <th>COMP. VIGA</th>
                                        <th>VÃO VIGA</th>
                                        <th>VÃO OPOSTO</th>
                                        <th>ÁREA M²</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr v-for="(item, index) in vaos" :key="index">
                                        <td class="text-sm">
                                            {{ item.nome }}
                                        </td>
                                        <td>
                                            <span v-if="item.enchimento == 1">
                                                Treliça / Eps
                                            </span>
                                            <span v-if="item.enchimento == 2">
                                                Treliça / Cer
                                            </span>
                                            <span v-if="item.enchimento == 3">
                                                Painel Maciço
                                            </span>
                                            <span v-if="item.enchimento == 4">
                                                Painel Aliviado
                                            </span>
                                        </td>
                                        <td class="text-sm">
                                            {{ item.comprimento_viga }}
                                        </td>
                                        <td class="text-sm">
                                            {{ item.vao_viga }}
                                        </td>
                                        <td class="text-sm">
                                            {{ item.vao_oposto }}
                                        </td>
                                        <td class="text-sm">
                                            {{ item.area_m }}
                                        </td>
                                        <td>
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z"
                                                            stroke="#1C274C" stroke-width="1.5" />
                                                        <path opacity="0.5"
                                                            d="M22 12C22 12 21.0071 12.8907 19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12 2 12"
                                                            stroke="#1C274C" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                        <path opacity="0.5"
                                                            d="M22 16C22 16 21.0071 16.8907 19.0212 17.6851L16.2127 18.8085C14.2268 19.6028 13.2339 20 12 20C10.7661 20 9.77318 19.6028 7.7873 18.8085L4.97883 17.6851C2.99294 16.8907 2 16 2 16"
                                                            stroke="#1C274C" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                    </svg>

                                                </span>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item>
                                                            MED. VIGAS COM APOIO: {{ item.med_vigas_com_apoio }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            VÃO OPOSTO COM APOIO: {{ item.vao_opo_com_apoio }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            QTD. VIGAS: {{ item.quantidade_vigas }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            MET. LINEAR DE VIGAS: {{ item.met_linear_de_vigas }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            PREÇO VIGAS: {{ $filters.moedaBRL(item.preco_vigas) }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item v-if="item.enchimento != 3">
                                                            QTD. ENCHIMENTO:
                                                            {{ item.qtd_enchimento }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item v-if="item.enchimento != 3">
                                                            PREÇO ENCHIMENTO:
                                                            {{ $filters.moedaBRL(item.preco_enchimento || 0) }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            PREÇO AÇO ADICIONAL: {{
                                                                $filters.moedaBRL(item.preco_aco_adicional || 0) }}
                                                        </el-dropdown-item>

                                                        <el-dropdown-item v-if="item.luminaria">
                                                            LUMINÁRIA: {{
                                                                $filters.moedaBRL(item.valor_luminaria || 0) }}
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                        </td>
                                        <td class="flex items-center space-x-2">
                                            <button @click="editarVao(item)">
                                                <icon-edit />
                                            </button>
                                            <button @click="apagarVao(item.id)">
                                                <icon-trash />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-6 flex items-center justify-between border-t-2 pt-4 space-x-4">
                            <h2 class="text-xl font-bold text-[#1B5870]">
                                Finalizar Orçamento e Gerar Proposta para o Cliente
                            </h2>

                            <div class="flex gap-2">
                                <button @click="setStep(5)" class="btn btn-primary btn-lg">
                                    Salvar e Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="form.step == 5">
                    <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
                        <icon-user-check-fill />

                        <h2 class="text-xl font-bold">Formas de Pagamento</h2>
                    </div>

                    <div class="grid flex-1 grid-cols-1 items-center justify-center gap-5 sm:grid-cols-6">
                        <div class="col-span-full">
                            <label class="text-xs placeholder:text-xs" for="name">
                                Selecione como será pago
                            </label>
                            <select v-model="form.como_sera_pago" id="regime_fiscal" class="form-select text-[#FF9400]">
                                <option value="0">
                                    Entrada + Restante na Entrega
                                </option>

                                <option value="1">
                                    Valor total
                                </option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <label class="text-xs placeholder:text-xs" for="name">Entrada</label>
                            <select v-model="form.entrada" id="regime_fiscal" class="form-select text-[#FF9400]">
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                                <option value="30">30%</option>
                                <option value="40">40%</option>
                                <option value="50">50%</option>
                                <option value="60">60%</option>
                                <option value="70">70%</option>
                                <option value="80">80%</option>
                                <option value="90">90%</option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <label class="text-xs placeholder:text-xs" for="name">
                                Forma de Pgto da Entrada
                            </label>
                            <select v-model="form.forma_pagamento_entrada" class="form-select text-[#FF9400]">
                                <option v-for="(item, index) in formasPagamentos" :key="index" :value="item.value">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <label class="text-xs placeholder:text-xs" for="name">Parcelas</label>
                            <select v-model="form.parcelas_entrada" class="form-select text-[#FF9400]">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>

                    <p class="my-5 font-semibold">
                        Selecione a forma de pagamento no dia da Entrega
                    </p>

                    <div class="grid flex-1 grid-cols-1 items-center justify-center gap-5 sm:grid-cols-6">
                        <div class="col-span-3">
                            <label class="text-xs placeholder:text-xs" for="name">
                                Forma de pagamento
                            </label>
                            <select v-model="form.forma_pagamento" class="form-select text-[#FF9400]">
                                <option v-for="(item, index) in formasPagamentos" :key="index" :value="item.value">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-span-3">
                            <label class="text-xs placeholder:text-xs" for="name">Parcelas</label>
                            <select v-model="form.parcelas" class="form-select text-[#FF9400]">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>

                    <h3 class="mt-5 font-semibold">
                        Informações Complementares
                    </h3>
                    <h4>Com Desconta de NF?</h4>

                    <div class="flex flex-col mt-4">
                        <div class="flex items-center space-x-2">
                            <input v-model="form.nota" type="radio" id="yes" name="desconto_nf" :value="true">
                            <label for="yes">Sim</label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <input v-model="form.nfe" type="radio" id="no" name="desconto_nf" :value="false">
                            <label for="no">Não</label>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">
                        <button @click="setStep(4)" class="btn btn-outline-primary btn-lg">
                            Voltar
                        </button>

                        <button @click="setStep(6)" class="btn btn-primary btn-lg">
                            Salvar e Continuar
                        </button>
                    </div>
                </div>

                <div v-if="form.step == 6">
                    <OrcamentoEntrega v-if="vaos.length > 0" :vaos="vaos" :data="form" @change="setStep" />
                </div>
            </div>
        </div>
    </div>
</template>
