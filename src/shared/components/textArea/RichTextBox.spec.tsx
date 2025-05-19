import { RichTextBox } from './RichTextBox';
import { render, screen, fireEvent } from "@testing-library/react";


const renderRichTextBox = (props = {}) => {
    return render(
        <RichTextBox 
            placeholder='Digite o texto aqui'
            onBlur={(value) => console.log(value)}
            {...props} // Merge with additional props
        />
    );
};


describe("RichTextBox", () => {
    test("Testando a renderização do componente", () => {
        renderRichTextBox()

        expect(screen.getByPlaceholderText('Digite o texto aqui')).toBeTruthy();
    })


    test("Verificando a função via props", () => {
        const mockOnBlur = jest.fn();
        renderRichTextBox({ onBlur: mockOnBlur });
    
        // Encontra o Textarea pelo placeholder
        const textarea = screen.getByPlaceholderText('Digite o texto aqui');
    
        // Simula a mudança de valor no textarea
        fireEvent.change(textarea, { target: { value: 'Teste de valor' } });
    
        // Simula o evento blur
        fireEvent.blur(textarea);
    
        // Verifica se a função onBlur foi chamada com o valor correto
        expect(mockOnBlur).toHaveBeenCalledWith('Teste de valor');
    });
})