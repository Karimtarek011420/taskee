import { Link} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {

  return <>
  <header className="header">
      <div className="logo">
        <Link to="/">JobsNow</Link>
      </div>
      <nav className="nav">
        <ul>
          <li className='home'>
            <Link to="/jobs">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>

    </header>

    

  
  </>
}
