import axios from "axios"

const axiosInstance = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com",
    });

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }

class APIClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    getTodos = () => {
        // debugger
        return axiosInstance
          .get<T[]>(this.endpoint)
          .then((res) => res.data);
    };

    postTodo = (todo: T) => {
        return axiosInstance
          .post<T>(this.endpoint, todo)
          .then((res) => res.data);
    };
  }

  export default APIClient