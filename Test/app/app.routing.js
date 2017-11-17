"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var product_component_1 = require("./components/product.component");
var statistic_component_1 = require("./components/statistic.component");
var appRoutes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'product', component: product_component_1.ProductComponent },
    { path: 'statistic', component: statistic_component_1.StatisticComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map