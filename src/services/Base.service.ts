import instance from '@/services';
import { AxiosResponse } from 'axios';

interface TRequest {
  TSearch?: any;
  TDetail?: any;
}

interface TRespone {
  TList: any;
}

const BaseService = <T extends TRequest, D extends TRespone>(url: string) => {
  return {
    getList: (params?: T['TSearch']): Promise<AxiosResponse<D['TList']>> => {
      return instance.get(url, { params });
    },
    getById: (id: string): Promise<AxiosResponse> => {
      return instance.get(`${url}/${id}`);
    },
    create: (data: any) => {
      return instance.post(url, data);
    },
    edit: (id: string, data: any): Promise<AxiosResponse> => {
      return instance.put(`${url}/${id}`, data);
    },
    delete: (id: string) => {
      return instance.delete(`${url}/${id}`);
    },
  };
};

export default BaseService;
