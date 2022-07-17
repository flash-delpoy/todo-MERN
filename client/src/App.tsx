import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./components/Header/Header";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { getTodos } from "./redux/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="App container pt-2">
            <TodoForm />

            <div className="row">
              <div className="col-md-12 mt-4">
                <h3>My tasks</h3>
                <TodoList />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
