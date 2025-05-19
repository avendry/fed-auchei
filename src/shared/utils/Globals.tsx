import Logo from '../../assets/logo-maisonlly.png';

type TGlobals = {
    product_name: string,
    empress_logo: string,
    base_url: string,
    base_url_final_client: string
}



export const Globals: TGlobals = {
    product_name: 'Escala Já',
    empress_logo: Logo,
    // base_url: "https://applications-bff-maissonly-monorepo.sgzlyn.easypanel.host/",
    // base_url_final_client: "https://applications-bff-maissonly-monorepo.sgzlyn.easypanel.host/api/final-client"
    base_url: "http://localhost:3001/",
    base_url_final_client: "http://localhost:3001/"
}