<script lang="ts" setup>
import type { Empresa, Motorista } from '@/types/types';
import { useAppStore } from '@/stores/index';
const { createItems, getItemById, updateItem } = useDirectusItems();
import { ElNotification } from 'element-plus';

const form = ref<Partial<Motorista>>({});
const store = useAppStore();
const router = useRouter();
const route = useRoute();

const salvar = async () => {
    if (route.params.id === 'create') {
        form.value.tipo = 'm';
        form.value.empresa = store.empresa.id;
        await createItems({ collection: 'motorista', items: form.value });
        ElNotification({
            title: 'Sucesso!',
            message: 'Motorista cadastrado com sucesso!',
            type: 'success',
        });
    } else {
        await updateItem<any>({
            collection: "motorista",
            id: route.params.id,
            item: form.value,
        });
        ElNotification({
            title: 'Sucesso!',
            message: 'Motorista atualizado com sucesso!',
            type: 'success',
        });
    }
    router.push('/transporte/motoristas');
};

onBeforeMount(async () => {
    if (route.params.id !== 'create') {
        form.value = await getItemById({ collection: 'motorista', id: route.params.id });
    }
});
</script>

<template>
    <div class="mx-auto max-w-5xl">
        <div class="mx-auto flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#1B5870]">
                {{ route.params.id === 'create' ? 'Novo' : 'Editar' }} motorista
            </h2>
        </div>

        <div class="mt-6">
            <div class="grid flex-1 grid-cols-1 gap-5 pt-3 sm:grid-cols-8">
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="cpf-cnpj"> CPF </label>
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
                    <input id="bairro" v-model="form.bairro" type="text" class="form-input" />
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
            <NuxtLink to="/transporte/motoristas" class="btn btn-dark"> Cancelar </NuxtLink>
            <button @click="salvar()" class="btn btn-primary">Salvar</button>
        </div>
    </div>
</template>
