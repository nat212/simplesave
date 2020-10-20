import { Component, OnInit } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.crumbs$ = this.routerQuery.selectData().pipe(map(({ breadcrumbs }) => breadcrumbs));
  }
}
