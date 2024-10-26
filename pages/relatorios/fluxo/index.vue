<template>
    <section>
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#1B5870]">Fluxo de Caixa</h2>

            </div>

            <div class="pt-5">
                <div class="mb-6">
                    <div class="panel h-full">
                        <div v-if="!results" class="py-5">
                            <el-skeleton :rows="5" animated />
                        </div>

                        <div v-if="results" class="relative">
                            <client-only>
                                <apexchart height="325" :options="revenueChart" :series="revenueSeries"
                                           class="rounded-lg bg-white dark:bg-black">
                                    <!-- loader -->
                                    <div
                                        class="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span
                                        class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                                    </div>
                                </apexchart>
                            </client-only>
                        </div>

                        <div style="overflow: auto;">
                            <table v-if="results" class="mt-10" striped>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th v-for="(item, i) in revenueChart.labels" :key="i">
                                        {{ item }}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><b>Vendas</b></td>
                                    <td v-for="(item, i) in revenueSeries[0].data" :key="i">
                                        {{ $filters.moedaBRL(item) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Despesas</b></td>
                                    <td v-for="(item, i) in revenueSeries[1].data" :key="i">
                                        {{ $filters.moedaBRL(item) }}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TabelaGrande -->
            <div class="table-responsive mt-12 rounded-2xl bg-[#f3f3f3]">
                <table>
                    <thead class="text-boton text-normal">
                    <tr>
                        <th></th>
                        <th>Janeiro</th>
                        <th>Fevereiro</th>
                        <th>Março</th>
                        <th>Abril</th>
                        <th>Maio</th>
                        <th>Junho</th>
                        <th>Julho</th>
                        <th>Agosto</th>
                        <th>Setembro</th>
                        <th>Outubro</th>
                        <th>Novembro</th>
                        <th>Dezembro</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white">
                    <tr>
                        <td class="font-bold">Vendas</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                    </tr>
                    <tr>
                        <td class="font-bold">Despesas</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                        <td>R$ 0,00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import { useAppStore } from '@/stores/index';

    const store = useAppStore();

    useHead({ title: 'Clientes' });
    definePageMeta({
        middleware: 'auth'
    });

    onMounted(() => {
        getTotal();
        nextTick(() => {
            window.dispatchEvent(new Event('resize'));
        });
    });

    const dinheiro = (value: any) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
        return formatter.format(value);
    };

    // revenue
    const revenueChart = computed(() => {
        const isDark = store.theme === 'dark' ? true : false;
        const isRtl = store.rtlClass === 'rtl' ? true : false;
        return {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Sen, sans-serif',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square'
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22
            },
            colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
            markers: {
                discrete: [
                    {
                        fillColor: '#1b55e2',
                        strokeColor: 'transparent',
                        size: 7
                    },
                    {
                        fillColor: '#e7515a',
                        strokeColor: 'transparent',
                        size: 7
                    }
                ]
            },
            labels: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    show: true
                },
                labels: {
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title'
                    }
                }
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (number: number) => {
                        const formatter = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2
                        });
                        const value = formatter.format(number);
                        return value;
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title'
                    }
                },
                opposite: isRtl ? true : false
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5
                }
            },
            tooltip: {
                marker: false,
                y: {
                    formatter(number: any) {
                        const formatter = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2
                        });
                        const value = formatter.format(number);
                        return value;
                    }
                },
                theme: isDark ? 'dark' : 'light'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100]
                }
            }
        };
    });

    const revenueSeries = ref([
        {
            name: 'Vendas',
            data: []
        },
        {
            name: 'Despesas',
            data: []
        }
    ]);

</script>
