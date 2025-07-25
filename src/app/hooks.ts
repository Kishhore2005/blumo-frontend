import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * A pre-typed version of the `useDispatch` hook.
 * This saves you from having to type `useDispatch<AppDispatch>()` in every component.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A pre-typed version of the `useSelector` hook.
 * This saves you from having to type `(state: RootState)` each time.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
