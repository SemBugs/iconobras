<script lang="ts" setup>
import estados from '~/data/estados.json';
import type { VeiculoReboque } from '~/types/types';
import { ElNotification } from 'element-plus';

const { createItems, getItemById, updateItem } = useDirectusItems();
const router = useRouter();
const route = useRoute();
const form = ref<VeiculoReboque>({} as VeiculoReboque);

const submit = async () => {
    try {
        if (route.params.id === 'create') {
            await createItems({
                collection: 'veiculo_reboque',
                items: form.value
            });
        } else {
            await updateItem({
                collection: 'veiculo_reboque',
                item: form.value,
                id: form.value.id.toString()
            });
        }

        ElNotification({
            title: 'Sucesso!',
            message: 'Veículo salvo com sucesso',
            type: 'success',
        });

        await router.push('/transporte/veiculos');
    } catch (error) {
        ElNotification({
            title: 'Erro ao salvar veiculo!',
            message: 'Verifique os campos e tente novamente',
            type: 'error',
        });
    }
};

onBeforeMount(async () => {
    if (route.params.id !== 'create') {
        form.value = await getItemById({ collection: 'veiculo_reboque', id: route.params.id });
    }
});
</script>

<template>
    <div class="max-w-5xl mx-auto">
        <div class="mb-5 items-center max-w-7xl">
            <h2 class="text-[#1B5870] text-2xl font-bold">
                Novo veículo
            </h2>
        </div>
        <div class="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-6">

            <div class="col-span-4">
                <label class="text-xs placeholder:text-xs" for="placa">
                    Placa
                </label>
                <input maxlength="7" v-model="form.placa" id="placa" type="text" class="form-input" />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="estado">
                    Estado
                </label>
                <el-select v-model="form.estado" placeholder="Select" size="large" id="estado">
                    <el-option v-for="estado in estados" :key="estado.sigla" :label="estado.nome"
                        :value="estado.nome" />
                </el-select>

            </div>
            <div class="col-span-4">
                <label class="text-xs placeholder:text-xs" for="renavam">Renavam</label>
                <input maxlength="11" v-model="form.renavam" id="renavam" type="text" class="form-input" />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="tara">Tara(Kg)</label>
                <input v-model="form.tara" id="tara" type="text" class="form-input" />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="tipo_de_rodado">
                    Tipo de Rodado
                </label>
                <el-select v-model="form.tipo_de_rodado" placeholder="Select" id="tipo_de_rodado" size="large">
                    <el-option v-for="item in ['Truck', 'Troco', 'Cavalo Mecânico', 'Van', 'Utilitário', 'Outros']"
                        :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="tipo_de_carroceria">
                    Tipo de Carroceria
                </label>
                <el-select v-model="form.tipo_de_carroceria" placeholder="Select" id="tipo_de_carroceria" size="large">
                    <el-option
                        v-for="item in ['Não Aplicável', 'Aberta', 'Fechada/Baú', 'Granelera', 'Porta Container', 'Sider']"
                        :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="tipo_veiculo">
                    Tipo de Veículo
                </label>
                <el-select v-model="form.tipo_de_veiculo" placeholder="Select" id="tipo_veiculo" size="large">
                    <el-option v-for="item in ['Tração', 'Reboque']" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="capacidade_kg">Capacidade (Kg)</label>
                <input v-model="form.capacidade_kg" id="capacidade_kg" type="text" class="form-input" />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="capacidade_m3">Capacidade (M3)</label>
                <input v-model="form.capacidade_m3" id="capacidade_m3" type="text" class="form-input" />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="numero">Tipo Propriedade</label>
                <el-select v-model="form.tipo_propriedade" placeholder="Select" id="tipo_propriedade" size="large">
                    <el-option v-for="item in ['Frota (Próprio)', 'Terceiro']" :key="item" :label="item"
                        :value="item" />
                </el-select>
            </div>
            <div v-if="form.tipo_propriedade === 'Terceiro'" class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="documento">CPF ou CNPJ</label>
                <input v-maska="['###.###.###-##', '##.###.###/####-##']" v-model="form.documento" id="documento"
                    type="text" class="form-input" />
            </div>
            <div v-if="form.tipo_propriedade === 'Terceiro'" class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="rntc">RNTRC</label>
                <input v-model="form.rntc" id="rntc" type="text" class="form-input" />
            </div>
            <div v-if="form.tipo_propriedade === 'Terceiro'" class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="razao_social">Razão Social / Nome</label>
                <input v-model="form.razao_social" id="razao_social" type="text" class="form-input" />
            </div>
            <div v-if="form.tipo_propriedade === 'Terceiro'" class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="inscricao_estadual">Inscrição estadual</label>
                <input v-model="form.inscricao_estadual" id="inscricao_estadual" type="text" class="form-input" />
            </div>
            <div v-if="form.tipo_propriedade === 'Terceiro'" class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="estado_proprietario">Estado</label>
                <el-select v-model="form.estado_proprietario" placeholder="Select" id="estado_proprietario"
                    size="large">
                    <el-option v-for="estado in estados" :key="estado.sigla" :label="estado.nome"
                        :value="estado.nome" />
                </el-select>
            </div>
            <div v-if="form.tipo_propriedade === 'Terceiro'" class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="tipo_de_proprietario">Tipo de Proprietário</label>
                <el-select v-model="form.tipo_de_proprietario" placeholder="Select" id="tipo_de_proprietario"
                    size="large">
                    <el-option v-for="estado in ['Tec Agregado', 'Tac Independente', 'Outros']" :key="estado"
                        :label="estado" :value="estado" />
                </el-select>
            </div>
        </div>

        <div class="flex justify-end space-x-4 mt-5">

            <NuxtLink to="/transporte/veiculos" class="btn btn-dark">
                Cancelar
            </NuxtLink>

            <button @click="submit" class="btn btn-primary">
                Salvar
            </button>
        </div>
    </div>
</template>
