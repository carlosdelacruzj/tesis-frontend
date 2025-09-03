import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'open-dialog.component.html',
  templateUrl: 'open-dialog.img.html',
})
export class OpenDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.logAge();
  }

  logAge(): void {
    console.log(this.data.img);
  }
}
