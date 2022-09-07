import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
   
export default App;
