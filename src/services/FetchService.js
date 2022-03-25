import { errorNotification } from '../utils/Notifications';
import { getHeader, getUsername } from './UserDataService';
import CartService from './CartService';
const URL = "http://localhost:8080/idea/";

class FetchService {

    login = async (login, password) => {
        const response = await fetch(URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "login": login,
                "password": password
            })
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    register = async (login, password, name, surname, email) => {
        const response = await fetch(URL + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "login": login,
                "password": password,
                "name": name,
                "surname": surname,
                "email": email,
                "active": false
            })
        });
        console.log(response)
        if(response.ok) {
            return await response.text();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    confirm = async (token) => {
        const response = await fetch(URL + "confirm/" + token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(response.ok) {
            return await response.text();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getAccounts = async () => {
        const response = await fetch(URL + "accounts", {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    changeRole = async (login, role) => {
        const response = await fetch(URL + "changeRole/" + login + "/" + role, {
            method: "POST",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.text();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getUser = async (login) => {
        const response = await fetch(URL + "user/" + login, {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    createFurniture = async (name, description, category, price, photo, amount) => {
        const response = await fetch(URL + "furnitures/furniture", {
            method: "POST",
            headers: getHeader(),
            body: JSON.stringify({
                "name": name,
                "description": description,
                "category": category,
                "price": price,
                "photo": photo,
                "amount": amount
            })
        });
        if(response.ok) {
            return response;
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getFurniture = async (businessKey) => {
        const response = await fetch(URL + "furnitures/" + businessKey, {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getFurnitures = async () => {
        const response = await fetch(URL + "furnitures", {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getFurnitures = async (currentPage, pageSize) => {
        const response = await fetch(URL + "furnitures?page=" + currentPage + "&size=" + pageSize, {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getCategories = async () => {
        const response = await fetch(URL + "furnitures/categories", {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    placeOrder = async () => {
        const response = await fetch(URL + "orders", {
            method: "POST",
            headers: getHeader(),
            body: JSON.stringify({
                "username": getUsername(),
                "furnitures": CartService.getItems()
            })
        });
        if(response.ok) {
            return await response.text();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        } 
    }

    getOrders = async () => {
        const response = await fetch(URL + "orders", {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getUserOrders = async (username) => {
        const response = await fetch(URL + "orders/" + username, {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }

    getOrder = async (key) => {
        const response = await fetch(URL + "orders/order/" + key, {
            method: "GET",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.text();
            errorNotification(json, " ");
        }
    }
}

export default new FetchService();