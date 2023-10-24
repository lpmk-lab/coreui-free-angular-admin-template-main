import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor() { }
  tinyAlert(Message: string) {
    Swal.fire({

      // title: 'Oops...',
      text: Message,
      position: 'top-end',
      width: 400,
      color: "red",
      showConfirmButton: false,
      timer: 1500,

    })

  }
  successNotification(title: string, Message: string) {
    Swal.fire(title, Message, 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }


}
