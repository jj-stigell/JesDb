import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import CloseButton from 'src/components/CloseButton'
import Logo from 'src/components/Logo'
import ThirdPartyAuthList from './ThirdPartyAuthList'

import { setAccount } from 'src/features/accountSlice'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { resetRemeberMe, setRememberMe as setRememberMeStore } from 'src/features/rememberMeSlice'
import supabase from 'src/lib/supabase'
import { getProfiles } from 'src/features/profileSlice'

export interface ILogin {
  toggleModal: () => void
}

export default function Login ({ toggleModal }: ILogin): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { rememberEmail, rememberPassword } = useAppSelector(state => state.remember)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setRememberMe(Boolean((rememberEmail !== null) && (rememberPassword !== null)))
  }, [])

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }, [error])

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: rememberEmail ?? '',
      password: rememberPassword ?? ''
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Invalid email address')
        .required('Email address required'),
      password: yup
        .string()
        .required('Password required')
    }),
    onSubmit: async (values: {
      email: string
      password: string
    }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })

      if (error !== null) {
        setError(error.message)
      } else {
        dispatch(setAccount({
          isLoggedIn: true,
          processing: false,
          email: values.email,
          id: data.user.id
        }))
        if (rememberMe) {
          dispatch(setRememberMeStore({
            rememberEmail: values.email,
            rememberPassword: values.password
          }))
        } else {
          dispatch(resetRemeberMe())
        }
        void dispatch(getProfiles())
        toggleModal()
      }
    }
  })

  return (
    <div className="px-9 pt-3 pb-7 bg-blue-100 rounded-lg dark:bg-jesdark-600">
      <CloseButton
        onClick={toggleModal}
        disabled={formik.isSubmitting}
        aria-label="Close login form"
      />
      <div className="mb-2">
        <Logo />
      </div>
      <h2
        id="login-form-title"
        aria-live="polite"
        className={`
          text-center font-bold leading-tight tracking-tight
          text-gray-700 dark:text-white mb-4`
        }
      >
        Sign In
      </h2>
      {error !== null && (
        <div
          className="text-center my-2 text-red-600 text-wrap"
          role="alert"
          aria-live="assertive"
        >
          Error: {error}
        </div>
      )}
      <form className="space-y-4 md:space-y-2" onSubmit={formik.handleSubmit}>
        <div className="dark:text-white">
          <Label htmlFor="password">Email address</Label>
        </div>
        <TextInput
          id='email'
          type='email'
          name='email'
          autoComplete='email'
          placeholder='tanaka.yukiko@yahoo.jp'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={formik.errors.email !== undefined ? 'failure' : ''}
          helperText={
            formik.errors.email !== undefined
              ? <a className="text-xs">{formik.errors.email}</a>
              : ''
            }
          autoFocus
        />
        <div className="dark:text-white">
          <Label htmlFor="password">Password</Label>
        </div>
        <TextInput
          id='password'
          type='password'
          name='password'
          placeholder='••••••••'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={formik.errors.password !== undefined ? 'failure' : ''}
          helperText={
            formik.errors.password !== undefined
              ? <a className="text-xs">{formik.errors.password}</a>
              : ''
          }
        />
        <div className="flex items-center justify-between">
          <div className="flex items-start my-2">
            <div className="flex items-center h-5">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onChange={() => { setRememberMe(!rememberMe) }}
                aria-labelledby="remember-label"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-white"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            color="blue"
            className="w-3/4 dark:bg-jesdark-700 dark:hover:bg-jesdark-800"
            type='submit'
            disabled={formik.isSubmitting}
            isProcessing={formik.isSubmitting}
            aria-label="Sign in"
          >
            Sign in
          </Button>
        </div>
      </form>
      <ThirdPartyAuthList
        disabled={formik.isSubmitting}
        aria-label="Third Party Authentication Options"
      />
    </div>
  )
}
