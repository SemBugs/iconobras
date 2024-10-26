<script lang="ts" setup>
import type { Empresa, Fornecedor } from '@/types/types';

const { getItemById, updateItem } = useDirectusItems();
import { ElNotification } from 'element-plus';

const empresa = ref<Empresa>({} as Empresa);
const form = ref<Partial<Fornecedor>>({});

const router = useRouter();
const route = useRoute();

const salvar = async () => {
    form.value.empresa = empresa.value.id;
    await updateItem<any>({
        collection: "cliente",
        id: route.params.id,
        item: form.value,
    });
    ElNotification({
        title: 'Sucesso!',
        message: 'Cliente atualizado com sucesso!',
        type: 'success',
    });
    router.push('/clientes');
};

onBeforeMount(async () => {
    form.value = await getItemById({ collection: 'cliente', id: route.params.id });
});
</script>

<template>
    <div class="mx-auto max-w-5xl">
        <div class="mx-auto flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#1B5870]">Editar cliente</h2>
        </div>

        <div class="mt-6">
            <div class="grid flex-1 grid-cols-1 gap-5 pt-3 sm:grid-cols-8">
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="cpf-cnpj"> CPF ou CNPJ </label>
                    <input v-model="form.documento" id="cpf-cnpj" type="text" class="form-input" />
                </div>
                <div class="col-span-4">
                    <label class="text-xs placeholder:text-xs" for="Nome"> Nome </label>
                    <input v-model="form.nome" id="Nome" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="telefone"> Telefone </label>
                    <input v-model="form.telefone" id="telefone" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="email">E-mail</label>
                    <input v-model="form.email" id="email" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="indicador-da-ie">Indicador da IE</label>
                    <el-select v-model="form.indicador_ie" placeholder="Select" size="large" id="indicador-da-ie"
                        style="width: 240px">
                        <el-option
                            v-for="item in ['Não contribuinte', 'Contribuinte de ICMS', 'Contribuinte Isento de Inscrição']"
                            :key="item" :label="item" :value="item" />
                    </el-select>
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="inscrição-estadual">Inscrição Estadual</label>
                    <input v-model="form.ie" id="inscrição-estadual" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="site">Site</label>
                    <input v-model="form.site" id="site" type="text" class="form-input" />
                </div>
            </div>
        </div>

        <div class="mt-10">
            <h1 class="border-b border-dashed border-black pb-2 font-bold">Endereço</h1>
            <div class="grid flex-1 grid-cols-1 gap-5 pt-3 sm:grid-cols-8">
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="cep"> CEP </label>
                    <input v-model="form.cep" id="cep" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="estado"> Estado </label>
                    <input v-model="form.estado" id="estado" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="cidade"> Cidade </label>
                    <input v-model="form.cidade" id="cidade" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="bairro">Bairro</label>
                    <input v-model="form.bairro" id="bairro" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="endereco">Endereço</label>
                    <input v-model="form.endereco" id="endereco" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="numero">Número</label>
                    <input id="numero" v-model="form.numero" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="complemento">Complemento</label>
                    <input id="complemento" v-model="form.complemento" type="text" class="form-input" />
                </div>
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="referencia">Referência</label>
                    <input id="referencia" v-model="form.referencia" type="text" class="form-input" />
                </div>
            </div>
        </div>

        <div class="mt-5 flex justify-end space-x-4">
            <NuxtLink to="/clientes" class="btn btn-dark"> Cancelar </NuxtLink>
            <button @click="salvar()" class="btn btn-primary">Salvar</button>
        </div>
    </div>
</template>
