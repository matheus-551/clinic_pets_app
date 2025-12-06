import { BaseService } from './base-service';
import { api } from './api';

class PetService extends BaseService {
  constructor() {
    super(api);
  }

  list() {
    return this.get('/pets');
  }

  getById(id) {
    return this.get(`/pets/${id}`);
  }

  create(data) {
    return this.post('/pets', data);
  }

  update(id, data) {
    return this.put(`/pets/${id}`, data);
  }

  remove(id) {
    return this.delete(`/pets/${id}`);
  }
}

export const petService = new PetService();
