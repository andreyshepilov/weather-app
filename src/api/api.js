import axios from 'axios';

export class API {
  constructor(domain, options = {}) {
    this.axios = axios.create({
      baseURL: domain,
      ...options
    });

    const createMethod = method => {
      this[method] = this._createRequest(method);
    };

    ['get', 'post', 'patch', 'put', 'delete'].forEach(createMethod);
  }

  _createRequest(method) {
    return async function(url, body, config) {
        const response = await this.axios[method](url, body, config);
        return (response && response.data) || null;
    };
  }
}
