import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
const Header = ({ title, tagline, width }) => {
    
    return (
        <header className='header'>
            <h1>{title}</h1>
            <p className='tagline'>{tagline}</p>
            {width<992?<FaMobileAlt />:width<992?<FaTabletAlt />:<FaLaptop />}
        </header>
  )
    
}

export default Header
