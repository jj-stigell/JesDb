import React from 'react'
import { Provider } from '@supabase/supabase-js'

import ThirdPartyButton from './ThirdPartyButton'

import supabase from 'src/lib/supabase'
import { AUTH_CALLBACK_URL } from 'src/utils/environment'

interface IThirdPartAuth {
  disabled: boolean
}

export default function ThirdPartyAuthList ({
  disabled
}: IThirdPartAuth): React.JSX.Element {
  const [method, setMethod] = React.useState<Provider | null>(null)
  const processAuth = async (provider: Provider): Promise<void> => {
    setMethod(provider)
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: AUTH_CALLBACK_URL
      }
    })
  }

  return (
    <div className="mt-4">
      <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700"/>
      <div className="flex justify-center text-sm dark:text-white">
        <span className="py-2">Or continue with</span>
      </div>
      <div className="flex justify-center mb-3">
        <ThirdPartyButton
          provider='google'
          buttonText='Google'
          aria-label="Sign in with Google"
          disabled={disabled || (method !== null && method !== 'google')}
          isProcessing={method === 'google'}
          onClick={() => {
            void processAuth('google')
          }}
        />
      </div>
      <div className="flex justify-center mb-3">
        <ThirdPartyButton
          provider='github'
          buttonText='Github'
          aria-label="Sign in with GitHub"
          disabled={disabled || (method !== null && method !== 'github')}
          isProcessing={method === 'github'}
          onClick={() => {
            void processAuth('github')
          }}
        />
      </div>
    </div>
  )
}
