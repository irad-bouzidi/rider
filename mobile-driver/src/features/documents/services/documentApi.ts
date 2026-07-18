import { apiClient } from '../../../services/api/client';
import { ENDPOINTS } from '../../../shared/constants/api';
export const documentApi = {
  getStatus: async () => { const { data } = await apiClient.get(ENDPOINTS.driver.documents); return data.data; },
  upload: async (type: string, uri: string) => {
    const form = new FormData();
    form.append('file', { uri, type: 'image/jpeg', name: `${type}.jpg` } as any);
    form.append('type', type);
    const { data } = await apiClient.post(ENDPOINTS.driver.uploadDocument, form, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data.data;
  },
};
