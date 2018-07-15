import { AuthState } from './auth/reducers/auth.state';
// This should hold the AppState interface
// Ideally importing all the substate for the application

/**
 *
 *
 * @export
 * @interface AppState
 */
export interface AppState {
  auth: AuthState;
}
