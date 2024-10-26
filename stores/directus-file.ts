import { defineStore } from 'pinia';
import axios from 'axios';

export const useDirectusFile = defineStore('directus-file', {
    actions: {
        uploadFiles: async (arquivos: any) => {
            try {
                const headers = {
                    'Content-Type': 'multipart/form-data'
                };

                if (typeof window !== "undefined") {
                    const { token } = useDirectusToken();

                    if (token.value) {
                        headers.Authorization = `Bearer ${token.value}`;
                    }
                }

                const runtimeConfig = useRuntimeConfig();

                const response = await axios.post(`${runtimeConfig.public.directus.url}/files`, arquivos, { headers });

                return response.data.data;
            } catch (error) {
                console.error('Erro ao fazer upload dos arquivos:', error);
                throw error;
            }
        }
    }
});