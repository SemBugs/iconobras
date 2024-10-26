<template>
    <div>
        <div class='flex flex-wrap items-center justify-between gap-4'>
            <h2 class='text-xl'>Nota Fiscal</h2>
        </div>

        <ul class='flex space-x-2 mt-3 rtl:space-x-reverse'>
            <li>
                <a href='javascript:;' @click="router.push('/')" class='text-primary hover:underline'>Inicio</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <a href='javascript:;' @click="router.push('/fiscal/nfe')" class='text-primary hover:underline'>Nota
                    nota</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Nota Fiscal</span>
            </li>
        </ul>

        <div class='panel mt-3'>
            <div>
                <div class='grid grid-cols-1 md:grid-cols-4 pb-3 gap-4'>
                    <div class='col-span-2'>
                        <contato :data='form.cliente' @selecionado='setCliente' label='cliente' :tipo="['c', 'f']">
                        </contato>
                    </div>

                    <div class='col-span-2'>
                        <contato :data='form.vendedor' @selecionado='setVendedor' label='vendedor' tipo='v'></contato>
                    </div>
                </div>

                <div class='grid pt-2 md:pt-0 grid-cols-1 md:grid-cols-8 gap-4'>
                    <div class='col-span-2 input-select'>
                        <label>Natureza da operação</label>
                        <el-select v-model='form.natureza_operacao' placeholder='Selecione' filterable allow-create>
                            <template slot='prefix'>
                                <span class='el-input__suffix-inner el-select-icon'>
                                    <i :class="'select-icon-position el-input__icon fas fa-file'"></i>
                                </span>
                            </template>
                            <el-option v-for='(item, i) in natureza_operacao' :key='i' :label='item.name'
                                :value='item.name'></el-option>
                        </el-select>
                    </div>
                    <div class='col-span-2 input-select'>
                        <label>Finalidade</label>
                        <el-select v-model='form.finalidade_emissao' placeholder='Selecione' filterable>
                            <template slot='prefix'>
                                <span class='el-input__suffix-inner el-select-icon'>
                                    <i :class="'select-icon-position el-input__icon fas fa-file'"></i>
                                </span>
                            </template>
                            <el-option v-for='(item, i) in finalidade_emissao' :key='i' :label='item.name'
                                :value='item.id'></el-option>
                        </el-select>
                    </div>
                    <div class='input-select col-span-2'>
                        <label>Tipo</label>
                        <el-select v-model='form.tipo_operacao' placeholder='Selecione' filterable>
                            <template slot='prefix'>
                                <span class='el-input__suffix-inner el-select-icon'>
                                    <i :class="'select-icon-position el-input__icon fas fa-file'"></i>
                                </span>
                            </template>
                            <el-option v-for='(item, i) in tipo_operacao' :key='i' :label='item.nome'
                                :value='item.id'></el-option>
                        </el-select>
                    </div>
                    <div class='col-span-2 input-select'>
                        <label>Forma Emissão</label>
                        <el-select v-model='form.tipo_emissao' placeholder='Selecione' filterable>
                            <template slot='prefix'>
                                <span class='el-input__suffix-inner el-select-icon'>
                                    <i :class="'select-icon-position el-input__icon fas fa-file'"></i>
                                </span>
                            </template>
                            <el-option v-for='(item, i) in tipo_emissao' :key='i' :label='item.nome'
                                :value='item.id'></el-option>
                        </el-select>
                    </div>
                </div>

                <div v-if='form.finalidade_emissao != 1'>
                    <div class='pt-10'>
                        <h2 class='sub-header'>Notas referenciadas</h2>
                    </div>

                    <div class='grid pt-5 produtos-labels grid-cols-2 gap-4'>
                        <div>Modelo de Documento</div>
                        <div>Chave</div>
                    </div>
                    <div v-for='(item, i) in form.nota_ref' :key='i' class='grid pt-2 pb-3 grid-cols-2 gap-4'>
                        <div>
                            <el-select v-model='item.tipo' filterable placeholder='Selecione'>
                                <el-option v-for='(p, i) in tipo_nota' :key='i' :label='p.nome'
                                    :value='p.nome'></el-option>
                            </el-select>
                        </div>
                        <div class='relative'>
                            <el-input v-model='item.chave' class='pr-10' />

                            <a class='absolute apagar' href='javascript:;' @click='removeNota(i)'>
                                <i class='bx bx-x'></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <a href='javascript:void(0)' class='bold underline excluirP system-dcg' @click='addNota()'> +
                            adicionar nota referenciada </a>
                    </div>
                </div>

                <div class='pt-10 pb-5'>
                    <h2 class='sub-header'>Produtos</h2>
                </div>

                <div v-if='form.itens.length > 0'
                    class='produtos-labels hidden md:grid grid-cols-3 md:grid-cols-6 gap-4'>
                    <div class='md:col-span-2'>ITEM</div>
                    <div class='hidden md:block'>CFOP</div>
                    <div>QUANTIDADE</div>
                    <div>PREÇO</div>
                    <div class='hidden md:block'>MONTANTE</div>
                </div>

                <div class='mb-3'>
                    <div v-for='(item, i) in form.itens' :key='i'
                        class='grid pt-2 pb-3 border-b md:border-0 border-dotted grid-cols-2 md:grid-cols-6 gap-4'>
                        <div class='md:col-span-2'>
                            <label class="md:hidden">ITEM</label>
                            <el-select v-model='item.nome' filterable placeholder='' @change='produtoSeleciona(i)'
                                remote :remote-method='getProdutos'>
                                <el-option v-for='(p, i) in produtos' :key='i' :label='p.nome'
                                    :value='p.nome'></el-option>
                            </el-select>
                        </div>
                        <div class='hidden md:block'>
                            <el-input v-model='item.cfop' />
                        </div>
                        <div>
                            <label class="md:hidden">QUANTIDADE</label>
                            <div class='el-input-content'>
                                <el-input-number v-model='item.quantidade' :step='1.0'
                                    @change='total()'></el-input-number>
                            </div>
                        </div>
                        <div>
                            <label class="md:hidden">PREÇO</label>
                            <div class='el-input__wrapper'>
                                <input type='text' class='el-input__inner' v-model.lazy='item.valor_venda'
                                    v-money='money' @blur='total()' />
                            </div>
                        </div>
                        <div class='relative'>
                            <label class="md:hidden">MONTANTE</label>
                            <p class='pt-2'>
                                {{ $filters.moedaBRL(item.quantidade * convertMoeda(item.valor_venda)) }}
                            </p>

                            <a class="absolute apagar pt-6 md:pt-0" href="javascript:;" @click="removeProduto(i)">
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                    xmlns='http://www.w3.org/2000/svg' class='m-auto h-5 w-5'>
                                    <path d='M20.5001 6H3.5' stroke='currentColor' stroke-width='1.5'
                                        stroke-linecap='round'></path>
                                    <path
                                        d='M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5'
                                        stroke='currentColor' stroke-width='1.5' stroke-linecap='round'></path>
                                    <path opacity='0.5' d='M9.5 11L10 16' stroke='currentColor' stroke-width='1.5'
                                        stroke-linecap='round'></path>
                                    <path opacity='0.5' d='M14.5 11L14 16' stroke='currentColor' stroke-width='1.5'
                                        stroke-linecap='round'></path>
                                    <path opacity='0.5'
                                        d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6'
                                        stroke='currentColor' stroke-width='1.5'></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <a href='javascript:void(0)' class='bold underline excluirP system-dcg' @click='addProduto()'> +
                        adicionar outro produto </a>
                </div>

                <div class='pt-10'>
                    <h2 class='sub-header'>Totais da nota fiscal</h2>
                </div>

                <div class='form-group grid grid-cols-1 md:grid-cols-5 gap-3 mt-4 col-md-4'>
                    <div class='input-money'>
                        <label>Valor do frete</label>
                        <div class='el-input__wrapper'>
                            <input type='text' @keyup='total()' class='el-input__inner w-full'
                                v-model.lazy='form.valor_frete' v-money='money' />
                        </div>
                    </div>

                    <div class='input-money'>
                        <label>Valor do seguro</label>
                        <div class='el-input__wrapper'>
                            <input type='text' @keyup='total()' class='el-input__inner w-full'
                                v-model.lazy='form.valor_seguro' v-money='money' />
                        </div>
                    </div>

                    <div>
                        <label>Desconto ({{ !tipo ? '%' : 'R$' }})</label>
                        <div class='el-input-group el-input-group--append el-input-group--prepend input-with-select'>
                            <div class='el-input__wrapper'>
                                <input v-if='!tipo' @keyup='total()' class='el-input__inner w-full'
                                    v-model='form.desconto' label='Desconto (%)' />
                                <input v-if='tipo' @keyup='total()' class='el-input__inner w-full' v-money='money'
                                    v-model='form.desconto_real' label='Desconto R$' />
                            </div>

                            <a href='javascript:;' @click='mudarDesconto()'
                                style='padding: 0px 5px;border-radius: 0px 10px 10px 0px;'
                                class='el-input-group__append'>
                                <svg v-if='!tipo' width='24' height='24' viewBox='0 0 24 24' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                        d='M9.99502 4H14.005C17.7856 4 19.6759 4 20.8504 5.17157C21.6591 5.97823 21.911 7.12339 21.9894 8.98947C22.005 9.35954 22.0128 9.54458 21.9437 9.66803C21.8745 9.79147 21.5987 9.94554 21.0469 10.2537C20.4341 10.5959 20.0199 11.2497 20.0199 12C20.0199 12.7503 20.4341 13.4041 21.0469 13.7463C21.5987 14.0545 21.8745 14.2085 21.9437 14.332C22.0128 14.4554 22.005 14.6405 21.9894 15.0105C21.911 16.8766 21.6591 18.0218 20.8504 18.8284C19.6759 20 17.7856 20 14.005 20H9.99502C6.21438 20 4.32407 20 3.14958 18.8284C2.34091 18.0218 2.08903 16.8766 2.01058 15.0105C1.99502 14.6405 1.98724 14.4554 2.05634 14.332C2.12545 14.2085 2.40133 14.0545 2.95308 13.7463C3.56586 13.4041 3.98007 12.7503 3.98007 12C3.98007 11.2497 3.56586 10.5959 2.95308 10.2537C2.40133 9.94554 2.12545 9.79147 2.05634 9.66802C1.98724 9.54458 1.99502 9.35954 2.01058 8.98947C2.08903 7.12339 2.34091 5.97823 3.14958 5.17157C4.32407 4 6.21439 4 9.99502 4ZM15.5478 8.46967C15.8415 8.76256 15.8415 9.23744 15.5478 9.53033L9.53289 15.5303C9.23927 15.8232 8.76321 15.8232 8.46959 15.5303C8.17596 15.2374 8.17596 14.7626 8.46959 14.4697L14.4845 8.46967C14.7782 8.17678 15.2542 8.17678 15.5478 8.46967ZM14.5149 15.5C15.0686 15.5 15.5174 15.0523 15.5174 14.5C15.5174 13.9477 15.0686 13.5 14.5149 13.5C13.9613 13.5 13.5124 13.9477 13.5124 14.5C13.5124 15.0523 13.9613 15.5 14.5149 15.5ZM9.50248 10.5C10.0561 10.5 10.505 10.0523 10.505 9.5C10.505 8.94772 10.0561 8.5 9.50248 8.5C8.94882 8.5 8.49999 8.94772 8.49999 9.5C8.49999 10.0523 8.94882 10.5 9.50248 10.5Z'
                                        fill='currentColor' />
                                </svg>
                                <svg v-if='tipo' width='24' height='24' viewBox='0 0 24 24' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z'
                                        fill='currentColor' />
                                    <path
                                        d='M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z'
                                        fill='currentColor' />
                                    <path fill-rule='evenodd' clip-rule='evenodd'
                                        d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z'
                                        fill='currentColor' />
                                </svg>

                            </a>
                        </div>
                    </div>

                    <div class='input-money text-right'>
                        <label>Valor dos produtos</label>
                        <div class='el-input-content p-2'>
                            {{ $filters.moedaBRL(form.total_produto) }}
                        </div>
                    </div>

                    <div class='input-money text-right'>
                        <label>Valor total da nota</label>
                        <div class='el-input-content p-2'>
                            {{ $filters.moedaBRL(form.total) }}
                        </div>
                    </div>
                </div>

                <div class='pt-10 pb-5'>
                    <h2 class='sub-header'>Pagamento</h2>
                </div>

                <div v-if='form.pagamento.formas_pagamento.length > 0'
                    class='grid produtos-labels grid-cols-2 md:grid-cols-7 gap-4'>
                    <div class='md:col-span-2'>Espécie</div>
                    <div class='md:col-span-2'>Valor recebido</div>
                </div>
                <div v-for='(item, i) in form.pagamento.formas_pagamento' :key='i'
                    class='grid pt-2 pb-3 grid-cols-2 md:grid-cols-7 gap-4'>
                    <div class='md:col-span-2'>
                        <el-select v-model='item.meio_pagamento' filterable placeholder='Selecione'>
                            <el-option v-for='(p, i) in formaPagamento' :key='i' :label='p.text'
                                :value='p.value'></el-option>
                        </el-select>
                    </div>
                    <div class='md:col-span-2 relative'>
                        <div class='w-9/12 md:w-full'>
                            <div class='el-input__wrapper'>
                                <input type='text' class='el-input__inner' v-model='item.valor' v-money='money' />
                            </div>
                        </div>

                        <a class="absolute apagar pagamento pr-10 md:pr-0" @click="removePagamento(i)"
                            href="javascript:;">
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                xmlns='http://www.w3.org/2000/svg' class='m-auto h-5 w-5'>
                                <path d='M20.5001 6H3.5' stroke='currentColor' stroke-width='1.5'
                                    stroke-linecap='round'>
                                </path>
                                <path
                                    d='M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5'
                                    stroke='currentColor' stroke-width='1.5' stroke-linecap='round'></path>
                                <path opacity='0.5' d='M9.5 11L10 16' stroke='currentColor' stroke-width='1.5'
                                    stroke-linecap='round'>
                                </path>
                                <path opacity='0.5' d='M14.5 11L14 16' stroke='currentColor' stroke-width='1.5'
                                    stroke-linecap='round'>
                                </path>
                                <path opacity='0.5'
                                    d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6'
                                    stroke='currentColor' stroke-width='1.5'></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div>
                    <a href='javascript:void(0)' @click='addPagamento()' class='bold underline excluirP system-dcg'> +
                        adicionar pagamento </a>
                </div>

                <div class='pt-10'>
                    <h2 class='sub-header'>Frete</h2>
                </div>

                <div class='form-group grid grid-cols-1 md:grid-cols-7 gap-3 mt-4 col-md-4'>
                    <div class='col-span-2 input-select'>
                        <label>Forma de envio</label>
                        <el-select v-model='form.frete.modalidade_frete' placeholder='Selecione' filterable>
                            <el-option v-for='(item, i) in tipo_frete' :key='i' :label='item.name'
                                :value='item.id'></el-option>
                        </el-select>
                    </div>

                    <div class='col-span-2 input-select'>
                        <label>Tipo de atendimento</label>
                        <el-select v-model='form.presenca_comprador' placeholder='Selecione' filterable>
                            <el-option v-for='(item, i) in presenca_comprador' :key='i' :label='item.name'
                                :value='item.id'></el-option>
                        </el-select>
                    </div>

                    <div class='col-span-2 input-select'>
                        <label>Identificador de local de destino</label>
                        <el-select v-model='form.local_destino' placeholder='Selecione' filterable>
                            <el-option v-for='(item, i) in local_destino' :key='i' :label='item.name'
                                :value='item.id'></el-option>
                        </el-select>
                    </div>

                    <div>
                        <label>Aliq ICMS</label>
                        <el-input v-model='form.aliq_icms' label='Aliq ICMS' />
                    </div>
                </div>

                <div v-if='form.frete.modalidade_frete != 9'>
                    <div class='pt-10'>
                        <h2 class='sub-header'>Transportador</h2>
                    </div>

                    <div class='grid grid-cols-1 md:grid-cols-3 pt-3 gap-4'>
                        <div>
                            <contato :data='form.frete.transportador' @selecionado='setTransportador' label-field='Nome'
                                label='transportador' :tipo="['t', 'm']"></contato>
                        </div>

                        <div>
                            <label>Estado</label>
                            <el-input v-model='form.frete.transportador.uf' label='Estado' />
                        </div>

                        <div>
                            <label>Cidade</label>
                            <el-input v-model='form.frete.transportador.nome_municipio' label='Cidade' />
                        </div>

                        <div>
                            <label>Endereço</label>
                            <el-input v-model='form.frete.transportador.logradouro' label='Endereço' />
                        </div>

                        <div>
                            <label>CPF ou CNPJ</label>
                            <el-input v-model='form.frete.transportador.documento' label='CPF ou CNPJ' />
                        </div>

                        <div>
                            <label>Inscrição Estadual</label>
                            <el-input v-model='form.frete.transportador.inscricao_estadual'
                                label='Inscrição Estadual' />
                        </div>
                    </div>

                    <div class='pt-10'>
                        <h2 class='sub-header'>Transporte</h2>
                    </div>

                    <div class='grid grid-cols-1 md:grid-cols-3 pt-3 gap-4'>
                        <div>
                            <label>Placa</label>
                            <el-input v-model='form.frete.veiculo.placa' label='Placa' />
                        </div>

                        <div>
                            <label>Estado</label>
                            <el-input v-model='form.frete.veiculo.uf' label='Estado' />
                        </div>

                        <div>
                            <label>RNTC do veículo</label>
                            <el-input v-model='form.frete.veiculo.rntc' label='RNTC do veículo' />
                        </div>
                    </div>

                    <div class='pt-10'>
                        <h2 class='sub-header'>Reboque</h2>
                    </div>

                    <div class='veiculo'>
                        <div v-for='(item, i) in form.frete.reboque' :key='i'
                            class='grid grid-cols-1 pb-4 md:grid-cols-3 pt-3 gap-4'>
                            <div>
                                <label>Placa</label>
                                <el-input v-model='item.placa' label='Placa' />
                            </div>

                            <div>
                                <label>Estado</label>
                                <el-input v-model='item.uf' label='Estado' />
                            </div>

                            <div class='flex relative'>
                                <div>
                                    <label>RNTC do veículo</label>
                                    <el-input v-model='item.rntc' label='RNTC do veículo' style='width: 88%' />
                                </div>

                                <a class='apagar absolute' @click='removeReboque(i)' href='javascript:;'
                                    style='right: 0; top: 34px'>
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                        xmlns='http://www.w3.org/2000/svg' class='m-auto h-5 w-5'>
                                        <path d='M20.5001 6H3.5' stroke='currentColor' stroke-width='1.5'
                                            stroke-linecap='round'></path>
                                        <path
                                            d='M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5'
                                            stroke='currentColor' stroke-width='1.5' stroke-linecap='round'></path>
                                        <path opacity='0.5' d='M9.5 11L10 16' stroke='currentColor' stroke-width='1.5'
                                            stroke-linecap='round'></path>
                                        <path opacity='0.5' d='M14.5 11L14 16' stroke='currentColor' stroke-width='1.5'
                                            stroke-linecap='round'></path>
                                        <path opacity='0.5'
                                            d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6'
                                            stroke='currentColor' stroke-width='1.5'></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class='pt-3'>
                        <a href='javascript:void(0)' @click='addReboque()' class='bold underline excluirP system-dcg'> +
                            adicionar outro reboque </a>
                    </div>

                    <div class='pt-10'>
                        <h2 class='sub-header'>Volumes Transportados</h2>
                    </div>

                    <div class='veiculo'>
                        <div v-for='(item, i) in form.frete.volumes' :key='i'
                            class='grid pb-4 grid-cols-1 md:grid-cols-6 pt-3 gap-4'>
                            <div>
                                <label>Quantidade</label>
                                <el-input v-model='item.quantidade' label='Quantidade' />
                            </div>

                            <div>
                                <label>Espécie</label>
                                <el-input v-model='item.especie' label='Espécie' />
                            </div>

                            <div>
                                <label>Marca</label>
                                <el-input v-model='item.marca' label='Marca' />
                            </div>

                            <div>
                                <label>Peso bruto (KG)</label>
                                <div class='el-input__wrapper'>
                                    <input v-model='item.peso_bruto' class='el-input__inner' label='Peso bruto (KG)'
                                        v-money='peso' />
                                </div>
                            </div>

                            <div>
                                <label>Peso liquido (KG)</label>
                                <div class='el-input__wrapper'>
                                    <input v-model='item.peso_liquido' class='el-input__inner' label='Peso liquido (KG)'
                                        v-money='peso' />
                                </div>
                            </div>

                            <div class='flex relative'>
                                <div>
                                    <label> Número </label>
                                    <el-input v-model='item.numero' label='Número' style='width: 73%' />
                                </div>

                                <a class='apagar absolute mt-[26px]' @click='removeVolume(i)' href='javascript:;'
                                    style='right: 0px'>
                                    <svg width='30' height='24' viewBox='0 0 24 24' fill='none'
                                        xmlns='http://www.w3.org/2000/svg' class='m-auto h-5 w-5'>
                                        <path d='M20.5001 6H3.5' stroke='currentColor' stroke-width='1.5'
                                            stroke-linecap='round'></path>
                                        <path
                                            d='M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5'
                                            stroke='currentColor' stroke-width='1.5' stroke-linecap='round'></path>
                                        <path opacity='0.5' d='M9.5 11L10 16' stroke='currentColor' stroke-width='1.5'
                                            stroke-linecap='round'></path>
                                        <path opacity='0.5' d='M14.5 11L14 16' stroke='currentColor' stroke-width='1.5'
                                            stroke-linecap='round'></path>
                                        <path opacity='0.5'
                                            d='M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6'
                                            stroke='currentColor' stroke-width='1.5'></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class='pt-3'>
                        <a href='javascript:void(0)' @click='addVolume()' class='bold underline excluirP system-dcg'> +
                            adicionar volume </a>
                    </div>
                </div>

                <div class='grid grid-cols-1 md:grid-cols-2 pt-10 gap-4'>
                    <div>
                        <label>Informação adicional fisico</label>
                        <el-input label='Informação adicional fisico' v-model='form.informacoes_adicionais_fisco' />
                    </div>

                    <div>
                        <label>Informação complementar</label>
                        <el-input label='Informação complementar' v-model='form.informacoes_adicionais_contribuinte' />
                    </div>
                </div>
            </div>

            <div class='flex pt-10'>
                <el-button type='success' size='large' @click='salvar()'>Salvar e Emitir</el-button>

                <nuxtLink to='/fiscal/nfe'>
                    <el-button size='large' plain class='ml-3'> Cancelar</el-button>
                </nuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import formaPagamento from '@/utils/forma_pagamento';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();

useHead({ title: 'Nota Fiscal' });
// import axios from '~/http/axios';

import { useAppStore } from '@/stores/index';

const store = useAppStore();

const load = ref(true);

const tipo = ref(false);

const form = ref({
    total: 0.0,
    total_produto: 0.0,
    tipo: '55',
    local_destino: '1',
    tipo_emissao: '1',
    tipo_operacao: '1',
    finalidade_emissao: 1,
    consumidor_final: 1,
    presenca_comprador: 0,
    aliq_icms: '',
    nota_ref: [{ tipo: 'Nfe', chave: '' }],
    natureza_operacao: 'Venda',
    itens: [
        {
            nome: '',
            codigo_ncm: '',
            cfop: '',
            csosn: '',
            quantidade: '1.000',
            valor_venda: 0.0
        }
    ],
    frete: {
        modalidade_frete: 9,
        transportador: {
            uf: '',
            nome_municipio: '',
            endereco: '',
            documento: '',
            inscricao_estadual: ''
        },
        veiculo: {},
        reboque: [
            {
                placa: '',
                uf: '',
                rntc: ''
            }
        ],
        volumes: [
            {
                quantidade: '',
                especie: '',
                marca: '',
                numero: '',
                peso_liquido: 0.0,
                peso_bruto: 0.0
            }
        ]
    },
    pagamento: {
        formas_pagamento: [
            {
                meio_pagamento: '01',
                valor: '0.00',
                tipo_integracao: '2'
            }
        ]
    }
});

const tipo_frete = [
    { id: 0, name: 'Por conta do emitente' },
    { id: 1, name: 'Por conta do destinatário' },
    { id: 2, name: 'Por conta de terceiros' },
    { id: 3, name: 'Transporte Proprio por conta do Remetente' },
    { id: 4, name: 'Transporte Prorio por conta do Destinatario' },
    { id: 9, name: 'Sem frete' }
];

const money = {
    decimal: ',',
    thousands: '.',
    precision: 2,
    masked: false
};
const peso = {
    decimal: '.',
    thousands: '',
    precision: 3,
    masked: false
};

const local_destino = [
    { id: '1', name: 'Operação interna' },
    { id: '2', name: 'Operação interestadual' },
    { id: '3', name: 'Operação com exterior' }
];
const tipo_operacao = [
    { nome: 'Saida', id: '1' },
    { nome: 'Entrada', id: '0' },
    { nome: 'Exportação', id: '3' },
    { nome: 'Importação', id: '2' }
];
const tipo_emissao = [
    { nome: 'Normal', id: '1' },
    { nome: 'Contingência FS-IA', id: '2' },
    { nome: 'Contingência SCAN', id: '3' },
    { nome: 'Contingência EPEC', id: '4' },
    { nome: 'Contingência FS-DA', id: '5' },
    { nome: 'Contingência SVC-AN', id: '6' },
    { nome: 'Contingência SVC-RS', id: '7' }
];
const natureza_operacao = [
    { name: 'Venda' },
    { name: 'Compra' },
    { name: 'Transferência' },
    { name: 'Devolução' },
    { name: 'Importação' },
    { name: 'Consignação' },
    { name: 'Remessa' }
];
const finalidade_emissao = [
    { id: 1, name: 'Nota normal' },
    { id: 2, name: 'Nota complementar' },
    { id: 3, name: 'Nota de ajuste' },
    { id: 4, name: 'Devolução de mercadoria' }
];
const presenca_comprador = [
    { id: 0, name: 'Não se aplica' },
    { id: 1, name: 'Presencial' },
    { id: 2, name: 'Não presencial, pela internet' },
    { id: 3, name: 'Não presencial, Teleatendimento' },
    { id: 9, name: 'Não presencial, Outros' }
];
const tipo_nota = [{ nome: 'Nfe' }, { nome: 'Nfce' }, { nome: 'CTe' }];

const showMessage = (msg = '', type = 'success', time = 3000) => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: time,
        customClass: { container: 'toast' }
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px'
    });
};

const indicadores: object = [
    { label: 'Contribuinte de ICMS', value: '1' },
    { label: 'Contribuinte Isento de Inscrição', value: '2' },
    { label: 'Não contribuinte', value: '9' }
];

onMounted(() => {
    getProdutos('');
    if (route.params.id !== 'novo') {
        // axios.get(`vendas/documento/${route.params.id}/edit`).then((req: any) => {
        //     form.value = req.data;
        //     load.value = false;
        // });
    } else {
        load.value = false;
    }
});

const addProduto = () => {
    form.value.itens.push({
        nome: '',
        codigo_ncm: '',
        cfop: '',
        quantidade: '1.000',
        valor_venda: 0.0
    });
};

const mudarDesconto = () => {
    tipo.value = !tipo.value;
    localStorage.setItem('desconto', tipo.value);
    form.value.desconto = 0;
    total();
};

// const getReal = () => {
//     form.value.desconto = 0;
//     total();
//     const thousandFixed = form.value.desconto_real
//         .replace(/(kr|\$|£|€)/g, '')
//         .trim()
//         .replace(/(.+)[.,](\d+)$/g, '$1x$2')
//         .replace(/[.,]/g, '')
//         .replace('x', '.');

//     console.log(form.value.desconto_real);
//     console.log(form.value.total_produto);

//     form.value.desconto = parseFloat(thousandFixed) / form.value.total * 100;
//     form.value.descontoP = parseFloat(thousandFixed) / form.value.total_produto * 100;
//     total();
// };

const total = () => {
    form.value.total = 0.0;
    form.value.total_produto = 0.0;

    for (let i = 0; i <= form.value.itens.length; i++) {
        if (form.value.itens[i]) {
            form.value.total_produto += form.value.itens[i].quantidade * convertMoeda(form.value.itens[i].valor_venda);
            form.value.total += form.value.itens[i].quantidade * convertMoeda(form.value.itens[i].valor_venda);
        }
    }

    if (tipo.value && form.value.desconto_real) {
        const thousandFixed = form.value.desconto_real
            .replace(/(kr|\$|£|€)/g, '')
            .trim()
            .replace(/(.+)[.,](\d+)$/g, '$1x$2')
            .replace(/[.,]/g, '')
            .replace('x', '.');

        form.value.desconto = parseFloat(thousandFixed) / form.value.total_produto * 100;
    }

    form.value.total -= ((form.value.total * form.value.desconto) / 100) || 0;

    if (convertMoeda(form.value.valor_frete) > 0) {
        form.value.total += convertMoeda(form.value.valor_frete) + convertMoeda(form.value.valor_seguro);
        // form.value.total_produto += convertMoeda(form.value.valor_frete) + convertMoeda(form.value.valor_seguro);
    }

    if (form.value.pagamento.formas_pagamento.length === 1) {
        form.value.pagamento.formas_pagamento[0].valor = parseFloat(form.value.total).toFixed(2);
    }
};

const setTransportador = (contato: any) => {
    form.value.frete.transportador = contato;
};

const removeProduto = (i: any) => {
    form.value.itens.splice(i, 1);
    total();
};
const addReboque = () => {
    form.value.frete.reboque.push({
        placa: '',
        uf: '',
        rntc: ''
    });
};
const removeReboque = (i: any) => {
    form.value.frete.reboque.splice(i, 1);
};
const addVolume = () => {
    form.value.frete.volumes.push({
        quantidade: '',
        especie: '',
        marca: '',
        numero: '',
        peso_liquido: 0.0,
        peso_bruto: 0.0
    });
};
const removeVolume = (i: any) => {
    form.value.frete.volumes.splice(i, 1);
};
const setCliente = (contato: any) => {
    form.value.destinatario = contato.id;
};

const setVendedor = (contato: any) => {
    form.value.vendedor_id = contato.id;
};

const getProdutos = (busca: any) => {
    // produto.lista({ page: 1, busca }).then((req) => {
    //     produtos.value = req.data.data;
    // });
};

const produtos: any = ref([]);

const produtoSeleciona = (index: any) => {
    for (let i = 0; i < produtos.value.length; i++) {
        if (form.value.itens[index].nome === produtos.value[i].nome) {
            form.value.itens[index].valor_compra = produtos.value[i].valor_compra;
            form.value.itens[index].valor_venda = produtos.value[i].valor_venda;
            form.value.itens[index].cfop = produtos.value[i].cfop;
            form.value.itens[index].codigo_ncm = produtos.value[i].codigo_ncm;
            form.value.itens[index].codigo_produto = produtos.value[i].id;
            form.value.itens[index].situacao_tributaria = produtos.value[i].situacao_tributaria;
            form.value.itens[index].unidade = produtos.value[i].unidade;
            form.value.itens[index].produto_id = produtos.value[i].id;
        }
    }
    total();
};
const addPagamento = () => {
    form.value.pagamento.formas_pagamento.push({
        meio_pagamento: '',
        valor: '0.00',
        tipo_integracao: '2'
    });
};
const removePagamento = (i: any) => {
    form.value.pagamento.formas_pagamento.splice(i, 1);
};
const convertMoeda: any = (input: any) => {
    if (input) {
        const thousandFixed = input
            .replace(/(kr|\$|£|€)/g, '')
            .trim()
            .replace(/(.+)[.,](\d+)$/g, '$1x$2')
            .replace(/[.,]/g, '')
            .replace('x', '.');
        return parseFloat(thousandFixed);
    }
};
const salvar = () => {
    store.isShowMainLoader = true;

    // nota
    //     .criar(form.value)
    //     .then((req) => {
    //         store.isShowMainLoader = false;
    //         showMessage(`Nota emitida com sucesso!`);

    //         router.push('/fiscal/nfe');
    //         nota.imprimir(req.data.danfe);
    //     })
    //     .catch((error) => {
    //         store.isShowMainLoader = false;
    //         if (error.response.data.errors) {
    //             const msg: any = Object.values(error.response.data.errors)[0];
    //             showMessage(msg[0], 'error');
    //         } else {
    //             showMessage(error.response.data.message, 'error');
    //         }
    //     });
};
</script>

<style>
.apagar {
    right: 0;
    top: 8px;
}
</style>