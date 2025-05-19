import { FC } from "react";
import { PaginationComponent } from "@/shared/components/Grid/PaginationComponent";

export  const PaginationGallery: FC = () => {


    return (
        <>
            <PaginationComponent
                atualPage={1}
                nextPage={() => {}}
                previousPage={() => {}}
                totalPages={10}
                key="Pagination-gallery-component"
                className="h-14"
            />
        </>
    )
}