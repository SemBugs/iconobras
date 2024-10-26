<script type="ts" setup>
const props = defineProps(['item', 'edit'])
</script>

<template>
    <div>
        <div class="max-w-[700px]">
            <div class="flex">
                <client-only>
                    <div v-for="p in parseInt(item.luminaria) + 1" :index="p" class="flex-1">
                        <div
                            class="relative flex items-center justify-center bg-white px-2 pb-5 border-l border-r border-white-dark">
                            <div>
                                <svg width="5" height="9" viewBox="0 0 8 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.164852 6.62959L6.79533 0.199898C7.20906 -0.201305 8 0.0418882 8 0.570304L8 13.4297C8 13.9581 7.20906 14.2013 6.79533 13.8001L0.164852 7.37041C-0.0549501 7.15726 -0.0549501 6.84274 0.164852 6.62959Z"
                                        fill="#1C274C" />
                                </svg>

                            </div>
                            <div class="flex-1 text-center relative">
                                <div v-if="!edit" class="bg-blue-100 mx-auto w-[60px] relative z-10 rounded-md">
                                    0,50cm
                                </div>
                                <input v-if="edit" type="text"
                                    class="bg-blue-100 mx-auto w-[60px] relative z-10 rounded-md text-center">
                                <div class="h-[2px] w-full bg-white-dark absolute top-[10px]"></div>
                            </div>
                            <div>
                                <svg width="5" height="9" viewBox="0 0 8 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.83515 6.62959L1.20467 0.199897C0.790939 -0.201306 5.852e-07 0.0418875 5.62102e-07 0.570303L0 13.4297C-2.30978e-08 13.9581 0.790938 14.2013 1.20467 13.8001L7.83515 7.37041C8.05495 7.15726 8.05495 6.84274 7.83515 6.62959Z"
                                        fill="#1C274C" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </client-only>
            </div>

            <div class="h-[50px] bg-gray-200">
                <div class="flex">
                    <div v-for="p in parseInt(item.luminaria)" :index="p" class="flex-1">
                        <div class="bg-green-900 p-4 m-2 rounded-full w-5 float-right mr-[-15px] z-[1] relative">
                        </div>
                    </div>
                    <div class="flex-1"></div>
                </div>
            </div>

            <div>
                <div
                    class="relative flex items-center justify-center bg-white px-2 pt-5 border-l border-r border-white-dark">
                    <div>
                        <svg width="5" height="9" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.164852 6.62959L6.79533 0.199898C7.20906 -0.201305 8 0.0418882 8 0.570304L8 13.4297C8 13.9581 7.20906 14.2013 6.79533 13.8001L0.164852 7.37041C-0.0549501 7.15726 -0.0549501 6.84274 0.164852 6.62959Z"
                                fill="#1C274C" />
                        </svg>
                    </div>
                    <div class="flex-1 text-center relative">
                        <div class="bg-blue-100 mx-auto w-[60px] relative z-10 rounded-md">
                            {{ ((parseInt(item.luminaria) + 1) * 0.50).toFixed(2) }}
                        </div>
                        <div class="h-[2px] w-full bg-white-dark absolute top-[10px]"></div>
                    </div>
                    <div>
                        <svg width="5" height="9" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.83515 6.62959L1.20467 0.199897C0.790939 -0.201306 5.852e-07 0.0418875 5.62102e-07 0.570303L0 13.4297C-2.30978e-08 13.9581 0.790938 14.2013 1.20467 13.8001L7.83515 7.37041C8.05495 7.15726 8.05495 6.84274 7.83515 6.62959Z"
                                fill="#1C274C" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>