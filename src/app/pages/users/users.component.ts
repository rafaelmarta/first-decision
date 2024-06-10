import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from './users.types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { mockUsers } from './users.mock';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'avatarAndName',
    'status',
    'creationDate',
    'lastAccess',
    'options',
    ];

  dataSource: MatTableDataSource<User>;

  avatarColors: Record<string, string> = {}

  selectedStatus: string = '';
  searchValue: string = '';

  defaultUsers: User[] = mockUsers

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(
    public dialog: MatDialog,
    private paginatorIntl: MatPaginatorIntl
  ) {
    const storedUsersJson = localStorage.getItem('Users');
    const storedUsers: User[] = storedUsersJson ? JSON.parse(storedUsersJson): [];

    const users: User[] = [...this.defaultUsers, ...storedUsers];

    this.dataSource = new MatTableDataSource(users);

    this.paginatorIntl.itemsPerPageLabel = 'Itens por página';
    this.paginatorIntl.nextPageLabel = 'Próxima';
    this.paginatorIntl.previousPageLabel = 'Anterior';
    this.paginatorIntl.firstPageLabel = 'Primeira Página';
    this.paginatorIntl.lastPageLabel = 'Última Página';
    this.paginatorIntl.changes.next();
  }

  onPageEvent(pageIndex: number): void {
    this.paginator.pageIndex = pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.initializeUsers();
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'avatarAndName': return item.name + item.lastName + item.email;
        default: return (item as any)[property];
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
  }

  initializeUsers(): void {
    const storedUsersJson = localStorage.getItem('Users');
    const storedUsers: User[] = storedUsersJson ? JSON.parse(storedUsersJson): [];

    const users: User[] = [...this.defaultUsers, ...storedUsers];

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

  if (this.paginator) {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginator.pageSize;
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}

  assignAvatarColors(): void {
    this.dataSource.data.forEach(user => {
      if (!user.avatar) {
        const userId = user.name + user.lastName;
        if (!this.avatarColors[userId]){
          this.avatarColors[userId] = this.generateRandomColor();
        }
      }
    })
  }

  generateRandomColor(): string {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    return randomColor;
  }

  getAvatarColor(userId: string): string {
    return this.avatarColors[userId]
  }

  changeStatus(user: User, status: 'Ativo' | 'Bloqueado'): void {
    const index = this.dataSource.data.findIndex(u => u.email === user.email);

    if (index !== -1) {
      this.dataSource.data[index].status = status;

      const isDefaultUser = this.defaultUsers.some(defaultUser => defaultUser.email === user.email);

      if (!isDefaultUser) {
        const nonDefaultUsers = this.dataSource.data.filter(u => !this.defaultUsers.some(defaultUser => defaultUser.email === u.email));
        localStorage.setItem('Users', JSON.stringify(nonDefaultUsers));
      }

      this.table.renderRows();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  filterStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    this.applyFilters();
  }

  applyFilters() {
    const searchText = this.searchValue.trim().toLowerCase();
    const statusFilter = this.selectedStatus.toLowerCase();

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const textMatch = searchText ? data.name.toLowerCase().includes(searchText) || data.lastName.toLowerCase().includes(searchText) || data.email.toLowerCase().includes(searchText) : true;
      const statusMatch = statusFilter ? data.status.toLowerCase() === statusFilter : true;
      return textMatch && statusMatch;
    };

    this.dataSource.filter = searchText + '$' + statusFilter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserFormDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initializeUsers();
    });
  }

  getStatusClass(status: 'Ativo' | 'Pendente' | 'Bloqueado') {
    return {
      'green-tag': status === 'Ativo',
      'yellow-tag': status === 'Pendente',
      'red-tag': status === 'Bloqueado'
    }
  }
}
