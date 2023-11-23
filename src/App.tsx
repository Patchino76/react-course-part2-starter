import "./App.css";
import useTodos, { Todo } from "./hooks/useTodos";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  // const { data, error, isLoading } = useTodos();
  return (
    <>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </>
  );
}

export default App;
