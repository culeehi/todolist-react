import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Contact from './components/Contact/Contact';
import ListUser from './components/TodoListUser/ListUser';

function App() {
   return (
      <div className="App">
         <nav>
            <ul className="navbar">
               <li className="navbar-item">
                  <Link to="/"> Home</Link>
               </li>
               <li className="navbar-item">
                  <Link to="/user">Quản lý sinh viên</Link>
               </li>
               <li className="navbar-item">
                  <Link to="/contact">Contact</Link>
               </li>
            </ul>
         </nav>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<ListUser />} />
            <Route path="/contact" element={<Contact />} />
         </Routes>
      </div>
   );
}

export default App;
