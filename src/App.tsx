import { useState } from "react";
import { useQuery } from "react-query";
// Components 
import Item from "./Item/Item"
import  Drawer  from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCart  from "@mui/icons-material";
import Badge from "@mui/material/Badge";
// Styles 
import {Wrapper} from './App.styles'
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
  // useQuery is a hook and the destructured variables hold the results from the hook
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)
  
  const getTotalItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;

  return (
    <>
    {isLoading && <LinearProgress />}
    {error && <div>Something went wrong</div>}
    <Wrapper>
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
