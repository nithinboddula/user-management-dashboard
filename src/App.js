import "bootstrap/dist/css/bootstrap.min.css"; //Importing bootstrap css styles
import UserList from "../src/components/UserList"; // Importing UserList component
import "./App.css"; // Importing css styles

const App = () => {
  return (
    <div className="App">
      <UserList />
    </div>
  );
};

export default App; // exporting App comopnent to render
