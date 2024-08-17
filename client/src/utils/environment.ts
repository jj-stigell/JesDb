/**
 * Current Node environment.
 * This variable indicates the environment in which the Node application is running.
 * Possible values: 'development', 'production', and 'test'.
 * Defaults to 'development' if the NODE_ENV environment variable is not set.
 */
export const NODE_ENV: string = process.env.REACT_APP_NODE_ENV ?? 'development'

/**
 * Supabase URL. This is the URL to your Supabase project.
 * You can find this key in your Supabase project settings.
 */
export const SUPABASE_URL: string = process.env.REACT_APP_SUPABASE_URL ?? ''

/**
 * Supabase API key. Only use public key here. Do not expose your private key.
 * This key is used to authenticate with the Supabase API.
 * You can find this key in your Supabase project settings.
 */
export const SUPABASE_KEY: string = process.env.REACT_APP_SUPABASE_KEY ?? ''

/**
 * Auth callback URL. This is the URL that the user will be redirected to after
 * they authenticate with Supabase.
 * This URL must be added to the list of "Redirect URIs" in your Supabase project settings.
 */
export const AUTH_CALLBACK_URL: string =
  process.env.REACT_APP_AUTH_CALLBACK_URL ?? 'http://localhost:3000/auth/callback'
