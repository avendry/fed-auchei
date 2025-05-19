export interface MenuRenderDto {
    title: string;
    items: {
        name: string;
        url_slug: string;
        order: number;
        icon: string;
    }[]
}