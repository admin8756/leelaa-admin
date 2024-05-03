// 判断是否是生产环境
const baseURl = 'https://leelaa-admin.vercel.app'
/**
 * @name request 封装请求
 * @param {string} url 请求地址
 * @param {object} options 请求参数
 * @returns {Promise}
 */
export const request = async (url, options = {}) => {
  return fetch(`${baseURl}/${url}`, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
        console.error(error)
    });
};

export const chat = (text) => {
  return request('api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  });
};
