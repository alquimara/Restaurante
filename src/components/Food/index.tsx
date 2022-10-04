import { Component, useState } from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import { Container } from './styles'
import api from '../../services/api'
import { boolean } from 'yup/lib/locale';

interface Food{
  id:number,
  name:string,
  description:string,
  price:string,
  available:boolean,
  image:string
}
interface FoodProps{
  mykey:number,
  fooditem:Food,
  handleDelete:(foodId:number)=>Promise<void>,
  handleEditFood:(food:Food)=>void
}
export function Food({mykey,fooditem,handleDelete,handleEditFood}:FoodProps) {

  const [isAvailable, setIsAvailable] = useState(fooditem.available);
  async function toggleAvailable(food:Food) {
    setIsAvailable(fooditem.available);
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable
    })

    setIsAvailable(!isAvailable)
  }

  async function setEditingFood(food:Food) {
    await handleEditFood(food);
  }
  
  return (
    <>
     <Container available ={isAvailable}  key={mykey}>
     <header>
        <img src={fooditem.image} alt={fooditem.name} />
      </header>
      <section className="body" key={fooditem.id}>
        <h2>{fooditem.name}</h2>
        <p>{fooditem.description}</p>
        <p className="price">
            R$ <b>{fooditem.price}</b>
           </p>
          </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={() => setEditingFood(fooditem)}
              data-testid={`edit-food-${fooditem.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(fooditem.id)}
              data-testid={`remove-food-${fooditem.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>
          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>
              <label
                htmlFor={`available-switch-${fooditem.id}`}
                className="switch"
              >
              <input
                id={`available-switch-${fooditem.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={() => toggleAvailable(fooditem)}
                data-testid={`change-status-food-${fooditem}`} />
                <span className="slider" />
                </label>
          </div>
        </section> 
      </Container>     
    </>
        
  )
}
