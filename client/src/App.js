import logo from "./logo.svg";
import "./App.css";
import { TaskTracker } from "./views/taskTracker";

/* Server side url */
export const baseUrl = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <TaskTracker />
    </div>
  );
}

export default App;
