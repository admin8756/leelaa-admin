export default function handler(request, response) {
  // 用户登录模拟
  if (request.method === 'POST') {
    const { username, password } = request.body;
    if (username === 'admin' && password === '123456') {
      response.status(200).json({
        code: 200,
        data: {
          token: 'admin',
          username: 'admin',
          avatar: 'https://admin.leelaa.cn/pwa-1024x1024.png',
          roles: ['admin'],
        },
        message: '登录成功',
      });
    } else {
      response.status(200).json({
        code: 500,
        message: '账号或密码错误',
      });
    }
  }else {
    response.status(200).json({
      code: 500,
      message: '请求方法错误',
    });
  }
}
