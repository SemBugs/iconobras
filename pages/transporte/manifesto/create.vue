<template>
    <div class="max-w-5xl mx-auto">
        <div class="mb-5 items-center max-w-7xl">
            <h2 class="text-[#1B5870] text-2xl font-bold">
                Dados do MDF-e
            </h2>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-8 bg-white p-4 rounded-lg shadow">
            <div class="col-span-4">
                <label class="text-xs placeholder:text-xs" for="tipo-emitente">
                    Tipo Emitente
                </label>
                <el-select
                    id="tipo-emitente"
                    placeholder="Select"
                    size="large"
                    v-model="form.tipo_emitente"
                >
                    <el-option
                        v-for="item in ['Não Prestador de Serviço de Transporte', 'Prestador de Serviço de Transporte']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="modal">
                    Modal
                </label>
                <el-select
                    id="modal"
                    placeholder="Select"
                    size="large"
                >
                    <el-option
                        v-for="item in ['Rodoviário', 'Aéreo', 'Aquaviário']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="rntrc">RNTRC</label>
                <input id="rntrc" type="text" class="form-input" />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="tipo-de-transportador">Tipo de transportador</label>
                <el-select
                    id="tipo-de-transportador"
                    placeholder="Select"
                    size="large"
                >
                    <el-option
                        v-for="item in ['1 - ETC', '2 - TAC', '3 - CTC']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="data-saida">
                    Data Saida
                </label>
                <el-date-picker
                    id="data-saida"
                    type="date"
                    placeholder="Pick a day"
                />
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="uf-inicial">
                    UF Inicial
                </label>
                <el-select
                    id="uf-inicial"
                    placeholder="Select"
                    size="large"
                >
                    <el-option
                        v-for="item in estados"
                        :key="item.sigla"
                        :label="item.nome"
                        :value="item.nome"
                    />
                </el-select>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="uf-final">
                    UF Final
                </label>
                <el-select
                    id="uf-final"
                    placeholder="Select"
                    size="large"
                >
                    <el-option
                        v-for="item in estados"
                        :key="item.sigla"
                        :label="item.nome"
                        :value="item.nome"
                    />
                </el-select>
            </div>
            <div class="col-span-4">
                <label class="text-xs placeholder:text-xs" for="informação-adicional-fisico">Informação Adicional
                    Fisico</label>
                <input id="informação-adicional-fisico" type="text" class="form-input" />
            </div>
            <div class="col-span-4">
                <label class="text-xs placeholder:text-xs" for="numero">Informação complementar</label>
                <input id="endereco" type="text" class="form-input" />
            </div>
        </div>


        <div class="mt-10 bg-white rounded-lg shadow p-4">
            <h1 class="font-bold pb-2 border-b border-dashed border-black">Produto Predominante</h1>
            <label class="text-xs placeholder:text-xs" for="produto-predominante">
                Produto Predominante
            </label>
            <client-only>
                <el-select
                    id="produto-predominante"
                    placeholder="Select"
                    size="large"
                    class="w-full"
                >
                    <el-option
                        v-for="item in ['Sem Produto Predominante', 'Com Produto Predominante']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </client-only>

            <div class="mt-10">
                <h1 class="font-bold pb-2 border-b border-dashed border-black">Informações de carregamento</h1>
                <div class="grid flex-1 grid-cols-1 pt-3 sm:grid-cols-2">
                    <div class="col-span-2">
                        <label class="text-xs placeholder:text-xs" for="nome-do-município">
                            Nome do município de carregamento
                        </label>
                        <div class="space-y-4">
                            <div v-for="(carregamento, index) in form.carregamentos" :key="carregamento"
                                 class="flex items-center justify-center gap-2">
                                <client-only>
                                    <el-select
                                        v-model="form.carregamentos[index]"
                                        id="nome-do-município"
                                        placeholder="Select"
                                        size="large"
                                    >
                                        <el-option
                                            v-for="item in ['options']"
                                            :key="item"
                                            :label="item"
                                            :value="item"
                                        />
                                    </el-select>
                                </client-only>
                                <icon-recycle-bin-fill @click="removeField('carregamentos', index)"
                                                       class="cursor-pointer" />
                            </div>
                        </div>
                        <button @click="addField('carregamentos')" class="mt-2">+ Adicionar outra cidade</button>
                    </div>
                </div>
            </div>

            <div class="mt-10">
                <h1 class="font-bold pb-2 border-b border-dashed border-black">Informações de percurso</h1>
                <div class="grid flex-1 grid-cols-1 pt-3 sm:grid-cols-2">
                    <div class="col-span-2">
                        <label class="text-xs placeholder:text-xs" for="uf-de-percurso">
                            UF de percurso
                        </label>
                        <div class="space-y-4">
                            <div v-for="(percurso, index) in form.percusos" :key="percurso"
                                 class="flex items-center justify-center gap-2">
                                <client-only>
                                    <el-select
                                        v-model="form.percusos[index]"
                                        id="uf-de-percurso"
                                        placeholder="Select"
                                        size="large"
                                    >
                                        <el-option
                                            v-for="item in estados"
                                            :key="item.sigla"
                                            :label="item.nome"
                                            :value="item.nome"
                                        />
                                    </el-select>
                                </client-only>
                                <icon-recycle-bin-fill @click="removeField('percusos', index)"
                                                       class="cursor-pointer" />
                            </div>
                        </div>
                        <button @click="addField('percusos')" class="mt-2">+ Adicionar outro estado</button>
                    </div>
                </div>
            </div>


            <div class="mt-10">
                <h1 class="font-bold pb-2 border-b border-dashed border-black">Informações de descarregamento</h1>
                <div class="space-y-4">
                    <div v-for="(descarregamento, index) in form.descarregamentos" :key="descarregamento"
                         class="grid flex-1 grid-cols-1 gap-4 pt-3 sm:grid-cols-6">
                        <div class="col-span-6">
                            <label class="text-xs placeholder:text-xs" for="município-de-descarregamento">
                                Nome do município de descarregamento
                            </label>
                            <div class="flex items-center space-x-2">
                                <client-only>
                                    <el-select v-model="form.descarregamentos[index]"
                                               id="município-de-descarregamento"
                                               placeholder="Select"
                                               size="large"
                                    >
                                        <el-option
                                            v-for="item in ['options']"
                                            :key="item"
                                            :label="item"
                                            :value="item"
                                        />
                                    </el-select>
                                </client-only>
                                <icon-folder-plus class="cursor-pointer" />
                                <icon-recycle-bin-fill @click="removeField('descarregamentos', index)"
                                                       class="cursor-pointer" />
                            </div>
                        </div>
                        <div class="col-span-2">
                            <label class="text-xs placeholder:text-xs" for="nfe-chave">NFe Chave</label>
                            <input v-model="form.descarregamentos[index].nfe_chave" id="nfe-chave" type="text"
                                   class="form-input" />
                        </div>

                        <div class="col-span-2">
                            <label class="text-xs placeholder:text-xs" for="peso">Peso</label>
                            <input v-model="form.descarregamentos[index].peso" id="peso" type="text"
                                   placeholder="0.0000" class="form-input" />
                        </div>

                        <div class="col-span-2">
                            <label class="text-xs placeholder:text-xs" for="valor">Valor</label>
                            <input v-model="form.descarregamentos[index].valor" id="valor" type="text"
                                   placeholder="0,00" class="form-input" />
                        </div>
                    </div>
                </div>
                <button @click="addField('descarregamentos')" class="mt-2">+ Adicionar outra cidade</button>
            </div>

            <div class="mt-10">
                <h1 class="mb-4 font-bold pb-2 border-b border-dashed border-black">Motoristas</h1>
                <label class="text-xs placeholder:text-xs" for="motoristas">
                    Motorista
                </label>
                <div class="space-y-4">
                    <div v-for="(_, index) in form.motoristas" :key="index"
                         class="flex items-center justify-center gap-2">
                        <el-select
                            v-model="form.motoristas[index]"
                            placeholder="Select"
                            size="large"
                        >
                            <el-option
                                v-for="item in ['No options']"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                        <icon-recycle-bin-fill @click="removeField('motoristas', index)" class="cursor-pointer" />
                    </div>
                </div>
                <button @click="addField('motoristas')" class="mt-2">+ Adicionar outro motorista</button>
            </div>

            <div class="mt-10">
                <h1 class="mb-4 font-bold pb-2 border-b border-dashed border-black">Transporte</h1>
                <label class="text-xs placeholder:text-xs" for="placa">
                    Placa
                </label>
                <div class="flex items-center justify-center gap-2">
                    <input id="placa" type="text" class="form-input" />
                </div>
            </div>


            <div class="mt-10">
                <h1 class="mb-4 font-bold pb-2 border-b border-dashed border-black">Reboque</h1>
                <label class="text-xs placeholder:text-xs" for="placa2">
                    Placa
                </label>
                <div class="space-y-4">
                    <div v-for="(reboque, index) in form.reboques" :key="reboque"
                         class="flex items-center justify-center gap-2">
                        <input v-model="form.reboques[index]" id="placa2" type="text" class="form-input" />
                        <icon-recycle-bin-fill @click="removeField('reboques', index)" class="cursor-pointer" />
                    </div>
                </div>
                <button @click="addField('reboques')" class="mt-2">+ Adicionar outro reboque</button>
            </div>

            <div class="flex justify-end mt-5 space-x-4">
                <button class="btn btn-dark">
                    Cancelar
                </button>
                <button class="btn btn-primary">
                    Salvar
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import estados from '~/data/estados.json';

    const form = ref({
        carregamentos: [''],
        motoristas: [''],
        percusos: [''],
        reboques: [''],
        descarregamentos: ['']
    });

    const addField = (field) => {
        form.value[field].push('');
    };

    const removeField = (field, index) => {
        if (form.value[field].length > 1)
            form.value[field].splice(index, 1);
    };

</script>
