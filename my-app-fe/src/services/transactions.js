import { api } from './api';

export async function listTransactions(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type) params.set('type', filters.type);
  if (filters.category) params.set('category', filters.category);
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);
  const url = params.toString() ? `/transactions?${params.toString()}` : '/transactions';
  const res = await api.get(url);
  return res.data;
}

export async function createTransaction(data) {
  const res = await api.post('/transactions', data);
  return res.data;
}

export async function updateTransactionById(id, values) {
  const res = await api.put(`/transactions/${id}`, values);
  return res.data;
}

export async function deleteTransactionById(id) {
  await api.delete(`/transactions/${id}`);
  return id;
}

export async function getSummary(params = {}) {
  const queryParams = new URLSearchParams(params);
  const res = await api.get(`/transactions/summary?${queryParams}`);
  return res.data;
}

export async function uploadBulkTransactions(formData) {
  const res = await api.post('/transactions/bulk-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return res.data;
}
