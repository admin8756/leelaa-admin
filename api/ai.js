export default function handler(request, response) {
  let { text } = request.query
  text = text.replace(/\?/g, '！');
  text = text.replace('吗', '');
  text = text.replace('你','我')
  response.status(200).json(text);
}
