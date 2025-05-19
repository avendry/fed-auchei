import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe("Input Component", () => {

    test("Renderiza corretamente com valores padrão", () => {
        const handleBlur = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <Input
                initialValue="Texto inicial"
                placeholder="Digite aqui"
                label="Label"
                isLabel={true}
                onBlur={handleBlur}
            />
        );

        const input = getByPlaceholderText("Digite aqui");
        const label = getByText("Label");

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("Texto inicial");
        expect(label).toBeInTheDocument();
    });

    test("Não exibe label quando o `isLabel` é false", () => {
        const handleBlur = jest.fn();
        const { queryByText } = render(
            <Input
                initialValue="Texto inicial"
                label="Label"
                isLabel={false}
                onBlur={handleBlur}
            />
        );

        const label = queryByText("Label");
        expect(label).toBeNull();
    })

    test("Atualiza o valor quando o usuário digita", async () => {
        const user = userEvent.setup();
        const handleBlur = jest.fn();
        const { getByPlaceholderText } = render(
            <Input
                placeholder="Digite aqui"
                onBlur={handleBlur}
            />
        );
        const input = getByPlaceholderText("Digite aqui");

        await user.type(input, "Novo texto");
        expect(input).toHaveValue("Novo texto");
    });

    test("Chama `onBlur` corretamente com o valor ao perder foco", async () => {
        const user = userEvent.setup();
        const handleBlur = jest.fn();
        const { getByPlaceholderText } = render(
            <Input 
                placeholder="Digite aqui" 
                onBlur={handleBlur} 
            />
        );
        const input = getByPlaceholderText("Digite aqui");

        await user.type(input, "Texto de teste");
        await user.tab();  // Simula a perda de foco

        expect(handleBlur).toHaveBeenCalledWith("Texto de teste");
    });
})