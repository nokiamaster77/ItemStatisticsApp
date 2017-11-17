"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var statistic_service_1 = require("../Service/statistic.service");
var forms_1 = require("@angular/forms");
var global_1 = require("../Shared/global");
var pagination_service_1 = require("../Service/pagination.service");
var StatisticComponent = /** @class */ (function () {
    function StatisticComponent(fb, _statisticService, _paginationService) {
        this.fb = fb;
        this._statisticService = _statisticService;
        this._paginationService = _paginationService;
        this.indLoading = false;
        this.pager = {};
    }
    StatisticComponent.prototype.ngOnInit = function () {
        this.loadStatistic();
    };
    StatisticComponent.prototype.loadStatistic = function () {
        var _this = this;
        this.indLoading = true;
        this._statisticService.get(global_1.Global.BASE_STATISTIC_ENDPOINT)
            .subscribe(function (stats) {
            _this.stats = stats;
            _this.indLoading = false;
            _this.setPage(1);
        }, function (error) { return _this.msg = error; });
    };
    StatisticComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._paginationService.getPagination(this.stats.length, page, 3);
        this.pagedItems = this.stats.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    StatisticComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/statistic.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, statistic_service_1.StatisticService, pagination_service_1.PaginationService])
    ], StatisticComponent);
    return StatisticComponent;
}());
exports.StatisticComponent = StatisticComponent;
//# sourceMappingURL=statistic.component.js.map