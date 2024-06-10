export interface User {
  [key: string]: any;
  avatar: string | null;
  name: string;
  lastName: string;
  phone?: string;
  email: string;
  profile?: string;
  language?: string;
  contactType?: string;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  creationDate: Date;
  lastAccess: Date | null;
}
