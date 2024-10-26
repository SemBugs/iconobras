<template>
    <section class=" mx-auto max-w-7xl justify-center">
        <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
            <h2 class="text-[#FD4C0C] text-2xl font-bold">
                Cadastro de Produtos
            </h2>
        </div>
        <div class="grid mt-8 grid-cols-5 gap-6 rounded-3xl p-8 shadow-lg  align-end">
            <NuxtLink to="/produtos/madeiras/pontaletes/" class="pointer">
                <div class="text-[#4085a8]  h-40 border border-[#4085a8] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Pontaletes</p>
                    <icon-pontaletes />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/madeiras/tabuas/" class="pointer">
                <div class="text-[#4085a8]  h-40 border border-[#4085a8] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Tábuas</p>
                    <icon-tabuas />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/madeiras/madeirites/" class="pointer">
                <div class="text-[#4085a8]  h-40 border border-[#4085a8] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Madeirites</p>
                    <icon-madeirites />
                </div>
            </NuxtLink>
            <NuxtLink to="/produtos/madeiras/eucaliptos/" class="pointer">
                <div class="text-[#4085a8]  h-40 border border-[#4085a8] rounded-3xl flex flex-col  items-center">
                    <p class="text-md font-bold py-6 ">Eucaliptos</p>
                    <icon-eucaliptos />
                </div>
            </NuxtLink>
        </div>
    </section>
</template>