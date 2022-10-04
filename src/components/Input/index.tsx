import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ElementType,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { IconType } from 'react-icons/lib';


interface propsInput{
  name:string
  icon?:IconType,
  placeholder:any,
}
const Input = ({ name, icon:Icon, ...placeholder }:propsInput) => {
  const inputRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...placeholder}
      />
    </Container>
  );
};

export default Input;