import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user){

        let msgText = 'Register successfully'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            //console.log(data)
            await authUser(data)
        } catch (error) {
            console.log(error.response)
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        try {
            setAuthenticated(true)
            localStorage.setItem('token', JSON.stringify(data.token))
            navigate('/')
        } catch (error) {
            console.log('error authUser', error)
        }
      }

      async function logout() {
        const msgText = 'Logout successfully'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
      }

    return { authenticated, register,logout }
}