/**
 * Auth API utilities.
 *
 * Handles login and registration via GraphQL mutations.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { graphqlRequest } from "../utils/graphql"

/**
 * Represents a user.
*/
interface User {
    id: string,
    email: string
}
/**
 * Response type for login mutation.
 */
interface LoginResponse {
    login: {
        token: string,
        user: User
    }
}
/**
 * Response type for register mutation.
*/
interface RegisterResponse {
    register: {
        token: string,
        user: User
    }
}


/**
 * GraphQL mutation for user registration.
*/
const REGISTER_MUTATION = `
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      user {
      id
      email}
    }
  }
`

/**
 * GraphQL mutation for user login.
*/
const LOGIN_MUTATION = `
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
      id
      email}
    }
  }
`

/**
 * Logs in a user.
 *
 * @param email - User email
 * @param password - User password
 * @returns Authentication data (token + user)
 */
 export async function loginMutation(email: string, password: string) {

        const data = await graphqlRequest<LoginResponse>(LOGIN_MUTATION, {
            email,
            password
        })

        return data.login
}

/**
 * Registers a new user.
 *
 * @param email - User email
 * @param password - User password
 * @returns Authentication data (token + user)
 */
 export async function registerMutation(email: string, password: string) {

        const data = await graphqlRequest<RegisterResponse>(REGISTER_MUTATION, {
            email,
            password
        })

        return data.register
}