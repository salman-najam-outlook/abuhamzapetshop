import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MainCategory } from '../../../../models/mainCategory.model';
import { MaintenanceService } from '../../../../services/maintenance.service';

@Component({
  selector: 'ngx-mcategories-add-edit-model',
  templateUrl: 'mcategories-add-edit-model.component.html',
  styleUrls: ['mcategories-add-edit-model.component.scss'],
})
export class MCategoriesAddEditComponent {
  title: string;
  mCategory?: MainCategory;
  constructor(protected ref: NbDialogRef<MCategoriesAddEditComponent>, private maintenanceService: MaintenanceService) { }

  cancel() {
    this.ref.close();
  }

  submit(name: string) {
    if (this.mCategory === undefined) {
      this.mCategory = new MainCategory();
    }
    this.mCategory.name = name;
    this.maintenanceService.addUpdateMainCategory(this.mCategory).subscribe(
      (response) => {
        console.log('record inserted');
        this.ref.close();
      },
      (error) => {
        console.log(error);
        this.ref.close();
      }
    )

  }
}
