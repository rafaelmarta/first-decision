import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './users.types';

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

  constructor() {
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
