import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./useTodos";
import { CACHE_KEY_TODOS } from "../react-query/constants";

interface addTodoContext {
    previousTodos?: Todo[];
  }
const useAddTodo = () =>
{
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, addTodoContext>({
      mutationFn: (todo: Todo) => {
        return axios
          .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
          .then((res) => res.data);
      },
      //optimistic update
      onMutate: (newTodo: Todo) => {
        const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS);
        queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => {
          return [...(todos), newTodo];
        });
        return { previousTodos };
      },
      onSuccess: (savedTodo, newTodo) => {
        queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
          todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
        );
      },
      onError: (error, newTodo, context) => {
        if (!context) return;
  
        queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context?.previousTodos);
      },
    });

}

export default useAddTodo