import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { MaintenanceService } from "../../../../services/maintenance.service";
import { FourthSubCategory } from "../../../../models/fourthSubCategory.model";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-fourthcategories-add-edit-model",
  templateUrl: "fourthcategories-add-edit-model.component.html",
  styleUrls: ["fourthcategories-add-edit-model.component.scss"]
})
export class FourthCategoriesAddEditComponent {
  title: string;
  subCat_id: number;
  fourthSubCategory?: FourthSubCategory;
  constructor(
    protected ref: NbDialogRef<FourthCategoriesAddEditComponent>,
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
    if (this.fourthSubCategory === undefined) {
      this.fourthSubCategory = new FourthSubCategory();
    }
    this.fourthSubCategory.name = name;
    this.fourthSubCategory.subCat_id = this.subCat_id;
    this.maintenanceService
      .addUpdateForthSubCategory(this.fourthSubCategory)
      .subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "Third sub-category has been added successfully!"
          );
          this.ref.close();
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while creating third sub-category!"
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
