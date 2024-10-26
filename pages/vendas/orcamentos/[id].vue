<script lang="ts" setup>
import type { ArquivoProjeto, Orcamento } from '@/types/types';
import { useDirectusFlow } from '@/stores/directus-flow';

definePageMeta({
    layout: 'auth-layout'
})

const route = useRoute();
const status = ref(false);

const flow = useDirectusFlow();
const flowData = await flow.get('a2db6a28-52d5-4d38-bdfe-ccd57b48e7e3', { chave: route.params.id });

const orcamento: Orcamento = flowData;

const user = useDirectusUser();

const vaos: ArquivoProjeto[] = flowData.vaos;

const aceitar = async () => {
    await flow.post('3a973e3e-3609-4277-a492-63ab903e9026', { chave: route.params.id });
    status.value = true;
}

const valorTotal = computed(() => {
    return vaos.reduce((resultado, item) => resultado + item.valor_total, 0);
})

onMounted(() => {
    status.value = orcamento.status == 'aprovado';
})

</script>


<template>

    <div>
        <div class="flex justify-center space-x-1 items-center font-semibold text-2xl text-[#1B5870]">
            <img class="w-12 my-4" src="/assets/images/logo.svg" alt="site logo">
            <span>icon</span>
        </div>

        <div
            class="flex space-y-1 justify-center space-x-1 items-center font-semibold text-2xl text-[#1B5870] bg-[#F3F2F2] my-5">
            <img class="w-56 relative" src="/image17.png" alt="site logo">
            <div class="space-y-2">
                <p class="py-2 px-4 text-sm text-[#FF9400] justify-center rounded-full flex w-48 bg-white">
                    {{ user?.first_name }}
                </p>
                <p>Proposta gerada com <br> <span class="text-[#FF9400] ">Carinho pra você!</span></p>

                <button v-if="!status" @click="aceitar()" class="btn btn-primary btn-lg">
                    Aceitar Propósta
                </button>

                <div v-if="status" class="btn btn-success btn-lg">
                    Propósta Aceita
                </div>
            </div>
        </div>

        <div class="max-w-3xl mx-auto">

            <div class="border-b" v-for="(item, index) in vaos" :key="index">
                <img class="w-44" src="/viga.png" alt="">
                <p class="font-bold border-b py-3 text-2xl">
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
                <p class="text-green-600 bg-green-50 w-16 font-bold rounded-full mt-3 px-3">Valor</p>
                <p class="font-bold pt-3 text-xl">{{ $filters.moedaBRL(item.valor_total) }}</p>
            </div>

            <div class="items-end justify-end flex flex-col">
                <p class="text-green-600 bg-green-50 w-26 font-bold rounded-full mt-3 px-3">Entregue na sua Obra</p>
                <p class="font-bold text-4xl mb-6 pt-3">5 Dias úteis</p>
                <p class="text-green-600 bg-green-50 w-26 font-bold rounded-full mt-3 px-3">Valor total dos produtos a
                    vista</p>
                <p class="font-bold text-4xl pt-3">
                    {{ $filters.moedaBRL(valorTotal) }}
                </p>
                <p class="text-green-600 bg-green-50 w-26 font-bold rounded-full mt-3 px-3">
                    Valor Total dos Produtos A Prazo</p>
                <p class="font-bold text-4xl pt-3">{{ orcamento.entrada }}% a Prazo</p>
            </div>

            <div
                class=" mt-8 bg-gradient-to-r flex flex-col from-[#F3430D] to-[#FF9400] items-center justify-center font-semibold py-6 text-white">
                <p class="text-3xl font-bold">O que vem junto com <br> a laje?
                </p>
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M27 49.5C39.4264 49.5 49.5 39.4264 49.5 27C49.5 14.5736 39.4264 4.5 27 4.5C14.5736 4.5 4.5 14.5736 4.5 27C4.5 39.4264 14.5736 49.5 27 49.5ZM34.9432 22.4318C35.6023 23.0908 35.6023 24.1592 34.9432 24.8182L28.1932 31.5682C27.8768 31.8847 27.4476 32.0625 27 32.0625C26.5524 32.0625 26.1232 31.8847 25.8068 31.5682L19.0568 24.8182C18.3977 24.1592 18.3977 23.0908 19.0568 22.4318C19.7158 21.7727 20.7842 21.7727 21.4432 22.4318L27 27.9885L32.5568 22.4318C33.2158 21.7727 34.2842 21.7727 34.9432 22.4318Z"
                        fill="white" />
                </svg>
            </div>

            <div>
                <div class="flex gap-1 items-center pt-6">
                    <img class="w-1/2" src="/image1.png" alt="Imagem de garantia">
                    <p class="text-3xl"><span class="font-bold text-md">5 anos</span> <br> de garantia</p>
                </div>
                <div class="flex gap-1 justify-end items-center">
                    <p class="text-3xl"><span class="font-bold text-md">Projeto</span> de <br> <span
                            class="font-bold text-md">Montagem</span>
                        e <br> Assistência <span class="font-bold text-md">Técnica</span></p>
                    <img class="w-1/2" src="/image2.png" alt="Imagem de assistência técnica">
                </div>
                <div class="flex gap-1 items-center">
                    <img class="w-1/2" src="/image3.png" alt="Imagem de assistência técnica">
                    <p class="text-3xl"><span class="font-bold text-md">ART</span> de <br> fabricação do <br><span
                            class="font-bold text-md">Engenheiro</span></p>
                </div>
            </div>

            <div class="mt-10">
                <h2 class="text-xl py-4 font-bold">Especificações Técnicas</h2>
                <div v-for="(item, index) in vaos" :key="index">
                    <ul class="space-y-3 text-[#1B5870]">
                        <li>ID: <span class="font-bold">
                                {{ item.nome }}
                            </span>
                        </li>
                        <li>Treliça: <span class="font-bold">
                                <!-- TR12 -->
                                {{ item.viga.tipo_trelica.nome }}
                            </span>
                        </li>
                        <li>
                            Aréa Total: <span class="font-bold">{{ item.area_m?.toFixed(2) }} m²</span>
                        </li>
                        <li>
                            Sobrecarga: <span class="font-bold">
                                {{ item.sobrecarga.sobrecarga_max }}kg
                            </span>
                        </li>
                        <li>Enchimento: <span class="font-bold">
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

                                <!-- Isopor I EPS- 33x07x100cm e isopor gabarito T2 alta
                                qualidade -->
                            </span>
                        </li>
                    </ul>

                    <hr class="my-5">
                </div>
                <p class="font-bold text-[16px] text-red-500 py-8 my-8 border-b border-t">As Ferragens de negativos
                    e
                    distribuição por conta do Cliente.</p>


            </div>

            <div class="space-y-3">
                <h2 class="text-[16px] font-bold text-[#334155]">Contato</h2>
                <div class="rounded-xl flex gap-2 items-center py-3 w-72 pl-6 border">
                    <icon-avatar class="rounded-full" />
                    <div>
                        <p class="text-[#FF9400] font-semibold">Carlos José</p>
                        <p class="text-xs">Engenheiro</p>
                    </div>
                </div>
                <p class="text-[#1B5870]">Bairro: <span class="font-bold">Alphaville</span></p>
                <p class="text-[#1B5870]">Cidade: <span class="font-bold">Nova Lima</span></p>
            </div>

            <h2 class="text-[48px] mt-10 leading-[1.4] font-bold">Ficou alguma <span
                    class="text-[#FF9400]">dúvida</span> <br> do seu
                orçamento, <br> <span class="text-[#FF9400]">fale com a gente!</span></h2>

            <div class="flex items-start bg-white space-x-4 my-10 border-t-8 border-[#F78817] rounded-md p-4">
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#F78817" />
                        <path
                            d="M12.3203 6.125L12.2188 14.2891H10.9141L10.8047 6.125H12.3203ZM10.7578 16.7734C10.7578 16.5391 10.8281 16.3411 10.9688 16.1797C11.1146 16.0182 11.3281 15.9375 11.6094 15.9375C11.8854 15.9375 12.0964 16.0182 12.2422 16.1797C12.3932 16.3411 12.4688 16.5391 12.4688 16.7734C12.4688 16.9974 12.3932 17.1901 12.2422 17.3516C12.0964 17.513 11.8854 17.5938 11.6094 17.5938C11.3281 17.5938 11.1146 17.513 10.9688 17.3516C10.8281 17.1901 10.7578 16.9974 10.7578 16.7734Z"
                            fill="white" />
                    </svg>
                </div>
                <div class="flex flex-col">
                    <b>Atenção!</b>
                    <p>Para maiores informações sobre sua proposta <a class="font-bold" href="#">clique aqui</a></p>
                </div>
            </div>

            <footer class="mt-5">
                <div class="text-center mt-5">
                    <p class="text-[#1B5870] text-sm">Copyrigth© 2024 - todos os direitos reservados.</p>
                </div>
            </footer>

        </div>

    </div>
</template>
