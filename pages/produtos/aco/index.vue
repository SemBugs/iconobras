<template>
    <section class=" mx-auto max-w-7xl justify-center">
        <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
            <h2 class="text-[#FD4C0C] text-2xl font-bold">
                Cadastro de Produtos
            </h2>
        </div>
        <div class="grid mt-8 grid-cols-5 gap-6 rounded-3xl p-8 shadow-lg  align-end">
            <NuxtLink to="/produtos/aco/vergalhoes-barras/" class="pointer">
                <div class="text-[#008ED6]  h-40 border border-[#008ED6] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Vergalhões e Barras</p>
                    <icon-vergalhoes-barras />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/aco/telas-malhas/" class="pointer">
                <div class="text-[#4085a8]  h-40 border border-[#4085a8] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Telas e Malhas</p>
                    <icon-telas-malhas />
                </div>
            </NuxtLink>
        </div>
    </section>
</template>