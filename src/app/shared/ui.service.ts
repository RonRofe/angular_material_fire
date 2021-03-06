import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
    constructor(
        private snackbar: MatSnackBar,
    ) {}

    public showSnackBar(message: string, action: string, duration: number): void {
       this.snackbar.open(message, action, { duration });
    }
}