// shared/components/Form/DynamicFormGenerator.tsx
import { Formik, Form, FormikHelpers } from "formik";
import { FieldConfig } from "@/shared/types/form.types";
import { TextInput } from "./inputs/TextInput";
import { SearchableSelect } from "./inputs/SearchableSelect";
import { DatePicker } from "./inputs/DatePicker";
import { SwitchInput } from "./inputs/SwitchInput";
import { AutocompleteInput } from "./inputs/AutocompleteInput";
import { Grid, GridItem } from "@/shared/components/Layout/Grid";
import { Button } from "@/shared/components/UI/Button";
import { Loader2 } from "lucide-react";

interface DynamicFormGeneratorProps<T> {
   fields: FieldConfig<T>[];
   initialValues: Partial<T>;
   validationSchema: any;
   onSubmit: (values: T, helpers: FormikHelpers<T>) => Promise<void>;
   submitText?: string;
   cancelText?: string;
   onCancel?: () => void;
   isLoading?: boolean;
   formId?: string;
}

export function DynamicFormGenerator<T>({
   fields,
   initialValues,
   validationSchema,
   onSubmit,
   submitText = "Guardar",
   cancelText = "Cancelar",
   onCancel,
   isLoading = false,
   formId
}: DynamicFormGeneratorProps<T>) {
   // Renderiza el campo apropiado según el tipo
   const renderField = (fieldConfig: FieldConfig<T>, formikProps: any) => {
      const { field, meta } = formikProps;

      if (fieldConfig.customRender) {
         return fieldConfig.customRender(field, meta);
      }

      // Verificar si el campo debe mostrarse
      if (fieldConfig.shouldShow && !fieldConfig.shouldShow(formikProps.values)) {
         return null;
      }

      const commonProps = {
         field,
         meta,
         label: fieldConfig.label,
         placeholder: fieldConfig.placeholder,
         disabled: fieldConfig.disabled || isLoading
      };

      switch (fieldConfig.type) {
         case "text":
         case "email":
         case "password":
         case "textarea":
            return <TextInput {...commonProps} type={fieldConfig.type} />;

         case "select":
            return (
               <SearchableSelect
                  {...commonProps}
                  options={fieldConfig.options || []}
                  isSearchable={fieldConfig.searchable}
                  isRefreshable={fieldConfig.refreshable}
                  onRefresh={
                     fieldConfig.refreshable
                        ? async () => {
                             // Lógica para refrescar opciones
                             // Ej: await refreshOptions(fieldConfig.name);
                          }
                        : undefined
                  }
               />
            );

         case "autocomplete":
            return (
               <AutocompleteInput
                  {...commonProps}
                  loadOptions={async (inputValue: string) => {
                     // Lógica para búsqueda en API
                     // return await searchOptions(fieldConfig.name, inputValue);
                  }}
               />
            );

         case "date":
         case "datetime":
            return (
               <DatePicker
                  {...commonProps}
                  format={fieldConfig.type === "datetime" ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"}
                  minDate={fieldConfig.minDate}
                  maxDate={fieldConfig.maxDate}
               />
            );

         case "switch":
            return <SwitchInput {...commonProps} />;

         default:
            return <TextInput {...commonProps} type="text" />;
      }
   };

   return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
         {(formikProps) => {
            // Efectos de dependencia entre campos
            fields.forEach((fieldConfig) => {
               if (fieldConfig.dependencies && fieldConfig.onChangeEffect) {
                  const dependenciesChanged = fieldConfig.dependencies.some((dep) => formikProps.values[dep] !== formikProps.initialValues[dep]);

                  if (dependenciesChanged) {
                     fieldConfig.onChangeEffect?.(formikProps.values, formikProps.getFieldProps(fieldConfig.name));
                  }
               }
            });

            return (
               <Form id={formId} className="space-y-6">
                  <Grid spacing={3}>
                     {fields.map((fieldConfig) => {
                        if (fieldConfig.hidden) return null;

                        const gridSize = fieldConfig.grid || { xs: 12 };
                        const shouldShow = !fieldConfig.shouldShow || fieldConfig.shouldShow(formikProps.values);

                        if (!shouldShow) return null;

                        return (
                           <GridItem key={String(fieldConfig.name)} xs={gridSize.xs} sm={gridSize.sm} md={gridSize.md} lg={gridSize.lg} xl={gridSize.xl}>
                              {renderField(fieldConfig, formikProps)}
                           </GridItem>
                        );
                     })}
                  </Grid>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                     {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                           {cancelText}
                        </Button>
                     )}

                     <Button type="submit" disabled={!formikProps.isValid || isLoading || !formikProps.dirty} className="min-w-[120px]">
                        {isLoading ? (
                           <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Procesando...
                           </>
                        ) : (
                           submitText
                        )}
                     </Button>
                  </div>
               </Form>
            );
         }}
      </Formik>
   );
}
