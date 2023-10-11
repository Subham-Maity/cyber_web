import axios from "axios"
import { NextFunction } from "express";
import ErrorHandler from "./errorHandler";


export const isActive = async (token: string, next: NextFunction) => {
    const requestData = {
        client_id: process.env.CLIENT_ID || "",
        client_secret: process.env.CLIENT_SECRET || "",
        token: token
    };
    const formData = new URLSearchParams(requestData).toString();
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        const { data } = await axios.post("https://www.linkedin.com/oauth/v2/introspectToken", formData, { headers })
        return data?.active;
    } catch (error) {
        return next(new ErrorHandler("Error while Token introspection", 400))
    }
}


