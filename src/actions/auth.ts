'use server'

export const attemptLogin = async (email: string, password: string) : Promise<any> => {
  console.log('Attempting login with: ' + email)
  return {'success': true}
}