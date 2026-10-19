// modules/user/domain/entities/user.entity.ts
import { FieldConfig } from "@/shared/types/form.types";
import * as Yup from "yup";

export interface User {
   id: string;
   name: string;
   email: string;
   password?: string;
   role: "admin" | "manager" | "user";
   birthDate: Date;
   phone: string;
   address?: string;
   isActive: boolean;
   departmentId: string;
   createdAt: Date;
   updatedAt: Date;
}

export type UserCreate = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UserUpdate = Partial<UserCreate>;

// Configuración de campos del formulario
export const userFormFields: FieldConfig<User>[] = [
   {
      name: "name",
      type: "text",
      label: "Nombre completo",
      validation: Yup.string().min(3, "Mínimo 3 caracteres").max(100, "Máximo 100 caracteres").required("Nombre es requerido"),
      grid: { xs: 12, sm: 6 },
      placeholder: "Ingrese su nombre completo"
   },
   {
      name: "email",
      type: "email",
      label: "Correo electrónico",
      validation: Yup.string().email("Correo inválido").required("Email es requerido"),
      grid: { xs: 12, sm: 6 }
   },
   {
      name: "role",
      type: "select",
      label: "Rol",
      validation: Yup.string().required("Rol es requerido"),
      options: [
         { value: "admin", label: "Administrador" },
         { value: "manager", label: "Gerente" },
         { value: "user", label: "Usuario" }
      ],
      searchable: true,
      refreshable: true, // Botón para actualizar opciones
      grid: { xs: 12, sm: 6 }
   },
   {
      name: "birthDate",
      type: "date",
      label: "Fecha de nacimiento",
      validation: Yup.date().max(new Date(), "Fecha no puede ser futura").nullable(),
      grid: { xs: 12, sm: 6 }
   },
   {
      name: "departmentId",
      type: "autocomplete",
      label: "Departamento",
      dependencies: ["role"],
      shouldShow: (values) => values.role !== "admin",
      validation: Yup.string().when("role", {
         is: (role: string) => role !== "admin",
         then: Yup.string().required("Departamento es requerido")
      }),
      searchable: true,
      refreshable: true,
      grid: { xs: 12 }
   },
   {
      name: "isActive",
      type: "switch",
      label: "Usuario activo",
      grid: { xs: 12 }
   }
];

// Esquema Yup generado automáticamente
export const userValidationSchema = Yup.object().shape(
   Object.fromEntries(userFormFields.filter((field) => field.validation).map((field) => [field.name, field.validation]))
);
