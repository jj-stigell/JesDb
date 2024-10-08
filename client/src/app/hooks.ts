import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from './store'

/**
 * For Redux.
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 * https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */
export type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
