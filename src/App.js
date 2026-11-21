import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PersonList from './PersonList';

function App() {
  return (
    <div>
      <header className="app-header text-center py-2">
        <h1>User List</h1>
      </header>
      <PersonList />
    </div>
  );
}

export default App;