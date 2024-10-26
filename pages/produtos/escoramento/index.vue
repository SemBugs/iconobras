<template>
    <section class=" mx-auto max-w-7xl">
        <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
            <h2 class="text-[#FD4C0C] text-2xl font-bold">
                Cadastro de Produtos
            </h2>
        </div>
        <div class="grid mt-8 grid-cols-5 gap-6 rounded-3xl p-8 shadow-lg  align-end">
            <NuxtLink to="/produtos/escoramento/piso" class="pointer">
                <div class="text-[#FFA242]  h-40 border border-[#FFA242] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Pisos Metálicos</p>
                    <icon-pisos class=" text-[#FFA242] " />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/escoramento/escoras" class="pointer">
                <div class="text-[#9746FE]  h-40 border border-[#9746FE] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Escoras</p>
                    <icon-escoras />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/escoramento/forcado" class="pointer">
                <div class="text-[#5dca9b]  h-40 border border-[#5dca9b] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Forcado</p>
                    <icon-forcado />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/escoramento/torres-andaimes" class="pointer">
                <div class="text-[#ca8e5d]  h-40 border border-[#ca8e5d] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Torres e Andaimes</p>
                    <icon-torres-andaimes />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/escoramento/vigas-pontaletas" class="pointer">
                <div class="text-[#c65dca]  h-40 border border-[#c65dca] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Vigas/Pontaletes</p>
                    <icon-viga-pontaletes />
                </div>
            </NuxtLink>
        </div>
    </section>
</template>