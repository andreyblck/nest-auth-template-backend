export type TypeProvider = {
  name?: string
  scopes: string[]
  client_id: string
  client_secret: string
  authorize_url?: string
  access_url?: string
  profile_url?: string
}
