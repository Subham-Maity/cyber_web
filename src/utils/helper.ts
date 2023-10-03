import axios from "axios"
import dotenv from 'dotenv'
import { NextFunction } from "express";
import ErrorHandler from "./errorHandler";
dotenv.config();

export const isActive = async (token: string, next: NextFunction) => {
    const requestData = {
        client_id: process.env.CLIENT_ID || "",
        client_secret: process.env.CLIENT_SECRET || "",
        token: 'AQVR40BxDhLRHukg5HiWgV-TjoAkLshj13fcvY8DgJ8_HL7SECrTHGhWSDthsZAwgxbBXjCcEB-A98w_bi2i4pFcvmRlsIjacDKtZz4SgFHn-jfG-PNNY6gQIzwd5x1y-MotaBi4wnksBYnze032hKI8aWP6-Dl3vyRZWlbGUZwuEL5u8UawpONJsYWEHnxuNGFxo-SqbamrSov6Y-4LT0IICoblt2mojd35IVAlJtBSXuFi2psL2rTcWd8PXFXHyMaeVYmomJ0U17YUhQI7_Fm6r9qSSkbh4d09WHZoJBJqx7ViO0El5WqmvsD822vTRC3VKll7UxyIZm7w_Y4GxVxX-x_Q_Q'
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

