import { errorNotification } from '../utils/Notifications';
import { getHeader } from './UserDataService';

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
            let json = await response.json();
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
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.json();
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
            return await response.json();
        } else {
            let json = await response.json();
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
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    changeRole = async (login, role) => {
        const response = await fetch(URL + "changeRole/" + login + "/" + role, {
            method: "POST",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.json();
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
            let json = await response.json();
            errorNotification(json, " ");
        }
    }

    createFurniture = async (name, description, category, price, photo, amount) => {
        const response = await fetch(URL + "furnitures/furniture", {
            method: "POST",
            headers: getHeader()
        });
        if(response.ok) {
            return await response.json();
        } else {
            let json = await response.json();
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
            let json = await response.json();
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
            let json = await response.json();
            errorNotification(json, " ");
        }
    }
}

export default new FetchService();