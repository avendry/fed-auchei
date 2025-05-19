import { Avatar } from "@/components/ui/avatar/Avatar"
import { HeaderProfile } from "./components/HeaderProfile"
import PerfilImage from '../../../assets/image-perfil.jpg';
import { UploadComponent } from "@/shared/components/upload/UploadComponent";

export const Profile = () => {
    return (
        <>
            <div
                className="flex flex-col gap-2"
            >

                <HeaderProfile />
                <div
                    className="bg-white rounded-sm border min-h-[700px] p-4 flex flex-row"
                >
                    <div
                        className="flex flex-col text-center gap-2 lg:max-w-40"
                    >
                        <Avatar
                            src={PerfilImage}
                            size={"xxlg"}
                            alt="Imagem de perfil"
                            rounded="circle"
                        />
                        <span
                            className="text-2xl font-semibold flex-wrap text-gray-500"
                        >
                            Mateus de Lima Veloso
                        </span>
                    </div>
                    <div className="h-96 w-[100%]">

                        <UploadComponent
                            fieldName="project_photos_file"
                            relation="projects"
                            relationId={10}
                        >

                        </UploadComponent>
                    </div>
                </div>
            </div>
        </>
    )
}