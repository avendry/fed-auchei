import { SkipBack, SkipForward } from "lucide-react";
import clsx from "clsx";
import { ButtonUiMv } from "../ButtonUiMv/ButtonUiMv";
import { IfDirective } from "../diretiveComponents/ifDirective/ifDirective";

interface PaginationProps {
    nextPage: () => void;
    previousPage: () => void;
    totalPages: number;
    atualPage: number;
    className?: string;
    loading?: boolean;
}

export const PaginationComponent = ({
    nextPage,
    previousPage,
    totalPages,
    atualPage,
    className,
    loading,
}: PaginationProps) => {
    const renderNumberPages = () => {
        const pages = [];

        if (totalPages <= 4) {
            // Exibir todas as páginas se forem 4 ou menos
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (atualPage <= 3) {
                // Se estiver nas primeiras 3 páginas, exibe [1, 2, 3, 4, ..., totalPages]
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (atualPage >= totalPages - 2) {
                // Se estiver nas últimas 3 páginas, exibe [1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages]
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Página atual no centro, exibe [1, ..., atualPage-1, atualPage, atualPage+1, ..., totalPages]
                pages.push(1, "...", atualPage - 1, atualPage, atualPage + 1, "...", totalPages);
            }
        }

        return (
            <div className="flex flex-row gap-1 text-sm text-gray-600">
                {pages.map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => typeof page === "number" && page !== atualPage && nextPage()}
                            className={clsx(
                                "px-3 py-1 rounded-md",
                                atualPage === page ? "border-b-2 border-accent_light font-bold" : "hover:bg-gray-100"
                            )}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
        );
    };

    return (
        <div className={clsx("flex flex-row w-full items-center justify-between px-4 rounded-md border", loading ? "animate-pulse bg-gray-200" : "bg-white", className)}>
            {!loading ? (
                <>
                    <p className="block sm:hidden text-gray-400 text-sm">{totalPages} paginas</p>
                    <p className="hidden lg:block text-gray-400">Total {totalPages} páginas</p>
                    <div className="flex items-center gap-3">
                        <ButtonUiMv className="w-8" variant="secondary" onClick={previousPage} disabled={atualPage === 1}>
                            <SkipBack size={16} />
                        </ButtonUiMv>

                        {renderNumberPages()}

                        <IfDirective condition={atualPage !== totalPages}>
                            <ButtonUiMv className="w-8" variant="secondary" onClick={nextPage} disabled={atualPage === totalPages}>
                                <SkipForward size={16} />
                            </ButtonUiMv>

                        </IfDirective>
                    </div>
                </>
            ) : (
                <div className="w-full justify-center items-center flex">
                    <h6>loading...</h6>
                </div>
            )}
        </div>
    );
};

