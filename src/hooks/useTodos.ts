import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }
  
const fetchTodos = () => {
    return axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);
  };

const useTodos = () => {
    return useQuery<Todo[], Error>({
      queryKey: ["todos"],
      queryFn: fetchTodos,
    });
  };
export default useTodos 