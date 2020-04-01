import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  detalle: string;
  cod: string;
  id: number;
  estado: string;
  solicitante: string;
  asignado: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {id: 1, cod:'C0015', detalle: 'Hydrogen1', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 2, cod:'C0016', detalle: 'Hydrogen2', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' }, 
  {id: 3, cod:'C0017', detalle: 'Hydrogen3', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 4, cod:'C0018', detalle: 'Hydrogen4', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 5, cod:'C0019', detalle: 'Hydrogen5', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 6, cod:'C0011', detalle: 'Hydrogen6', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 7, cod:'C0012', detalle: 'Hydrogen7', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 8, cod:'C0013', detalle: 'Hydrogen8', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },  
  {id: 9, cod:'C0014', detalle: 'Hydrogen9', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 10, cod:'C001', detalle: 'Hydrogen10', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 11, cod:'C002', detalle: 'Hydrogen11', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 12, cod:'C003', detalle: 'Hydrogen12', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 13, cod:'C004', detalle: 'Hydrogen13', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
  {id: 14, cod:'C005', detalle: 'Hydrogen14', solicitante:'Brayan S', asignado:'Daniela S', estado:'Activo' },
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'cod': return compare(a.cod, b.cod, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
