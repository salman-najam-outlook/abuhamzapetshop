import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { FourthSubCategory } from '../../../../models/fourthSubCategory.model';

@Component({
  selector: 'ngx-fourthcategories-add-edit-model',
  templateUrl: 'fourthcategories-add-edit-model.component.html',
  styleUrls: ['fourthcategories-add-edit-model.component.scss'],
})
export class FourthCategoriesAddEditComponent {
  title: string;
  subCat_id: number;
  fourthSubCategory?: FourthSubCategory;
  constructor(protected ref: NbDialogRef<FourthCategoriesAddEditComponent>, private maintenanceService: MaintenanceService) { }

  cancel() {
    this.ref.close();
  }

  submit(name: string) {
    if (this.fourthSubCategory === undefined) {
      this.fourthSubCategory = new FourthSubCategory();
    }
    this.fourthSubCategory.name = name;
    this.fourthSubCategory.subCat_id = this.subCat_id;
    this.maintenanceService.addUpdateForthSubCategory(this.fourthSubCategory).subscribe(
      (response) => {
        console.log('record inserted');
        this.ref.close();
      },
      (error) => {
        console.log(error);
        this.ref.close();
      }
    );
  }
}
