import {AfterContentChecked, Input} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DefaultComponent} from "../../common/defaut-component";

export type SearchFieldFunction<T> = (data: T) => string

@DefaultComponent()
export class BaseTableComponent<T> implements AfterContentChecked {

  searchFields: (string | SearchFieldFunction<T>)[]
  displayColumns: string[];

  _paginator: MatPaginator;
  get paginator() { return this._paginator }

  @Input()
  set paginator(paginator: MatPaginator) {
    this._paginator = paginator
  }

  _sort: MatSort;
  get sort() { return this._sort }

  @Input()
  set sort(sort: MatSort) {
    this._sort = sort
  }

  _dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  get dataSource() { return this._dataSource.data }

  @Input()
  set dataSource(data: T[]) {
    this._dataSource.data = data;
  }

  ngAfterContentChecked() {
    this.configureDataSource()
  }

  configureDataSource() {
    if(this.searchFields?.length > 0) {
      this._dataSource.filterPredicate = (data: T, filter: string) => this.filterPredicate(data, filter)
    }

    if(this._paginator) {
      this._dataSource.paginator = this._paginator
    }

    if(this._sort) {
      this._dataSource.sort = this._sort
    }

  }

  filterPredicate(data: T, filter: string) {
    const validate = (field: string) => field.toLocaleLowerCase().includes(filter.toString().toLocaleLowerCase())

    return this.searchFields.map( (fnOrProperty: string | SearchFieldFunction<T>) => {
      console.log(fnOrProperty)
      return ''
    }).some(validate)
  }

}
