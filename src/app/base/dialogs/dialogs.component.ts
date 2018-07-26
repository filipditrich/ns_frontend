import { Component, Input, OnInit } from '@angular/core';
import { Dialog, DialogType } from './dialogs.interface';
import { DialogsService } from './dialogs.service';

@Component({
  selector: 'ns-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  @Input() id: string;
  dialogs: Dialog[] = [];

  constructor(private dialogService: DialogsService) { }

  ngOnInit() {
    this.dialogService.getDialog(this.id).subscribe((dialog: Dialog) => {
      if (!dialog.payload) { this.dialogs = []; return; }
      this.dialogs.push(dialog);
    });
  }

  removeDialog(dialog: Dialog) {
    this.dialogs = this.dialogs.filter(x => x !== dialog);
  }

  dialogClass(dialog: Dialog) {
    if (!dialog) { return; }

    switch (dialog.type) {
      case DialogType.Danger:
        return 'modal-dialog modal-danger';
      case DialogType.Info:
        return 'modal-dialog';
    }
  }

}
