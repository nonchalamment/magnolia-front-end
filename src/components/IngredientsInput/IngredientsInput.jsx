const IngredientsInput = (props) => {

  return (  
    <>
      <input 
        type="text"
        name="ingredients"
        id="ingredients-input"
        value={props.formData.ingredients[props.index]}
        placeholder="Pasta, Sauce, Meatballs"
        onChange={props.handleIngredientChange}
        autoComplete="off"
      />
    </>
  )
}

export default IngredientsInput