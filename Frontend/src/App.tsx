import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classes from './pages/classes/Classes';
import CreateClass from './pages/classes/CreateClass';
import EditClass from './pages/classes/EditClass';
import Students from './pages/students/Students';
import './style/App.css';

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                {/* Rotas Gestão Turmas */}
                
                <Route path='/classes' element={<Classes/>} />
                <Route path='/createClass' element={<CreateClass/>} />
                <Route path='/class/:id' element={<EditClass/>} />

                {/* Rotas Gestão Alunos */}

                <Route path='/students' element={<Students/>} />
            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
