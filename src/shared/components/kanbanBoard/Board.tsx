// src/components/Kanban/Board.tsx
import { TKanbanColumn } from "@/shared/types/TKanbanColumn";
import Column from "./Column";
import { TKanbanCard } from "@/shared/types/TKanbanCard";

interface BoardProps {
  columns: TKanbanColumn[];
  onDragEnd: (cardId: string, sourceColumnId: string, targetColumnId: string, projectRandonNumber: string) => void;
  onCardClick: (cardId: string) => void;
  renderCard?: (card: TKanbanCard) => React.ReactNode; 
}

export default function Board({ columns, onDragEnd, onCardClick }: BoardProps) {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {columns.map((column) => (
        <Column key={column.id} column={column} onDragEnd={onDragEnd} onCardClick={onCardClick} />
      ))}
    </div>
  );
}
