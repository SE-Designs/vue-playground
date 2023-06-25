import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

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

  const signup = async (payload) => {
    error.value = ''
    loader.value = true
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
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

      loader.value = false
    } catch (err) {
      console.log(err.response.data.error.message)
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email already exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        default:
          error.value = 'Something went wrong'
          break
      }
      loader.value = false
    }
  }

  return { signup, userInfo, error, loader }
})
