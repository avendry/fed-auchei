import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PerfilImage from '@/assets/users.png';
import { useIncreaseSideNav } from "@/shared/components/stores/IncreaseSidenav";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BadgeCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavUser: FC = () => {
    const { sideNav } = useIncreaseSideNav();
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex flex-row gap-2 items-center hover:bg-slate-400/10 hover:rounded-md cursor-pointer'>
                    <Avatar className="h-8 w-8 rounded-lg border-2 border-primary_light">
                        <AvatarImage src={PerfilImage} alt='Imagem do perfim' />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    {sideNav && (
                        <div>
                            <p className="text-base font-bold text-slate-800/70">
                                Mateus Veloso
                            </p>
                            <p className=" flex flex-row text-xs font-bold text-slate-800/40">
                                mateus@mvcode.com.br
                            </p>
                        </div>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={sideNav ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel>
                    <div className='flex flex-row gap-2 items-center'>
                        <Avatar className="h-8 w-8 rounded-lg border-2 border-primary_light">
                            <AvatarImage src={PerfilImage} alt='Imagem do perfim' />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-base font-bold text-slate-800/70">
                                Mateus Veloso
                            </p>
                            <p className=" flex flex-row text-xs font-bold text-slate-800/40">
                                mateus@mvcode.com.br
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row ">
                        <BadgeCheck className="mr-2 h4 w-4"/>
                        Account
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="flex flex-row cursor-pointer"
                    onClick={handleLogOut}
                >
                    <LogOut className="mr-2 h4 w-4" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}