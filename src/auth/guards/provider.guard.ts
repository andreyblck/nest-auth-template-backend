import { CanActivate } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { ExecutionContext, NotFoundException } from '@nestjs/common'
import { Request } from 'express'

import { ProviderService } from '@/auth/provider/provider.service'

@Injectable()
export class AuthProviderGuard implements CanActivate {
  public constructor(private readonly providerService: ProviderService) {}

  public canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const provider = request.params.provider
    const providerInstance = this.providerService.findByService(provider)

    if (!providerInstance) {
      throw new NotFoundException(
        `Provider "${provider}" not found. Please check the correctness of the entered data.`
      )
    }

    return true
  }
}
