// shared/services/notification.service.ts
import Swal from "sweetalert2";
import { enqueueSnackbar } from "notistack";
import type { VariantType } from "notistack";

class NotificationService {
   // Toast discretos (Notistack)
   toast(message: string, variant: VariantType = "default") {
      enqueueSnackbar(message, {
         variant,
         anchorOrigin: { vertical: "bottom", horizontal: "right" },
         autoHideDuration: 3000
      });
   }

   // Alertas grandes (SweetAlert2)
   async confirm(title: string, text: string, confirmText = "Confirmar", cancelText = "Cancelar"): Promise<boolean> {
      const result = await Swal.fire({
         title,
         text,
         icon: "question",
         showCancelButton: true,
         confirmButtonText: confirmText,
         cancelButtonText: cancelText,
         reverseButtons: true,
         customClass: {
            confirmButton: "bg-primary hover:bg-primary-dark",
            cancelButton: "bg-gray-300 hover:bg-gray-400"
         }
      });

      return result.isConfirmed;
   }

   async success(title: string, text?: string) {
      await Swal.fire({
         title,
         text,
         icon: "success",
         timer: 2000,
         showConfirmButton: false
      });
   }

   async error(title: string, text?: string) {
      await Swal.fire({
         title,
         text,
         icon: "error",
         confirmButtonText: "Entendido"
      });
   }

   async warning(title: string, text?: string) {
      await Swal.fire({
         title,
         text,
         icon: "warning",
         confirmButtonText: "Entendido"
      });
   }

   // Loading overlay
   showLoading(title = "Cargando...") {
      Swal.fire({
         title,
         allowOutsideClick: false,
         showConfirmButton: false,
         willOpen: () => {
            Swal.showLoading();
         }
      });
   }

   closeLoading() {
      Swal.close();
   }
}

export const notification = new NotificationService();
