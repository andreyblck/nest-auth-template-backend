import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { User } from '@prisma/__generated__'
import { Request } from 'express'
import { Session } from 'express-session'

import { UserService } from '@/user/user.service'

interface RequestWithSession extends Request {
  session: Session & {
    userId?: string
  }
  user?: User
}

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithSession>()

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException('Unauthorized')
    }

    const user = await this.userService.findById(request.session.userId)

    request.user = user

    return true
  }
}
