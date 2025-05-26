import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

import {
  TokenResponse,
  TypeBaseProviderOptions
} from './types/base-provider.options.types'
import { TypeUserInfo } from './types/user-info.types'

@Injectable()
export class BaseOauthService {
  private BASE_URL: string

  public constructor(private readonly options: TypeBaseProviderOptions) {}

  protected extractUserInfo(data: Record<string, unknown>): TypeUserInfo {
    return {
      ...data,
      provider: this.options.name
    } as TypeUserInfo
  }

  public getAuthUrl() {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: (this.options.scopes || []).join(' '),
      access_type: 'offline',
      prompt: 'select_account'
    })

    return `${this.options.authorize_url}?${query.toString()}`
  }

  public async findUserByCode(code: string): Promise<TypeUserInfo> {
    const clientId = this.options.client_id
    const clientSecret = this.options.client_secret

    const tokenQuery = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
      code
    })

    const tokenRequest = await fetch(this.options.access_url, {
      method: 'POST',
      body: tokenQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      }
    })

    if (!tokenRequest.ok) {
      throw new BadRequestException(
        `Cannot get user info from ${this.options.profile_url} provider`
      )
    }

    const tokens = (await tokenRequest.json()) as TokenResponse

    if (!tokens.access_token) {
      throw new BadRequestException(
        `No tokens received from ${this.options.access_url}`
      )
    }

    const userInfo = await fetch(this.options.profile_url, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    })

    if (!userInfo.ok) {
      throw new UnauthorizedException(
        `Cannot get user info from ${this.options.profile_url} provider.`
      )
    }

    const user = (await userInfo.json()) as TypeUserInfo

    const userData = this.extractUserInfo(user)

    return {
      ...userData,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + tokens.expires_in * 1000,
      provider: this.options.name
    }
  }

  public getRedirectUrl() {
    return `${this.baseUrl}/auth/oauth/callback/${this.options.name}`
  }

  set baseUrl(url: string) {
    this.BASE_URL = url
  }

  get baseUrl() {
    return this.BASE_URL
  }

  get name() {
    return this.options.name
  }

  get access_url() {
    return this.options.access_url
  }

  get profile_url() {
    return this.options.profile_url
  }

  get scopes() {
    return this.options.scopes
  }
}
