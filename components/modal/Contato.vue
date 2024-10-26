<template>
    <div>
        <el-dialog v-model="active" style="max-width: 1000px">
            <div class="con-form">
                <div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="input-money">
                            <label>{{ form.tipo != 'm' ? 'CPF ou CNPJ' : 'CPF' }}</label>
                            <div class="el-input-content">
                                <el-input v-if="form.tipo != 'm'" v-model="form.documento" class="el-input"
                                    @keydown="getCNPJ()" v-mask="['###.###.###-##', '##.###.###/####-##']" />

                                <el-input v-if="form.tipo == 'm'" v-model="form.documento" class="el-input"
                                    @change="getCNPJ()" v-mask="'###.###.###-##'" />
                            </div>
                        </div>

                        <div
                            :class="{ 'md:col-span-2': form.documento && form.documento.length <= 14 && form.tipo != 'm' }">
                            <label>Nome</label>
                            <el-input v-model="form.nome" label="Nome" />
                        </div>

                        <div v-if="form.documento && form.documento.length > 14">
                            <label>Razão Social</label>
                            <el-input v-model="form.razao" label="Razão Social" />
                        </div>

                        <div class="input-money">
                            <label>Telefone</label>
                            <div class="el-input-content">
                                <el-input v-model="form.telefone" class="el-input"
                                    v-mask="['(##) ####-####', '(##) #####-####']" />
                            </div>
                        </div>

                        <div>
                            <label>E-mail</label>
                            <el-input v-model="form.email" label="E-mail" />
                        </div>

                        <div class="input-select" v-if="form.tipo != 'm'">
                            <label>Indicador da IE</label>
                            <el-select v-model="form.indicador_inscricao_estadual" filterable
                                placeholder="Indicador da IE">
                                <el-option v-for="(p, i) in indicadores" :key="i" :label="p.label"
                                    :value="p.value"></el-option>
                            </el-select>
                        </div>

                        <div v-if="form.tipo != 'm'">
                            <label>Inscrição Estadual</label>
                            <el-input v-model="form.inscricao_estadual" label="Inscrição Estadual" />
                        </div>

                        <div v-if="form.tipo != 'm'">
                            <label>Site</label>
                            <el-input v-model="form.site" label="Site" />
                        </div>
                    </div>

                    <div class="pt-5">
                        <h2 class="sub-header">Endereço</h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-4 pt-3 gap-4">
                        <div class="input-money">
                            <label>Cep</label>
                            <div class="el-input-content">
                                <el-input v-model="form.cep" class="el-input" @change="getCep()" v-mask="'#####-###'" />
                            </div>
                        </div>

                        <div class="input-select">
                            <label>Estado</label>

                            <client-only>
                                <el-select v-model="form.estado" class="w-full" size="large" filterable
                                    @change="getCidades(form.estado)">
                                    <el-option v-for="item in estados" :key="item.id" :label="item.nome"
                                        :value="item.sigla" />
                                </el-select>
                            </client-only>
                        </div>

                        <div class="input-select">
                            <label>Cidade</label>
                            <client-only>
                                <el-select v-model="form.cidade" class="w-full" size="large" filterable>
                                    <el-option v-for="item in cidades" :key="item.id" :label="item.nome"
                                        :value="item.nome" />
                                </el-select>
                            </client-only>
                        </div>

                        <div>
                            <label>Bairro</label>
                            <el-input v-model="form.bairro" label="Bairro" />
                        </div>

                        <div>
                            <label>Endreço</label>
                            <el-input v-model="form.endereco" label="Endreço" />
                        </div>

                        <div>
                            <label>Número</label>
                            <el-input v-model="form.numero" label="Número" />
                        </div>

                        <div>
                            <label>Complemento</label>
                            <el-input v-model="form.complemento" label="Complemento" />
                        </div>

                        <div>
                            <label>Referência</label>
                            <el-input v-model="form.referencia" label="Referência" />
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog flex">
                    <el-button type="success" size="large" @click="salvar()"> Salvar </el-button>
                    <el-button size="large" @click="active = false" plain> Cancelar </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
const props = defineProps(['contato', 'ativo', 'nome']);
const emit = defineEmits(['modal-status', 'contato-dados']);
const { getItemById, createItems, updateItem } = useDirectusItems();
import { getRoleBySlug } from '~/utils/directus.js';
const { inviteUser } = useDirectusAuth();
import { useDirectusFlow } from '@/stores/directus-flow';

const flow = useDirectusFlow();
const active = ref(false);
const cliente = ref({});
const form = ref({
    nome: '',
    tipo: 'c',
    uf: '',
    codigo_municipio: '',
    nome_municipio: '',
    documento: '',
    indicador_inscricao_estadual: '9',
});
const cidades = ref([]);
const estados = ref([]);
const indicadores = ref([
    { label: 'Contribuinte de ICMS', value: '1' },
    { label: 'Contribuinte Isento de Inscrição', value: '2' },
    { label: 'Não contribuinte', value: '9' },
]);

watch(() => props.ativo, (value) => {
    active.value = value;
});

watch(() => props.nome, (value) => {
    form.value.nome = isNaN(value) ? value : '';
});

watch(() => props.contato, (value) => {
    let nome = isNaN(value.nome) ? value.nome : '';
    let documento;

    if (!value.documento) {
        documento = !isNaN(value.nome) ? value.nome : '';
        form.value.documento = documento;
        getCNPJ();
    } else {
        documento = value.documento;
    }

    if (value.id || value.nome || value.documento) {
        form.value = { ...value, nome, documento };
        getCidades(form.value.estado);
    } else {
        form.value = {
            nome: nome,
            tipo: value.tipo,
            uf: '',
            codigo_municipio: '',
            nome_municipio: '',
            documento: documento,
            indicador_inscricao_estadual: '9',
        };
    }
}, { deep: true });

watch(active, (value) => {
    emit('modal-status', value);
});

const getCep = (cep = false) => {
    if (form.value.cep.length >= 9 || cep) {
        axios.get(`https://brasilapi.com.br/api/cep/v1/${form.value.cep.replace(/[^0-9]/g, '')}`).then((req) => {
            form.value.estado = req.data.state;
            form.value.cidade = req.data.city;
        })
    }
};

const getCNPJ = () => {
    if (form.value.documento && form.value.documento.replace(/[^0-9]/g, '').length >= 14) {
        // Implementação da função
    }
};

const getEstados = () => {
    axios.get('https://brasilapi.com.br/api/ibge/uf/v1').then((req) => {
        estados.value = req.data;
    })
}

const getCidades = (uf) => {
    axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`).then((req) => {
        cidades.value = req.data;
    })
}

const salvar = async () => {
    if (form.value.email) {
        const flowData = await flow.get('52d36539-9ed6-4c69-9b0c-9583eb3af516', { email: form.value.email });

        if (!flowData.id) {
            await inviteUser({ email: form.value.email, role: getRoleBySlug('cliente') });
        }else{
            form.value.cliente = flowData.id;
        }
    }

    if (form.value.id) {
        updateItem({ collection: 'cliente', id: form.value.id, item: form.value }).then((req) => {
            emit('contato-dados', form.value);
            active.value = false;
        })
            .catch((req) => { });
    } else {
        createItems({ collection: 'cliente', items: form.value }).then((req) => {
            emit('contato-dados', req);
            active.value = false;
        })
            .catch((req) => { });
    }
};

onMounted(() => {
    getEstados();
})
</script>

<style scoped>
.ver-cliente {
    padding-left: 10px;
    display: block;
    padding-top: 3px;
}
</style>