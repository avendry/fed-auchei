import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "./PasswordInput"; // ajuste o caminho conforme necessário

describe('PasswordInput Component', () => {

    it('should render the component with a label if isLabel is true', () => {
        render(<PasswordInput label="Password" isLabel={true} onBlur={jest.fn()} />);
        expect(screen.getByText("Password")).toBeInTheDocument();
    });

    it('should toggle the input type between password and text', async () => {
        const user = userEvent.setup();
        render(<PasswordInput onBlur={jest.fn()} placeholder="Enter password" />);
        
        const input = screen.getByPlaceholderText("Enter password");
        const toggleButton = screen.getByRole('button'); // certifique-se que o botão tem o papel de "button"

        // Initial input type should be password
        expect(input).toHaveAttribute('type', 'password');
        
        // Click on Pencil to unlock and show text
        await user.click(toggleButton);
        expect(input).toHaveAttribute('type', 'text');

        // Click on PencilOff to lock again and hide password
        await user.click(toggleButton);
        expect(input).toHaveAttribute('type', 'password');
    });

    it('should call onBlur with the correct value', async () => {
        const user = userEvent.setup();
        const mockOnBlur = jest.fn();

        render(<PasswordInput onBlur={mockOnBlur} placeholder="Enter password" />);

        const input = screen.getByPlaceholderText('Enter password');

        // Type in the input
        await user.type(input, 'mysecretpassword');
        
        // Trigger onBlur event
        await user.tab(); // Simula perder o foco

        expect(mockOnBlur).toHaveBeenCalledWith('mysecretpassword');
    });

    it('should initialize the input with initialValue if provided', () => {
        render(<PasswordInput initialValue="initialPassword" onBlur={jest.fn()} placeholder="Enter password" />);
        const input = screen.getByPlaceholderText('Enter password');
        expect(input).toHaveValue('initialPassword');
    });

});
