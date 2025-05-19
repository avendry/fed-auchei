interface IEditAddPageProps {

}


type MethodType = 'edit' | 'add' | 'view';
type Params = {
    id: string;
    module: string;
    crud: string;
    method: MethodType;
};




export type {
    IEditAddPageProps,
    Params,
    MethodType
}