import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextFunction } from "express";
import ErrorHandler from "./errorHandler";
import dotenv from 'dotenv'
dotenv.config();

export const getPineconeIndex = (next: NextFunction) => {

    const pineconeApiKey = process.env.PINECONE_API_KEY;
    const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT
    const pineconeIndex = process.env.PINECONE_INDEX;

    if (!pineconeApiKey || !pineconeEnvironment || !pineconeIndex) {
        return next(new ErrorHandler("All env variable not found while getting pinecone index", 500));
    }

    const pinecone = new Pinecone({
        apiKey: pineconeApiKey,
        environment: pineconeEnvironment,
    });
    const index = pinecone.Index(pineconeIndex);
    return index;
}

export const getEmbeddings = (next: NextFunction) => {

    const azureOpenAIApiKey = process.env.AZURE_OPENAI_KEY;
    const azureOpenAIApiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const azureOpenAIApiInstanceName = process.env.AZURE_OPENAI_INSTANCE_NAME;
    const azureOpenAIApiDeploymentName = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME;

    if (!azureOpenAIApiKey || !azureOpenAIApiVersion || !azureOpenAIApiInstanceName || !azureOpenAIApiDeploymentName) {
        return next(new ErrorHandler("All env variable not found while getting Embeddings", 500));
    }

    const embeddings = new OpenAIEmbeddings({
        azureOpenAIApiKey,
        azureOpenAIApiVersion,
        azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName,
    });

    return embeddings;
}

export const getChatLLM = (next: NextFunction, tokenUsage: { tokens: number, totalTokenCount: number }) => {

    const azureOpenAIApiKey = process.env.AZURE_OPENAI_KEY;
    const azureOpenAIApiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const azureOpenAIApiInstanceName = process.env.AZURE_OPENAI_INSTANCE_NAME;
    const azureOpenAIApiDeploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;

    if (!azureOpenAIApiKey || !azureOpenAIApiVersion || !azureOpenAIApiInstanceName || !azureOpenAIApiDeploymentName) {
        return next(new ErrorHandler("All env variable not found while getting ChatLLM", 500));
    }
    let totalTokenCount = 0;
    const llm = new ChatOpenAI({
        temperature: 0.5,
        maxTokens: 200,
        azureOpenAIApiKey: azureOpenAIApiKey,
        azureOpenAIApiVersion: azureOpenAIApiVersion,
        azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName: azureOpenAIApiDeploymentName,
        callbacks: [
            {
                handleLLMEnd: (val: any) => {
                    try {
                        const tokens = val.llmOutput.tokenUsage.completionTokens
                        totalTokenCount += tokens;
                        tokenUsage.tokens = tokens,
                            tokenUsage.totalTokenCount = totalTokenCount
                        console.log({ tokens, totalTokenCount });
                    } catch {
                        console.log(val.generations[0])
                    }
                },
            },
        ],
    })

    return llm;
}

export function combineDocuments(docs: any) {
    return docs.map((doc: any) => doc.pageContent).join('\n\n')
}