import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: number;
    role: 'ADMIN' | 'USER' | 'ARENDATOR' | 'SUPER_ADMIN';
  }
}

export default RequestWithUser