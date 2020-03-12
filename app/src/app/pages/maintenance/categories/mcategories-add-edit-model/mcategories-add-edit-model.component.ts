import { Component, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { MainCategory } from "../../../../models/mainCategory.model";
import { MaintenanceService } from "../../../../services/maintenance.service";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-mcategories-add-edit-model",
  templateUrl: "mcategories-add-edit-model.component.html",
  styleUrls: ["mcategories-add-edit-model.component.scss"]
})
export class MCategoriesAddEditComponent {
  title: string;
  mCategory?: MainCategory;
  constructor(
    protected ref: NbDialogRef<MCategoriesAddEditComponent>,
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
    if (this.mCategory === undefined) {
      this.mCategory = new MainCategory();
    }
    this.mCategory.name = name;
    this.maintenanceService.addUpdateMainCategory(this.mCategory).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "Main category has been added successfully!"
        );
        this.ref.close();
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while creating mian category!"
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
