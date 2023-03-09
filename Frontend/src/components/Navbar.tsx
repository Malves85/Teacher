import "../style/Navbar.css"
export default function Navbar() {
    return (

        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" id="navbar">            
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" id="btn" href="/">
                    Inicio
                </a>
                </li>
            <br />
                <li className="nav-item">
                <a className="nav-link" id="btn" href="/classes">
                    Turmas
                </a>
                </li>

                <li className="nav-item">
                <a className="nav-link" id="btn" href="/students">
                    Alunos
                </a>
                </li>
            </ul>
        </nav>
    );
  }