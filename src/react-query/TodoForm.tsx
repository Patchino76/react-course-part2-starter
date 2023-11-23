import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onSuccess: (savedTodo, newTodo) => {
      // 1st approach  is to invalidate the query cache, but doesn't work with the jsonplaceholder
      // queryClient.invalidateQueries({ queryKey: ["todos"] });

      //2 approach: updating the data in the cache directly
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => {
        if (!todos) return [savedTodo];
        return [...todos, savedTodo];
      });
    },
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}

      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              userId: 1,
              title: ref.current.value,
              completed: false,
            });
          ref.current!.value = "";
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">
            {addTodo.isSuccess ? <p>Add</p> : <p>Adding...</p>}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
