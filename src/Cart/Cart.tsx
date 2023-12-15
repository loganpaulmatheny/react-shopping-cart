import CartItem from "../CartItem/CartItem";
// Styles
import { Wrapper } from "./Cart.styles";
// Types 
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const calculateTotal = (items: CartItemType[]) => {
  return items.reduce((acc: number, item) => {
    return acc + item.amount * item.price
  }, 0)
}



const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
    
  return (
    <Wrapper>
      <h2>Your shopping card</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem 
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  )
}


export default Cart;