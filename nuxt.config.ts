// @ts-ignore
export default defineNuxtConfig({
    devtools: false,
    app: {
        head: {
            title: 'Icon | Sistema de Gestão para sua Obra',
            titleTemplate: '%s | Sistema de Gestão para sua Obra',
            htmlAttrs: {
                lang: 'pt'
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'
                },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
                {
                    rel: 'stylesheet',
                    // href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap'
                    href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Wix+Madefor+Display:wght@400;500;600;700;800&display=swap'
                }
            ],
            script: [
                { src: 'https://maps.google.com/maps/api/js?sensor=false&key=AIzaSyCH30bIzp1euIJHFxXtu-kIP-l5PuumqKU' },
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js' }
            ]
        }
    },

    css: ['~/assets/css/app.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    modules: ['@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-directus'],

    runtimeConfig: {
        directus: {
            url: ""
        }
    },

    i18n: {
        locales: [
            { code: 'da', file: 'da.json' },
            { code: 'de', file: 'de.json' },
            { code: 'el', file: 'fr.json' },
            { code: 'en', file: 'en.json' },
            { code: 'es', file: 'es.json' },
            { code: 'fr', file: 'fr.json' },
            { code: 'hu', file: 'hu.json' },
            { code: 'it', file: 'it.json' },
            { code: 'ja', file: 'ja.json' },
            { code: 'pl', file: 'pl.json' },
            { code: 'pt', file: 'pt.json' },
            { code: 'ru', file: 'ru.json' },
            { code: 'sv', file: 'sv.json' },
            { code: 'tr', file: 'tr.json' },
            { code: 'zh', file: 'zh.json' },
            { code: 'ae', file: 'ae.json' }
        ],
        lazy: true,
        defaultLocale: 'pt',
        strategy: 'no_prefix',
        langDir: 'locales/'
    },
    vite: {
        optimizeDeps: { include: ['quill'] }
    },
    router: {
        options: { linkExactActiveClass: 'active' }
    }
});
