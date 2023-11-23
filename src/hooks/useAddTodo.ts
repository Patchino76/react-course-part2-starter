import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import APIClient ,{ Todo, } from "../services/queryClient";

interface addTodoContext {
    previousTodos?: Todo[];
  }

const apiClient = new APIClient<Todo>('todos');
const useAddTodo = () =>
{
    
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, addTodoContext>({
    
      mutationFn:  apiClient.postTodo,
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