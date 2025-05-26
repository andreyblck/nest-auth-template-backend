export type TypeUserInfo = {
  id: string
  picture: string
  email: string
  name: string
  access_token?: string
  refresh_token?: string
  expires_at?: number
  provider: string
}
