import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product.component';
import { StatisticComponent } from './components/statistic.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'product', component: ProductComponent },
    { path: 'statistic', component: StatisticComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);