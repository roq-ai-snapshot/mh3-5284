import axios from 'axios';
import queryString from 'query-string';
import { SuggestedChangeInterface, SuggestedChangeGetQueryInterface } from 'interfaces/suggested-change';
import { GetQueryInterface } from '../../interfaces';

export const getSuggestedChanges = async (query?: SuggestedChangeGetQueryInterface) => {
  const response = await axios.get(`/api/suggested-changes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSuggestedChange = async (suggestedChange: SuggestedChangeInterface) => {
  const response = await axios.post('/api/suggested-changes', suggestedChange);
  return response.data;
};

export const updateSuggestedChangeById = async (id: string, suggestedChange: SuggestedChangeInterface) => {
  const response = await axios.put(`/api/suggested-changes/${id}`, suggestedChange);
  return response.data;
};

export const getSuggestedChangeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/suggested-changes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSuggestedChangeById = async (id: string) => {
  const response = await axios.delete(`/api/suggested-changes/${id}`);
  return response.data;
};
