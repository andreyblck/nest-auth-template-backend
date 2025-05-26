import { ConfigService } from '@nestjs/config'

import { TypeOptions } from '@/auth/provider/provider.constants'
import { GoogleProvider } from '@/auth/provider/services/google.provider'

export const getProvidersConfig = (
  configService: ConfigService
): TypeOptions => ({
  baseUrl: configService.getOrThrow<string>('APPLICATION_URL'),
  services: [
    new GoogleProvider({
      client_id: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      client_secret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      scopes: ['email', 'profile']
    })
  ]
})
