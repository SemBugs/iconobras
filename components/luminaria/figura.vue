<template>
    <div>
        <div v-if="!disabled" class="flex gap-8">
            <div class="pb-1 max-w-[120px]">
                <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="engaste">Qtd de vigas</label>
                <input id="engaste" v-model="model.luminaria_viga" type="text" placeholder=""
                    class="form-input text-[#1B5870]" />
            </div>

            <div class="controls pb-1 max-w-[120px]">
                <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="light-count">Luminárias na
                    vigota:</label>
                <input type="number" v-model="model.luminarias" @input="updateLights(model.luminarias)" min="1"
                    max="1000" class="form-input text-[#1B5870]" />
            </div>
        </div>


        <div v-if="disabled" class="flex gap-8 pt-2">
            <div>
                <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="engaste">Qtd de vigas: {{
                    model.luminaria_viga }}</label>
            </div>

            <div class="controls">
                <label class="text-xs text-[#1B5870DB] placeholder:text-xs" for="light-count">
                    Luminárias na vigota: {{ model.luminarias }}</label>
            </div>
        </div>

        <div class="beam-container">
            <div class="beam" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag" @mouseleave="endDrag">
                <div class="bg-black h-[16px] w-[1px] absolute -top-[15px] left-[0px]"></div>
                <div class="bg-black h-[16px] w-[1px] absolute -top-[15px] right-[0px]"></div>

                <div class="bg-black h-[16px] w-[1px] absolute -bottom-[15px] left-[0px]"></div>
                <div class="bg-black h-[16px] w-[1px] absolute -bottom-[15px] right-[0px]"></div>

                <div v-for="(light, index) in lights" :key="index" class="light relative"
                    :style="{ left: (light.position / beamLength) * 100 + '%' }" @mousedown.stop="selectLight(index)">
                    <div class="bg-black h-[20px] w-[1px] absolute -top-[20px] left-[9px]"></div>
                </div>
                <div v-for="(distance, index) in distances" :key="'distance-' + index" class="distance-info"
                    :style="{ left: (distance.midpoint / beamLength) * 100 + '%' }">
                    {{ formatDistance(distance.value) }}
                </div>
                <div class="beam-length flex w-full">
                    <svg width="5" height="9" class="ml-1 mt-[3px]" viewBox="0 0 8 14" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.164852 6.62959L6.79533 0.199898C7.20906 -0.201305 8 0.0418882 8 0.570304L8 13.4297C8 13.9581 7.20906 14.2013 6.79533 13.8001L0.164852 7.37041C-0.0549501 7.15726 -0.0549501 6.84274 0.164852 6.62959Z"
                            fill="#1C274C"></path>
                    </svg>

                    <div class="bg-black h-[1px] w-full mt-[7px] flex-1"></div>

                    <div class="px-2">{{ formatDistance(beamLength) }}</div>

                    <div class="bg-black h-[1px] w-full mt-[7px] flex-1"></div>

                    <svg width="5" height="9" class="mr-1 mt-[3px]" viewBox="0 0 8 14" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.83515 6.62959L1.20467 0.199897C0.790939 -0.201306 5.852e-07 0.0418875 5.62102e-07 0.570303L0 13.4297C-2.30978e-08 13.9581 0.790938 14.2013 1.20467 13.8001L7.83515 7.37041C8.05495 7.15726 8.05495 6.84274 7.83515 6.62959Z"
                            fill="#1C274C"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const beamLength = ref(0);
const lights = reactive([]);
const dragging = ref(false);
const selectedLightIndex = ref(null);
const startX = ref(0);
const emits = defineEmits(['update:modelValue']);
const model = ref({
    luminaria_viga: 1,
    luminarias: 1
});

const props = defineProps({
    modelValue: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    tamalho: {
        default: 200
    }
});

model.value = props.modelValue;
beamLength.value = props.tamalho * 100;

const distances = computed(() => {
    let distances = [];

    if (lights.length > 0) {
        distances.push({
            value: lights[0].position,
            midpoint: lights[0].position / 2
        });

        for (let i = 0; i < lights.length - 1; i++) {
            const distanceValue = lights[i + 1].position - lights[i].position;
            const midpoint = (lights[i].position + lights[i + 1].position) / 2;
            distances.push({ value: distanceValue, midpoint });
        }

        const lastLight = lights[lights.length - 1];
        distances.push({
            value: beamLength.value - lastLight.position,
            midpoint: lastLight.position + (beamLength.value - lastLight.position) / 2
        });
    }

    return distances;
});

const updateLights = (count) => {
    const spacing = beamLength.value / (count + 1);

    console.log(model.value.lights);

    lights.length = 0;
    for (let i = 0; i < count; i++) {
        lights.push({ position: Math.round((i + 1) * spacing) });
    }

    model.value.lights = lights;

    emits('update:modelValue', model.value);
};

const initLights = () => {
    if (model.value.lights.length > 0) {

        for (let i = 0; i < model.value.lights.length; i++) {
            lights.push(model.value.lights[i]);
        }

        return;
    }

    updateLights(model.value.luminarias);
}

const selectLight = (index, event) => {
    if (props.disabled) {
        return;
    }
    dragging.value = true;
    selectedLightIndex.value = index;
    // startX.value = event.clientX;
};

const startDrag = (event) => {
    if (selectedLightIndex.value !== null) {
        startX.value = event.clientX;
    }
};

const onDrag = (event) => {
    if (dragging.value && selectedLightIndex.value !== null) {
        const beamElement = event.currentTarget;
        const beamRect = beamElement.getBoundingClientRect();
        const beamWidth = beamRect.width;
        const offsetX = event.clientX - beamRect.left;
        const positionCm = (offsetX / beamWidth) * beamLength.value;

        if (positionCm >= 0 && positionCm <= beamLength.value) {
            lights[selectedLightIndex.value].position = Math.round(positionCm);
        }
    }
};

const endDrag = () => {
    dragging.value = false;
    selectedLightIndex.value = null;
};

const formatDistance = (value) => {
    return value >= 100 ? (value / 100).toFixed(2) + 'm' : value.toFixed(2) + 'cm';
};

initLights();
</script>

<style scoped>
.beam-container {
    padding-top: 20px;
}

.beam {
    position: relative;
    height: 30px;
    background-color: #ddd;
    margin-bottom: 20px;
    cursor: pointer;
    width: 100%;
}

.light {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background-color: yellow;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
}

.light:active {
    cursor: grabbing;
}

.distance-info {
    position: absolute;
    top: -25px;
    transform: translateX(-50%);
    font-size: 12px;
    background: rgba(255, 255, 255, 0.8);
    padding: 2px 5px;
    border-radius: 3px;
    pointer-events: none;
}

.beam-length {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #333;
    pointer-events: none;
}

.controls {
    margin-bottom: 20px;
}
</style>