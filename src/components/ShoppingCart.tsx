import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}
export function ShoppingCart ({isOpen} : ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem  key={item.id} {...item}/>
                    ))}
                    { cartItems.length > 0 && 
                    <div className="ms-auto fs-5 fw-bold">
                        Total: {" "}
                        {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(item => item.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                        )}
                    </div> }
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}