import { BaseService } from './base-service';
import { api } from './api';

class OwnerService extends BaseService {
  constructor() {
    super(api);
  }

  list() {
    return this.get('/owners');
  }

  getById(id) {
    return this.get(`/owners/${id}`);
  }

  create(data) {
    return this.post('/owners', data);
  }

  update(id, data) {
    return this.put(`/owners/${id}`, data);
  }

  remove(id) {
    return this.delete(`/owners/${id}`);
  }
}

export const ownerService = new OwnerService();
