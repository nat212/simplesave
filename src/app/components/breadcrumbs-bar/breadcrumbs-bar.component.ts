import { Component, OnInit } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable, of } from 'rxjs';

export interface Crumb {
  path: string | string[];
  label: string;
}

@Component({
  selector: 'ss-breadcrumbs-bar',
  templateUrl: './breadcrumbs-bar.component.html',
  styleUrls: ['./breadcrumbs-bar.component.scss'],
})
export class BreadcrumbsBarComponent implements OnInit {
  public crumbs$: Observable<Crumb[]>;
  constructor(private routerQuery: RouterQuery) {}

  public ngOnInit(): void {
    this.crumbs$ = of([]);
    this.routerQuery.selectData().subscribe(console.log);
  }
}
