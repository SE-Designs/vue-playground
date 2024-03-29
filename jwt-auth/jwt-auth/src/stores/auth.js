import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosApi from '../api'

const apiKey = import.meta.env.VITE_API_KEY

export const useAuthStore = defineStore('authstore', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })

  const error = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'

    error.value = ''
    loader.value = true
    try {
      let response = await axiosApi.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken
        })
      )
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email already exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email not found'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Invalid password'
          break
        default:
          error.value = 'Something went wrong'
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    }
  }

  return { auth, userInfo, error, loader, logout }
})
