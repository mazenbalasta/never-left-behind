import { logo } from '../assets/images'
import { hamburgerMenu } from 'assets/icons'

const Nav = () => {
    return (
        <header className="padding-x py-8 absolute z-10 w-full"> Yup
            <nav className="flex justify-between items-center max-container">
                <a href='/'>
                    <img src={logo} alt="logo" width={130} height={29} />
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className='font-montserrat leading-normal text-lg'>{item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
