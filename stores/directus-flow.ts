import { defineStore } from 'pinia';
import axios from 'axios';

export const useDirectusFlow = defineStore('directus-flow', {
    actions: {
        post: async (id: String, body: any) => {
            try {
                const headers = {
                    'Content-Type': 'application/json'
                };

                if (typeof window !== "undefined") {
                    const { token } = useDirectusToken();

                    if (token.value) {
                        headers.Authorization = `Bearer ${token.value}`;
                    }
                }

                const runtimeConfig = useRuntimeConfig();

                const response = await axios.post(`${runtimeConfig.public.directus.url}/flows/trigger/${id}`, body, { headers });

                return response.data;
            } catch (error) {
                console.error('Erro ao fazer upload dos arquivos:', error);
                throw error;
            }
        },
        get: async (id: String, params: any) => {
            const headers = {
                'Content-Type': 'application/json'
            };

            try {
                if (typeof window !== "undefined") {
                    const { token } = useDirectusToken();

                    if (token.value) {
                        headers.Authorization = `Bearer ${token.value}`;
                    }
                }

                const runtimeConfig = useRuntimeConfig();

                const response = await axios.get(`${runtimeConfig.public.directus.url}/flows/trigger/${id}`, { params, headers });

                return response.data;
            } catch (error) {
                console.error('Erro ao fazer upload dos arquivos:', error);
                throw error;
            }
        }
    }
});