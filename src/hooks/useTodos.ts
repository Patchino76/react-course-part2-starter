import { useQuery } from "@tanstack/react-query";
import APIClient,{ Todo }  from "../services/queryClient";

const apiClient = new APIClient<Todo>('todos');

const useTodos = () => {

    return useQuery<Todo[], Error>({
      queryKey: ["todos"],
      queryFn:  apiClient.getTodos,
    });
  };
export default useTodos 