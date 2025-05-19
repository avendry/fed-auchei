import { render, screen } from "@testing-library/react";
import { renderFooter } from "../renderFooterGenericFunction";

// Cria o componente mockado
const UserRenderFooter = () => <div>User Render Footer Component</div>;

// Mock do módulo GenericFooters
jest.mock('../../../genericRendersFooters/FooterHolder', () => ({
    UserRenderFooter
}));

describe('renderFooter', () => {
    test('should render the correct footer component based on viewName', () => {
        const footerRenderer = renderFooter();
        const viewName = 'User'; // Nome que corresponde ao mock
        const parentValues = {}; // Adiciona um valor para parentValues, por exemplo um objeto vazio

        const { main } = footerRenderer;
        const result = main({ viewName, parentValues });

        // Verifica se o resultado é um elemento React
        render(result);

        // Verifica se o componente renderizado é o UserRenderFooter
        expect(screen.getByText('User Render Footer Component')).toBeInTheDocument();
    });

    test('should return undefined if the footer component does not exist', () => {
        const footerRenderer = renderFooter();
        const viewName = 'NonExistent'; // Nome que não corresponde a nenhum mock
        const parentValues = {}; // Passando o parentValues, mesmo que vazio

        const { main } = footerRenderer;
        const result = main({ viewName, parentValues });

        // Verifica se o resultado é indefinido
        expect(result).toBeUndefined();
    });
});
