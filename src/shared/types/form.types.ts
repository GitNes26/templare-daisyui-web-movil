// shared/types/form.types.ts
import { ReactNode } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import * as Yup from "yup";

export type FieldType =
   | "text"
   | "email"
   | "password"
   | "number"
   | "date"
   | "datetime"
   | "select"
   | "multi-select"
   | "checkbox"
   | "radio"
   | "textarea"
   | "file"
   | "switch"
   | "autocomplete";

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FieldConfig<T = any> {
   name: keyof T;
   type: FieldType;
   label: string;

   // Validación
   validation?: Yup.Schema<any>;
   required?: boolean;

   // UI/UX
   placeholder?: string;
   helperText?: string;
   disabled?: boolean;
   hidden?: boolean;

   // Opciones para select/radio/autocomplete
   options?: Array<{
      value: any;
      label: string;
      disabled?: boolean;
   }>;

   // Configuración específica
   searchable?: boolean; // Para selects
   refreshable?: boolean; // Botón de actualizar
   minDate?: Date;
   maxDate?: Date;

   // Dependencias entre campos
   dependencies?: Array<keyof T>;
   shouldShow?: (values: Partial<T>) => boolean;
   onChangeEffect?: (values: Partial<T>, field: FieldInputProps<any>) => void;

   // Responsive Grid
   grid?: {
      xs?: GridSize;
      sm?: GridSize;
      md?: GridSize;
      lg?: GridSize;
      xl?: GridSize;
   };

   // Estilos personalizados
   className?: string;
   inputClassName?: string;

   // Custom render
   customRender?: (field: FieldInputProps<any>, meta: FieldMetaProps<any>) => ReactNode;
}
