import axios from "axios";
import {AppConstant} from "@/constants/AppConstant";

export default axios.create({
    baseURL: AppConstant.BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})