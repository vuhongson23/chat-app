import { deleteApi, get, getNoAuth, post, postNoAuth, put } from "@/lib/axios";
import { OptionsType } from "@/types/types";

// Auth API
export const getDataAPI = (
  url: string,
  params?: any,
  options?: OptionsType
) => {
  return get({ url, params }, options);
};

export const postDataAPI = (
  url: string,
  params?: any,
  options?: OptionsType
) => {
  return post({ url, params }, options);
};

export const putDataAPI = (
  url: string,
  params?: any,
  options?: OptionsType
) => {
  return put({ url, params }, options);
};

export const deleteDataAPI = (
  url: string,
  params?: any,
  options?: OptionsType
) => {
  return deleteApi({ url, params }, options);
};

// Public API
export const getDataAPINoAuth = (
  url: string,
  params?: any,
  options?: OptionsType
) => {
  return getNoAuth({ url, params }, options);
};

export const postDataAPINoAuth = (
  url: string,
  params?: any,
  options?: OptionsType
) => {
  return postNoAuth({ url, params }, options);
};
