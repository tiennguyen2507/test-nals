import BaseService from '@/services/Base.service';
import { TRequest, TRespone } from './type';
const URL = 'api/v2/blogs';

const blogsService = {
  ...BaseService<TRequest, TRespone>(URL)
};

export type { TRequest, TRespone };
export default blogsService;
