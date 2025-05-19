import { MethodType } from "@/modules/admin/crud/editAddPage/utils/interfaces/IEditAddPage";
import { useEffect, useState } from 'react';
import { Input } from "../input/Input";
import { Switch } from "../switch/Switch";
import { InputNumber } from "../inputNumber/InputNumber";
import { AxiosSelectPicker } from "../select/AxiosSelectPicker";
import clsx from "clsx";
import { RichTextBox } from "../textArea/RichTextBox";
import { Skeleton } from "@/components/ui/skeleton";
import { setStateBuildForm } from "./utils/functions/setStateBuildForm";
import { maipulatedEventsFunctions } from "./utils/functions/manipulatedEvents";
import { PasswordInput } from "../inputPassword/PasswordInput";
import { ButtonUiMv } from "../ButtonUiMv/ButtonUiMv";
import { IValidationFieldsService } from "./interface/IValidationFieldsService";
import { validationFieldsService } from "./utils/functions/validationFieldsService";
import { FieldErrorDto } from "./dtos/FieldErrorDto";
import { ErrorPopover } from "./components/ErrorPopover";
import { find } from "lodash";
import { IfDirective } from "../diretiveComponents/ifDirective/ifDirective";
import { DatePickerComponent } from "../datePicker/DatePickerComponent";
import { UploadComponent } from "../upload/UploadComponent";
import { GridFormFields } from "./components/gridFormFields/GridFormFields";
import { Button } from "@/components/ui/button";
import { InputMoney } from "../inputNumber/InputMoney";
import * as CustomComponentList from "@/shared/components/customComponents/CustomComponentList";
import { RenderCustomComponents } from "../customComponents/RenderCustomComponents";



interface IBuildFormFieldsProps {
    crud: string;
    method: MethodType | undefined;
    id: string | number;
    fieldSchema: Record<string, any>;
    dataValues: Record<string, any>;
    onSave: (formValuesFormFields: Record<string, any>, callback: () => void) => void;
    handleDelete: () => void;
    renderFooterComponent?: JSX.Element | undefined;
    isModal?: boolean;
    handleClose?: () => void;
}



export const BuildFormFields = ({
    method,
    crud,
    id,
    fieldSchema,
    dataValues,
    onSave,
    handleDelete,
    renderFooterComponent,
    isModal,
    handleClose
}: IBuildFormFieldsProps) => {
    // constState
    const [loading, setLoading] = useState(false);
    const [loadingsField, setLoadingsFields] = useState<string[]>([]);
    const [loadingComponents, setLoadingComponents] = useState(false)
    const [errors, setErrors] = useState<FieldErrorDto[]>([]);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [fieldsSchemaManipulated, setFieldsSchemaManipulated] = useState<Record<string, any>>({})
    // const [genericEventHandler, setGenericEventHandler] = useState<null | Event>(null);

    const onChangeInput = (inputValue: any, columnName: string) => {
        if (formValues && formValues[columnName] !== inputValue) {
            setFormValues(prevValues => ({ ...prevValues, [columnName]: inputValue }));
        }
    };

    const onChangeGrid = (gridName: string, gridFormValues: any) => {
        if (gridName && formValues[gridName] !== gridFormValues) {
            setFormValues(prevValues => ({ ...prevValues, [gridName]: gridFormValues }));
        }
    }

    const { setExternalFieldValue, setFieldProperty, setStateProperty } = setStateBuildForm(
        setLoadingsFields,
        onChangeInput,
        setFieldsSchemaManipulated
    );
    const manipulatedEvents = maipulatedEventsFunctions(
        setStateProperty,
        setExternalFieldValue,
        setFieldProperty,
        formValues,
        dataValues
    );
    const validationFields: IValidationFieldsService = validationFieldsService();

    useEffect(() => {
        setLoading(true)
        if (crud && method) {
            manipulatedEvents.getInitialEvent(crud, method);
            if (fieldSchema) {
                setFieldsSchemaManipulated(fieldSchema)
            }
            if (Object.keys(dataValues).length > 0) {
                setFormValues(dataValues ?? {});
            }
            setLoading(false)
        }
    }, [dataValues])

    const handleSave = () => {
        setLoadingComponents(true)
        const validationResult = validationFields.execute(formValues, fieldSchema);
        if (validationResult.length > 0) {
            setErrors(validationResult);
            setLoadingComponents(false)
            return;
        }
        onSave(formValues, () => {
            setFormValues({})
            setLoadingComponents(false)
        })
    }

    const renderErros = (fieldName: string) => {
        if (find(errors, { "fieldName": fieldName })) {
            return <ErrorPopover key={`${fieldName}-error`} label={find(errors, { "fieldName": fieldName })?.errorDescription ?? ""} />
        }
        return null;
    }



    const renderColumnsFields = () => {
        const outPutHtml: any[] = [];
        const sortedEntriesFieldSchema = Object.entries(fieldsSchemaManipulated).sort(([, propertyA], [, propertyB]) => {
            return propertyA.order - propertyB.order
        })

        for (const [key, property] of Object.entries(sortedEntriesFieldSchema)) {
            const fieldName = property[0];
            const fieldProperties = property[1];
            const widthClass = `lg:col-span-${property[1].width}`;
            try {
                let instancedClassEvents: Record<string, any> | null = null;
                const onEvents: Record<string, any> = {};
                // console.log('teste ', property[0])
                if (manipulatedEvents.checkExistingEvent(fieldName)) {
                    instancedClassEvents = manipulatedEvents.getEventByField(fieldName);

                    for (const itemFunction in instancedClassEvents) {
                        if (itemFunction !== "render" && itemFunction !== "callback" && itemFunction !== "setState" && itemFunction !== "setValue" && itemFunction !== "setProperties") {
                            onEvents[itemFunction] = instancedClassEvents[itemFunction]
                        }
                    }
                }
                if (loadingsField.includes(fieldName)) {
                    outPutHtml.push(
                        <fieldset
                            className={clsx('col-span-6 space-y-2', `${widthClass}`, 'flex flex-col justify-center')}
                        >
                            <Skeleton className="h-4 max-w-full" />
                            <Skeleton className="h-4 max-w-full" />
                        </fieldset>
                    )
                } else {
                    // if (!fieldProperties.hidden) {
                    const isViewHtml = fieldProperties.hidden && fieldProperties.hidden === true ? "hidden" : "flex";
                    switch (property[1].type) {
                        case "text": {
                            outPutHtml.push(
                                <fieldset
                                    className={clsx('col-span-6', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                    key={key}
                                >

                                    <Input
                                        isLabel={true}
                                        label={property[1].label}
                                        placeholder={property[1].readonly === true ? "" : "Digite aqui...."}
                                        initialValue={formValues[property[0]] || ""}
                                        readonly={property[1].readonly}
                                        onBlur={(value) => {
                                            onChangeInput(value, property[0]);
                                            if (onEvents["onChange"]) {
                                                onEvents["onChange"](value)
                                            }
                                        }}
                                        maskPatterns={property[1].maskedInput ?? undefined}
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;
                        case "email": {
                            outPutHtml.push(
                                <fieldset
                                    className={clsx('col-span-6', `${widthClass}`, `${isViewHtml}`, ' flex-col')}
                                    key={key}
                                >
                                    <Input
                                        isLabel={true}
                                        label={property[1].label}
                                        placeholder="Digite aqui...."
                                        initialValue={formValues[property[0]] || ""}
                                        onBlur={(value) => {
                                            onChangeInput(value, property[0]);
                                            if (onEvents["onChange"]) {
                                                onEvents["onChange"](value)
                                            }

                                        }}
                                        type="email"
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;
                        case "password": {
                            outPutHtml.push(
                                <fieldset
                                    className={clsx('col-span-6', `${widthClass}`, `${isViewHtml}`, 'flex-col')}

                                    key={key}
                                >
                                    <PasswordInput
                                        isLabel={true}
                                        label={property[1].label}
                                        placeholder="Digite aqui...."
                                        initialValue={""}
                                        onBlur={(value) => {
                                            if (value) {
                                                onChangeInput(value, property[0]);
                                                if (onEvents["onChange"]) {
                                                    onEvents["onChange"](value)
                                                }
                                            }
                                        }}
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;
                        case "checkbox": {
                            outPutHtml.push(
                                <fieldset
                                    key={key}
                                    className={clsx('col-span-6', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                >
                                    <label>
                                        {property[1].label}
                                    </label>
                                    <div
                                        className="flex flex-col justify-center h-full"
                                    >
                                        <Switch
                                            initialValue={formValues[property[0]] || false}
                                            onClick={({ value }) => {
                                                onChangeInput(value, property[0]);
                                                if (onEvents["onChange"]) {
                                                    onEvents["onChange"](value);
                                                }
                                            }}
                                        />
                                        {renderErros(fieldName)}
                                        {fieldProperties?.required && (
                                            <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                        )}
                                    </div>
                                </fieldset>
                            )
                        }
                            break;
                        case "number": {
                            outPutHtml.push(
                                <fieldset
                                    key={key}
                                    className={clsx('col-span-3', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                >
                                    <label>
                                        {property[1].label}
                                    </label>
                                    <InputNumber
                                        key={`${property[1].label}number`}
                                        onBlur={(value) => {
                                            if (value) {
                                                onChangeInput(value, property[0])
                                            }
                                            if (onEvents["onChange"]) {
                                                onEvents["onChange"](value);
                                            }
                                        }}
                                        initialValue={formValues[property[0]] || 0}
                                        prefix={property[1].prefix || null}
                                        readonly={property[1].readonly}
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;

                        case "money": {
                            outPutHtml.push(
                                <fieldset
                                    key={key}
                                    className={clsx('col-span-3', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                >
                                    <label>
                                        {property[1].label}
                                    </label>
                                    <InputMoney
                                        key={`${property[1].label}number`}
                                        onBlur={(value) => {
                                            if (value) {
                                                onChangeInput(value, property[0])
                                            }
                                            if (onEvents["onChange"]) {
                                                onEvents["onChange"](value);
                                            }
                                        }}
                                        initialValue={formValues[property[0]] || 0}
                                        prefix={property[1].prefix || null}
                                        readonly={property[1].readonly}
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;

                        case "date": {
                            outPutHtml.push(
                                <fieldset
                                    key={key}
                                    className={clsx('col-span-3', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                >
                                    <label>
                                        {property[1].label}
                                    </label>
                                    <DatePickerComponent
                                        key={`${property[1].label}date`}
                                        initialValue={formValues[property[0]] || ""}
                                        readonly={property[1].readonly}
                                        onBlur={(value) => {
                                            if (value) {
                                                onChangeInput(value, property[0])
                                            }
                                        }}
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;
                        case "select": {
                            outPutHtml.push(
                                <fieldset
                                    key={key}
                                    className={clsx('col-span-6', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                >
                                    <label>
                                        {property[1].label}
                                    </label>
                                    <div>
                                        <AxiosSelectPicker
                                            key={`${property[1].label}select`}
                                            options={property[1].options ?? null}
                                            readonly={property[1].readonly ?? false}
                                            valueSelected={null}
                                            initalValueId={formValues[property[0]] ?? null}
                                            api={property[1].api ?? null}
                                            fieldNameSchema={property[1].label}
                                            onSelect={(params: { value: string, label: string, state?: Record<string, any> }) => {
                                                if (property[1].api) {
                                                    onChangeInput(Number(params.value), property[0])
                                                } else {
                                                    onChangeInput(params.label, property[0])
                                                }
                                                if (onEvents['onChange']) {
                                                    onEvents['onChange'](params)
                                                }
                                            }}
                                        />
                                        {renderErros(fieldName)}
                                        {fieldProperties?.required && (
                                            <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                        )}
                                    </div>
                                </fieldset>
                            )
                        }
                            break;
                        case "richTextBox": {
                            outPutHtml.push(
                                <fieldset
                                    className={clsx('col-span-3', `${widthClass}`, `${isViewHtml}`, 'flex-col')}
                                >
                                    <label>
                                        {property[1].label}
                                    </label>
                                    <RichTextBox
                                        placeholder="Digite seu texto aqui."
                                        onBlur={(value) => {
                                            if (value) {
                                                onChangeInput(value, property[0])
                                            }
                                        }}
                                    />
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;
                        case "file": {
                            outPutHtml.push(
                                <fieldset
                                    className={clsx('col-span-6', `${widthClass}`, `${isViewHtml}`, 'flex-col bg-slate-200/60 rounded-md p-2')}
                                >
                                    <label className="font-semibold">
                                        {property[1].label}
                                    </label>
                                    {typeof id === "number" ? (
                                        <UploadComponent
                                            relation={crud}
                                            relationId={id}
                                            fieldName={fieldName}
                                            key={key}
                                        />
                                    ) : (
                                        <>
                                            <div
                                                className="bg-primary_light w-full h-14 rounded-lg p-2 text-slate-50 drop-shadow-lg content-center text-center"
                                            >
                                                <h2>
                                                    Para salvar arquivos é necessario salvar o Registro! <i className="fas fa-exclamation-triangle"></i>
                                                </h2>
                                            </div>
                                        </>
                                    )}
                                    {renderErros(fieldName)}
                                    {fieldProperties?.required && (
                                        <p className="text-slate-400/60 text-sm">*Obrigatório</p>
                                    )}
                                </fieldset>
                            )
                        }
                            break;
                        case "grid": {
                            outPutHtml.push(
                                <fieldset
                                    className={clsx('col-span-12', `${widthClass}`, `${isViewHtml}`, 'flex-col bg-slate-200/60 rounded-md p-2')}
                                >
                                    <GridFormFields
                                        keyName={fieldName}
                                        label={fieldProperties.label}
                                        parentValues={formValues}
                                        uniqueId={id}
                                        relationTabelId={id}
                                        relationNameTable={crud}
                                        icon={fieldProperties.iconInGrid}
                                        onChange={(gridFormValues) => {
                                            onChangeGrid(fieldName, gridFormValues)
                                            if (onEvents['onChange']) {
                                                onEvents['onChange'](gridFormValues)
                                            }
                                        }}
                                        onDelete={(row, index) => {
                                            if (onEvents['onDelete']) {
                                                onEvents['onDelete']({ row, index: index })
                                            }
                                        }}
                                    />
                                </fieldset>
                            )

                        }
                            break;
                        case "custom": {
                            const componentList: any = CustomComponentList;
                            if (fieldProperties.customComponentName && componentList[fieldProperties.customComponentName]) {
                                const viewComponenToRender = componentList[fieldProperties.customComponentName];
                                outPutHtml.push(
                                    <RenderCustomComponents
                                        formValues={formValues}
                                        fieldName={fieldName}
                                        id={id}
                                        onChange={(value: any) => {
                                            if (value) {
                                                onChangeInput(value, property[0])
                                                if (onEvents["onChange"]) {
                                                    onEvents["onChange"](value);
                                                }
                                            }
                                        }}
                                        propertyComponent={fieldProperties}
                                        viewComponenToRender={viewComponenToRender}
                                        isViewHtml={isViewHtml}
                                        widthClass={widthClass}
                                    />
                                )
                            } else {
                                outPutHtml.push(
                                    <fieldset
                                        className={clsx('col-span-12', `${widthClass}`, `${isViewHtml}`, 'flex-col bg-slate-200/60 rounded-md p-2')}
                                    >
                                        <p>Configuração incorreta pra o componente</p>
                                    </fieldset>
                                )
                            }
                        }
                            break;
                    }

                    // }
                }
            } catch (e: any) {
                outPutHtml.push(
                    <fieldset
                        className={clsx('col-span-6', `${widthClass}`, 'flex flex-col')}
                    >
                        <div
                            className="text-xs bg-slate-500/20 rounded-lg justify-center p-2"
                        >
                            <p className="text-background_dark/40">
                                Error: {e.message}
                            </p>
                        </div>
                    </fieldset>
                )
            }
        }
        return outPutHtml;
    }

    const renderContent = () => {
        if (Object.entries(fieldsSchemaManipulated).length > 0) {
            return renderColumnsFields()
        }

        return (
            <>
                Sem campos para renderizar
            </>
        )
    };


    const renderBodyContent = () => {
        if ((isModal && isModal === true)) {
            return (
                <div className="h-[100%] flex flex-col justify-between">
                    <div
                        className="grid grid-cols-2 lg:grid-cols-12 md:grid-cols-12 gap-2 p-4"
                    >
                        <IfDirective condition={!loading}>
                            {renderContent()}
                        </IfDirective>
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 justify-end">
                            <Button variant={"destructive"} onClick={handleClose}>Fechar</Button>
                            <Button onClick={handleSave}>Salvar</Button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div
                        className="grid grid-cols-2 lg:grid-cols-12 md:grid-cols-12 gap-2 p-4"
                    >
                        <IfDirective condition={!loading}>
                            {renderContent()}
                        </IfDirective>
                    </div>
                    {/* <div className="flex flex-row w-full">
                        <p className="flex flex-row w-full flex-wrap">
                            {JSON.stringify(formValues)}
                        </p>
                    </div> */}
                    <div className="flex flex-row w-full p-4 gap-4">
                        <div
                            className="flex flex-row gap-5"
                        >
                            <IfDirective condition={method && ["add", "edit"].includes(method)}>
                                <div>
                                    <ButtonUiMv
                                        variant={"approved"}
                                        className="w-20"
                                        onClick={handleSave}
                                        loading={loadingComponents}
                                    >
                                        Gravar
                                    </ButtonUiMv>
                                </div>
                                <div>
                                    {method === 'edit' && (
                                        <ButtonUiMv
                                            variant={"destructive"}
                                            className="w-full"
                                            onClick={handleDelete}
                                            loading={loadingComponents}
                                        >
                                            Deletar Registro
                                        </ButtonUiMv>
                                    )}
                                </div>
                            </IfDirective>
                        </div>
                        <div className="flex flex-row">
                            <IfDirective condition={crud}>
                                {renderFooterComponent && (
                                    <>
                                        {renderFooterComponent}
                                    </>
                                )}
                            </IfDirective>
                        </div>
                    </div>
                </>
            )
        }
    }


    return (
        <>
            {renderBodyContent()}
        </>
    )
}