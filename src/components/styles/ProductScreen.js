import styled from 'styled-components'

export const ProductContainerStyle = styled.div`
  width: 80%;
  margin: 2% auto;
  height: 100%;
  border: 1px solid black;
  border-radius: 7px;
  background-color: ${(props) => (props.primary ? '#919aa1' : '#343a40')};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`

export const ProductItemStyle = styled.div`
  width: 300px;
  background-color: ${(props) => (props.primary ? 'white' : '#919aa1')};
  margin: 2rem;
  padding: 1rem;
`

export const PageHeading = styled.h1`
  margin: 45px auto;
  text-align: center;
  font-size: 4rem;
`
export const CartAddButton = styled.button`
  background-color: ${(props) => (props.primary ? 'blue' : 'red')};
  border: none;
  margin-top: 20px;
  color: ${(props) => (props.primary ? 'yellow' : 'black')};
  padding: 1rem;
  width: 100%;
  transition: all 1s;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
    border: 1px solid yellow;
  }
`

