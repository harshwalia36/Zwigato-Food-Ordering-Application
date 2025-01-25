import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const fetchMenuFromImage = async (filepath, mimeType) => {
    dotenv.config();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageResp = await fetch(filepath)
        .then((response) => response.arrayBuffer());

    const prompt = `Yout Task is to follow the instructions mentioned in objective step by step and fetch the required data and return in given output format.
      Objective: Your Objective is given the image of Restaurant Menu, fetch each of the menu items, their prices and description respectively.
      You must follow the below constraints:
      1. You must fetch all the menu items, there prices, description and category.
      2. Return the data using the following JSON Schema.
      Item: {
            'category': string,
            'dishes' : {
                'name': string ,
                'price': string,
                'description': string
            }
        }
      Return: Array<Item>
    `;

    const result = await model.generateContent([{
        inlineData: {
            data: Buffer.from(imageResp).toString('base64'),
            mimeType: mimeType,
        },
    }, prompt]);
    return result.response.text();

};

export { fetchMenuFromImage };