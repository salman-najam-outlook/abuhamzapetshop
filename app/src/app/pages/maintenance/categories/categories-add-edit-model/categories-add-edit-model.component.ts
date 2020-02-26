import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MainCategory } from '../../../../models/mainCategory.model';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'ngx-categories-add-edit-model',
  templateUrl: 'categories-add-edit-model.component.html',
  styleUrls: ['categories-add-edit-model.component.scss'],
})
export class CategoriesAddEditComponent {
  title: string;
  mCategoryId: number;
  category?: Category;
  constructor(protected ref: NbDialogRef<CategoriesAddEditComponent>, private maintenanceService: MaintenanceService) { }

  cancel() {
    this.ref.close();
  }

  submit(name: string) {
    if (this.category === undefined) {
      this.category = new Category();
    }
    this.category.name = name;
    this.category.mainCat_id = this.mCategoryId;
    this.maintenanceService.addUpdateCategory(this.category).subscribe(
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
