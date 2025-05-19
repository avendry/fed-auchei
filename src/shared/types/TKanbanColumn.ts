import { TKanbanCard } from "./TKanbanCard";

export type TKanbanColumn = {
    id: string;
    title: string;
    cards: TKanbanCard[];
  };