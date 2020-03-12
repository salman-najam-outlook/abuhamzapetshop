import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { MaintenanceService } from "../../../../services/maintenance.service";
import { Category } from "../../../../models/category.model";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-categories-add-edit-model",
  templateUrl: "categories-add-edit-model.component.html",
  styleUrls: ["categories-add-edit-model.component.scss"]
})
export class CategoriesAddEditComponent {
  title: string;
  mCategoryId: number;
  category?: Category;
  constructor(
    protected ref: NbDialogRef<CategoriesAddEditComponent>,
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService
  ) {}

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

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
      response => {
        this.showToast(
          "success",
          "Success!",
          "First sub category has been added successfully!"
        );
        this.ref.close();
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while creating first sub category!"
        );
        this.ref.close();
      }
    );
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates
    };
    const titleContent = title ? `${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
