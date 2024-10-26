<script setup>
    definePageMeta({
        middleware: 'auth',
    })
</script>

<template>
	<section class=" mx-auto max-w-7xl">
	 <div class="mb-5 flex justify-between items-center max-w-7xl mx-auto">
        <h2 class="text-[#FD4C0C] text-2xl font-bold">
          Escolha o Produto para o seu cadastro
        </h2>
    </div>

    <div class="grid mt-8 grid-cols-5 gap-6 rounded-3xl p-8 shadow-lg">

		<NuxtLink to="#" class="pointer">
			<div class="text-[#FD4C0C] h-40 border border-[#FD4C0C] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Emissão de Etiquetas</p>
			<icon-etiqueta />
		</div>
		</NuxtLink>

		<NuxtLink to="/produtos/lajes" class="pointer">
		<div class="text-[#95979B] h-40 border border-[#95979B] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Lajes</p>
			<icon-lajes />
		</div>
		</NuxtLink>

		<NuxtLink to="/produtos/aco" class="pointer">
		<div class="text-[#0a0a0a]  h-40 border border-[#0a0a0a] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Aço</p>
			<icon-aco />
		</div>
		</NuxtLink>

		<NuxtLink to="/produtos/escoramento" class="pointer">
		<div class="text-[#9746FE]  h-40 border border-[#9746FE] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Escoramento</p>
			<icon-escoras />
		</div>
		</NuxtLink>
		<NuxtLink to="/produtos/concreto" class="pointer">
		<div class="text-[#008ED6]  h-40 border border-[#008ED6] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Concreto</p>
			<icon-concreto />
		</div>
		</NuxtLink>

		<NuxtLink to="/produtos/madeiras/" class="pointer">
		<div class="text-[#915400]  h-40 border border-[#915400] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Madeiras</p>
			<icon-madeira />
		</div>
		</NuxtLink>

		<NuxtLink to="#" class="pointer">
		<div class="text-[#053CFF]  h-40 border border-[#053CFF] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Tubulações</p>
			<img class="w-24" src="/tubulacao.png">
		</div>
		</NuxtLink>

		<NuxtLink to="#" class="pointer">
		<div class="text-[#FD1A16]  h-40 border border-[#FD1A16] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Elétrica</p>
			<icon-telha />
		</div>
		</NuxtLink>

		<NuxtLink to="#" class="pointer">
		<div class="text-[#08A589]  h-40 border border-[#08A589] rounded-3xl flex flex-col  items-center">
			<p class="text-md font-bold py-6 ">Granito</p>
			<icon-granito />
		</div>
		</NuxtLink>
    </div>

	</section>
</template>
