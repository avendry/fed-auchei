import { useEffect, useState } from "react";
import { TKanbanColumn } from "../types/TKanbanColumn";

export const useKanban = (initialColumns: TKanbanColumn[]) => {
  const [columns, setColumns] = useState<TKanbanColumn[]>([]);

  useEffect(() => {
    // Quando os dados forem carregados, popula os columns
    if (initialColumns && initialColumns.length > 0) {
      setColumns(initialColumns);
    }
  }, [initialColumns]);

  const handleDragEnd = (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    if (sourceColumnId === targetColumnId) return;

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      const sourceColumn = updatedColumns.find((c) => c.id === sourceColumnId);
      const targetColumn = updatedColumns.find((c) => c.id === targetColumnId);
      const card = sourceColumn?.cards.find((c) => c.id === cardId);

      if (!sourceColumn || !targetColumn || !card) return prevColumns;

      // Remove do antigo
      sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== cardId);
      // Adiciona no novo
      targetColumn.cards.push(card);

      return updatedColumns;
    });
  };

  return {
    columns,
    handleDragEnd,
  };
};
