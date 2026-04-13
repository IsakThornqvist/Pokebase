const API_URL = import.meta.env.VITE_API_URL

// T placeholder used in hooks later
export async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>, token?: string | null): Promise<T> {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }
  return data.data
}
