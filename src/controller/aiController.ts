import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import dotenv from 'dotenv'
dotenv.config();
import axios from "axios";

// const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
// const azureApiKey = process.env.AZURE_OPENAI_KEY;
const azureApiKey = '0ecdeca094994087b51286dfdae67183'
// const endpoint = "https://cyberlevels.openai.azure.com/openai/deployments/cyberlevels/chat/completions?api-version=2023-07-01-preview"
const endpoint = "https://cyberlevels.openai.azure.com/openai/deployments/cyberlevels/completions?api-version=2023-05-15"
const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
    { role: "user", content: "Do other Azure AI services support this too" },
];

export const chatWithAi = catchAsyncError(async (req, res, next) => {
    console.log("== Chat Completions Sample ==");
    if (!endpoint || !azureApiKey) {
        return next(new ErrorHandler("endPoint or azureApiKey not found", 400));
    }
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

    const deploymentId = "cyberlevels";
    const result = await client.getChatCompletions(deploymentId, messages);

    for (const choice of result.choices) {
        console.log(choice.message);
    }


    res.status(200).json(result);
}
)
export const chatWithAiUsingRest = catchAsyncError(async (req, res, next) => {

    const serverUrl = "https://cyberlevels.openai.azure.com/openai/deployments/cyberlevels/chat/completions?api-version=2023-05-15"

    const { data } = await axios.post(serverUrl, { messages }, {
        headers: {
            "Content-Type": "application/json",
            "api-key": "0a995d6ac1fb47b9a19629e9ffe6f14e"
        }
    })
    res.send(data);
}
)
