import "./cart-dropdown.style.scss"
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useContext} from 'react'
import { CartContext } from "../../contexts/cart.context";



const CartDropdown = ()=>{
    const {cartItems} = useContext(CartContext);
    return(
<div className="cart-dropdown-container">
    <div className="cart-items">
        <div className="cart-item">
            {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
        </div>
        <Button>GO TO CHECKOUT</Button>
    </div>
</div>
    )
}

export default CartDropdown;