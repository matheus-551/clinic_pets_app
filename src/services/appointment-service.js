import { BaseService } from './base-service';
import { api } from './api';

class AppointmentService extends BaseService {
  constructor() {
    super(api);
  }

  list() {
    return this.get('/appointments');
  }

  getById(id) {
    return this.get(`/appointments/${id}`);
  }

  create(data) {
    return this.post('/appointments', data);
  }

  update(id, data) {
    return this.put(`/appointments/${id}`, data);
  }

  remove(id) {
    return this.delete(`/appointments/${id}`);
  }
}

export const appointmentService = new AppointmentService();
