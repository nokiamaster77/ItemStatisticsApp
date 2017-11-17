import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { routing } from './app.routing';
import { ProductComponent } from './components/product.component';
import { ProductService } from './Service/product.service';
import { StatisticComponent } from './components/statistic.component';
import { StatisticService } from './Service/statistic.service';
import { PaginationService } from './Service/pagination.service';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, ProductComponent, StatisticComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ProductService, StatisticService, PaginationService],
    bootstrap: [AppComponent]
})

export class AppModule { }