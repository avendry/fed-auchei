import { Avatar } from "@/components/ui/avatar/Avatar";
import PerfilImage from '../../../assets/users.png';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
import { AvatarHeaderFunctions } from "./AvatarHeaderFuntions";


export const AvatarHeader = () => {
    const { handleLogOut } = AvatarHeaderFunctions();

    return (
        <>
            <DropdownMenu
                key="avatar-header"
            >
                <DropdownMenuTrigger>
                    <Avatar
                        src={PerfilImage}
                        alt="Imagem de perfil"
                        rounded="circle"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup
                    >
                        {/* <DropdownMenuItem
                            className="cursor-pointer"
                        >
                            <User className="mr-2 h4 w-4" />
                            <span>Perfil</span>
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleLogOut}
                        >
                            <LogOut className="mr-2 h4 w-4" />
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}