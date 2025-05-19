// src/components/Kanban/Column.tsx

import { TKanbanColumn } from "@/shared/types/TKanbanColumn";
import Card from "./Card";
import { TKanbanCard } from "@/shared/types/TKanbanCard";

interface ColumnProps {
    column: TKanbanColumn;
    onDragEnd: (cardId: string, sourceColumnId: string, targetColumnId: string, projectRandonNumber: string) => void;
    onCardClick: (cardId: string) => void;
    renderCard?: (card: TKanbanCard) => React.ReactNode;
}

export default function Column({ column, onDragEnd, onCardClick, renderCard }: ColumnProps) {
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const dataCardAndoColumnIds = event.dataTransfer.getData("application/json");
        const { cardId, targetColumnId, projectRandonNumber } = JSON.parse(dataCardAndoColumnIds)
        onDragEnd(cardId, targetColumnId, column.id, projectRandonNumber);
    };

    return (
        <div
            className="bg-gray-100 rounded-lg min-w-[250px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className="p-2">
                <div className="bg-slate-200 h-10 rounded-sm content-center">
                    <h2 className="font-semibold text-lg ml-2 text-slate-900">{column.title}</h2>
                </div>

            </div>
            <div className="px-3 pb-3 mt-2">
                <div className="flex flex-col gap-2">
                    {column.cards.map((card) => (
                        renderCard ? renderCard(card) : <Card key={card.id} card={card} column={column} onCardClick={onCardClick} />
                    ))}
                </div>
            </div>
        </div>
    );
}
