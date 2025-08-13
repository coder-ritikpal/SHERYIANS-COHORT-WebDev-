const { GoogleGenAI } = require( "@google/genai");

const ai = new GoogleGenAI({});


async function generateCaption(base64ImageFile) {
    const contents =[
        {
            inlineData:{
                mimeType:'image/jpeg',
                data: base64ImageFile,
            },
        },
        { text:'Caption this image '},
    ];

    const response= await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:contents,
        config:{
            systemInstruction:`short and concise just accurately about two to three sentences and use emoji,
            in a fun way`
        }
    });

    return (response.text);
}

module.exports= generateCaption;

