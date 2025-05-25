import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/__generated__'
import { Request } from 'express'

import { ROLES_KEY } from '@/auth/decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(private readonly reflector: Reflector) {}

	public canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		const request = context
			.switchToHttp()
			.getRequest<Request & { user: { role: UserRole } }>()

		if (!roles) {
			return Promise.resolve(true)
		}

		if (!roles.includes(request.user.role)) {
			throw new ForbiddenException(
				'You are not authorized to access this resource'
			)
		}

		return Promise.resolve(true)
	}
}
