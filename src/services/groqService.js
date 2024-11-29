import Groq from "groq-sdk";

export class GroqService {
    client = new Groq({
        apiKey: "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",
        dangerouslyAllowBrowser: true // This is the default and can be omitted
    });

  async annotateText(text, entityTypes) {
    const prompt = `
      Analyze the following text and identify entities of these types: ${entityTypes.join(', ')}.
      Return the result as a JSON array with this format:
      [{ "start": number, "end": number, "text": "extracted text", "label": "entity type" }]
      
      Text: "${text}"
    `;

    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'mixtral-8x7b-32768',
      temperature: 0.5,
      max_tokens: 1024,
    });

    try {
      console.log(completion.choices[0]?.message?.content);
      return JSON.parse(completion.choices[0]?.message?.content || '[]');
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return [];
    }
  }
}