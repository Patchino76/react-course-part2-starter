import "./App.css";
import useTodos, { Todo } from "./hooks/useTodos";
import PostList from "./react-query/PostList";
import TodoList from "./react-query/TodoList";

// export interface FetchResults {
//   data: Todo[] | undefined;
//   error: Error | null;
//   isLoading: boolean;
// }
function App() {
  // const { data, error, isLoading } = useTodos();
  return (
    <>
      <PostList></PostList>
    </>
  );
}

export default App;
