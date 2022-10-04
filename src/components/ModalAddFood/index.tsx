import { Component, createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import {Modal} from '../Modal'
import { Form } from './styles'
import Input from '../Input'


interface Food{
  id:number,
  name:string,
  description:string,
  price:string,
  available:boolean,
  image:string
}
interface ModalAdd{
  isOpen:boolean,
  setIsOpen:()=>void,
  handleAddFood:(food:Food)=>Promise<void>,
}

export function ModalAddFood({isOpen,setIsOpen,handleAddFood}:ModalAdd) {
 

  const formRef = createRef<any>();
  async function handleSubmit(foodsInput:Food) {
    handleAddFood(foodsInput)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui"/>
        <Input name="name" placeholder="Ex: Moda Italiana"/>
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição"/>
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
