import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet(){
    return (
    <section className={styles.addpet_header}>
            <div>
                <h1>Register a new Pet for adoption</h1>
            </div>

    </section>
    )
}

export default AddPet