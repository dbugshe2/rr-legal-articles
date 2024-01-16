/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import type { RawAxiosRequestConfig } from "axios";

const APP_USER_ID = "rrleagal";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

interface AxiosServiceRequestConfig extends RawAxiosRequestConfig {
  timeoutErrorMessage?: string;
}

const axiosServiceRequestConfig: AxiosServiceRequestConfig = {
  url: "",
  method: "",
  headers: {},
  params: {},
  data: null,
  timeoutErrorMessage: "",
};

const bootstrapRequest = (config: AxiosServiceRequestConfig = axiosServiceRequestConfig) => {
  const { url, data, params, headers, ...restConfig } = config;

  const defaultHeaders = {
    "Access-Control-Allow-Origin": "*",
  };

  const allParams = {
    userId: APP_USER_ID,
    ...params,
  };

  axios.defaults.headers.post["Content-Type"] = "application/json";

  return {
    headers: { ...defaultHeaders, ...headers },
    url,
    params: { ...allParams },
    ...(data && { data }),
    ...restConfig,
  };
};

const axiosService = async (config: AxiosServiceRequestConfig = axiosServiceRequestConfig) =>
  await axios({ ...bootstrapRequest(config) });

export { axiosService };

export class ArticlesApi {
  static fetchAllArticles = async (options: AxiosServiceRequestConfig = {}) => {
    const _options: AxiosServiceRequestConfig = Object.assign(options, {
      url: BASE_URL.concat("posts"),
      method: "GET",
    });

    const response = await axiosService(_options);

    return response?.data || [];
  };

  static createArticle = async (options: AxiosServiceRequestConfig = {}) => {
    const _options: AxiosServiceRequestConfig = Object.assign(options, {
      url: BASE_URL.concat("posts"),
      method: "POST",
    });

    const response = await axiosService(_options);

    return response.data;
  };
}
