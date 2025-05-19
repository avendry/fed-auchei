import { useEffect, useState } from "react";
import { IfDirective } from "../diretiveComponents/ifDirective/ifDirective";
import clsx from "clsx";

interface InputNumberProps {
  initialValue?: number; // Valor inicial opcional
  onBlur: (value: number) => void; // Callback ao desfocar o input
  prefix?: string | null; // Prefixo opcional (como "R$" ou outro texto)
  readonly?: boolean;
}

export const InputNumber = ({
  initialValue = 0, // Valor inicial padrão
  onBlur,
  prefix,
  readonly
}: InputNumberProps) => {
  const [value, setValue] = useState<string>(''); // Estado formatado


  // Atualiza o valor inicial quando ele muda
  useEffect(() => {
    const numberText = initialValue.toString()
    setValue(numberText);
  }, [initialValue]);

  // Função chamada ao desfocar o campo
  const handleBlur = () => {
    const valueNumber = Number(value)
    onBlur(valueNumber); // Chama o callback com o valor numérico
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value); // Atualiza o estado com o valor digitado
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
        type="number" // Tipo texto para suportar formatação
        onChange={handleChange}
        onBlur={handleBlur} // Manipula o evento de desfocar
        value={value} // Valor formatado exibido
      />
    </div>
  );
};
