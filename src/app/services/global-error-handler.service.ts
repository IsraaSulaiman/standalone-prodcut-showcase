import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone, Injector } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}
  handleError(error: HttpErrorResponse) {
    console.log('GlobalErrorHandlerService :>> ', error);

    let errorMsg: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
      this._snackBar.open('this is client side error', 'End now', {
        duration: 500,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      errorMsg = `Error Code: ${error.status},  Message: ${error.error.message}`;
      this._snackBar.open(
        error.status === 404 ? `${errorMsg}` : `Server error  ${error.status} `,
        'End now',
        {
          duration: 700,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        }
      );
    }
  }
}
