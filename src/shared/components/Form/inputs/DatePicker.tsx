// shared/components/Form/inputs/DatePicker.tsx
import { FieldInputProps, FieldMetaProps } from "formik";
import dayjs from "dayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

interface DatePickerProps {
   field: FieldInputProps<any>;
   meta: FieldMetaProps<any>;
   label: string;
   minDate?: Date;
   maxDate?: Date;
   format?: string;
}

export const DatePicker = ({ field, meta, label, minDate, maxDate, format = "DD/MM/YYYY" }: DatePickerProps) => {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
         <div>
            <label className="block text-sm font-medium mb-2">
               {label}
               {meta.error && meta.touched && <span className="text-red-500 text-xs ml-2">{meta.error}</span>}
            </label>

            <MuiDatePicker
               value={field.value ? dayjs(field.value) : null}
               onChange={(date) => {
                  field.onChange({
                     target: {
                        value: date ? date.toDate() : null,
                        name: field.name
                     }
                  });
               }}
               format={format}
               minDate={minDate ? dayjs(minDate) : undefined}
               maxDate={maxDate ? dayjs(maxDate) : undefined}
               slotProps={{
                  textField: {
                     fullWidth: true,
                     error: meta.touched && !!meta.error,
                     helperText: meta.touched && meta.error
                  }
               }}
            />
         </div>
      </LocalizationProvider>
   );
};
