<template>
    <div v-if="company">
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Users</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Account Settings</span>
            </li>
        </ul>
        <div class="pt-5">
            <div class="mb-5 flex items-center justify-between">
                <h5 class="text-lg font-semibold dark:text-white-light">Settings</h5>
            </div>
            <TabGroup>
                <TabList
                    class="mb-5 flex overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a]">
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': selected }">
                            <icon-home />
                            Home
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': selected }">
                            <icon-dollar-sign-circle />
                            NFe
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': selected }">
                            <icon-user class="h-5 w-5" />
                            NFCe
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': selected }">
                            <icon-phone />
                            MDFe
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': selected }">
                            <icon-phone />
                            DFe
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': selected }">
                            <icon-phone />
                            Certificado
                        </a>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div>
                            <form
                                class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">General Information</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
                                        <img v-if="company.logo"
                                            :src="img(company.logo, { width: 150, height: 150, format: 'webp' })" alt=""
                                            class="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32" />

                                        <div v-if="company.logo" class="m-3 text-center">
                                            <a href="javascript:void(0)" @click="company.logo = false"
                                                class="bold underline excluirP system-dcg">
                                                -- selecionar outra imagem --
                                            </a>
                                        </div>

                                        <div v-if="!company.logo">
                                            <label>Logomarca</label>

                                            <el-upload class="upload-demo mt-5" drag action="#"
                                                :http-request="getFileMsg" :on-change="handleUploadChange"
                                                :show-file-list="true">
                                                <svg class="mx-auto mb-3" width="50" height="50" viewBox="0 0 24 24"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M11.4697 15.4697C11.7626 15.1768 12.2374 15.1768 12.5303 15.4697L14.5303 17.4697C14.8232 17.7626 14.8232 18.2374 14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303L12.75 17.8107V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V17.8107L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L11.4697 15.4697Z"
                                                        fill="currentColor" />
                                                    <path
                                                        d="M12.4762 3.75C9.7261 3.75 7.5119 5.95083 7.5119 8.64706C7.5119 9.10922 7.5766 9.55551 7.69729 9.97813C8.19449 10.1216 8.65991 10.3389 9.08045 10.6171C9.42592 10.8456 9.52072 11.3109 9.29219 11.6564C9.06366 12.0019 8.59835 12.0967 8.25288 11.8681C7.87207 11.6162 7.43917 11.4355 6.9733 11.3451C6.75147 11.3021 6.52165 11.2794 6.28571 11.2794C4.3246 11.2794 2.75 12.8482 2.75 14.7647C2.75 16.6812 4.3246 18.25 6.28571 18.25C6.69993 18.25 7.03571 18.5858 7.03571 19C7.03571 19.4142 6.69993 19.75 6.28571 19.75C3.51296 19.75 1.25 17.5264 1.25 14.7647C1.25 12.0605 3.41987 9.87207 6.11351 9.78228C6.04673 9.41355 6.0119 9.03413 6.0119 8.64706C6.0119 5.10572 8.91446 2.25 12.4762 2.25C15.6343 2.25 18.2724 4.49369 18.8314 7.47127C21.1313 8.44751 22.75 10.7093 22.75 13.3529C22.75 16.4269 20.5623 18.9843 17.6568 19.6057C17.2518 19.6923 16.8532 19.4341 16.7666 19.0291C16.68 18.624 16.9381 18.2254 17.3432 18.1388C19.5829 17.6598 21.25 15.693 21.25 13.3529C21.25 11.2162 19.8607 9.39087 17.9124 8.72463C17.4038 8.55072 16.8568 8.45588 16.2857 8.45588C15.7031 8.45588 15.1455 8.55458 14.6283 8.73526C14.2372 8.87185 13.8095 8.66557 13.6729 8.27453C13.5363 7.88348 13.7426 7.45575 14.1336 7.31916C14.8079 7.08364 15.5326 6.95588 16.2857 6.95588C16.5812 6.95588 16.8723 6.97555 17.1577 7.01367C16.477 5.11631 14.6422 3.75 12.4762 3.75Z"
                                                        fill="currentColor" />
                                                </svg>
                                                <div class="el-upload__text">Solte o arquivo aqui ou <em>clique para
                                                        enviar</em>
                                                </div>
                                                <div class="el-upload__tip" slot="tip">arquivo png,jpeg com tamanho
                                                    inferior a
                                                    1mb
                                                </div>
                                            </el-upload>
                                        </div>
                                    </div>

                                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label for="name">CPF ou CNPJ</label>
                                            <input v-maska="'##.###.###/####-##'" v-model="company.documento" id="name"
                                                type="text" placeholder="Jimmy Turner" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">Nome</label>
                                            <input v-model="company.nome" id="profession" type="text" placeholder=""
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">Razão Social</label>
                                            <input v-model="company.razao_social" id="profession" type="text"
                                                placeholder="" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">Telefone</label>
                                            <input v-model="company.contato" id="profession" type="text" placeholder=""
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">E-mail</label>
                                            <input v-model="company.email" id="profession" type="email" placeholder=""
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">Inscrição Municipal</label>
                                            <input v-model="company.inscricao_municipal" id="profession" type="text"
                                                placeholder="" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">Inscrição Estadual</label>
                                            <input v-model="company.inscricao_estadual" id="profession" type="text"
                                                placeholder="" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="regime_fiscal">Regime Fiscal</label>
                                            <select v-model="company.regime_fiscal" id="regime_fiscal"
                                                class="form-select text-white-dark">
                                                <option selected>Simples Nacional</option>
                                                <option>Simples Nacional - MEI</option>
                                                <option>Regime Normal - Notas Explicativas</option>
                                            </select>
                                        </div>
                                        <div class="mt-3 sm:col-span-2">
                                            <button @click.prevent="updateCompany" type="button"
                                                class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form
                                class="rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">Endereço</h6>
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label for="profession">Cep</label>
                                        <input v-model="company.cep" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Estado</label>
                                        <input v-model="company.estado" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Cidade</label>
                                        <input v-model="company.cidade" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Bairro</label>
                                        <input v-model="company.bairro" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Endereco</label>
                                        <input v-model="company.endereco" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Número</label>
                                        <input v-model="company.numero" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Complemento</label>
                                        <input v-model="company.complemento" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                    <div>
                                        <label for="profession">Referência</label>
                                        <input v-model="company.referencia" id="profession" type="text" placeholder=""
                                            class="form-input" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form
                                class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">NFE</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label for="ambiente">Ambiente</label>
                                            <select v-model="company.ambiente_nfe" id="ambiente"
                                                class="form-select text-white-dark">
                                                <option>Produção</option>
                                                <option>Homologação</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="serie">Série</label>
                                            <input v-model="company.serie_nfe" id="serie" type="text"
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="proxima_nota">Próxima nota</label>
                                            <input v-model="company.proxima_nota_nfe" id="proxima_nota" type="text"
                                                class="form-input" />
                                        </div>
                                        <div class="mt-3 sm:col-span-2">
                                            <button @click.prevent="updateCompany" type="button"
                                                class="btn btn-primary">Salvar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form
                                class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">NFCE</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label for="ambiente">Ambiente</label>
                                            <select v-model="company.ambiente_nfce" id="ambiente"
                                                class="form-select text-white-dark">
                                                <option>Produção</option>
                                                <option>Homologação</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="serie">Série</label>
                                            <input v-model="company.serie_nfce" id="serie" type="text"
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="proxima_nota">Próxima nota</label>
                                            <input v-model="company.proxima_nota_nfce" id="proxima_nota" type="text"
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="identificador_do_csc">Identificador do CSC</label>
                                            <input v-model="company.identificador_do_csc" id="identificador_do_csc"
                                                type="text" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="csc">CSC</label>
                                            <input v-model="company.csc" id="csc" type="text" class="form-input" />
                                        </div>
                                        <div class="mt-3 sm:col-span-2">
                                            <button @click.prevent="updateCompany" type="button"
                                                class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form
                                class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">General Information</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label for="ambiente">Ambiente</label>
                                            <select v-model="company.ambiente_mdfe" id="ambiente"
                                                class="form-select text-white-dark">
                                                <option>Produção</option>
                                                <option>Homologação</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="serie">Série</label>
                                            <input v-model="company.serie_mdfe" id="serie" type="text"
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="proxima_mdfe">Próxima mdfe</label>
                                            <input v-model="company.proximo_mdfe" id="proxima_mdfe" type="text"
                                                class="form-input" />
                                        </div>
                                        <div class="mt-3 sm:col-span-2">
                                            <button @click.prevent="updateCompany" type="button"
                                                class="btn btn-primary">Salvar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form
                                class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">DFE</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label for="ultimo_nsu">Último NSU</label>
                                            <input v-model="company.ultimo_nsu" id="ultimo_nsu" type="text"
                                                class="form-input" />
                                        </div>
                                        <div>
                                            <label for="numero_sequencial">Número Sequencial</label>
                                            <input v-model="company.numero_sequencial" id="numero_sequencial"
                                                type="text" class="form-input" />
                                        </div>
                                        <div class="mt-3 sm:col-span-2">
                                            <button @click.prevent="updateCompany" type="button"
                                                class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form
                                class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
                                <h6 class="mb-5 text-lg font-bold">Certificado</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label for="ultimo_nsu">Senha certificado</label>
                                            <input v-model="company.senha_certificado" id="numero_sequencial"
                                                type="password" class="form-input" />
                                        </div>
                                        <div class="mt-3 sm:col-span-2">
                                            <button @click.prevent="updateCompany" type="button"
                                                class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>

    <!-- basic -->
    <div class="mb-5">
        <SwitchCompany :active="true" @active="" />
    </div>
</template>
<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useAppStore } from '~/stores';
import type { Empresa } from '@/types';
import * as sweetalert2 from 'sweetalert2';
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import SwitchCompany from '~/pages/components/modals/SwitchCompany.vue';
import { useDirectusFile } from '@/stores/directus-file';

definePageMeta({
    middleware: 'auth',
});

useHead({ title: 'Account Setting' });
const store = useAppStore();
const { updateItem, createItems } = useDirectusItems();

const company = ref();
const listArquivos = ref([]);
const { uploadFiles } = useDirectusFile()
const { getThumbnail: img } = useDirectusFiles();

onMounted(() => {
    company.value = localStorage.getItem('empresa') ? JSON.parse(localStorage.getItem('empresa')) : store.company;
})

const updateCompany = async () => {
    const response: Empresa = await updateItem({ collection: 'empresa', id: company.value.id, item: company.value });

    localStorage.setItem('empresa', JSON.stringify(response));

    await sweetalert2.default.fire({
        icon: 'success',
        title: 'Success',
        text: 'Empresa atualizada com sucesso!',
    });
};

const getFileMsg = async (content: any) => {
    const formData = new FormData();
    formData.append('file', content.file);

    listArquivos.value[0].percentage = 50;
    listArquivos.value[0].status = 'uploading';

    const arquivo = await uploadFiles(formData);

    listArquivos.value[0].percentage = 100;
    listArquivos.value[0].status = 'success';

    company.value.logo = arquivo.id;
    updateCompany();
    arquivo_projeto.value = {};
    listArquivos.value = [];
}

const handleUploadChange = (file: any) => {
    listArquivos.value = [file];
};


</script>
