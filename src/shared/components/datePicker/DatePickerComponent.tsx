import { format } from "date-fns"
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DatePickerFunctions } from "./DatePickerFunctions"
import { cn } from "@/shared/lib/utils"


interface DatePickerComponentProps {
    onBlur: (value: string) => void;
    initialValue: string;
    readonly?: boolean;
    formatDayPickerView?: string;
}


export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ onBlur, initialValue, readonly, formatDayPickerView = "PPP" }) => {
    const { dateValue, setDate } = DatePickerFunctions({ onBlur, initialValue });

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={readonly ?? false}
                        variant={"outline"}
                        className={cn(
                            "w-[100%] h-10 justify-start text-left font-normal",
                            !dateValue && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {dateValue ? format(dateValue, formatDayPickerView, { locale: ptBR }) : <span>Selecione a Data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        locale={ptBR}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}