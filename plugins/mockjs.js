const Mock = require('mockjs')

Mock.mock('/user/info', {
  userName: 'baixue',
  userId: '18258809774',
  email: '18258809774@163.com'
})

export default Mock
