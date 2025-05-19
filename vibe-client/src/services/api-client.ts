import axios, { AxiosRequestConfig } from "axios";

// Interface for the response from GET request.
// The results is generic type, which means it can be reused for different type of responses
export interface Response<T> {
  count: number;
  results: T[];
}

// Connection to the API
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Class for requesting an endpoint
class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Method for getting all data from specific endpoint, eks. GET "/albums"
  getAll = (config?: AxiosRequestConfig) => axiosInstance.get<Response<T>>(this.endpoint, config).then((res) => res.data);

  // Method for inserting new row to specific endpoint, eks. POST "/test"
  post = (data: T, config?: AxiosRequestConfig) => axiosInstance.post<T>(this.endpoint, data, config).then((res) => res.data);
}

export default ApiClient;
