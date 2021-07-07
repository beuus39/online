import http from '@/http-common'

const API_URL_ROOT_WORKFLOW = 'workflows'

class WorkflowService {
    getAll() {
        return http.get(`${API_URL_ROOT_WORKFLOW}`);
    }

    get(id: string) {
        return http.get(`/${API_URL_ROOT_WORKFLOW}/${id}`)
    }

    create(data: any) {
        return http.post(`${API_URL_ROOT_WORKFLOW}`, data)
    }

    update(id: string, data: any) {
        return http.put(`/${API_URL_ROOT_WORKFLOW}/${id}`, data)
    }
}

export default new WorkflowService();