import { useState } from "react";
import { useQuery } from "react-query";
// Components 
import Item from "./Item/Item"
import Cart from "./Cart/Cart";
import Drawer  from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon  from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
// Styles 
import {Wrapper, StyledButton} from './App.styles'
// Types 
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

// the TS part of this dictates that it is an async function that should return a Promise of an array of CartItemTypes
const getProducts = async (): Promise<CartItemType[]> => {
  // first await - convert to json 
  // inside await - api call 
  return await (await fetch ('https://fakestoreapi.com/products' )).json();
  
}

function App() {
  // States 
  const [cartOpen, setCartOpen] = useState(false)
  // ensures that state can only hold an array of CartItemTypes
  const [cartItems, setCartItems] = useState([] as CartItemType[]);


  // useQuery is a hook and the destructured variables hold the results from the hook
  // typescript here is specifying that the returned data should be in the form of an array of CartItemType
  // products is the string used as a key by React Query to ID the specific query
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)
  
  const getTotalItems = (items: CartItemType[]) => {
   return items.reduce((acc: number, item) =>  {return acc + item.amount}, 0)
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item in the cart? 
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map((item) => (
          item.id === clickedItem.id 
          ? {...item, amount: item.amount +1} 
          : item
          // item above represents every item that is not matching, so it should just be put back in the array
        ))
      }
      return [...prev, {...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {
      return prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return acc
          }
          return [...acc, {...item, amount: item.amount - 1}];
        }
        else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    })
  };

  return (
    <>
    {isLoading && <LinearProgress />}
    {error && <div>Something went wrong</div>}
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4} >
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  </>
  );
}

export default App;
