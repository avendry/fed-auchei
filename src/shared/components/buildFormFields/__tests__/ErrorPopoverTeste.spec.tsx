import { render, screen } from "@testing-library/react"
import { ErrorPopover } from "../components/ErrorPopover"



describe("ErrorPopoverComponent", () => {
    test("Testando a renderização do componente", () => {
        const { queryByText } = render(
            <ErrorPopover label="teste" />
        );

        const label = queryByText("teste");

        expect(label).toHaveTextContent("teste")

        screen
    })
})