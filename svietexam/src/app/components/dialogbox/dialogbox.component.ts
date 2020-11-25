import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<DialogboxComponent>,@Inject(MAT_DIALOG_DATA) public data:any ) {}

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
