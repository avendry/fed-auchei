import { useNavigate } from "react-router-dom";

export const AvatarHeaderFunctions = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate('/login')
    }

    return {
        handleLogOut
    }
}