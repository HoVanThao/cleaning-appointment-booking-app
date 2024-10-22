import logo from '../assets/images/logo.svg';
import logo2 from '../assets/images/Logo(2)5050.png' ;
const Logo = () => {
    return (
        <div>
            <img src={logo2} />
            <img src={logo} alt='House Management' className='logo' />
        </div>
        
        
    )
}

export default Logo;