import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AxiosSelectPicker } from '../AxiosSelectPicker';

describe('AxiosSelectPicker', () => {
    const mockOptions = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
    ];

    it('testando renderização do componente', () => {
        // Passando as propriedades esperadas pela interface IAxiosSelectPicker
        render(
            <AxiosSelectPicker
                options={mockOptions}
                valueSelected={null}
                fieldNameSchema="user_fk_role_id"
                initalValueId={null} // ou algum valor inicial válido
                readonly={false} // ou true, dependendo do comportamento desejado
            />
        );

        const placeholderElement = screen.getByText('Selecione');
        expect(placeholderElement).toBeTruthy();
    });
});
