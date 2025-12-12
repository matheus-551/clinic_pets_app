export class BaseService {
  constructor(api) {
    this.api = api;
  }

  async request(method, url, data = null) {
    try {
      const response = await this.api[method](url, data);
      return response.data;
    } catch (error) {
      // Sem internet ou servidor offline
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Sem conexão com a internet ou servidor indisponível.');
      }

      // Erro 400 (Bad Request)
      if (error.response?.status === 400) {
        throw new Error(
          error.response.data?.error ?? 'Erro de validação na requisição.'
        );
      }

      // Qualquer outro erro
      throw new Error(
        error.response?.data?.error ?? 'Erro inesperado ao processar sua requisição.'
      );
    }
  }

  get(url) {
    return this.request('get', url);
  }

  post(url, data) {
    return this.request('post', url, data);
  }

  put(url, data) {
    return this.request('put', url, data);
  }

  delete(url) {
    return this.request('delete', url);
  }
}
