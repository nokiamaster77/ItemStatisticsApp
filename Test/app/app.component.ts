import {Component} from "@angular/core";

@Component({
    selector: "product-app",
    template: `<div>
                    <nav class='navbar navbar-inverse'>
                        <div class='container-fluid'>
                            <ul class='nav navbar-nav'>
                                <li><a [routerLink]="['product']">Products</a></li>   
                                <li><a [routerLink]="['statistic']">Product statistic</a></li>                             
                            </ul>
                        </div>
                    </nav>
                    <div class='container'>
                        <router-outlet></router-outlet>
                    </div>
               </div>`
})
export class AppComponent {

}
