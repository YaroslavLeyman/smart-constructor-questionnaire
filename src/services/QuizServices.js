import $api from "../http";
// import {AxiosResponse} from 'axios';
// import {AuthResponse} from "../models/response/AuthResponse";
// import {IUser} from "../models/IUser";

export default class UserService {
    static fetchQuiz() {
        return $api.get('/quiz/fetch')
    }

}