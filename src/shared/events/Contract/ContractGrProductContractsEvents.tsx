import { Event } from "../Event";

export class ContractGrProductContractEvents extends Event {
    // public onAdd = (value: any) => {
    //     console.log('add ::> ', value)
    // }

    public onChange = (value: any) => {
        this.setState("loadings", [
            "contract_total_value"
        ])

        this.setFieldValue("contract_total_value", this.CalculatedToTalValue(value));

        queueMicrotask(() => {
            this.setState("loadings", []);
        })
    }
    

    // public onDelete = (value: any) => {
    //     console.log('Evento :::> ',{value})
    //     this.setState("loadings",[
    //         "contract_total_value"
    //     ])

    //     this.setFieldValue("contract_total_value", this.parentFormValues?.contract_total_value - value.row.product_contract_value);
    // }

    private CalculatedToTalValue (formValues: Array<Record<string,any>>) {
        let totalValue = 0;
        formValues.forEach((value) => {
            totalValue += value.product_contract_value;
        })
        return totalValue;
    }
}