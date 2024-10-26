import { defineStore } from 'pinia';
export const useCompanySwitch = defineStore('app', {
    state: () => ({
        isOpen: false,
    }),

    actions: {
        setCompanySwitch(payload: any = null) {
            this.isOpen = payload;
        },
    },
    getters: {},
});
