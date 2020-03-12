import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { MaintenanceService } from "../../../../services/maintenance.service";
import { SubCategory } from "../../../../models/subCategory.model";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-subcategories-add-edit-model",
  templateUrl: "subcategories-add-edit-model.component.html",
  styleUrls: ["subcategories-add-edit-model.component.scss"]
})
export class SubCategoriesAddEditComponent {
  title: string;
  cat_id: number;
  subCategory?: SubCategory;
  constructor(
    protected ref: NbDialogRef<SubCategoriesAddEditComponent>,
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService
  ) {}

  cancel() {
    this.ref.close();
  }

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  submit(name: string) {
    if (this.subCategory === undefined) {
      this.subCategory = new SubCategory();
    }
    this.subCategory.name = name;
    this.subCategory.cat_id = this.cat_id;
    this.maintenanceService.addUpdateSubCategory(this.subCategory).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "Second sub category has been added successfully!"
        );
        this.ref.close();
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while creating second sub category!"
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
