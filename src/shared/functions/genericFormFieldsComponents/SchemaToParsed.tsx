import { format } from "date-fns";

export const SchemaToParsed = (params: { fieldType: string, value: any, key: string, dataOriginal: Record<string, any> }): any => {
    try {
        const { fieldType, value, key, dataOriginal } = params;
        let valueOutput = value;
        switch (fieldType) {
            case "checkbox":
                if (value) {
                    valueOutput = "Sim";
                } else {
                    valueOutput = "Não";
                }
                break;
            case "select": {
                let relationTable: string | undefined;
                if (key) {
                    const splitResult = key.split("_fk_");
                    if (splitResult.length > 1) {
                        relationTable = splitResult[1].split("_id").shift();
                    }
                }
                valueOutput = dataOriginal[`${relationTable}`][`${relationTable}_name`];
            }
                break;
            case "date":
                if (value) {
                    valueOutput = format(value, "dd/MM/yyyy");
                }
                break;
            case "money": {
                const num = Number(value) || 0; // Garante que seja um número válido
                valueOutput = num.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });
            }
                break;
        }
        return valueOutput
    } catch (e) {
        console.log(e)
    }
}