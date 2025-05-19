import Axios from "@/shared/utils/Axios";
import { AxiosResponse } from "axios";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { IGridAttributes } from "@/shared/interfaces/IGridAttributes";
import { ColumnDef } from "@tanstack/react-table";
import { renderColumns } from "@/modules/admin/crud/BrowserPage/utils/functions/RenderColumns";
import { useParams } from "react-router-dom";
import { DeletedItemHttp } from "@/shared/functions/DeletedItemHttp";
import { singular } from "pluralize";
import { toast } from "react-toastify";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { Button } from "@/components/ui/button";

interface GridFormFieldsFunctionsProps {
  crud: string;
  onChangeGridProps: (gridFormValues: Record<string, any>[]) => void;
  onDeleteProps: (row: Record<string, any>, index: number) => void;
  relationNameTable: string;
  relationTabelId: number | string;
}

export const GridFormFieldsFunctions = ({ 
  crud, 
  relationNameTable, 
  relationTabelId,
  onChangeGridProps,
  onDeleteProps 
 }: GridFormFieldsFunctionsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [indexIsEdit, setIndexIsEdit] = useState<number | null>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [arrayFomrItens, setArrayFormItens] = useState<Array<Record<string, unknown>>>([]);
  const [arrayFormItensRender, setArrayFormItensRender] = useState<Array<Record<string, unknown>>>([]);
  const { notify } = useNotificationStore();
  const paramsUrl = useParams();
  // const getOptionsSelectHttp = GetOptionsSelectHttp()

  // Armazena o estado do grid e evita chamadas desnecessárias
  const [gridAttributes, setGridAttributes] = useState<IGridAttributes>({
    items: [],
    atualPage: 0,
    totalItems: 0,
    totalPages: 0,
    perPage: 10,
    fields: {},
    globals: {},
  });

  // Ref para armazenar os fields e evitar chamadas desnecessárias
  const cachedFields = useRef<Record<string, any> | null>(null);
  const deleteItemHttp = DeletedItemHttp(Axios, crud);


  const getSepairValuesTableOrColumn = (data: Record<string, any>): {
    valuesTables: Record<string, any>,
    valuesColumns: Record<string, any>
  } => {
    const columns: Record<string, any> = {};
    const tablesValues: Record<string, any> = {};
    for (const index in data) {
      if (typeof data[index] === "object") {
        tablesValues[`${index}`] = data[index];
        continue;
      }
      columns[`${index}`] = data[index];
    }
    return {
      valuesTables: tablesValues,
      valuesColumns: columns
    };
  }

  const handleDelete = (params: { row: Record<string, any>, index?: number }) => {
    notify.customize(
      <div className="flex flex-col gap-2">
        <p className="text-slate-600">
          Seu item será excluído permanentemente.
        </p>
        <div className="flex flex-row gap-2">
          <Button
            variant={"destructive"}
            onClick={() => onDelete({ row: params.row, index: params.index })}
          >Excluir
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => toast.dismiss()}
          >Cancelar
          </Button>
        </div>
      </div>, "warn", {
      autoClose: false,
      icon: false,
    })
  }

  const onDelete = (params: { row: Record<string, any>, index?: number }) => {
    setLoading(true);
    const { row, index } = params;
    const entry = Object.entries(row).find(([key]) => key === `${singular(crud)}_id`);
    const validNumber = entry ? entry[1] : null; // Acessa diretamente o valor da entrada encontrada
    console.log({ validNumber }, { index })
    if (validNumber && index !== undefined) {
      deleteItemHttp.execute(validNumber)
        .then(() => { 
          onDeleteProps(row, index)
        })
        .finally(() => {
          deletedItens(index, row);
          toast.dismiss();
        })
    } else {
      if (index !== undefined) {
        deletedItens(index, row);
        toast.dismiss();
      }
    }
  }


  const deletedItens = (index: number, row: Record<string,any>) => {
    setArrayFormItens((prev) => {
      const items = [...prev];
      items.splice(index, 1);
      onChangeGridProps(items)
      return items;
    });
    setArrayFormItensRender((prev) => {
      const items = [...prev];
      items.splice(index, 1);
      return items;
    });
    onDeleteProps(row, index)
    setLoading(false);
  }

  const onEdit = useCallback((params: { row: Record<string, any>, index?: number }) => {
    setIndexIsEdit(params.index)
    setLoading(true)
    setForm(params.row)
    setIsEdit(true)
    setShowModal(true);
    setLoading(false)
  }, []);

  const onAdd = useCallback(() => {
    setShowModal(true);
  }, []);

  const getFields = useCallback(
    ({ callback }: { callback?: ({ schema }: { schema: Record<string, any> }) => void }) => {
      if (cachedFields.current) {

        // Se já tiver os fields em cache, usa os valores armazenados
        callback?.({ schema: cachedFields.current });
        return;
      }

      Axios.get(`/api/v1/get/${crud}/fields`)
        .then((response: AxiosResponse<{ schema: Record<string, any> }>) => {
          const { $GLOBALS } = response.data.schema;
          cachedFields.current = $GLOBALS; // Armazena os fields no cache
          callback?.({ schema: $GLOBALS });
        })
        .catch(() => {
          setGridAttributes({
            items: [],
            atualPage: 0,
            totalItems: 0,
            totalPages: 0,
            perPage: 10,
            fields: {},
            globals: {},
          });
        });
    },
    [crud]
  );

  const getData = useCallback(
    ({ schema }: { schema: Record<string, any> }) => {
      const { fields, ...rest } = schema;

      Axios.get(`/api/v1/${crud}/list`, {
        params: {
          relationId: relationTabelId,
          relationName: relationNameTable
        }
      })
        .then((response: AxiosResponse<{ itens: Record<string, any>[]; pagination: any }>) => {
          const { data } = response;
          const itemsToSepareted = [];
          if (data.itens) {
            for (const item of data.itens) {
              itemsToSepareted.push(getSepairValuesTableOrColumn(item).valuesColumns)
            }
          }
          setArrayFormItens(itemsToSepareted);
          setArrayFormItensRender(data.itens)
          setGridAttributes({
            ...gridAttributes,
            fields,
            globals: rest,
            items: [],
            totalItems: data.pagination.totalItems,
            totalPages: data.pagination.totalPages,
            atualPage: data.pagination.currentPage,
          });
        })
        .catch(() => {
          setGridAttributes({
            items: [],
            atualPage: 0,
            totalItems: 0,
            totalPages: 0,
            perPage: 10,
            fields: {},
            globals: {},
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [crud, gridAttributes]
  );

  useEffect(() => {
    setLoading(true);
    getFields({
      callback: ({ schema }) => {
        if (paramsUrl.method === "edit") {
          getData({ schema });
        } else {
          setGridAttributes((prev) => ({
            ...prev,
            fields: schema.fields,
            globals: schema,
            items: [],
            totalItems: 0,
            totalPages: 0,
            atualPage: 0,
          }));
          setLoading(false);
        }
      },
    });
  }, [crud]);

  const columns: ColumnDef<any, any>[] = useMemo(() => {
    if (gridAttributes.fields) {
      return renderColumns({
        fieldsSchema: gridAttributes.fields,
        onEdit,
        onDelete: handleDelete
      });
    }
    return [];
  }, [gridAttributes.fields, onEdit]);


  const onSave = async (formValuesFormFields: Record<string, any>, _callback: () => void) => {
    const formValuesFormFieldsToRenderColumns = { ...formValuesFormFields };
    const itemsNotChildrens = getSepairValuesTableOrColumn({ ...formValuesFormFields }).valuesColumns;
    setLoading(true);
    for (const fieldName in formValuesFormFields) {
      let value: any = formValuesFormFields[fieldName];
      const field: any = gridAttributes.fields[fieldName];
      if (field) {
        if (field.type === "select" && value !== undefined && (field.api !== undefined || field.displayLabel !== undefined)) {
          if (typeof value == "object") {
            if (value?.["value"]) {
              //delcio
              formValuesFormFields[fieldName] = value["value"];
              value = formValuesFormFields[fieldName];
            }
          }
          if (field.api) {
            const result = await Axios.get(`/api/v1/${field.api}/select`, {
              params: {
                id: value,
                specificItem: true
              }
            });

            if (result && result.data.items) {
              const childrenFieldName = fieldName.split("fk_").pop()?.split("_id")[0];
              formValuesFormFieldsToRenderColumns[`${childrenFieldName}`] = {
                [`${childrenFieldName}_name`]: result.data.items[0].label
              }
            }
          }
        }
      }
    }



    setArrayFormItens((prev) => {
      const items = [...prev];
      if ((isEdit && isEdit === true) && indexIsEdit !== null && indexIsEdit !== undefined) {
        items[indexIsEdit] = itemsNotChildrens;
      } else {
        items.push(itemsNotChildrens)
      }

      onChangeGridProps(items)
      return items;
    });

    setArrayFormItensRender((prev) => {
      const items = [...prev];
      if ((isEdit && isEdit === true) && indexIsEdit !== null && indexIsEdit !== undefined) {
        items[indexIsEdit] = formValuesFormFieldsToRenderColumns;
      } else {
        items.push(formValuesFormFieldsToRenderColumns)
      }
      return items;
    })
    setLoading(false);
    handleClose();
  };


  const handleClose = () => {
    setShowModal(false)
  }

  return {
    loading,
    arrayFomrItens,
    gridAttributes,
    columns,
    showModal,
    form,
    arrayFormItensRender,
    setShowModal,
    onAdd,
    onSave,
    handleClose,
  };
};
