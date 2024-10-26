<template>
    <div>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-xl">Nota Fiscal</h2>
            <div class="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                <div class="flex gap-3">
                    <div>
                        <button type="button" class="btn btn-primary" @click="router.push('/vendas/notas/nova')">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ltr:mr-2 rtl:ml-2">
                                <path opacity="0.5"
                                    d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 6L12 8M12 8L12 10M12 8H9.99998M12 8L14 8" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" />
                                <path d="M8 14H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M9 18H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>

                            Nova nota
                        </button>
                    </div>

                    <div class="md:block hidden">
                        <button type="button" class="btn btn-dark" @click="importarModal = true">
                            <svg width="24" height="24" class="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M12 4L12 14M12 14L15 11M12 14L9 11" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Importar
                        </button>
                    </div>

                    <div class="md:block hidden">
                        <button type="button" class="btn btn-dark" @click="inutilizarModal = true">
                            <svg width="19" height="19" class="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" />
                                <path
                                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>

                            Inutilizar
                        </button>
                    </div>
                </div>

                <div class="relative">
                    <input type="text" placeholder="Pesquisar" class="peer form-input py-2 ltr:pr-11 rtl:pl-11"
                        v-model="searchUser" @keyup.enter="listaResults()" />
                    <div
                        class="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                        <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5">
                            </circle>
                            <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <ul class="flex space-x-2 mt-3 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Inicio</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Nota nota</span>
            </li>
        </ul>

        <div v-if="paginador.total == 0"
            class="panel mt-3 overflow-hidden border-0 p-0 py-10 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 text-center">
            <div
                class="text-white-light bg1-white-dark w-20 h-20 rounded-full flex items-center justify-center mb-5 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12">
                    <path
                        d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
            </div>
            <h5 class="text-lg font-semibold mb-3.5 text-white-light">Nenhum registro encontrado</h5>
        </div>

        <div class="panel mt-3 overflow-hidden border-0 p-0">
            <div v-if="!results" class="p-5 py-10"><el-skeleton :rows="5" animated /></div>

            <template v-if="results && paginador.total != 0">
                <div class="table-responsive">
                    <table class="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Série - NF</th>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Data</th>
                                <th>Valor</th>

                                <th style="width: 100px">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item in results" :key="item.id">
                                <tr>
                                    <td>
                                        {{ item.serie }} - {{ item.numero }}
                                        <span v-if="item.code == '102'">
                                            /{{ item.sequencia }}
                                        </span>
                                    </td>
                                    <td>
                                        <span v-if="item.cliente_nome">
                                            {{ item.cliente_nome }}
                                        </span>
                                        <span v-if="item.cliente_documento && !item.cliente_nome">
                                            {{ $filters.documento(item.cliente_documento) }}
                                        </span>
                                        <span v-if="!item.cliente_documento && !item.cliente_nome">-</span>
                                    </td>
                                    <td>
                                        <el-tag v-if="item.code == '100' || item.code == '150'" size="small"
                                            type="success">Emitida </el-tag>

                                        <el-tag v-if="item.code == '102'" size="small" type="danger">
                                            Inutilizada
                                        </el-tag>

                                        <el-tag
                                            v-if="item.code != '0' && item.code != '100' && item.code != '101' && item.code != '102' && item.code != '150' && item.code != '104'"
                                            size="small" type="danger">Falha
                                        </el-tag>

                                        <el-tag v-if="item.code == '104'" size="small">Devolução</el-tag>

                                        <el-tag v-if="item.code == '101'" size="small" type="danger">Cancelada </el-tag>
                                    </td>
                                    <td>
                                        {{ $filters.formatDateTime(item.created_at) }}
                                    </td>
                                    <td>
                                        {{ $filters.moedaBRL(item.valor_nota || 0) }}
                                    </td>
                                    <td>
                                        <el-dropdown size="large" type="primary">
                                            <button type="button" class="btn btn-outline-primary dropdown-toggle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 rotate-90 opacity-70">
                                                    <circle cx="5" cy="12" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                    <circle cx="19" cy="12" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                </svg>
                                            </button>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-if="item.code != '102'"
                                                        @click="danfe(item.chave)">
                                                        Imprimir nota
                                                    </el-dropdown-item>
                                                    <el-dropdown-item v-if="item.code != '102'"
                                                        @click="whatsappModal(item.chave)">
                                                        Enviar no WhatsApp
                                                    </el-dropdown-item>
                                                    <el-dropdown-item @click="download(item)">
                                                        Baixa XML
                                                    </el-dropdown-item>
                                                    <el-dropdown-item v-if="item.code != '102'"
                                                        @click="router.push(`/transporte/mdfe/novo?nfe=${item.chave}`)">
                                                        Emitir MDFe
                                                    </el-dropdown-item>
                                                    <el-dropdown-item v-if="item.code != '102'"
                                                        @click="copyToClipboard(item.chave)">
                                                        Copiar Chave
                                                    </el-dropdown-item>
                                                    <el-dropdown-item v-if="item.carta && item.code != '102'"
                                                        @click="evento(item.chave)">
                                                        Imprimir carta
                                                    </el-dropdown-item>

                                                    <el-dropdown-item divided
                                                        v-if="item.code != '101' && item.code != '102'"
                                                        @click="actionApagar(item, 'cancelar')">
                                                        Cancelar
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        v-if="item.code != '101' && !item.carta && item.code != '102'"
                                                        @click="actionApagar(item, 'carta')">
                                                        Carta de Correção
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>

                    <div class="py-6 px-3">
                        <el-pagination background v-model:current-page="page" layout="prev, pager, next"
                            :page-size="paginador.per_page" :total="paginador.total" @current-change="listaResults" />
                    </div>
                </div>
            </template>
        </div>

        <client-only>
            <el-dialog :title="tipo == 'cancelar' ? 'Cancelar nota' : 'Carta de correção'" v-model="apagarModal">
                <div class="con-content">
                    <p>Digite o motivo {{ tipo == 'cancelar' ? 'do cancelamento' : 'da correção' }}</p>

                    <p class="py-1">
                        <el-input v-model="justificativa" />
                    </p>
                </div>

                <template #footer>
                    <div class="footer-dialog flex">
                        <el-button type="success" size="large" @click="modalAcao(item)"> Enviar </el-button>

                        <el-button size="large" @click="apagarModal = false" plain> Cancelar </el-button>
                    </div>
                </template>
            </el-dialog>
        </client-only>

        <client-only>
            <el-dialog v-model="importarModal" title="Importar nota" not-center>
                <div class="con-content">
                    <div class="py-1">
                        <el-upload class="upload-demo" drag action="#" accept=".xml" :file-list="fileList"
                            :http-request="getFileMsg" :on-remove="handleRemove" multiple :show-file-list="true">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">Solte o arquivo aqui ou <em>clique para enviar</em></div>
                            <div class="el-upload__tip" slot="tip">arquivo xml com tamanho inferior a 1mb</div>
                        </el-upload>
                    </div>
                </div>

                <template #footer>
                    <div class="footer-dialog flex">
                        <el-button type="success" size="large" @click="importar()"> Enviar </el-button>

                        <el-button size="large" @click="importarModal = false" plain> Cancelar </el-button>
                    </div>
                </template>
            </el-dialog>
        </client-only>

        <client-only>
            <el-dialog title="Compartilhar nota no WhatsApp" v-model="modalWhat">
                <div class="con-content">
                    <p>Digite o contato para quem você vai enviar.</p>

                    <p class="py-1">
                        <client-only>
                            <el-input v-model="telefone" type="text" v-mask="['(##) ####-####', '(##) #####-####']" />
                        </client-only>
                    </p>
                </div>

                <template #footer>
                    <div class="footer-dialog flex">
                        <el-button type="success" size="large" @click="whatsapp(chave)"> Enviar </el-button>

                        <el-button size="large" @click="modalWhat = false" plain> Cancelar </el-button>
                    </div>
                </template>
            </el-dialog>
        </client-only>

        <client-only>
            <el-dialog v-model="inutilizarModal" title="Inutilizar Numeração de Nota Fiscal" not-center>
                <div class="con-content" style="max-width: 430px">
                    <div class="grid grid-cols-3 gap-3">
                        <div>
                            <p>Nº Inicial</p>

                            <p class="py-1">
                                <el-input v-model="numero_inicial" />
                            </p>
                        </div>

                        <div>
                            <p>Nº Final</p>

                            <p class="py-1">
                                <el-input v-model="numero_final" />
                            </p>
                        </div>

                        <div>
                            <p>Nº de série da NF</p>

                            <p class="py-1">
                                <el-input v-model="serie" />
                            </p>
                        </div>
                    </div>

                    <p class="pt-2">Digite a justificativa</p>

                    <p class="py-1">
                        <el-input v-model="justificativa" />
                    </p>
                </div>

                <template #footer>
                    <div class="footer-dialog flex">
                        <el-button type="success" size="large" @click="inutilizarNF()"> Enviar </el-button>

                        <el-button size="large" @click="inutilizarModal = false" plain> Cancelar </el-button>
                    </div>
                </template>
            </el-dialog>
        </client-only>
    </div>
</template>
<script lang="ts" setup>
useHead({ title: 'Nota Fiscal' });

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import Swal from 'sweetalert2';
import { useAppStore } from '@/stores/index';
const store = useAppStore();
// import axios from '~/http/axios';

const defaultParams = ref({
    id: null,
    name: '',
    email: '',
    role: '',
    phone: '',
    location: '',
});
const displayType = ref('list');
const params = ref(JSON.parse(JSON.stringify(defaultParams.value)));
const filterdContactsList: any = ref([]);
const searchUser = ref('');
const results: any = ref(false);
const apagarModal = ref(false);
const page = ref(1);
const item = ref({});
const paginador = ref({});
const de = ref('');
const ate = ref('');
const tipo = ref('');
const importarModal = ref(false);
const inutilizarModal = ref(false);
const fileList = ref([]);
const notas: any = ref([]);
const justificativa = ref('');
const numero_inicial = ref('');
const numero_final = ref('');
const serie = ref('');

onMounted(() => {
    listaResults(1);
});

const listaResults = (page: Number) => {
    results.value = false;
    paginador.value = {};

    // nota.lista({ page: page, busca: searchUser.value, tipo: '55', de: de.value, ate: ate.value }).then((req) => {
    //     results.value = req.data.data;
    //     paginador.value = { last_page: req.data.last_page, per_page: req.data.per_page, total: req.data.total };
    // });
};

const editUser = (user: any = null) => {
    params.value = JSON.parse(JSON.stringify(defaultParams.value));
    if (user) {
        params.value = JSON.parse(JSON.stringify(user));
    }
};

const actionApagar = (data: any, ac: any) => {
    item.value = data;
    tipo.value = ac;
    apagarModal.value = true;
};

const apagar = (data: any) => {
    apagarModal.value = false;

    // nota.apagar(data.id).then((req) => {
    //     listaResults(1);
    //     showMessage('Venda removida com sucesso!');
    // });
};

const importar = () => {
    store.isShowMainLoader = true;

    const array = separar(notas.value, 100);
    const promises = [];
    for (let i = 0; i < array.length; i++) {
        promises.push(
            nota
                .importar({ notas: array[i] })
                .then((req) => { })
                .catch((error) => {
                    store.isShowMainLoader = false;
                    showMessage(error.response.data.message, 'error');
                })
        );
    }
    Promise.all(promises).then(() => {
        store.isShowMainLoader = false;
        importarModal.value = false;
        fileList.value = [];
        showMessage('Notas importadas com sucesso!');
        listaResults(1);
    });
};

const getFileMsg = (content: any) => {
    getBase64(content.file).then((res: any) => {
        notas.value.push(res);
    });
};

const handleRemove = (file: any, fileList: any) => {
    notas.value = [];
    for (let i = 0; i < fileList.length; i++) {
        getBase64(fileList[i].raw).then((res: any) => {
            notas.value.push(res);
        });
    }
};

const separar = (base: Array<never>, maximo: any) => {
    const resultado = [[]];
    let grupo = 0;
    for (let indice = 0; indice < base.length; indice++) {
        if (resultado[grupo] === undefined) {
            resultado[grupo] = [];
        }
        resultado[grupo].push(base[indice]);
        if ((indice + 1) % maximo === 0) {
            grupo = grupo + 1;
        }
    }
    return resultado;
};

const getBase64 = (file: any) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult: any = '';
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
};

const modalAcao = (item: any) => {
    store.isShowMainLoader = true;

    const data = { chave: item.chave, justificativa: justificativa.value };
    // const notaAC: any = tipo.value === 'cancelar' ? nota.cancelar(data) : nota.carta(data);

    // notaAC
    //     .then((req: any) => {
    //         store.isShowMainLoader = false;
    //         listaResults(1);
    //         apagarModal.value = false;
    //         showMessage(tipo.value === 'cancelar' ? 'Nota cancelada com sucesso!' : 'Carta enviada com sucesso!');
    //         justificativa.value = '';
    //     })
    //     .catch((error: any) => {
    //         store.isShowMainLoader = false;
    //         apagarModal.value = false;
    //         justificativa.value = '';

    //         showMessage(error.response.data.message, 'error');
    //     });
};

const danfe = (chave: any) => {
    store.isShowMainLoader = true;

    // axios.get(`fiscal/nfe/${chave}`).then((response) => {
    //     store.isShowMainLoader = false;
    //     nota.imprimir(response.data.pdf);
    // });
};

const modalWhat = ref(false);
const chave = ref("");
const telefone = ref("");

const whatsappModal = (rChave: any) => {
    modalWhat.value = true;
    chave.value = rChave;
}

const download = (item: any) => {
    store.isShowMainLoader = true;

    // axios.get(`fiscal/nfe/${item.chave || item.id}`).then((response) => {
    //     const linkSource = `data:application/xml;base64,${response.data.xml}`;
    //     const downloadLink = document.createElement('a');
    //     const fileName = `XML_${item.numero}-${item.serie}.xml`;
    //     downloadLink.href = linkSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    //     store.isShowMainLoader = false;
    // });
};

const evento = (chave: any) => {
    store.isShowMainLoader = true;
    // axios.get(`fiscal/nfe/${chave}`).then((response) => {
    //     store.isShowMainLoader = false;
    //     nota.imprimir(response.data.evento);
    // });
};

const copyToClipboard = (text: any) => {
    const temp = document.createElement('input');
    temp.setAttribute('value', text);
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showMessage('Chave copiada com sucesso!');
};

const inutilizarNF = () => {
    store.isShowMainLoader = true;

    // axios
    //     .post('fiscal/nfe/inutilizar', {
    //         numero_inicial: numero_inicial.value,
    //         numero_final: numero_final.value,
    //         serie: serie.value,
    //         justificativa: justificativa.value,
    //         tipo: 55,
    //     })
    //     .then((req) => {
    //         store.isShowMainLoader = false;
    //         listaResults(1);
    //         inutilizarModal.value = false;
    //         showMessage('Sequência inutilizada com sucesso!');
    //         justificativa.value = '';
    //         numero_inicial.value = '';
    //         numero_final.value = '';
    //         serie.value = '';
    //     })
    //     .catch((error) => {
    //         store.isShowMainLoader = false;
    //         showMessage(error.response.data.message, 'error');
    //     });
};

const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};
</script>