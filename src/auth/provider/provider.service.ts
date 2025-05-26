import { Inject, Injectable, OnModuleInit } from '@nestjs/common'

import { TypeOptions } from './provider.constants'
import { ProviderOptionsSymbol } from './provider.constants'
import { BaseOauthService } from './services/base-oauth.service'

@Injectable()
export class ProviderService implements OnModuleInit {
  public constructor(
    @Inject(ProviderOptionsSymbol)
    private readonly options: TypeOptions
  ) {}

  public onModuleInit(): void {
    for (const provider of this.options.services) {
      provider.baseUrl = this.options.baseUrl
    }
  }

  public findByService(service: string): BaseOauthService | null {
    return this.options.services.find(provider => provider.name === service)
  }
}
