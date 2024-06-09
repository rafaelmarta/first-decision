export interface User {
  avatar: string;
  name: string;
  email: string;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  creationDate: Date;
  lastAccess: Date;
}
