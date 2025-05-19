// import { useState } from 'react';
import Logo from '../../assets/logo.png'
import { Switch } from '@/shared/components/switch/Switch';
import { useTheme } from '../../context/ThemeProvider';
import { useState } from 'react';

const LiHover = ({ ...props }: { text: string }) => {
    return (
        <li className='relative group hover:overflow-hidden'
        >
            {props.text}
            <span className="absolute inset-0 bg-accent_light origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 h-1 bottom-0"></span>
        </li>
    )
}


export const Header = () => {
    const { setTheme } = useTheme();
    const [dark, setDark] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toogleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const toogleDark = ({ value }: { value: boolean }) => {
        if (value == true) {
            setTheme('dark')
        }
        if (value == false) {
            setTheme('')
        }
        setDark(value)
    }

    return (
        <>
            <header className=' z-20
            bg-background_light transition-all fixed top-0 left-0 right-0 w-full pt-5  h-24
            backdrop-filter backdrop-blur-md bg-opacity-75 px-10
            lsg:pr-20 lg:pl-20
            dark:bg-background_dark dark:text-background_light dark:backdrop-filter dark:backdrop-blur-md dark:bg-opacity-75
        '
            >
                <main className='flex justify-between items-center container mx-auto'>
                    <div className='flex items-center justify-start flex-row gap-4 '>
                        <img
                            alt='Imagem que descreve a logo da marca MvCode'
                            width={60}
                            height={60}
                            src={Logo}
                        />
                        <h2 className='text-3xl font-semibold'>Mv.Code</h2>
                    </div>
                    <nav className='hidden lg:flex flex-row gap-2'>
                        <div>
                            <ul className='flex flex-row gap-5 cursor-pointer'>
                                <LiHover
                                    text='Home'
                                />
                                <LiHover
                                    text='Blog'
                                />
                                <LiHover
                                    text='Setup'
                                />
                                <LiHover
                                    text='eBook'
                                />
                            </ul>
                        </div>
                        <div className='flex flex-row items-center top-0 h-6 gap-2'>
                            <Switch
                                initialValue
                                value={dark}
                                onClick={(event) => toogleDark({ value: event.value })}
                            />
                            {dark ? (
                                <i className=" fas fa-sun"></i>

                            ) : (
                                <i className="fas fa-moon"></i>
                            )}
                        </div>
                    </nav>
                    <div
                        className='w-full flex justify-end
                            lg:hidden
                    '
                    >
                        <button
                            onClick={toogleNav}
                        >
                            <i className="fas fa-bars fa-2x opacity-80"></i>
                        </button>
                    </div>
                </main>
            </header>
            <nav
                className={`bg-background_light fixed z-10 ${isNavOpen ? 'top-[95px]' : '-top-48'} 
                    transition-all
                    backdrop-filter backdrop-blur-md bg-opacity-75
                    left-0 right-0 items-center space-y-3 py-6 flex flex-col
                    lg:hidden
                    dark:bg-background_dark dark:text-background_light dark:backdrop-filter dark:backdrop-blur-md dark:bg-opacity-75
                `}
            >
                <a href="">
                    Home
                </a>
                <a href="">
                    Blog
                </a>
                <a href="">
                    Setup
                </a>
                <a href="">
                    eBook
                </a>
                <div className='flex flex-row items-center top-0 h-6 gap-2'>
                    <Switch
                        initialValue
                        onClick={(event) => toogleDark({ value: event.value })}
                        value={dark}
                    />
                    {dark ? (
                        <i className=" fas fa-sun"></i>

                    ) : (
                        <i className="fas fa-moon"></i>
                    )}
                </div>
            </nav>
        </>
    )
}