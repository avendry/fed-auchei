import { Helmet } from "react-helmet-async";
import { Globals } from "../../../shared/utils/Globals";
import { NavigateProps } from "react-router-dom";

interface IDashboardPageProps extends NavigateProps {

}

export const DashboardPage = ({ }: IDashboardPageProps) => {

    return (
        <>
            <Helmet>
                <title>{Globals.product_name} - Dashboard</title>
                <meta charSet="utf-8" />
            </Helmet>
            <div>
                <div
                    className="bg-slate-500/50 pt-2 rounded-2xl flex flex-col gap-2 min-h-80 max-h-[70vh] w-full drop-shadow-md
                        lg:h-[65vh] 
                        lg:gap-5
                        lg:px-5
                    "
                >

                </div>
            </div>
        </>
    )
}