import { useEffect, useState } from "react";
import { IfDirective } from "../diretiveComponents/ifDirective/ifDirective";
import clsx from "clsx";

interface InputMoneyProps {
  initialValue?: number; // Valor inicial opcional
  onBlur: (value: number) => void; // Callback ao desfocar o input
  prefix: string | null; // Prefixo opcional (como "R$" ou outro texto)
  readonly?: boolean;
}

export const InputMoney = ({
  initialValue = 0, // Valor inicial padrão
  onBlur,
  prefix,
  readonly
}: InputMoneyProps) => {
  const [value, setValue] = useState<string>("0"); // Estado formatado

  // Função para formatar valores numéricos em moeda (ou números)
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Função para remover formatação e obter valor numérico
  const parseCurrency = (value: string): number => {
    return Number(value.replace(/[^0-9,-]+/g, "").replace(",", "."));
  };

  // Atualiza o valor inicial quando ele muda
  useEffect(() => {
    setValue(formatCurrency(initialValue));
  }, [initialValue]);

  // Função chamada ao desfocar o campo
  const handleBlur = () => {
    const numericValue = parseCurrency(value); // Remove a formatação
    setValue(formatCurrency(numericValue)); // Atualiza o estado com formatação correta
    onBlur(numericValue); // Chama o callback com o valor numérico
  };

  // Função chamada ao alterar o campo
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value; // Valor digitado
    // const numericValue = parseCurrency(rawValue); // Converte para número
    setValue(rawValue); // Atualiza o estado com o valor digitado
  };

  return (
    <div className="relative">
      <IfDirective condition={prefix}>
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
      </IfDirective>
      <input
        className={clsx(
          `h-10 p-2 w-full
          focus:outline-accent_light/20
          rounded-md
          border
          border-gray-200`,
          prefix !== null ? "pl-10" : "" // Adiciona espaço para o prefixo
        )}
        disabled={readonly ?? false}
        type="text" // Tipo texto para suportar formatação
        onChange={handleChange} // Manipula alterações no input
        onBlur={handleBlur} // Manipula o evento de desfocar
        value={value} // Valor formatado exibido
      />
    </div>
  );
};
