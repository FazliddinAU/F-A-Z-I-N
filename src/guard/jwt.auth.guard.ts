import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(`Token: ${token}`); 

    if (!token) {
      return false; 
    }

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      return true;
    } catch (error) {
      return false; 
    }
  }
}
