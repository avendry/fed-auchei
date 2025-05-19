import { render, screen } from "@testing-library/react";
import { IfDirective } from "./ifDirective";


describe("If Directive", () => {

    test("Testando a renderização pelo ifDirective", () => {
        render(
            <IfDirective condition={true}>
                <p>Renderiza componente</p>
            </IfDirective>
        )

        expect(screen.getByText("Renderiza componente")).toBeInTheDocument();
    })


    test("Testando quando rederiza null se a condição for falsa", () => {
        const { container } = render(
            <IfDirective condition={false}>
                <p>Condição falsa!</p>
            </IfDirective>
        );

        expect(container).toBeEmptyDOMElement();
    })


    test("renderiza dinamicamente baseado na condição", () => {
        const dynamicCondition = "ok";

        render(
            <IfDirective condition={dynamicCondition === "ok"}>
                <p>Condição dinamica</p>
            </IfDirective>
        );

        expect(screen.getByText("Condição dinamica")).toBeInTheDocument();
    })
})