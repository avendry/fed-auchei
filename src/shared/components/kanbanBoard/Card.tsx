// src/components/Kanban/Card.tsx

import { TKanbanCard } from "@/shared/types/TKanbanCard";
import { TKanbanColumn } from "@/shared/types/TKanbanColumn";

interface CardProps {
  card: TKanbanCard;
  column: TKanbanColumn;
  onCardClick: (cardId: string) => void;
}

export default function Card({ card, column, onCardClick }: CardProps) {
  const handleDragStart = (event: React.DragEvent) => {
    const dataJson = {cardId: card.id, targetColumnId: column.id, projectRandonNumber: card.title};
    event.dataTransfer.setData("application/json", JSON.stringify(dataJson));
  };

  return (
    <div
      className="bg-white p-2 rounded-md shadow cursor-grab"
      draggable
      onDragStart={handleDragStart}
      onClick={() => onCardClick(card.id)}
    >
      <h3 className="font-medium">{card.title}</h3>
    </div>
  );
}
