export default function handler(request, response) {
  let { text } = request.query;
  text = text.replace(/\?/g, '!');
  text = text.replace(/？/g, '!');
  text = text.replace('吗', '');
  if (text.includes('你')) {
    text = text.replace('你', '我');
    return response.status(200).json(text);
  }
  if (text.includes('我')) {
    text = text.replace('我', '你');
    response.status(200).json(text);
  }
  return response.status(200).json(text);
}
