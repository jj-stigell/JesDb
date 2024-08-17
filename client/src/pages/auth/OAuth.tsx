import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { setAccount } from 'src/features/accountSlice'
import { useAppDispatch } from 'src/app/hooks'
import supabase from 'src/lib/supabase'

export default function OAuth (): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (data.session !== null) {
        dispatch(setAccount({
          isLoggedIn: true,
          processing: false,
          email: data.session?.user.email ?? '',
          id: data.session?.user.id ?? ''
        }))
      } else {
        toast.error('Failed to sign in!')
      }

      if (error !== null) {
        toast.error(error.message)
      }
    }).catch((error) => {
      toast.error(error.message)
    }).finally(() => {
      navigate('/')
    })
  }, [])

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full md:w-3/4 flex flex-col items-center justify-center text-center">
        <div className="text-center dark:text-white mt-4" aria-live="polite">
          <div
            role="status"
            aria-label="Loading spinner"
            className={`
            inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current
            border-e-transparent align-[-0.125em] text-warning
            motion-reduce:animate-[spin_1.5s_linear_infinite]`
            }
          />
          <div className="mt-4" aria-live="polite">
            Sign in in progress...
          </div>
        </div>
      </div>
    </div>
  )
}
