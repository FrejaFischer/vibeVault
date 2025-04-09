//import axios, { AxiosRequestConfig } from "axios"; // for when we have the real API later

export interface Response<T> {
  count: number;
  results: T[];
}

// simulate a delay like a real network call
const fakeDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (): Promise<Response<T>> => {
    // This content will be replaced with axiosInstances for all the request (getAll, post entry ect.)

    let data: T[] = [];

    // endpoint for fake data
    if (this.endpoint === "/entries") {
      const { mockData } = await import("../data/mockup_data");
      data = mockData as T[];
    }

    await fakeDelay(1000); // simulate loading time, 1s

    return {
      count: data.length,
      results: data,
    };
  };
}

// It should be more like this when we have the real API

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
// });

// class ApiClient<T> {
//     private endpoint: string;

//     constructor(endpoint: string) {
//       this.endpoint = endpoint;
//     }

//     getAll = (config?: AxiosRequestConfig) => axiosInstance.get<Response<T>>(this.endpoint, config).then((res) => res.data);

//     post = (data: T, config?: AxiosRequestConfig) =>
//         axiosInstance.post<T>(this.endpoint, data, config).then((res) => res.data);
//   }

export default ApiClient;
