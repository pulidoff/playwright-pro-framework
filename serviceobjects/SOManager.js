const BASE_URL = 'https://reqres.in/api';

class SOManager {
  constructor(request) {
    this.request = request;
    this.baseUrl = BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REQRES_API_KEY || '',
    };
  }

  // --- Users ---

  async getUsers(page = 1) {
    const res = await this.request.get(`${this.baseUrl}/users`, {
      params: { page },
      headers: this.headers,
    });
    return { status: res.status(), body: await res.json() };
  }

  async getUserById(id) {
    const res = await this.request.get(`${this.baseUrl}/users/${id}`, {
      headers: this.headers,
    });
    return { status: res.status(), body: await res.json() };
  }

  async createUser(name, job) {
    const res = await this.request.post(`${this.baseUrl}/users`, {
      headers: this.headers,
      data: { name, job },
    });
    return { status: res.status(), body: await res.json() };
  }

  async updateUser(id, name, job) {
    const res = await this.request.put(`${this.baseUrl}/users/${id}`, {
      headers: this.headers,
      data: { name, job },
    });
    return { status: res.status(), body: await res.json() };
  }

  async deleteUser(id) {
    const res = await this.request.delete(`${this.baseUrl}/users/${id}`, {
      headers: this.headers,
    });
    return { status: res.status() };
  }

  // --- Auth ---

  async register(email, password) {
    const res = await this.request.post(`${this.baseUrl}/register`, {
      headers: this.headers,
      data: { email, password },
    });
    return { status: res.status(), body: await res.json() };
  }

  async login(email, password) {
    const res = await this.request.post(`${this.baseUrl}/login`, {
      headers: this.headers,
      data: { email, password },
    });
    return { status: res.status(), body: await res.json() };
  }
}

module.exports = { SOManager };
