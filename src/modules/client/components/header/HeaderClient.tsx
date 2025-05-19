import { Helmet } from "react-helmet";
import { HeaderFunctions } from "./HeaderFunctions";
import { Globals } from "@/shared/utils/Globals";

export const HeaderCLient = () => {
    const { } = HeaderFunctions();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{Globals.product_name} | Aréa do Cliente</title>
            </Helmet>
            <header
                className="bg-emerald-700/60 w-full h-24 flex flex-row px-2 rounded-b-lg shadow-horizontal-lg
                lg:px-20"
            >
                <div className="w-[25%] items-center justify-center content-center">
                    <img alt="Imagem que mostra o logo da marca" src={Globals.empress_logo} width={90} height={70} />
                </div>
            </header>
        </>
    )
}