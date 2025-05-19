import { ReactNode } from "react";

interface TimelineDescriptionProps {
    children: ReactNode
}


export const TimelineDescription = ({children}: TimelineDescriptionProps) => {


    return (
        <p
            className='text-secundary_dark text-opacity-60
                dark:text-text_dark dark:text-opacity-60
            '
        >
            {children}
            {/* Fui Promovido nesse momento a desenvolvedor pleno com resposabilidade de criar novas aplicações e manter
            as mais diversas e antigas aplicações, também estou com responsabilidade para cuidar e gerenciar 3 projetos
            aonde não apenas sou responsável pelo meu codigo, como no treinamento e Code Review de codigos de terceiros */}
        </p>
    )
}