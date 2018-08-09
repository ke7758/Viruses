import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '11223344',
    avatar: 'https://avatars1.githubusercontent.com/u/37663416?s=460&v=4',
    name: 'hans'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
