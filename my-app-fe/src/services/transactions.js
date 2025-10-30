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
  const search = new URLSearchParams();
  if (params.months) search.set('months', String(params.months));
  if (params.type) search.set('type', params.type);
  if (params.category) search.set('category', params.category);
  if (params.startDate) search.set('startDate', params.startDate);
  if (params.endDate) search.set('endDate', params.endDate);
  const url = search.toString() ? `/transactions/summary?${search.toString()}` : '/transactions/summary';
  const res = await api.get(url);
  return res.data;
}
