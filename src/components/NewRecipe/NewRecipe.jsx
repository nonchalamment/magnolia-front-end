// npm modules
import { useState, useRef } from 'react'

// components
import IngredientsInput from "../IngredientsInput/IngredientsInput"

// css
import styles from './NewRecipe.module.css'

const NewRecipe = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [],
    directions: '',
  })

  const [ingredients, setIngredients] = useState([''])

  const [addedInput, setAddedInput] = useState(['something'])
  const [photoData, setPhotoData] = useState({ photo: null })
  const imgInputRef = useRef(null)

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formDataWithPhoto = {
      name: formData.name,
      ingredients: formData.ingredients,
      directions: formData.directions,
      photo: photoData.photo,
    }

		props.handleAddRecipe(formDataWithPhoto)
    setFormData({
      name: '',
      ingredients: '',
      directions: '',
      photo: null,
    })
  }

  const handleAddInput = (evt) => {
    evt.preventDefault()
    setAddedInput( [ ...addedInput, ''])
    setIngredients({ ...formData.ingredients, [evt.target.name]: evt.target.value})
  }

  const handleDeleteInput = (index) => {
    setAddedInput(addedInput.filter((elem, idx) => {
      return index !== idx
    }))
    const filteredIngredients = formData.ingredients.filter((elem, idx) => {
      return index !== idx
    })
    setIngredients(filteredIngredients)
    setFormData({ ...formData, ingredients: filteredIngredients })
  }

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients[index] = value
    setFormData({ ...formData, ingredients: updatedIngredients })
  }

  const handleChangePhoto = evt => {
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    if (isFileInvalid) {
      setMessage(errMsg)
      imgInputRef.current.value = null
      return
    }

    const photoURL = URL.createObjectURL(file)
    setPhotoData({ photo: photoURL })
  }

  return (  
    <main>
      <form onSubmit={handleSubmit} className={styles.newRecipeForm}>
        <label htmlFor="name-input">Name</label>
          <input 
            type="text"
            name="name"
            id="name-input"
            value={formData.name}
            placeholder="Mom's Spaghetti"
            onChange={handleChange} 
            required
          />
        <label htmlFor="ingredients-input">Ingredients</label>
          {addedInput.map((elem, index) => (
            <div key={index}>
            <IngredientsInput 
              key={index} 
              index={index} 
              formData={formData} 
              handleIngredientChange={(evt) => handleIngredientChange(index, evt.target.value)}
            />
              <button type="button" onClick={() => handleDeleteInput(index)}>X</button>
            </div>
          ))}
          <button type="button" onClick={handleAddInput}>Add</button>
        <label htmlFor="directions-input">Directions</label>
          <textarea 
            type="text"
            name="directions"
            id="directions-input"
            value={formData.directions}
            placeholder="Boil water, add pasta, etc."
            onChange={handleChange}
            required
          />
          <label className={styles.label}>Add Photo
          <input 
            type="file" 
            name="photo" 
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>
        <button type="submit" onSubmit={handleAddInput}>SUBMIT</button>
      </form>
    </main>
  )
}

export default NewRecipe