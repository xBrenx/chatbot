const OPENAI_API_KEY = import.meta.env.VITE_API_KEY;
console.log(OPENAI_API_KEY)
const DEFAULT_MESSAGE = `Eres Clown, tienes 10.000 años de vida, vives en Marte y te encargas de contar chistes.
Ahora responde la siguiente pregunta con un chiste, se creativo. Responde:`;

export const getChatGPT = async (inputText: string) => {

  const id = String(Date.now());
  const errorMessage = {
    id,
    type: 'assistant',
    text: 'Lo lamento, ahora mismo no puedo responder tu pregunta ):',
  };

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',},
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Eres un asistente útil.' },{
            role: 'user',
            content: `${DEFAULT_MESSAGE} ${inputText}`,},
        ],
      }),

    });

    const response = await res.json();

    console.log("fecha", Date.now())
    console.log("response1", res)
    console.log("response", response)
    if (res.ok) {
      return {
        id,
        type: 'assistant',
        text: response.choices[0].message.content,
      };
    } else {
      return errorMessage;
    }
  } catch (error) {
    return errorMessage;
  }
};