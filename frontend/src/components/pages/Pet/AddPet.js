import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'

function AddPet(){
    return (
    <section className={styles.addpet_header}>
            <div>
                <h1>Register a new Pet for adoption</h1>
            </div>
            <PetForm btnText='Register Pet'></PetForm>
    </section>
    )
}

export default AddPet