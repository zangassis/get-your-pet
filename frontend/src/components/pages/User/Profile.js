import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'
import Input from '../../form/Input'
import { useState, useEffect } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'

function Profile(){

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e){
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value })
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key) => 

        formData.append(key, user[key]))

        const data = await api.patch(`/users/edit/${user._id}`, formData, 
        {headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data' 
        }}).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    } 

    return (

    <section>
            <div className={styles.profile_header}>
                <h1>Profile</h1>
                <p>Image</p>
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text="Image"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}>
                </Input>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    handleOnChange={handleOnChange}
                    value={user.email || ''}>
                </Input>
                <Input
                    text="Name"
                    type="text"
                    name="name"
                    placeholder="Type your name"
                    handleOnChange={handleOnChange}
                    value={user.name || ''}>
                </Input>
                <Input
                    text="Phone"
                    type="text"
                    name="phone"
                    placeholder="Type your phone"
                    handleOnChange={handleOnChange}
                    value={user.phone || ''}>
                </Input>
                <Input
                    text="Password"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    handleOnChange={handleOnChange}
                    value={user.password || ''}>
                </Input>
                <Input
                    text="Password confirmation"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    handleOnChange={handleOnChange}>
                </Input>
                <input type="submit" value="Edit"></input>
            </form>
    </section>
    )
}

export default Profile