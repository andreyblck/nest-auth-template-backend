import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/__generated__'
import { Request } from 'express'
import { Session } from 'express-session'

interface RequestWithSession extends Request {
	session: Session & {
		userId?: string
	}
	user?: User
}

export const Authorized = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<RequestWithSession>()

		const user = request.user

		return data ? user[data] : user
	}
)
