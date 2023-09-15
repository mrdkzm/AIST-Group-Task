import './header.css'
import {
    MainLogo
} from "../assets/icons/Icons.js"
const Header: React.FC = () => {
    return (
        <header>
            <div className='logo-container'>
                <MainLogo />
                <h1 className='logo-header'>Hotlify</h1>
            </div>
        </header>
    )
}

export default Header