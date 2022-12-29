import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function MyPets(){
    const [pets, setPets] = useState([])
    return (
    <section>
            <h1>MyPets</h1>
            <Link to='/pet/add'>Register a Pet</Link>
            <div>
                {pets.length > 0 && <p>My registred pets</p>}
                {pets.length === 0 && <p>No Pets registered yet</p>}
            </div>
    </section>
    )
}

export default MyPets