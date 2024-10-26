import VueTheMask from 'vue-the-mask';
import moment from 'moment';
import money from 'v-money'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueTheMask);
    nuxtApp.vueApp.use(money, { precision: 4 })

    nuxtApp.vueApp.config.globalProperties.$filters = {
        moedaBRL(value: any) {
            const formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            });

            return formatter.format(value);
        },

        toQtd(value: any) {
            const formatter = new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                currency: 'USD',
                minimumFractionDigits: 2,
            });

            return formatter.format(value);
        },

        toNumero(value: any) {
            return parseFloat(value).toFixed(2);
        },

        formatDateHora(value: any) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
            }
        },

        formatDate(value: any) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        },

        formatDateTime(value: any) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
            }
        },

        phone(v: any) {
            let r = v.replace(/\D/g, "")
            r = r.replace(/^0/, "")
            if (r.length > 10) {
                r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
            } else if (r.length > 5) {
                r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3")
            } else if (r.length > 2) {
                r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2")
            } else {
                r = r.replace(/^(\d*)/, "($1")
            }
            return r;
        },

        documento(documento: any) {
            if (!documento) {
                return '-';
            }
            let v = documento
            v = v.replace(/\D/g, "")

            if (v.length === 14) {
                v = v.replace(/^(\d{2})(\d)/, "$1.$2")
                v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
                v = v.replace(/(\d{4})(\d)/, "$1-$2")

            } else {
                v = v.replace(/(\d{3})(\d)/, "$1.$2")
                v = v.replace(/(\d{3})(\d)/, "$1.$2")
                v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            }
            return v
        }
    }
});
