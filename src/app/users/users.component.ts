import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './users.types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'avatarAndName',
    'status',
    'creationDate',
    'lastAccess',
    'options',
  ];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog
  ) {
    const users: User[] = [
      {
        avatar: 'avatarUrl',
        name: 'Nome Teste 1',
        email: 'teste1@example.com',
        status: 'Ativo',
        creationDate: new Date(),
        lastAccess: new Date(),
      },
      {
        avatar: 'avatarUrl',
        name: 'Nome Teste 2',
        email: 'teste2@example.com',
        status: 'Pendente',
        creationDate: new Date(),
        lastAccess: new Date(),
      },
      {
        avatar: 'avatarUrl',
        name: 'Nome Teste 3',
        email: 'teste3@example.com',
        status: 'Bloqueado',
        creationDate: new Date(),
        lastAccess: new Date(),
      },
      {
        avatar: 'avatarUrl',
        name: 'Nome Teste 4',
        email: 'teste4@example.com',
        status: 'Ativo',
        creationDate: new Date(),
        lastAccess: new Date(),
      },
      {
        avatar: 'avatarUrl',
        name: 'Nome Teste 5',
        email: 'teste5@example.com',
        status: 'Bloqueado',
        creationDate: new Date(),
        lastAccess: new Date(),
      },
    ];
    this.dataSource = new MatTableDataSource(users);
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  onSearch(value: string) {
    // Implement your search logic here
    console.log('Searching for:', value);
  }

  openUserFormDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle dialog result here if needed
    });
  }

  getStatusClass(status: 'Ativo' | 'Pendente' | 'Bloqueado') {
    switch (status) {
      case 'Ativo':
        return 'green-tag';
      case 'Pendente':
        return 'yellow-tag';
      case 'Bloqueado':
        return 'red-tag';
      default:
        return '';
    }
  }
}
