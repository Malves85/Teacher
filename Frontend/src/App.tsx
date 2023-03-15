import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Classes from './pages/classes/Classes';
import CreateClass from './pages/classes/CreateClass';
import EditClass from './pages/classes/EditClass';
import './style/App.css';

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                {/* Rotas Gestão Classes */}
                
                <Route path='/classes' element={<Classes/>} />
                <Route path='/createClass' element={<CreateClass/>} />
                <Route path='/class/:id' element={<EditClass/>} />

            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
