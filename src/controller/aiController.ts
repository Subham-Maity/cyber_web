import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import catchAsyncError from "../middleware/catchAsyncError";
import dotenv from 'dotenv'
dotenv.config();
import axios from "axios";
import ErrorHandler from "../utils/errorHandler";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureApiKey = process.env.AZURE_OPENAI_KEY || "";

export const chatWithAiUsingRest = catchAsyncError(async (req, res, next) => {

    const { query } = req.query;
    if (!query) next(new ErrorHandler("Query not found", 404))

    const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
        { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
        {
            role: "user",
            content: query
        },
    ];

    const { data } = await axios.post(endpoint, { messages }, {
        headers: {
            "Content-Type": "application/json",
            "api-key": `${azureApiKey}`
        }
    })
    res.send({ result: data });
}
)
