import { useIncreaseSideNav } from '../../shared/components/stores/IncreaseSidenav';
import { SideNav } from "../../shared/components/sideNav/SideNav";
import { useLocation } from "react-router-dom";
import { MenuAndModules } from "../../shared/components/menusAndModules/MenuAndModules";
import PerfilImage from '@/assets/users.png';
import { Navbar } from '@/shared/components/header/navBar';
import { CoinDisplay } from '@/shared/components/coindisplay/CoinDisplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavUser } from './NavUser';


interface DefaultRenderBodyProps {
    children?: React.ReactNode
    titleName?: string
    location?: Location
}


const DefaultRenderBody = ({ children }: DefaultRenderBodyProps) => {
    const { sideNav } = useIncreaseSideNav();
    const location = useLocation();

    return (
        <>
            <div
                // className="h-100vh"
                className="h-screen max-w-screen"
            >
                <div
                    // className="min-h-screen"
                    className={`
                        lg:flex flex-row-reverse ${sideNav ? 'gap-3' : 'gap-3'} transition-all duration-75
                    `}
                >
                    {/* <HeaderComponent /> */}
                    <div
                        className="w-full h-screen"
                    >
                        <div
                            className="h-[7%] z-50 relative"
                        >
                            <Navbar.Root
                            >
                                {/* <Navbar.Item>
                                    Home / Dashboard
                                </Navbar.Item> */}
                                <Navbar.AvatarHeader
                                    className="flex flex-row gap-4 justify-center items-center"
                                >
                                    <i className="fas fa-bell fa-lg drop-shadow-md"></i>
                                    <CoinDisplay />
                                </Navbar.AvatarHeader>
                            </Navbar.Root>

                        </div>
                        <div
                            className="px-5 h-[90%]  pt-5 overflow-auto flex flex-col z-10"
                        >
                            <div
                                className="h-[90%]"
                            >
                                {children}
                            </div>
                            {/* <div
                                className="flex justify-center items-center p-5 h-[5%]"
                            >
                                <p
                                    className="text-sm flex flex-row gap-1 items-center"
                                >
                                    desenvolvido por <LinkComponent href="https://mvcode.com.br" target="_blank">MvCode</LinkComponent> <i className="fas fa-heart text-red-600"></i>
                                </p>
                            </div> */}
                        </div>
                    </div>
                    <SideNav
                        footerComponent={
                            <>
                                <NavUser/>
                            </>
                        }
                    >
                        <MenuAndModules
                            location={location.pathname}
                        />
                    </SideNav>
                </div>
            </div>
        </>
    )
}

export default DefaultRenderBody