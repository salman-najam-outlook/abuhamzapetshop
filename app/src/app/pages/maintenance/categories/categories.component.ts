import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../services/maintenance.service';
import { MainCategory } from '../../../models/mainCategory.model';
import { Category } from '../../../models/category.model';
import { SubCategory } from '../../../models/subCategory.model';
import { FourthSubCategory } from '../../../models/fourthSubCategory.model';
import { NbDialogService } from '@nebular/theme';
import { MCategoriesAddEditComponent } from './mcategories-add-edit-model/mcategories-add-edit-model.component';
import { CategoriesAddEditComponent } from './categories-add-edit-model/categories-add-edit-model.component';
import { SubCategoriesAddEditComponent } from './subcategories-add-edit-model/subcategories-add-edit-model.component';
import { FourthCategoriesAddEditComponent } from './fourthcategories-add-edit-model/fourthcategories-add-edit-model.component';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  mainCategories: MainCategory[];
  categories: Category[];
  subCategories: SubCategory[];
  subSubCategories: FourthSubCategory[];
  modelTitle: string;
  selectedMainCategory: MainCategory = new MainCategory();
  selectedCategory: Category = new Category();
  selectedSubCategory: SubCategory = new SubCategory();
  selectedSubSubCateory: FourthSubCategory = new FourthSubCategory();
  constructor(
    private maintenanceService: MaintenanceService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router,
  ) {
    this.selectedMainCategory.name = 'None';
    this.selectedCategory.name = 'None';
    this.selectedSubCategory.name = 'None';
    this.selectedSubSubCateory.name = 'None';
  }

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  ngOnInit() {
    this.maintenanceService.getAllMainCategories().subscribe(
      response => {
        this.mainCategories = response;
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while fetching main-categories!',
          );
        }
      },
    );
  }

  onSelectMainCategory(mcategory: MainCategory) {
    this.selectedMainCategory = mcategory;
    this.selectedCategory.name = 'None';
    this.selectedSubCategory.name = 'None';
    this.selectedSubSubCateory.name = 'None';
    this.categories = [];
    this.subCategories = [];
    this.subSubCategories = [];
    this.maintenanceService
      .getAllCategoriesByMainCategoryId(mcategory.mainCat_id)
      .subscribe(
        response => {
          this.categories = response;
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching first sub-categories!',
            );
          }
        },
      );
  }

  onAddEditMainCategory(mcategory?: MainCategory) {
    if (mcategory === undefined) {
      this.modelTitle = 'Add Main Category';
    } else {
      this.modelTitle = 'Edit ' + mcategory.name;
    }
    this.dialogService
      .open(MCategoriesAddEditComponent, {
        context: {
          title: this.modelTitle,
          mCategory: mcategory,
        },
      })
      .onClose.subscribe(response => {
        this.maintenanceService.getAllMainCategories().subscribe(
          response => {
            this.categories = [];
            this.subCategories = [];
            this.subSubCategories = [];
            this.mainCategories = response;
          },
          error => {
            if (error.status === 401) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('expires');
              localStorage.removeItem('user');
              this.router.navigate(['auth'], {
                queryParams: {
                  isSessionExpired: true,
                },
              });
            } else {
              this.showToast(
                'danger',
                'Error!',
                'An error occured while fetching main-categories!',
              );
            }
          },
        );
      });
  }

  onDeleteMainCategory(category: MainCategory) {
    this.maintenanceService.deleteMainCategory(category.mainCat_id).subscribe(
      response => {
        if (response === 'Deleted') {
          this.maintenanceService.getAllMainCategories().subscribe(
            response => {
              this.categories = [];
              this.subCategories = [];
              this.subSubCategories = [];
              this.mainCategories = response;
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching main-categories!',
                );
              }
            },
          );
          this.showToast(
            'success',
            'Success!',
            'Targeted main-category has been deleted successfully!',
          );
        } else {
          this.showToast(
            'danger',
            'Error!',
            'Targeted main-category cannot delete!',
          );
        }
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while deleting main-category!',
          );
        }
      },
    );
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.selectedSubCategory.name = 'None';
    this.subCategories = [];
    this.subSubCategories = [];
    this.maintenanceService
      .getAllSubCategoriesByCategoryId(category.cat_id)
      .subscribe(
        response => {
          this.subCategories = response;
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching first sub-categories!',
            );
          }
        },
      );
  }

  onaddEditCategory(mCategoryId: number, category?: Category) {
    if (category === undefined) {
      this.modelTitle = 'Add Category';
    } else {
      this.modelTitle = 'Edit ' + category.name;
    }
    this.dialogService
      .open(CategoriesAddEditComponent, {
        context: {
          title: this.modelTitle,
          mCategoryId: mCategoryId,
          category: category,
        },
      })
      .onClose.subscribe(response => {
        this.maintenanceService
          .getAllCategoriesByMainCategoryId(mCategoryId)
          .subscribe(
            response => {
              this.subCategories = [];
              this.subSubCategories = [];
              this.categories = response;
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching first sub-categories!',
                );
              }
            },
          );
      });
  }

  onDeleteCategory(category: Category) {
    this.maintenanceService.deleteCategory(category.cat_id).subscribe(
      response => {
        if (response === 'Deleted') {
          this.maintenanceService
          .getAllCategoriesByMainCategoryId(this.selectedMainCategory.mainCat_id)
          .subscribe(
            response => {
              this.categories = response;
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching first sub-categories!',
                );
              }
            },
          );
          this.showToast(
            'success',
            'Success!',
            'Targeted first sub-category has been deleted successfully!',
          );
        } else {
          this.showToast(
            'danger',
            'Error!',
            'Targeted first sub-category cannot delete!',
          );
        }
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while deleting first sub-category!',
          );
        }
      },
    );
  }

  onSelectSubCategory(subCategory: SubCategory) {
    this.selectedSubCategory = subCategory;
    this.subSubCategories = [];
    this.maintenanceService
      .getAllForthSubCategoriesByCategoryId(subCategory.subCat_id)
      .subscribe(
        response => {
          this.subSubCategories = response;
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching second sub-categories!',
            );
          }
        },
      );
  }

  onSelectFourthSubCategory(fourthSubCategory: FourthSubCategory) {
    this.selectedSubSubCateory = fourthSubCategory;
  }

  onAddEditSubCategory(categoryId: number, subCategory?: SubCategory) {
    if (subCategory === undefined) {
      this.modelTitle = 'Add SubCategory';
    } else {
      this.modelTitle = 'Edit ' + subCategory.name;
    }
    this.dialogService
      .open(SubCategoriesAddEditComponent, {
        context: {
          title: this.modelTitle,
          cat_id: categoryId,
          subCategory: subCategory,
        },
      })
      .onClose.subscribe(response => {
        this.maintenanceService
          .getAllSubCategoriesByCategoryId(categoryId)
          .subscribe(
            response => {
              this.subCategories = [];
              this.subSubCategories = [];
              this.subCategories = response;
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching second sub-categories!',
                );
              }
            },
          );
      });
  }

  onDeleteSubCategory(subCategory: SubCategory) {
    this.maintenanceService.deleteSubCategory(subCategory.subCat_id).subscribe(
      response => {
        if (response === 'Deleted') {
          this.maintenanceService
          .getAllSubCategoriesByCategoryId(this.selectedCategory.cat_id)
          .subscribe(
            response => {
              this.subCategories = response;
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching first sub-categories!',
                );
              }
            },
          );
          this.showToast(
            'success',
            'Success!',
            'Targeted second sub-category has been deleted successfully!',
          );
        } else {
          this.showToast(
            'danger',
            'Error!',
            'Targeted second sub-category cannot delete!',
          );
        }
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while deleting second sub-category!',
          );
        }
      },
    );
  }

  onAddEditFourthSubCategory(
    subCategoryId: number,
    fourthSubCategory?: FourthSubCategory,
  ) {
    if (fourthSubCategory === undefined) {
      this.modelTitle = 'Add Fourth Sub Category';
    } else {
      this.modelTitle = 'Edit ' + fourthSubCategory.name;
    }
    this.dialogService
      .open(FourthCategoriesAddEditComponent, {
        context: {
          title: this.modelTitle,
          subCat_id: subCategoryId,
          fourthSubCategory: fourthSubCategory,
        },
      })
      .onClose.subscribe(response => {
        this.maintenanceService
          .getAllForthSubCategoriesByCategoryId(subCategoryId)
          .subscribe(
            response => {
              this.subSubCategories = [];
              this.subSubCategories = response;
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching third sub-categories!',
                );
              }
            },
          );
      });
  }

  onDeleteSubSubCategory(fourthSubCategory: FourthSubCategory) {
    this.maintenanceService
      .deleteForthSubCategory(fourthSubCategory.fsubCat_id)
      .subscribe(
        response => {
          if (response === 'Deleted') {
            this.maintenanceService
            .getAllForthSubCategoriesByCategoryId(this.selectedSubCategory.subCat_id)
            .subscribe(
              response => {
                this.subSubCategories = [];
                this.subSubCategories = response;
              },
              error => {
                if (error.status === 401) {
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('expires');
                  localStorage.removeItem('user');
                  this.router.navigate(['auth'], {
                    queryParams: {
                      isSessionExpired: true,
                    },
                  });
                } else {
                  this.showToast(
                    'danger',
                    'Error!',
                    'An error occured while fetching third sub-categories!',
                  );
                }
              },
            );


            this.showToast(
              'success',
              'Success!',
              'Targeted third sub-category has been deleted successfully!',
            );
          } else {
            this.showToast(
              'danger',
              'Error!',
              'Targeted third sub-category cannot delete!',
            );
          }
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while deleting third sub-category!',
            );
          }
        },
      );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
