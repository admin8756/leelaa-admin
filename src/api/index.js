// 判断是否是生产环境
const baseURl = 'https://admin.leelaa.cn';
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
      console.error(error);
    });
};

// 聊天接口
export const chat = (text) => request(`api/ai?text=${text}`);

// 登录接口
export const login = (postData) => {
  return request(`api/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
};
