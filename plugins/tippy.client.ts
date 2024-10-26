import { TippyPlugin } from 'tippy.vue';
import 'tippy.js/dist/tippy.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(TippyPlugin);
});
