<template>
    <input type="text" v-model.lazy="formattedValue" v-money="money" @change="updateValue" />
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null
    }
});

const emits = defineEmits(['update:modelValue']);

const money = {
    decimal: ',',
    thousands: '.',
    precision: 2,
    masked: false
};

const formattedValue = ref(props.modelValue != null ? props.modelValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '');

const updateValue = (newValue) => {
    const thousandFixed = formattedValue.value
        .replace(/(kr|\$|£|€)/g, '')
        .trim()
        .replace(/(.+)[.,](\d+)$/g, '$1x$2')
        .replace(/[.,]/g, '')
        .replace('x', '.');
    emits('update:modelValue', parseFloat(thousandFixed));
};

watch(() => props.modelValue, (newValue) => {
    formattedValue.value = newValue != null ? newValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '';
});
</script>