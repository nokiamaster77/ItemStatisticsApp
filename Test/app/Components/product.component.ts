import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IProduct } from '../Models/product';
import { DbOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { PaginationService} from '../Service/pagination.service';

@Component({

    templateUrl: 'app/Components/product.component.html'

})

export class ProductComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    products: IProduct[];
    product: IProduct;
    msg: string;
    addMsg: string;
    indLoading: boolean = false;
    productFrm: FormGroup;
    productAddFrm: FormGroup;
    dbops: DbOperation;
    modalTitle: string;
    modalBtnTitle: string;
    pager: any = {};
    pagedItems: any[];

    constructor(private fb: FormBuilder, private _productService: ProductService, private _paginationService: PaginationService) { }

    ngOnInit(): void {
        this.productFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Type: ['', Validators.required]
        });
        this.productAddFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Type: ['', Validators.required]
        });
        this.loadProducts();
    }

    loadProducts(): void {
        this.indLoading = true;
        this._productService.get(Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(products => {
                this.products = products;
                this.indLoading = false;
                this.setPage(1);
                },
            error => this.msg = <any>error);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        
        this.pager = this._paginationService.getPagination(this.products.length, page, 4);
        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    addProduct(data: any) {
        this._productService.post(Global.BASE_PRODUCT_ENDPOINT, data._value).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.addMsg = "Data successfully added.";
                    this.productAddFrm.reset();
                    this.loadProducts();
                }
                else {
                    this.addMsg = "There is some issue in saving records, please contact to system administrator!";
                }
            },
            error => {
                this.addMsg = error;
            }
        );
    }

    editProduct(id: number) {
        this.dbops = DbOperation.Update;
        this.setControlsState(true);
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(x => x.Id == id)[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    }

    deleteProduct(id: number) {
        this.dbops = DbOperation.Delete;
        this.setControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(x => x.Id == id)[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
        case DbOperation.Update:
            this._productService.put(Global.BASE_PRODUCT_ENDPOINT, formData._value.Id, formData._value).subscribe(
                data => {
                    if (data == 1) //Success
                    {
                        this.msg = "Data successfully updated.";
                        this.loadProducts();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    this.modal.dismiss();
                },
                error => {
                    this.msg = error;
                }
            );
            break;
        case DbOperation.Delete:
            this._productService.delete(Global.BASE_PRODUCT_ENDPOINT, formData._value.Id).subscribe(
                data => {
                    if (data == 1) //Success
                    {
                        this.msg = "Data successfully deleted.";
                        this.loadProducts();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    this.modal.dismiss();
                },
                error => {
                    this.msg = error;
                }
            );
            break;
        }
    }

    setControlsState(isEnable: boolean) {
        isEnable ? this.productFrm.enable() : this.productFrm.disable();
    }
}



