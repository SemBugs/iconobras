<template>
    <div>
        <div>
            <div class="input-select">
                <el-autocomplete v-model="nome" class="w-full" clearable :fetch-suggestions="getContato" placeholder=""
                    @select="clienteSelecionado">
                    <template #default="{ item }">
                        <div class="value">{{ $filters.documento(item.documento) }} - {{ item.nome }}</div>
                    </template>
                </el-autocomplete>

                <div class="mt-3">
                    <a v-if="nome && !form.id" href="javascript:;" @click="active = true" class="ver-cliente">
                        + cadastrar {{ label }}
                    </a>
                    <a v-if="nome && form.id" href="javascript:;" @click="active = true" class="ver-cliente">
                        ver {{ label }}
                    </a>
                </div>
            </div>

            <modal-contato :ativo="active" :nome="nome" @contato-dados="mudarContato" @modal-status="modalContato"
                :contato="form"></modal-contato>
        </div>
        <div class="clear-both"></div>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
    props: ['tipo', 'label', 'labelField', 'data', 'index'],
    setup(props, { emit }) {
        const active = ref(false);
        const nome = ref('');
        const form = ref({});
        const cliente = ref({});
        const { getItems } = useDirectusItems();

        watch(nome, (value) => {
            if (value === '') {
                form.value = { index: props.index };
                emit('selecionado', form.value);
            } else {
                form.value.nome = value;
                emit('form', form.value);
                emit('selecionado', form.value);
            }
        });

        watch(() => props.data, (value) => {
            if (value?.nome && !form.value?.nome) {
                form.value = value;
                nome.value = value.nome;

                getContato(value.nome, null);
            }
            form.value.tipo = props.tipo;
        });

        onMounted(() => {
            if (props.data) {
                nome.value = props.data.nome;
                form.value = props.data;
            }
        });

        const getContato = (search, cb) => {
            let params = {};

            if (search) {
                params.search = search;
            }

            getItems({ collection: 'cliente', params }).then((req) => {
                if (cb) {
                    cb(req);
                } else {
                    clienteSelecionado(req[0]);
                }
            });
        };

        const clienteSelecionado = (cliente) => {
            if (cliente.id) {
                cliente.index = props.index;
                emit('selecionado', cliente);
                form.value = { ...cliente };
                nome.value = cliente.nome || cliente.documento;
            }
        };

        const modalContato = (status) => {
            active.value = status;
        };

        const mudarContato = (contato) => {
            if (contato) {
                form.value = contato;
                nome.value = contato.nome || contato.documento;
                emit('selecionado', form.value);
            }
        };

        return {
            active,
            nome,
            form,
            cliente,
            getContato,
            clienteSelecionado,
            modalContato,
            mudarContato,
        };
    },
};
</script>

<style scoped>
.ver-cliente {
    padding-left: 10px;
    display: block;
    padding-top: 3px;
}
</style>