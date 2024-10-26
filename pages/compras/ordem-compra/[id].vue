<script lang="ts" setup>
import type { Produto, Fornecedor, Vendedor, ItemOrdemCompra, OrdemCompraItemOrdemCompra } from '@/types/types';
import { useAppStore } from '@/stores/index';

const { getItems, updateItem, createItems, getItemById } = useDirectusItems();
import { ElNotification } from 'element-plus';

const store = useAppStore();

const router = useRouter();
const route = useRoute();

const produtos = ref<Produto[]>([]);
const fornecedores: Fornecedor[] = await getItems({ collection: 'fornecedor' });
const vendedores: Vendedor[] = await getItems({ collection: 'vendedor' });

const getProdutos = async (busca: any) => {
    produtos.value = await getItems({
        collection: 'produto', params: {
            filter: {
                "nome": {
                    "_neq": null
                }
            }
        }
    });
};

const salvar = async () => {
    form.value.empresa = store.empresa.id;

    if (route.params.id === 'create') {
        await createItems({
            collection: 'ordem_compra', items: form.value
        });
    } else {
        await updateItem<any>({
            collection: "ordem_compra",
            id: route.params.id,
            item: form.value,
        });
    }

    ElNotification({
        title: 'Sucesso!',
        message: 'Ordem de compra salvo com sucesso!',
        type: 'success',
    });
    router.push('/compras/ordem-compra');
};

const options = [
    {
        value: 'Dinheiro',
        label: 'Dinheiro',
    },
    {
        value: 'Transferência bancária',
        label: 'Transferência bancária',
    },
    {
        value: 'Pix',
        label: 'Pix',
    },
    {
        value: 'Cartão de Debito',
        label: 'Cartão de Debito',
    },
    {
        value: 'Cartão de Crédito',
        label: 'Cartão de Crédito',
    },
    {
        value: 'Cheque',
        label: 'Cheque',
    },
    {
        value: 'Crédito Loja',
        label: 'Crédito Loja',
    },
    {
        value: 'Vale Alimentação',
        label: 'Vale Alimentação',
    },
];

const form = ref<{
    produtos: OrdemCompraItemOrdemCompra[];
    pagamentos: object[];
    desconto: number;
    valor_frete: number;
    valor_seguro: number;
    valor_total: number;
}>({
    produtos: [
        {
            item_ordem_compra_id: {
                produto: '',
                valor_compra: 0,
                valor: 0,
                cfop: '',
                ncm: '',
                situacao_tributaria: '',
                unidade: '',
                quantidade: 1
            }
        }
    ],
    pagamentos: [{
        meio_pagamento: 'Dinheiro'
    }],
    desconto: 0,
    valor_frete: 0,
    valor_seguro: 0,
    valor_total: 0
});

const addPoduto = () => {
    form.value.produtos.push({ item_ordem_compra_id: { quantidade: 1 } });
};

const addPagamento = () => {
    form.value.pagamentos.push({
        meio_pagamento: '',
        valor: '0.00',
        tipo_integracao: '2',
    });
};

const addField = (field) => {
    form.value[field].push({});
};

const removeField = (field, index) => {
    if (form.value[field].length > 1) form.value[field].splice(index, 1);
};

const produtoSeleciona = (index: any) => {
    for (let i = 0; i < produtos.value.length; i++) {
        let item = form.value.produtos[index].item_ordem_compra_id;

        if (item.produto === produtos.value[i].nome) {
            item.valor_compra = produtos.value[i].valor_compra;
            item.valor = produtos.value[i].valor_venda;
            item.cfop = produtos.value[i].cfop;
            item.ncm = produtos.value[i].codigo_ncm;
            item.situacao_tributaria = produtos.value[i].situacao_tributaria;
            item.unidade = produtos.value[i].unidade;
        }
    }

    total();
};

const total = () => {
    form.value.valor_total = 0;

    for (let i = 0; i <= form.value.produtos.length; i++) {
        let item = form.value.produtos[i]?.item_ordem_compra_id;

        if (item) {
            form.value.valor_total += item.quantidade * item.valor_compra;
        }
    }
    if (form.value.valor_frete > 0) {
        form.value.valor_total += form.value.valor_frete + form.value.valor_seguro;
    }
    form.value.valor_total -= desconto();
    if (form.value.pagamentos.length === 1) {
        form.value.pagamentos[0].valor = parseFloat(form.value.valor_total).toFixed(2);
    }
};

const desconto = () => {
    const desconto = (form.value.valor_total * form.value.desconto) / 100;
    return desconto || 0;
};

onBeforeMount(async () => {
    form.value = await getItemById({
        collection: 'ordem_compra', id: route.params.id, params: {
            fields: ['*', 'produtos.item_ordem_compra_id.*']
        }
    });
});

</script>

<template>
    <div class="mx-auto max-w-5xl">
        <div class="mx-auto flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#1B5870]">Dados da ordem de compra</h2>
            <!-- <div class="flex gap-5">
                <NuxtLink to="/compras/ordem-compra/create">
                    <button class="btn btn-primary">Imprimir XML</button>
                </NuxtLink>
            </div> -->
        </div>

        <div class="mt-10 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-6">
            <div class="col-span-4">
                <label class="text-xs placeholder:text-xs" for="fornecedor">Fornecedor</label>
                <client-only>
                    <el-select v-model="form.fornecedor" filterable placeholder="">
                        <el-option v-for="(p, i ) in fornecedores" :key="i" :label="p.nome" :value="p.id">
                        </el-option>
                    </el-select>
                </client-only>
            </div>
            <div class="col-span-2">
                <label class="text-xs placeholder:text-xs" for="vendedor">Vendedor</label>
                <client-only>
                    <el-select v-model="form.vendedor" filterable placeholder="">
                        <el-option v-for="(p, i ) in vendedores" :key="i" :label="p.nome" :value="p.id">
                        </el-option>
                    </el-select>
                </client-only>
            </div>
        </div>

        <div class="mt-10">
            <h1 class="border-b border-dashed border-black pb-2 font-bold">Produtos</h1>
            <div class="space-y-4">
                <div v-for="(item, i) in form.produtos" :key="i"
                    class="grid flex-1 grid-cols-1 gap-4 pt-3 sm:grid-cols-8">
                    <div class="col-span-2">
                        <label class="text-xs placeholder:text-xs" for="produto"> PRODUTO </label>
                        <client-only>
                            <el-select v-model="item.item_ordem_compra_id.produto" filterable placeholder=""
                                @change="produtoSeleciona(i)" remote :remote-method="getProdutos">
                                <el-option v-for="(p, i ) in produtos " :key="i" :label="p.nome" :value="p.nome">
                                </el-option>
                            </el-select>
                        </client-only>
                    </div>
                    <div class="col-span-1">
                        <label class="text-xs placeholder:text-xs" for="ncm"> NCM </label>
                        <input id="ncm" v-model="item.item_ordem_compra_id.ncm" type="text" class="form-input" />
                    </div>
                    <div class="col-span-1">
                        <label class="text-xs placeholder:text-xs" for="cfop"> CFOP </label>
                        <input id="cfop" v-model="item.item_ordem_compra_id.cfop" type="text" class="form-input" />
                    </div>
                    <div class="">
                        <label class="text-xs placeholder:text-xs" for="cfop"> QUANTIDADE </label>
                        <client-only>
                            <el-input-number v-model="item.item_ordem_compra_id.quantidade" @input="total()" :min="1" />
                        </client-only>
                    </div>
                    <div class="col-span-1">
                        <label class="text-xs placeholder:text-xs" for="valor-compra"> VALOR COMPRA </label>

                        <input-moeda v-model="item.item_ordem_compra_id.valor_compra" @input="total()"
                            placeholder="0,00" type="text" class="form-input" />
                    </div>
                    <div class="col-span-1">
                        <label class="text-xs placeholder:text-xs" for="valor-venda"> VALOR VENDA </label>

                        <input-moeda v-model="item.item_ordem_compra_id.valor" @input="total()" placeholder="0,00"
                            type="text" class="form-input" />
                    </div>
                    <div class="col-span-1">
                        <label class="text-xs placeholder:text-xs" for="valor-compra"> UN. VENDA </label>
                        <div class="flex items-center justify-center space-x-2">
                            <input id="valor-compra" placeholder="UN" v-model="item.item_ordem_compra_id.unidade"
                                type="text" class="form-input" />
                            <icon-recycle-bin-fill @click="removeField('produtos', i)" class="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-8 flex w-1/2 justify-between">
            <button @click="addPoduto()" href="#">+ Adicionar outro produto</button>
        </div>

        <div class="mt-10">
            <h1 class="border-b border-dashed border-black pb-2 font-bold">Pagamento</h1>
            <div class="space-y-2">
                <div v-for="(item, index) in form.pagamentos" :key="index"
                    class="mb-3 grid flex-1 grid-cols-1 items-center gap-4 pt-3 sm:grid-cols-8">
                    <div class="col-span-2">
                        <label class="text-xs placeholder:text-xs" for="especie"> Espécie </label>
                        <el-select v-model="item.meio_pagamento" placeholder="Select" size="large" style="width: 240px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="col-span-2">
                        <label class="text-xs placeholder:text-xs" for="valor-recebido"> Valor recebido </label>
                        <input-moeda v-model="item.valor" id="valor-recebido" placeholder="0,00" type="text"
                            class="form-input" />
                    </div>
                    <div class="col-span-1 mt-5">
                        <icon-recycle-bin-fill @click="removeField('pagamentos', index)" class="cursor-pointer" />
                    </div>
                </div>
            </div>
            <button @click="addPagamento()" class="poiter" href="#">+ Adicionar pagamento</button>
        </div>

        <div class="mt-10">
            <h1 class="border-b border-dashed border-black pb-2 font-bold">Totais</h1>
            <div class="grid flex-1 grid-cols-1 gap-4 pt-3 sm:grid-cols-8">
                <div class="col-span-2">
                    <label class="text-xs placeholder:text-xs" for="desconto"> Desconto </label>
                    <input-moeda id="desconto" v-model="form.desconto" placeholder="0" type="text" class="form-input" />
                </div>
                <div class="col-span-1 flex flex-col justify-center space-x-2">
                    <label class="text-xs placeholder:text-xs" for="valor-produto"> Valor dos produtos </label>
                    <p>{{ $filters.moedaBRL(form.valor_total) }}</p>
                </div>
            </div>
        </div>

        <div class="mt-5 flex justify-end space-x-4">
            <NuxtLink to="/compras/ordem-compra" class="btn btn-dark">Cancelar</NuxtLink>
            <button class="btn btn-primary" @click="salvar()">Salvar</button>
        </div>
    </div>
</template>
