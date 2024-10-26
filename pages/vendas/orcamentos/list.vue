<script lang="ts" setup>
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import type { Orcamento } from '@/types/types';
import { useAppStore } from '@/stores/index';
const { getItems, updateItem } = useDirectusItems();
const store = useAppStore();
import { useDirectusFlow } from '@/stores/directus-flow';
import { ElNotification } from 'element-plus';
const results = ref<Orcamento[]>([]);

const comprovanteModal = ref(false);
const comprovante = ref({});
const pdfContent = ref(null);

const linkOrcamento = (chave: any) => {
    return `https://app.iconobras.com/vendas/orcamentos/${chave}`;
};

const flow = useDirectusFlow();

const verComprovante = async (chave: number) => {
    comprovanteModal.value = true;
    comprovante.value = await flow.get('a2db6a28-52d5-4d38-bdfe-ccd57b48e7e3', { chave: chave });
}

const valorTotal = computed(() => {
    return comprovante.value.vaos.reduce((resultado, item) => resultado + item.valor_total, 0);
});

const getOrcamentos = async () => {
    results.value = await getItems({
        collection: 'orcamento',
        params: {
            filter: {
                status: { '_neq': 'draft' }
            }
        }
    })
}

const arquivar = async (id: number) => {
    await updateItem({ collection: 'orcamento', id: id, item: { status: 'draft' } });
    getOrcamentos();

    ElNotification({
        title: 'Sucesso!',
        message: 'Orçamento apagado com sucesso!',
        type: 'success',
    });
}

const imprimir = () => {
    store.isShowMainLoader = true;
    const content = pdfContent.value;

    html2pdf().from(content)
        .set({
            margin: 10,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .toPdf().get('pdf').then(function (pdfObj) {
            store.isShowMainLoader = false;
            pdfObj.autoPrint();
            window.open(pdfObj.output('bloburl'), '_blank');
        });
}

onMounted(() => {
    getOrcamentos();
})

</script>

<style>
.no-page-break {
    page-break-inside: avoid;
}
</style>

<template>
    <div>
        <client-only>
            <div class="mx-auto max-w-7xl">
                <div class="mx-auto max-w-7xl">
                    <div class="mx-auto flex max-w-7xl items-center justify-between">
                        <h2 class="text-2xl font-bold text-[#1B5870]">Cadastrar Orçamento do Cliente</h2>
                        <NuxtLink to="/vendas/orcamentos/step/novo" class="btn btn-primary">
                            + Adicionar novo
                        </NuxtLink>
                    </div>

                    <div class="mt-5 space-y-2 dark:bg-[#0e1726]">
                        <div>
                            <div class="cursor-pointer rounded-t-md">
                                <form class="space-y-5">
                                    <div class="grid grid-cols-1 gap-2 rounded-xl border p-4 text-xs sm:grid-cols-3">
                                        <div>
                                            <label for="gridEmail">Nome do cliente</label>
                                            <div class="relative">
                                                <input type="text" placeholder="Buscar"
                                                    class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                <div
                                                    class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                    <NuxtLink to="/faturarparacliente/filtro">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.51429 13.8572C11.112 13.8572 14.0286 10.9407 14.0286 7.34292C14.0286 3.74517 11.112 0.828613 7.51429 0.828613C3.91655 0.828613 1 3.74517 1 7.34292C1 10.9407 3.91655 13.8572 7.51429 13.8572Z"
                                                                stroke="#FF9400" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                            <path d="M18.8287 18.6573L12.6572 12.4858" stroke="#FF9400"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="gridEmail">Mês de referência</label>
                                            <div class="relative">
                                                <input type="text" placeholder="Março 2023"
                                                    class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                                <div
                                                    class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                                    <NuxtLink to="/faturarparacliente/filtro">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 1.5V3.75" stroke="#FF9400"
                                                                stroke-miterlimit="10" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                            <path d="M12 1.5V3.75" stroke="#FF9400"
                                                                stroke-miterlimit="10" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                            <path
                                                                d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z"
                                                                stroke="#FF9400" stroke-miterlimit="10"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M6 8.25H12" stroke="#FF9400" stroke-miterlimit="10"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M6 12H9" stroke="#FF9400" stroke-miterlimit="10"
                                                                stroke-linecap="round" stroke-linejoin="round" />
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
                            <thead class="text-boton text-normal text-[#1B5870]">
                                <tr>
                                    <th>N° do Pedido</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Telefone</th>
                                    <th>Link</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr v-for="(item, index) in results" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.responsavel }}</td>
                                    <td>{{ $filters.moedaBRL(item.valor) }}</td>
                                    <td>{{ item.telefone }}</td>
                                    <td class="font-bold">
                                        <a :href="linkOrcamento(item.chave)" target="_blank"> Acessar </a>
                                    </td>
                                    <td class="flex gap-3">
                                        <client-only>
                                            <a :href="linkOrcamento(item.chave)" target="_blank">
                                                <icon-eye-fill v-tippy="'Visualizar'" class="cursor-pointer" />
                                            </a>
                                            <NuxtLink :to="`/vendas/orcamentos/step/${item.id}`">
                                                <icon-pencil-fill v-tippy="'Editar Orçamento'" class="cursor-pointer" />
                                            </NuxtLink>
                                            <NuxtLink :to="`/vendas/orcamentos/step/${item.id}?step=4`">
                                                <icon-iron-fill v-tippy="'Adicionar ferro'" class="cursor-pointer" />
                                            </NuxtLink>

                                            <NuxtLink :to="`/vendas/orcamentos/step/${item.id}?step=5`">
                                                <icon-wallet-fill v-tippy="'Forma de pagamento'"
                                                    class="cursor-pointer" />
                                            </NuxtLink>

                                            <button @click="verComprovante(item.chave)">
                                                <icon-printer-fill v-tippy="'Imprimir'" class="cursor-pointer" />
                                            </button>
                                            <button @click="arquivar(item.id)">
                                                <icon-recycle-bin-fill v-tippy="'Deletar'" class="cursor-pointer" />
                                            </button>
                                        </client-only>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Modelo Predefinido da Laje -->
            <TransitionRoot appear :show="false" as="template">
                <Dialog as="div" class="relative z-50">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-[white]/80" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="panel w-full max-w-2xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                                    <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-between">
                                        <svg width="104" height="104" viewBox="0 0 104 104" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M52 97.5C77.129 97.5 97.5 77.129 97.5 52C97.5 26.871 77.129 6.5 52 6.5C26.871 6.5 6.5 26.871 6.5 52C6.5 77.129 26.871 97.5 52 97.5Z"
                                                fill="#FF9400" fill-opacity="0.08" />
                                            <path
                                                d="M46.75 60.9376C45.887 60.9376 45.1875 61.6371 45.1875 62.5001C45.1875 63.363 45.887 64.0626 46.75 64.0626H59.25C60.1129 64.0626 60.8125 63.363 60.8125 62.5001C60.8125 61.6371 60.1129 60.9376 59.25 60.9376H46.75Z"
                                                fill="#FF9400" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M53 27.6042C51.5247 27.6042 50.1844 28.0268 48.7303 28.7339C47.3247 29.4175 45.7009 30.4253 43.6726 31.6841L39.3672 34.3561C37.4481 35.5472 35.9113 36.5009 34.7269 37.408C33.5003 38.3474 32.5582 39.304 31.8777 40.5472C31.1986 41.7878 30.8928 43.1079 30.7462 44.6682C30.6041 46.1804 30.6041 48.0295 30.6042 50.3485V53.7081C30.6041 57.6746 30.6041 60.8055 30.9223 63.2534C31.2487 65.7646 31.9345 67.7919 33.4841 69.3948C35.0408 71.005 37.0218 71.7244 39.4742 72.0654C41.851 72.396 44.8866 72.396 48.7122 72.3959H57.2877C61.1133 72.396 64.149 72.396 66.5258 72.0654C68.9782 71.7244 70.9592 71.005 72.5159 69.3948C74.0655 67.7919 74.7513 65.7646 75.0777 63.2534C75.3959 60.8055 75.3959 57.6746 75.3958 53.7081V50.3484C75.3958 48.0295 75.3959 46.1803 75.2538 44.6682C75.1071 43.1079 74.8013 41.7878 74.1223 40.5472C73.4418 39.304 72.4997 38.3474 71.2731 37.408C70.0887 36.5009 68.5519 35.5472 66.6328 34.3562L62.3274 31.6841C60.2991 30.4253 58.6753 29.4175 57.2697 28.7339C55.8156 28.0268 54.4752 27.6042 53 27.6042ZM45.249 34.3837C47.3652 33.0703 48.8531 32.1491 50.097 31.5442C51.3088 30.9549 52.167 30.7292 53 30.7292C53.833 30.7292 54.6912 30.9549 55.903 31.5442C57.1469 32.1491 58.6348 33.0703 60.751 34.3837L64.9176 36.9696C66.9194 38.2119 68.3248 39.0862 69.3731 39.889C70.3931 40.6702 70.9799 41.3148 71.3811 42.0477C71.7836 42.7832 72.0187 43.6431 72.1425 44.9606C72.2692 46.3096 72.2708 48.0122 72.2708 50.4249V53.5937C72.2708 57.6999 72.2677 60.6275 71.9788 62.8506C71.695 65.0341 71.1604 66.3009 70.2692 67.2227C69.3851 68.1371 68.1815 68.6801 66.0954 68.9702C63.9587 69.2674 61.1407 69.2709 57.1667 69.2709H48.8333C44.8593 69.2709 42.0413 69.2674 39.9046 68.9702C37.8184 68.6801 36.6149 68.1371 35.7308 67.2227C34.8396 66.3009 34.305 65.0341 34.0212 62.8506C33.7323 60.6275 33.7292 57.6999 33.7292 53.5937V50.4249C33.7292 48.0122 33.7307 46.3096 33.8575 44.9606C33.9813 43.6431 34.2163 42.7832 34.6189 42.0477C35.0201 41.3148 35.6069 40.6702 36.6269 39.889C37.6752 39.0862 39.0806 38.2119 41.0823 36.9696L45.249 34.3837Z"
                                                fill="#FF9400" />
                                        </svg>
                                        <h2 class="text-2xl font-bold text-[#1B5870]">Modelo Predefinido da Laje</h2>
                                    </div>

                                    <div
                                        class="grid flex-1 grid-cols-1 items-center justify-center gap-5 sm:grid-cols-6">
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Tipo de lajes</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Treliça</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Sobrecarga</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Aço Adicional
                                                Manual</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name"></label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name"></label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>

                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Marca
                                                Enchimento</label>
                                            <select id="regime_fiscal" class="form-select py-1 text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Dimensões</label>
                                            <select id="regime_fiscal" class="form-select py-1 text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Tipo</label>
                                            <select id="regime_fiscal" class="form-select py-1 text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2 flex justify-center">
                                            <svg width="113" height="49" viewBox="0 0 113 49" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <line x1="2" y1="2.97339" x2="112.32" y2="2.9734" stroke="#1B5870"
                                                    stroke-width="4" />
                                                <path d="M2 3.30273L23.3338 27.5908H2.00013" stroke="#1B5870"
                                                    stroke-width="3" />
                                                <path d="M23.7719 26.0908L41.7917 5.57568L59.8114 26.0908H23.7719Z"
                                                    stroke="#1B5870" stroke-width="3" />
                                                <path d="M63.7375 26.0908L81.7573 5.57568L99.7772 26.0908H63.7375Z"
                                                    stroke="#1B5870" stroke-width="3" />
                                                <path
                                                    d="M2.25 23.8127H111.593V30.486C111.593 32.0048 110.362 33.236 108.843 33.236H2.25V23.8127Z"
                                                    fill="#C4C4C4" stroke="#444444" stroke-width="0.5" />
                                                <path
                                                    d="M110.735 42.3155C110.93 42.1202 110.93 41.8036 110.735 41.6084L107.553 38.4264C107.358 38.2311 107.041 38.2311 106.846 38.4264C106.651 38.6216 106.651 38.9382 106.846 39.1335L109.674 41.9619L106.846 44.7903C106.651 44.9856 106.651 45.3022 106.846 45.4974C107.041 45.6927 107.358 45.6927 107.553 45.4974L110.735 42.3155ZM85.666 41.6084C85.4708 41.8036 85.4708 42.1202 85.666 42.3155L88.848 45.4974C89.0433 45.6927 89.3599 45.6927 89.5551 45.4974C89.7504 45.3022 89.7504 44.9856 89.5551 44.7903L86.7267 41.9619L89.5551 39.1335C89.7504 38.9382 89.7504 38.6216 89.5551 38.4264C89.3599 38.2311 89.0433 38.2311 88.848 38.4264L85.666 41.6084ZM110.381 41.4619L86.0196 41.4619V42.4619L110.381 42.4619V41.4619Z"
                                                    fill="black" />
                                                <line x1="85.158" y1="35.6851" x2="85.158" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="110.631" y1="35.6851" x2="110.631" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="85.158" y1="35.6851" x2="85.158" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="110.631" y1="35.6851" x2="110.631" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                            </svg>
                                        </div>
                                        <div class="col-span-2">
                                            <svg width="116" height="41" viewBox="0 0 116 41" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M115.612 34.3807C115.807 34.1854 115.807 33.8688 115.612 33.6735L112.43 30.4916C112.235 30.2963 111.918 30.2963 111.723 30.4916C111.528 30.6868 111.528 31.0034 111.723 31.1987L114.551 34.0271L111.723 36.8555C111.528 37.0508 111.528 37.3674 111.723 37.5626C111.918 37.7579 112.235 37.7579 112.43 37.5626L115.612 34.3807ZM89.1788 33.6735C88.9836 33.8688 88.9836 34.1854 89.1788 34.3807L92.3608 37.5626C92.5561 37.7579 92.8726 37.7579 93.0679 37.5626C93.2632 37.3674 93.2632 37.0508 93.0679 36.8555L90.2395 34.0271L93.0679 31.1987C93.2632 31.0034 93.2632 30.6868 93.0679 30.4916C92.8726 30.2963 92.5561 30.2963 92.3608 30.4916L89.1788 33.6735ZM115.258 33.5271L89.5324 33.5271V34.5271L115.258 34.5271V33.5271Z"
                                                    fill="black" />
                                                <line x1="88.6053" y1="27.4033" x2="88.6053" y2="40.6403" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="115.508" y1="27.4033" x2="115.508" y2="40.6403" stroke="black"
                                                    stroke-width="0.5" />
                                                <path d="M1.96045 1.13721L16.0247 21.2166H3.85912" stroke="#1B5870"
                                                    stroke-width="2.5" />
                                                <path
                                                    d="M25.0186 22.0693C25.0186 24.8308 22.7801 27.0693 20.0186 27.0693L6.95993 27.0693C4.1985 27.0693 1.95992 24.8308 1.95992 22.0693L1.95992 17.1197L25.0186 17.1197L25.0186 22.0693Z"
                                                    fill="#C4C4C4" />
                                                <ellipse cx="14.0983" cy="22.1894" rx="2.75189" ry="2.3569"
                                                    fill="#1B5870" />
                                                <ellipse cx="14.0983" cy="22.1894" rx="2.75189" ry="2.3569"
                                                    fill="#1B5870" />
                                                <ellipse cx="14.0983" cy="22.1894" rx="2.75189" ry="2.3569"
                                                    fill="#1B5870" />
                                                <ellipse cx="14.0983" cy="22.1894" rx="2.75189" ry="2.3569"
                                                    fill="#1B5870" />
                                                <path
                                                    d="M25.4363 25.8704V17.5957C25.4363 17.0434 24.9885 16.5957 24.4363 16.5957H17.2381C16.6858 16.5957 16.2381 16.148 16.2381 15.5957V3.88818C16.2381 3.3359 16.6858 2.88818 17.2381 2.88818H114.25C114.803 2.88818 115.25 3.3359 115.25 3.88818V15.5957C115.25 16.148 114.803 16.5957 114.25 16.5957H105.475C104.923 16.5957 104.475 17.0434 104.475 17.5957V25.8704C104.475 26.4227 104.027 26.8704 103.475 26.8704H26.4363C25.884 26.8704 25.4363 26.4227 25.4363 25.8704Z"
                                                    fill="#E0EAFE" stroke="black" stroke-width="0.5" />
                                            </svg>
                                        </div>
                                        <div class="col-span-2">
                                            <svg width="114" height="49" viewBox="0 0 114 49" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <line x1="2.07941" y1="2.97339" x2="112.399" y2="2.9734"
                                                    stroke="#1B5870" stroke-width="4" />
                                                <path d="M2.07941 3.30273L23.4132 27.5908H2.07954" stroke="#1B5870"
                                                    stroke-width="3" />
                                                <path d="M23.8513 26.0908L41.871 5.57568L59.8908 26.0908H23.8513Z"
                                                    stroke="#1B5870" stroke-width="3" />
                                                <path d="M63.8159 26.0908L81.8357 5.57568L99.8555 26.0908H63.8159Z"
                                                    stroke="#1B5870" stroke-width="3" />
                                                <path
                                                    d="M113.031 42.3155C113.226 42.1202 113.226 41.8036 113.031 41.6084L109.849 38.4264C109.654 38.2311 109.337 38.2311 109.142 38.4264C108.947 38.6216 108.947 38.9382 109.142 39.1335L111.97 41.9619L109.142 44.7903C108.947 44.9856 108.947 45.3022 109.142 45.4974C109.337 45.6927 109.654 45.6927 109.849 45.4974L113.031 42.3155ZM87.9621 41.6084C87.7668 41.8036 87.7668 42.1202 87.9621 42.3155L91.1441 45.4974C91.3393 45.6927 91.6559 45.6927 91.8512 45.4974C92.0464 45.3022 92.0464 44.9856 91.8512 44.7903L89.0227 41.9619L91.8512 39.1335C92.0464 38.9382 92.0464 38.6216 91.8512 38.4264C91.6559 38.2311 91.3393 38.2311 91.1441 38.4264L87.9621 41.6084ZM112.677 41.4619L88.3156 41.4619V42.4619L112.677 42.4619V41.4619Z"
                                                    fill="black" />
                                                <line x1="87.4541" y1="35.6851" x2="87.4541" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="112.927" y1="35.6851" x2="112.927" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="87.4541" y1="35.6851" x2="87.4541" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                                <line x1="112.927" y1="35.6851" x2="112.927" y2="48.2201" stroke="black"
                                                    stroke-width="0.5" />
                                            </svg>
                                        </div>

                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Apoio Viga</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Apoio Vão</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2">
                                            <label class="text-xs placeholder:text-xs" for="name">Engaste</label>
                                            <select id="regime_fiscal" class="form-select text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div class="col-span-6">
                                            <label class="text-xs placeholder:text-xs" for="name">Possue
                                                Distribuição</label>
                                            <select id="regime_fiscal" class="form-select py-3 text-[#FF9400]">
                                                <option disabled>Selecione</option>
                                            </select>
                                        </div>
                                        <div
                                            class="col-span-3 flex justify-center gap-2 rounded-xl border bg-rose-50 px-2 py-3 text-[#ff9400]">
                                            <button>-</button>
                                            <p>1</p>
                                            <button>+</button>
                                        </div>
                                        <div
                                            class="col-span-3 flex justify-center gap-2 rounded-xl border bg-rose-50 px-2 py-3 text-[#ff9400]">
                                            <button>-</button>
                                            <p>1</p>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <div class="my-6 flex justify-around space-x-4">
                                        <button
                                            class="ml-4 rounded-xl border border-[#FF9400] px-20 py-4 text-sm font-bold text-[#FF9400]">
                                            Cancelar
                                        </button>
                                        <button
                                            class="ml-4 rounded-xl bg-[#FF9400] px-20 py-4 text-sm font-bold text-[white]">
                                            Próximo
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>

            <!-- Enviar Proposta ao Cliente -->
            <TransitionRoot appear :show="false" as="template">
                <Dialog as="div" class="relative z-50">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-[white]/80" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="panel w-full max-w-2xl overflow-hidden rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                                    <div
                                        class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
                                        <div class="bg-[#FF94002B] p-4 rounded-full">
                                            <icon-send-fill />
                                        </div>
                                        <h2 class="text-xl font-bold">Enviar Proposta ao Cliente</h2>
                                    </div>

                                    <div
                                        class="grid flex-1 grid-cols-1 items-center justify-center gap-5 sm:grid-cols-6">
                                        <div class="col-span-full cursor-pointer">
                                            <label class="text-xs placeholder:text-xs" for="name">Selecione como será
                                                pago</label>
                                            <div
                                                class="bg-[#FF94002B] text-[#FF9400] font-semibold py-2 rounded text-center">
                                                BAIXAR PROJETO
                                            </div>
                                        </div>
                                        <div class="col-span-3">
                                            <label class="text-xs placeholder:text-xs" for="name">Nome do
                                                Contato</label>
                                            <input type="text" class="form-input flex-1" />
                                        </div>
                                        <div class="col-span-3">
                                            <label class="text-xs placeholder:text-xs" for="name">Contato
                                                WhatsApp</label>
                                            <input type="text" class="form-input flex-1" />
                                        </div>
                                        <div class="col-span-full">
                                            <label class="text-xs placeholder:text-xs" for="name">Email</label>
                                            <input type="text" class="form-input flex-1" />
                                        </div>
                                    </div>

                                    <div class="my-6 flex justify-around space-x-4">
                                        <button
                                            class="ml-4 rounded-xl border border-[#FF9400] px-20 py-4 text-sm font-bold text-[#FF9400]">
                                            Voltar
                                        </button>
                                        <button
                                            class="ml-4 rounded-xl bg-[#FF9400] px-20 py-4 text-sm font-bold text-[white]">
                                            Enviar Proposta
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>

            <!-- Comprovante -->
            <TransitionRoot appear :show="comprovanteModal" as="template">
                <Dialog as="div" class="relative z-50">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0 bg-[white]/80" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="panel bg-slate-100 w-full max-w-2xl overflow-hidden rounded-2xl border-0 p-6 text-black dark:text-white-dark">

                                    <div ref="pdfContent">
                                        <div
                                            class="flex justify-center space-x-1 items-center font-semibold text-2xl text-[#1B5870]">
                                            <img class="w-10" src="/assets/images/logo.svg" alt="site logo">
                                            <span>icon</span>
                                        </div>

                                        <div
                                            class="rounded-lg break-before-column space-y-4 bg-white border border-gray-100 px-5 py-4 mt-5 divide-y">
                                            <div class="">
                                                <h2 class="text-lg text-[#1B5870]">Pedido de Compra <b>
                                                        N° {{ comprovante.id }}
                                                    </b></h2>
                                            </div>
                                            <div class="pt-4 space-y-4">
                                                <div class="flex flex-col">
                                                    <b>Endereço do Cliente</b>
                                                    <span class="text-sm text-gray-600">Dados do cliente</span>
                                                    <span class="mt-2 text-gray-600 text-sm">
                                                        {{ comprovante.endereco_completo }},
                                                        {{ comprovante.cidade }} - {{ comprovante.estado }}
                                                    </span>
                                                </div>

                                                <div class="flex flex-col">
                                                    <b>Telefone de Contato</b>
                                                    <span class="mt-2 text-gray-600 text-sm">(31) 90000-0000</span>
                                                </div>

                                                <div class="flex flex-col">
                                                    <b>Endereço da Entrega</b>
                                                    <span class="text-sm text-gray-600">Dados do Endereço</span>
                                                    <span class="mt-2 text-gray-600 text-sm">
                                                        {{ comprovante.endereco_completo }},
                                                        {{ comprovante.cidade }} - {{ comprovante.estado }}
                                                    </span>
                                                </div>

                                                <div class="flex flex-col">
                                                    <b>Data da Entrega</b>
                                                    <span class="mt-2 text-gray-600 text-sm">
                                                        14/12/2024 á 15/12/2024
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="rounded-lg space-y-4 bg-white border border-gray-100 px-5 py-4 mt-5">
                                            <div class="">
                                                <h2 class="text-lg text-[#1B5870]">Itens do Pedido</h2>
                                            </div>

                                            <div>
                                                <div class="flex items-center space-x-4">
                                                    <icon-credit-card class="text-[#FF9400] w-12 h-12" />
                                                    <p class="text-gray-900 text-opacity-80 text-sm">ENTRADA DE 2.500,00
                                                        NO
                                                        PIX + 6X
                                                        DE
                                                        R$420,00 NO CARTÃO DE CRÉDITO NO
                                                        DIA da ENTREGA 21/06/2023 </p>
                                                </div>
                                            </div>
                                        </div>

                                        <h2 class="my-5 text-xl font-semibold">
                                            Pedido de Compra
                                        </h2>

                                        <div class="table-responsive rounded-2xl bg-[#f3f3f3]">
                                            <table>
                                                <thead class="text-boton text-normal">
                                                    <tr>
                                                        <th class="text-[#FF9400]">Produto</th>
                                                        <th class="text-[#FF9400]">M²/Qtd</th>
                                                        <th class="text-[#FF9400]">Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white">
                                                    <tr v-for="(item, index) in comprovante.vaos" :key="index">
                                                        <td class="flex flex-col">
                                                            <p class="py-3">
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
                                                                -
                                                                {{ item.nome }}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="bg-[#FF9400]/10 text-[#FF9400] text-sm text-center py-1 rounded-full font-bold">
                                                                {{ item.area_m?.toFixed(2) }} m²
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <b>{{ $filters.moedaBRL(item.valor_total) }}</b>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div class="flex no-page-break justify-end items-center space-x-1 mt-5">
                                            <div class="flex-1 only-pdf" data-html2canvas-ignore="true">
                                                <button @click="imprimir()"
                                                    class="ml-4 rounded-lg bg-[#008ED6] px-8 py-3 text-sm font-bold text-[white]">+
                                                    Imprimir
                                                </button>

                                                <button @click="comprovanteModal = false"
                                                    class="ml-4 rounded-lg bg-gray-400 px-8 py-3 text-sm font-bold text-[white]">
                                                    Fechar
                                                </button>
                                            </div>

                                            <span>Total:</span>
                                            <h2 v-if="comprovante.id" class="text-3xl font-semibold ">
                                                {{ $filters.moedaBRL(valorTotal) }}
                                            </h2>
                                        </div>

                                        <div
                                            class="flex items-start bg-white space-x-4 mt-6 border-t-8 border-[#F78817] rounded-md p-4">
                                            <div>
                                                <icon-wallet-fill />
                                            </div>
                                            <div class="flex flex-col">
                                                <b>Atenção, Se precisar estaremos aqui!</b>
                                                <span class="text-[#F78817] font-semibold">Responsável: Alex Silva I
                                                    (31)
                                                    00000000</span>
                                            </div>
                                        </div>

                                        <footer class="mt-5">
                                            <div class="flex justify-between items-center">
                                                <div
                                                    class="flex space-x-1 items-center font-semibold text-2xl text-[#1B5870]">
                                                    <img class="w-10" src="/assets/images/logo.svg" alt="site logo">
                                                    <span>icon</span>
                                                </div>

                                                <div class="flex items-center space-x-2" data-html2canvas-ignore="true">
                                                    <a href="#" class="bg-orange-500 p-2 rounded-full text-white">
                                                        <icon-facebook />
                                                    </a>
                                                    <a href="#" class="bg-orange-500 p-2 rounded-full text-white">
                                                        <icon-twitter />
                                                    </a>
                                                    <a href="#" class="bg-orange-500 p-2 rounded-full text-white">
                                                        <icon-instagram />
                                                    </a>
                                                    <a href="#" class="bg-orange-500 p-2 rounded-full text-white">
                                                        <icon-linkedin />
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="text-center mt-5">
                                                <p class="text-[#1B5870] text-sm">Copyrught© 2024 - todos os direitos
                                                    reservados.
                                                </p>
                                                <b class="text-[#1B5870] text-sm">Feito com amor em Belo Horizonte
                                                    MG</b>
                                            </div>
                                        </footer>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </client-only>
    </div>
    <!-- Tabs -->
</template>
