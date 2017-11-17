import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../Service/statistic.service';
import { FormBuilder } from '@angular/forms';
import { ITypeCount } from '../Models/typeCount';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { PaginationService } from '../Service/pagination.service';

@Component({
    templateUrl: 'app/Components/statistic.component.html'
})

export class StatisticComponent implements OnInit {
    stats: ITypeCount[];
    stat: ITypeCount;
    msg: string;
    indLoading: boolean = false;
    pager: any = {};
    pagedItems: any[];

    constructor(private fb: FormBuilder, private _statisticService: StatisticService, private _paginationService: PaginationService) { }
    
    ngOnInit(): void {
        this.loadStatistic();
    }

    loadStatistic(): void {
        this.indLoading = true;
        this._statisticService.get(Global.BASE_STATISTIC_ENDPOINT)
            .subscribe(stats => {
                this.stats = stats;
                this.indLoading = false;
                this.setPage(1);
            },
            error => this.msg = <any>error);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        
        this.pager = this._paginationService.getPagination(this.stats.length, page, 3);
        this.pagedItems = this.stats.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}



