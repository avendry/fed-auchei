import Lottie from "lottie-react"
import animation from "@/assets/animations/new-404.json";
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export const Page404 = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-background_light px-4">
            <div className="text-center">
                <div className="flex justify-center">
                    <Lottie
                        className="hidden lg:flex w-[40vw]"
                        animationData={animation}
                        loop={true}
                        alt="Imagem que mostra um porco com uma moeda em cima"
                    />
                </div>
                <p className="text-xl text-muted-foreground mb-6">Oops! Página não encontrada.</p>
                <p className="text-md text-foreground/80 mb-8">
                    A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-white bg-primary hover:bg-primary/90 px-6 py-3 rounded-2xl transition duration-200"
                >
                    <ArrowLeft size={18} />
                    Voltar ao Início
                </Link>
            </div>
        </div>
    )
}