<template>
    <section>
        <TabPanel>
            <div class="mx-auto max-w-7xl">
                <div class="mx-auto flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-[#1B5870]">Nota Fiscal de Compra</h2>
                    <div class="flex gap-5">
                        <NuxtLink to="/compras/fiscal/actualizar">
                            <button
                                class="btn btn-primary">

                                Criar Nota Fiscal
                            </button>
                        </NuxtLink>
                        <div>
                            <div class="relative">
                                <input type="text" placeholder="Pesquisar"
                                       class="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                                <div
                                    class="peer-focus:text-boton absolute top-1/2 -translate-y-1/2 ltr:right-[11px] rtl:left-[11px]">
                                    <NuxtLink to="/faturarparacliente/filtro">
                                        <svg class="mx-auto" width="16" height="16"
                                             viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11.5" cy="11.5" r="9.5" stroke="#983AAF"
                                                    stroke-width="1.5" opacity="0.5"></circle>
                                            <path d="M18.5 18.5L22 22" stroke="#983AAF"
                                                  stroke-width="1.5" stroke-linecap="round"></path>
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TabelaGrande -->
                <div
                    class="table-responsive items-center justify-center flex flex-col w-auto bg-slate-100 mt-12 rounded-md py-20 space-y-6 bg-[#f3f3f3]">
                    <button class="w-10">
                        <icon-box />
                    </button>
                    <p class="font-bold text-xl">Nenhum registro encontrado</p>
                </div>
            </div>
        </TabPanel>
    </section>
</template>
