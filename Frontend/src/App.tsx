import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Classes from './pages/classes/Classes';
import CreateClass from './pages/classes/CreateClass';
import './style/App.css';

function App() {
  return (
    <div className="App">
        <ToastContainer
            bodyClassName="myToast"
            position="bottom-right"
            autoClose={5000}
            pauseOnFocusLoss={false}
            pauseOnHover={true}
            hideProgressBar={true}
        />

        <BrowserRouter>
            <Routes>
                {/* Rotas Gestão Classes */}
                
                <Route path='/classes' element={<Classes/>} />
                <Route path='/createClass' element={<CreateClass/>} />

            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
