export default function Navbar() {
    return (
        <div className="navbar">
            <nav className="navbar navbar-expand-lg">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                        <b>Inicio</b>
                    </a>
                    </li>
                
                    <li className="nav-item">
                    <a className="nav-link active" href="/classes">
                        <b>Turmas</b>
                    </a>
                    </li>

                    <li className="nav-item">
                    <a className="nav-link active" href="/students">
                        <b>Alunos</b>
                    </a>
                    </li>
                </ul>
            </nav>
      </div>
    );
  }