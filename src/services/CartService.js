import { add, total, list, exists, remove, quantity } from 'cart-localstorage' 

class CartService {

    getItems = () => {
        return list();
    }

    addItem = (item, quantity) => {
        let localStorageProduct = {id: item.businessKey, name: item.name , price: item.price}
        add(localStorageProduct, quantity);
        console.log(list()) 
    }
}

export default new CartService();