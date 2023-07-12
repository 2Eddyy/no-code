import {ChangeDetectionStrategy, Component, HostListener, Inject, OnInit} from '@angular/core';
import {Action} from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                cancel?: Action,
                delete: () => void,
                text: string,
                title: string
              },
              private mdDialogRef: MatDialogRef<ConfirmComponent>) { }

  ngOnInit() {
  }

  public cancel() {
    this.close();
  }

  public close() {
    this.mdDialogRef.close();
  }

  public delete() {
    this.data.delete();
    this.close();
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }
}
