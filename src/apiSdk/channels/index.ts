import axios from 'axios';
import queryString from 'query-string';
import { ChannelInterface, ChannelGetQueryInterface } from 'interfaces/channel';
import { GetQueryInterface } from '../../interfaces';

export const getChannels = async (query?: ChannelGetQueryInterface) => {
  const response = await axios.get(`/api/channels${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createChannel = async (channel: ChannelInterface) => {
  const response = await axios.post('/api/channels', channel);
  return response.data;
};

export const updateChannelById = async (id: string, channel: ChannelInterface) => {
  const response = await axios.put(`/api/channels/${id}`, channel);
  return response.data;
};

export const getChannelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/channels/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChannelById = async (id: string) => {
  const response = await axios.delete(`/api/channels/${id}`);
  return response.data;
};
