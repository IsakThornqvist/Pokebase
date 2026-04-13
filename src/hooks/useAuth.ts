import { graphqlRequest } from "../utils/graphql"

interface User {
    id: string,
    email: string
}
interface LoginResponse {
    login: {
        token: string,
        user: User
    }
}
interface RegisterResponse {
    register: {
        token: string,
        user: User
    }
}



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

 export async function loginMutation(email: string, password: string) {

        const data = await graphqlRequest<LoginResponse>(LOGIN_MUTATION, {
            email,
            password
        })

        return data.login
}
 export async function registerMutation(email: string, password: string) {

        const data = await graphqlRequest<RegisterResponse>(REGISTER_MUTATION, {
            email,
            password
        })

        return data.register
}