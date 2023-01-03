import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './PetDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails() {
  const [pet, setPet] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  }, [id])

  async function schedule() {
    let msgType = 'success'
    const formData = new FormData()

    console.log(token)
    console.log(`Bearer ${JSON.parse(token)}`)

    const data = await api
      .patch(`pets/schedule/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Meeting the pet: {pet.name}</h1>
            <p>If interested, schedule a visit to meet him!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
              />
            ))}
          </div>
          <p>
            <span className="bold">Weight:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Age:</span> {pet.age} years
          </p>
          {token ? (
            <button onClick={schedule}>Request a visit</button>
          ) : (
            <p>
              You need to <Link to="/register">create an account</Link> to request the visit.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails