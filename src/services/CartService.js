import { add, total, list, remove, destroy, get } from 'cart-localstorage' 

class CartService {

    getItems = () => {
        return list();
    }

    addItem = (item, quantity) => {
        let localStorageProduct = {id: item.businessKey, name: item.name , price: item.price}
        add(localStorageProduct, quantity);
        console.log(list()) 
    }

    getItemQuantity = (uuid) => {
        if (get(uuid) === undefined){
            return 0;
        }else{
            return get(uuid).quantity;
        }
    }

    clearCart = () => {
        destroy();
    }

    getItemCount = () => {
        return total();
    }

    removeItemFromTheCart = (id) => {
        remove(id);
    }
}

export default new CartService();