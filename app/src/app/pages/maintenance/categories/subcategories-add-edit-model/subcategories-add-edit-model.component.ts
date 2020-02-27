import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { SubCategory } from '../../../../models/subCategory.model';

@Component({
  selector: 'ngx-subcategories-add-edit-model',
  templateUrl: 'subcategories-add-edit-model.component.html',
  styleUrls: ['subcategories-add-edit-model.component.scss'],
})
export class SubCategoriesAddEditComponent {
  title: string;
  cat_id: number;
  subCategory?: SubCategory;
  constructor(protected ref: NbDialogRef<SubCategoriesAddEditComponent>, private maintenanceService: MaintenanceService) { }

  cancel() {
    this.ref.close();
  }

  submit(name: string) {
    if (this.subCategory === undefined) {
      this.subCategory = new SubCategory();
    }
    this.subCategory.name = name;
    this.subCategory.cat_id = this.cat_id;
    this.maintenanceService.addUpdateSubCategory(this.subCategory).subscribe(
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
