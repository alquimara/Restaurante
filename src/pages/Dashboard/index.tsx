import { Component, useEffect, useState } from 'react'

import {Header} from '../../components/Header'
import api from '../../services/api'
import {Food} from '../../components/Food'
import {ModalAddFood} from '../../components/ModalAddFood'
import {ModalEditFood} from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'


  interface Food {
    id:number,
    name:string,
    description:string,
    price:string,
    available:boolean,
    image:string
  }
 
export function Dashboard() {
  const[foods,setFoods] = useState<Food[]>([]);
  const[modalOpen,setModalOpen] =useState(false);
  const[editModalOpen,setEditModalOpen] = useState(false);
  const[editingFood,setEditingFood] = useState<Food>();


  useEffect(() =>{
    api.get('/foods').then(response=> setFoods(response.data));

  },[]);
  
  async function handleAddFood(foodsinput:Food){
    try {
      const response = await api.post('/foods', {
        ...foodsinput,
        available: true
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }
  async function handleUpdateFood (food:Food){

    try {
      const foodUpdated = await api.put(`/foods/${editingFood?.id}`, {
        ...editingFood,
        ...food
      })
      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }
  async function handleDeleteFood(foodId:number){

    await api.delete(`/foods/${foodId}`)
    const foodsFiltered = foods.filter(food => food.id !== foodId)
    setFoods(foodsFiltered);
  }
  async function handleEditFood(food:Food) {
    setEditingFood(food);
    setEditModalOpen(true);
  }
  function toggleModal(){
    setModalOpen(!modalOpen);

  }
  function toggleEditModal(){
    setEditModalOpen(!editModalOpen);
  }

  return (
  <>
   <Header openModal={toggleModal}/>
      <ModalAddFood
      isOpen={modalOpen}
      setIsOpen={toggleModal}
      handleAddFood={handleAddFood}
       />
      <ModalEditFood
      isOpen={editModalOpen}
      setIsOpen={toggleEditModal}
      editingFood={editingFood}
      handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
      {foods && foods.map(food =>(
        <Food
        mykey={food.id}
        fooditem={food}
        handleDelete={handleDeleteFood}
        handleEditFood={handleEditFood}
        />
      ))}
      </FoodsContainer>
  </>
  )
}
