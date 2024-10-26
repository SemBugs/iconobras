<script lang="ts" setup>
import { ElNotification } from 'element-plus';
const { getItems, getItemById, createItems, updateItem, deleteItems } = useDirectusItems();
const props = defineProps(['data', 'vaos'])
const { getDistance } = mapBoxDistancia()
import { mapBoxDistancia } from '@/stores/distence';
const $emit = defineEmits(['change'])
const empresa = ref<Empresa>({} as Empresa);
const form = ref({});
const startAddress = ref("");
const endAddress = ref("");
const router = useRouter();
const modalAcoes = ref(false);

const finalizarOrcamento = async () => {
    form.value = await updateItem({ collection: 'orcamento', id: form.value.id, item: form.value });

    ElNotification({
        title: 'Sucesso!',
        message: 'Orçamento cadastrado com sucesso!',
        type: 'success',
    });

    modalAcoes.value = true;
}

const arrayVigas: any = ref([]);

const calcularQuantidade = () => {
    form.value.quantidade_frete = 0;
    props.vaos.forEach((item: any) => {
        // Procura se a viga já existe no array de vigas
        const vigaExistenteIndex = arrayVigas.value.findIndex((viga: any) => viga.id === item?.enchimento);

        if (vigaExistenteIndex !== -1) {
            // Se a viga já existe, apenas adiciona a área da viga à quantidade_m
            arrayVigas.value[vigaExistenteIndex].quantidade_m += item.area_m;
        } else {
            // Se a viga não existe, cria um novo objeto para ela e adiciona ao array
            arrayVigas.value.push({
                id: item?.enchimento,
                quantidade_m: item.area_m,
                tipo_laje: item?.viga?.tipo_laje,
                custo_por_km: item?.viga?.custo_por_km,
                m_maxima_de_transporte: item?.viga?.m_maxima_de_transporte
            });
        }
    });

    // Calcula a quantidade de frete para cada tipo de laje
    arrayVigas.value.forEach((item: any) => {
        let qtd_frete = Math.ceil(item.quantidade_m / item.m_maxima_de_transporte);
        item.qtd = qtd_frete;
        form.value.quantidade_frete += qtd_frete;
    });
}

const distancia = () => {
    startAddress.value = `${empresa.value.endereco} Nº${empresa.value.numero}, ${empresa.value.cidade} - ${empresa.value.estado}`;
    endAddress.value = `${form.value.endereco_completo}, ${form.value.cidade} - ${form.value.estado}`;

    getDistance(startAddress.value, endAddress.value).then((data) => {
        form.value.distancia = (data.distances[0][1] / 1000).toFixed(2);
    })
}

const setStep = () => {
    $emit('change', 5)
}

const peso = computed(() => {
    const vigasML = props.vaos.reduce((resultado, item) => resultado + item.met_linear_de_vigas, 0);
    const pesoML = props.vaos.reduce((resultado, item) => resultado + item.peso_total, 0);

    let total: any = vigasML * pesoML;

    if (total < 1000) {
        total = `${total.toFixed(2)}KG`
    } else {
        total = `${(total / 1000).toFixed(2)}TON`
    }

    return total;
});

const irOrcamento = () => {
    router.push('/orcamentos/list')
}

const linkOrcamento = computed(() => {
    return `https://app.iconobras.com/orcamentos/${form.value.chave}`;
})

onMounted(() => {
    empresa.value = JSON.parse(localStorage.getItem('empresa') as string);
    form.value = props.data;
    distancia();
    calcularQuantidade();
})

</script>

<template>
    <div>
        <div class="mx-auto mb-5 flex max-w-7xl flex-col items-center justify-center border-b pb-4">
            <icon-user-check-fill />

            <h2 class="text-xl font-bold">Informações do frete</h2>
        </div>

        <div class="pb-5">
            <b>Local:</b> {{ startAddress }}<br>
            <b>Destino:</b> {{ endAddress }}<br>
            <b>Distância:</b> {{ form.distancia }} KM<br>
            <b>Peso total:</b> {{ peso }}<br>
        </div>

        <h2 class="text-lg font-bold pt-5 text-[#f39305]  uppercase">Condição de entrega</h2>

        <div class="grid grid-cols-1 gap-6 pt-5 pb-7">
            <template v-for="(item, index) in arrayVigas" :key="index">
                <div>
                    <span v-if="item.id == 1">
                        Treliça / Eps
                    </span>
                    <span v-if="item.id == 2">
                        Treliça / Cer
                    </span>
                    <span v-if="item.id == 3">
                        Painel Maciço
                    </span>
                    <span v-if="item.id == 4">
                        Painel Aliviado
                    </span>
                    : {{ item.quantidade_m.toFixed(2) }} m²
                </div>

            </template>
        </div>

        <div class="grid grid-cols-2 pt-7 px-2 gap-6">
            <div>
                <label>QUANTIDADE</label>
                <el-input-number :controls="false" v-model="form.quantidade_frete" :min="1" :max="10"
                    class=" bg-[#E0EAFE]" :step="0.1" />
            </div>

            <div>
                <label>
                    VALOR FRETE UNITÁRIO
                </label>

                <input-moeda v-model="form.valor_frete" class="form-input"></input-moeda>
            </div>
        </div>

        <h3 class="text-[#f39305] font-bold text-lg pt-7">
            PRAZO DEFINITIVO DE ENTREGA CLIENTE
        </h3>

        <div class="grid grid-cols-2 gap-6">
            <div>
                <div class="grid grid-cols-2 pt-7 px-2 gap-6">
                    <div>
                        <label>PRAZO INICIAL</label>
                        <el-date-picker v-model="form.prazo_inicial" type="date" format="DD/MM/YYYY"
                            v-mask="'##/##/####'" placeholder="__/___/___"></el-date-picker>
                    </div>

                    <div>
                        <label>
                            PRAZO FINAL
                        </label>

                        <el-date-picker v-model="form.prazo_final" type="date" format="DD/MM/YYYY" v-mask="'##/##/####'"
                            placeholder="__/___/___"></el-date-picker>
                    </div>
                </div>

                <div class="grid grid-cols-2 pt-7 px-2 gap-6">
                    <div class="col-span-2">
                        <label>OBS DE ENTREGA:</label>
                        <el-input v-model="form.obs_entrega" :rows="5" type="textarea" placeholder="" />
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex justify-between border-t-2 pt-4 space-x-4">
            <button @click="setStep()" class="btn btn-outline-primary btn-lg">
                Voltar
            </button>

            <button @click="finalizarOrcamento()" class="btn btn-primary btn-lg">
                + Finalizar Proposta
            </button>
        </div>


        <!-- Modal ações -->
        <client-only>
            <el-dialog title="Confirmação" v-model="modalAcoes"
                class="panel w-full max-w-2xl max-w-[530px] overflow-hidden !rounded-2xl border-0 p-0 p-6 text-black dark:text-white-dark">
                <div class="mx-auto mb-5 flex items-center justify-between">
                    <p>Oque você gostaria de fazer?</p>
                </div>

                <template #footer>
                    <div class="my-2 flex">
                        <a :href="`https://wa.me/5587999999999?text=${linkOrcamento}`" target="_blank"
                            class="rounded-full bg-gray-600 px-4 py-2 text-sm font-bold text-[white]">
                            Enviar no Whatsapp
                        </a>

                        <a :href="`mailto:email@email.com?subject=assunto&body=${linkOrcamento}`" target="_blank"
                            class="ml-4 rounded-full bg-gray-600 px-4 py-2 text-sm font-bold text-[white]">
                            Enviar por e-mail
                        </a>

                        <button @click="irOrcamento()"
                            class="ml-4 rounded-full bg-[#FF9400] px-4 py-2 text-sm font-bold text-[white]">
                            Salvar Orçamento
                        </button>
                    </div>
                </template>
            </el-dialog>
        </client-only>
    </div>
</template>