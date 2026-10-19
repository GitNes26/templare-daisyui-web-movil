// shared/components/Form/inputs/SearchableSelect.tsx
import { useState } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Button } from "@/shared/components/UI/Button";
import { RefreshCw, Search } from "lucide-react";

interface SearchableSelectProps {
   field: FieldInputProps<any>;
   meta: FieldMetaProps<any>;
   label: string;
   options: Array<{ value: any; label: string }>;
   isSearchable?: boolean;
   isRefreshable?: boolean;
   onRefresh?: () => Promise<void>;
   loadOptions?: (inputValue: string) => Promise<any>;
   placeholder?: string;
   isMulti?: boolean;
}

export const SearchableSelect = ({
   field,
   meta,
   label,
   options,
   isSearchable = true,
   isRefreshable = false,
   onRefresh,
   loadOptions,
   placeholder = "Seleccionar...",
   isMulti = false
}: SearchableSelectProps) => {
   const [isRefreshing, setIsRefreshing] = useState(false);

   const handleRefresh = async () => {
      if (onRefresh) {
         setIsRefreshing(true);
         await onRefresh();
         setIsRefreshing(false);
      }
   };

   const SelectComponent = loadOptions ? AsyncSelect : Select;

   return (
      <div className="relative">
         <label className="block text-sm font-medium mb-2">
            {label}
            {meta.error && meta.touched && <span className="text-red-500 text-xs ml-2">{meta.error}</span>}
         </label>

         <div className="flex gap-2">
            <div className="flex-1">
               <SelectComponent
                  {...field}
                  value={options.find((opt) => opt.value === field.value)}
                  onChange={(selected) => {
                     const value = isMulti ? selected?.map((s: any) => s.value) : selected?.value;
                     field.onChange({ target: { value, name: field.name } });
                  }}
                  options={options}
                  isSearchable={isSearchable}
                  placeholder={placeholder}
                  isMulti={isMulti}
                  loadOptions={loadOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                     control: (base) => ({
                        ...base,
                        borderColor: meta.error && meta.touched ? "#ef4444" : base.borderColor,
                        "&:hover": {
                           borderColor: meta.error && meta.touched ? "#ef4444" : base.borderColor
                        }
                     })
                  }}
               />
            </div>

            {isRefreshable && onRefresh && (
               <Button type="button" variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing} className="h-[38px] w-[38px]">
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
               </Button>
            )}
         </div>
      </div>
   );
};
