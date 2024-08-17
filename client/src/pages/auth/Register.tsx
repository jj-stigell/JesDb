import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { User } from '@supabase/supabase-js'

import Tos from 'src/pages/misc/Tos'
import CloseButton from 'src/components/CloseButton'
import Logo from 'src/components/Logo'
import ThirdPartyAuthList from './ThirdPartyAuthList'

import { useAppDispatch } from 'src/app/hooks'
import { setAccount } from 'src/features/accountSlice'
import supabase from 'src/lib/supabase'

interface IRegister {
  toggleModal: () => void
}

export default function Register ({ toggleModal }: IRegister): React.JSX.Element {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)
  const [showTosModal, setShowTosModal] = React.useState<boolean>(false)
  const [acceptTos, setAcceptTos] = React.useState<boolean>(false)

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
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Invalid email address')
        .required('Email address required'),
      password: yup
        .string()
        .required('Password required')
        .min(6, 'Password minimum length 6 characters'),
      passwordConfirm: yup
        .string()
        .required('Password confirmation required')
        .oneOf([yup.ref('password'), ''], 'Confirmation must match the password')
    }),
    onSubmit: async (values: {
      email: string
      password: string
      passwordConfirm: string
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password
      })

      if (error !== null) {
        setError(error.message)
      } else {
        const user = data.user as User
        dispatch(setAccount({
          isLoggedIn: true,
          processing: false,
          email: values.email,
          id: user.id
        }))
        toggleModal()
      }
    }
  })

  const toggleTosModal = (): void => {
    setShowTosModal(!showTosModal)
  }

  return (
    <>
      <Modal size="4xl" dismissible show={showTosModal} onClose={toggleTosModal}>
        <Tos toggleModal={toggleTosModal} />
      </Modal>
      <div className="px-9 pt-3 pb-7 bg-blue-100 rounded-lg dark:bg-jesdark-600">
        <CloseButton
          onClick={toggleModal}
          disabled={formik.isSubmitting}
          aria-label="Close registration form"
        />
        <div className="mb-2">
          <Logo />
        </div>
        <h2
          id="register-form-title"
          aria-live="polite"
          className={`
            text-center font-bold leading-tight tracking-tight
            text-gray-700 dark:text-white mb-4`
          }
        >
          Sign Up
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
        <form
          className="space-y-4 md:space-y-2"
          onSubmit={formik.handleSubmit}
          aria-labelledby="register-form-title"
        >
          <div className="dark:text-white">
            <Label htmlFor="email">Email address</Label>
          </div>
          <TextInput
            id='email'
            type='email'
            name='email'
            autoComplete='off'
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
          <div className="dark:text-white">
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
          </div>
          <TextInput
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            placeholder='••••••••'
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color={formik.errors.passwordConfirm !== undefined ? 'failure' : ''}
            helperText={
              formik.errors.passwordConfirm !== undefined
                ? <a className="text-xs">{formik.errors.passwordConfirm}</a>
                : ''
            }
          />
          <div className="flex items-center justify-start gap-2 my-4">
            <Checkbox
              id="checkbox-tos"
              checked={acceptTos}
              onChange={() => { setAcceptTos(!acceptTos) }}
              aria-describedby="tos-description"
            />
            <Label htmlFor="checkbox-tos" className="flex">
              <p>Accept&nbsp;</p>
              <button
                type="button"
                className="underline"
                onClick={toggleTosModal}
                aria-label="View Terms of Service"
              >
                Terms of Service
              </button>
            </Label>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-3/4 dark:bg-jesdark-700 dark:hover:bg-jesdark-800 mt-2"
              color="blue"
              disabled={formik.isSubmitting || !acceptTos}
              isProcessing={formik.isSubmitting}
              aria-label="Sign Up"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <ThirdPartyAuthList
          disabled={formik.isSubmitting}
          aria-label="Third Party Authentication Options"
        />
      </div>
    </>
  )
}
