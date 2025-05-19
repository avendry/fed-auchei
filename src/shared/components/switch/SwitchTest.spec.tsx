import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch Component", () => {
    test('Teste de renderização do compoennte', () => {
        const { getByRole } = render(<Switch initialValue={false} />)
        const checkbox = getByRole('checkbox');

        expect(checkbox).not.toBeChecked();
    })

    test("Testa se o valor inicial do switch é true", () => {
        const { getByRole } = render(<Switch initialValue={true} />)
        const checkbox = getByRole('checkbox');

        expect(checkbox).toBeChecked();
    })

    test("Testa a chamada do onClick corretamente com toglle on", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        const { getByRole } = render(<Switch initialValue={false} onClick={handleClick} />)
        const checkbox = getByRole('checkbox');

        await user.click(checkbox);

        expect(handleClick).toHaveBeenCalledWith({value: true})
    })

    test("Testa a chamada do onClick corretamente com toglle off", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        const { getByRole } = render(<Switch initialValue={true} onClick={handleClick} />)
        const checkbox = getByRole('checkbox');

        await user.click(checkbox);

        expect(handleClick).toHaveBeenCalledWith({value: false})
    })

    test("Testa a alternancia entre marcado e desmarcado quando clicado", async () => {
        const user = userEvent.setup();
        const { getByRole } = render(<Switch initialValue={false} />)
        const checkbox = getByRole('checkbox');

        expect(checkbox).not.toBeChecked();


        await user.click(checkbox);
        expect(checkbox).toBeChecked();

        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();

    })
})