import { useState } from 'react'
import formStyles from './Form.module.css'
import Input from './Input'
import Select from './Select'

function onFileChange(e){

}

function handleChange(e){

}

function handleColor(e){
    
}

function PetForm(handleSubmit, petData, btnText){
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['White', 'Black', 'Grey']

    return (
    <form className={formStyles.form_container}>
        <Input
            text='Pet images'
            type='file'
            name='images'
            handleOnChange={onFileChange}
            multiple={true}
        ></Input>
        <Input
            text='Pet name'
            type='text'
            name='name'
            placeholder='Type the Pet name'
            handleOnChange={handleChange}
            value={pet.name || ''}
        ></Input>
        <Input
            text='Pet age'
            type='text'
            name='age'
            placeholder='Type the Pet age'
            handleOnChange={handleChange}
            value={pet.age || ''}
        ></Input>
        <Input
            text='Pet weight'
            type='number'
            name='weight'
            placeholder='Type the Pet weight'
            handleOnChange={handleChange}
            value={pet.weight || ''}
        ></Input>
        <Select
            name='color'
            text='Select a color'
            options={colors}
            handleOnChange={handleColor}
            value={pet.color || ''}
        ></Select>
        <input type='submit' value={btnText}></input>
    </form>)
}

export default PetForm