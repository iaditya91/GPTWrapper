const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true});

export default async function sendMsgToOpenAI(message){
    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role:'user', content: message}],
        // temperature: 0.7,
        // max_tokens: 256,
        // top_p: 1,
        // frequency_penalty: 0,
        // presense_penalty: 0,
    });
    console.log(res);
    return res.choices[0].message.content;
}