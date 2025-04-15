export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Falta el prompt' });
  }

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Sos Lombribot, un experto en compostaje, lombricultura y reciclaje natural. Respondé con claridad, usando ejemplos si hace falta. Tu conocimiento proviene de un curso técnico y documentos prácticos. Si no sabés algo, decilo de forma honesta.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      temperature: 0.7
    })
  });

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content || 'Hubo un problema con la respuesta.';
  res.status(200).json({ reply });
}