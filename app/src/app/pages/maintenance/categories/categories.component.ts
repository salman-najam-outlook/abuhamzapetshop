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
    constructor(private maintenanceService: MaintenanceService, private dialogService: NbDialogService) {
        this.selectedMainCategory.name = 'None';
        this.selectedCategory.name = 'None';
        this.selectedSubCategory.name = 'None';
        this.selectedSubSubCateory.name = 'None';
    }

    ngOnInit() {
        this.maintenanceService.getAllMainCategories().subscribe(
            (response) => {
                this.mainCategories = response;
            },
            (error) => {
                console.log(error);
            }
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
        this.maintenanceService.getAllCategoriesByMainCategoryId(mcategory.mainCat_id).subscribe(
            (response) => {
                this.categories = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onAddEditMainCategory(mcategory?: MainCategory) {
        if (mcategory === undefined) {
            this.modelTitle = 'Add Main Category'
        } else {
            this.modelTitle = 'Edit ' + mcategory.name;
        }
        this.dialogService.open(MCategoriesAddEditComponent, {
            context: {
                title: this.modelTitle,
                mCategory: mcategory
            }
        }).onClose.subscribe(response => {
            this.maintenanceService.getAllMainCategories().subscribe(
                (response) => {
                    this.categories = [];
                    this.subCategories = [];
                    this.subSubCategories = [];
                    this.mainCategories = response;
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    onDeleteMainCategory(category: MainCategory) {
        console.log('onDeleteCategory', category)
    }

    onSelectCategory(category: Category) {
        this.selectedCategory = category;
        this.selectedSubCategory.name = 'None';
        this.subCategories = [];
        this.subSubCategories = [];
        this.maintenanceService.getAllSubCategoriesByCategoryId(category.cat_id).subscribe(
            (response) => {
                this.subCategories = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onaddEditCategory(mCategoryId: number, category?: Category) {
        if (category === undefined) {
            this.modelTitle = 'Add Category'
        } else {
            this.modelTitle = 'Edit ' + category.name;
        }
        this.dialogService.open(CategoriesAddEditComponent, {
            context: {
                title: this.modelTitle,
                mCategoryId: mCategoryId,
                category: category
            }
        }).onClose.subscribe(response => {
            this.maintenanceService.getAllCategoriesByMainCategoryId(mCategoryId).subscribe(
                (response) => {
                    this.subCategories = [];
                    this.subSubCategories = [];
                    this.categories = response;
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    onDeletCategory(category: Category) {
        console.log('onDeleteCategory', category)
    }

    onSelectSubCategory(subCategory: SubCategory) {
        this.selectedSubCategory = subCategory;
        this.subSubCategories = [];
        this.maintenanceService.getAllForthSubCategoriesByCategoryId(subCategory.subCat_id).subscribe(
            (response) => {
                this.subSubCategories = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onSelectFourthSubCategory(fourthSubCategory: FourthSubCategory) {
        this.selectedSubSubCateory = fourthSubCategory;
    }

    onAddEditSubCategory(categoryId: number, subCategory?: SubCategory) {
        if (subCategory === undefined) {
            this.modelTitle = 'Add SubCategory'
        } else {
            this.modelTitle = 'Edit ' + subCategory.name;
        }
        this.dialogService.open(SubCategoriesAddEditComponent, {
            context: {
                title: this.modelTitle,
                cat_id: categoryId,
                subCategory: subCategory
            }
        }).onClose.subscribe(response => {
            this.maintenanceService.getAllSubCategoriesByCategoryId(categoryId).subscribe(
                (response) => {
                    this.subCategories = [];
                    this.subSubCategories = [];
                    this.subCategories = response;
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    onDeleteSubCategory(subCategory: SubCategory) {
        console.log(subCategory);
    }

    onAddEditFourthSubCategory(subCategoryId: number, fourthSubCategory?: FourthSubCategory) {
        if (fourthSubCategory === undefined) {
            this.modelTitle = 'Add Fourth Sub Category'
        } else {
            this.modelTitle = 'Edit ' + fourthSubCategory.name;
        }
        this.dialogService.open(FourthCategoriesAddEditComponent, {
            context: {
                title: this.modelTitle,
                subCat_id: subCategoryId,
                fourthSubCategory: fourthSubCategory
            }
        }).onClose.subscribe(response => {
            this.maintenanceService.getAllForthSubCategoriesByCategoryId(subCategoryId).subscribe(
                (response) => {
                    this.subSubCategories = [];
                    this.subSubCategories = response;
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    onDeleteSubSubCategory(subCategory: SubCategory) {
        console.log(subCategory);
    }
}
