import { Injectable } from '@nestjs/common'

import { BaseOauthService } from './base-oauth.service'
import { TypeBaseProviderOptions } from './types/base-provider.options.types'
import { TypeUserInfo } from './types/user-info.types'

interface GoogleProfile extends Record<string, any> {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  given_name: string
  hd?: string
  iat: number
  iss: string
  locale?: string
  name: string
  nbf?: number
  picture?: string
  sub: string
  access_token: string
  refresh_token?: string
}

@Injectable()
export class GoogleProvider extends BaseOauthService {
  public constructor(options: TypeBaseProviderOptions) {
    super({
      name: 'google',
      client_id: options.client_id,
      client_secret: options.client_secret,
      authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      access_url: 'https://oauth2.googleapis.com/token',
      profile_url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scopes: options.scopes
    })
  }

  public extractUserInfo(data: GoogleProfile): TypeUserInfo {
    return super.extractUserInfo({
      email: data.email,
      name: data.name,
      picture: data.picture
    })
  }
}
