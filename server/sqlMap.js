// sql语句
var sqlMap = {
    // 用户
    user: {
        add: "insert into user(username, Password, nickname) values (?, ?, ?)",
        select: "select * from user",
        // select: "select * from [user] where 1=1 and  [where = ?]",
        del: 'delete from user where username = ?',
        update: 'update user set column = ? where column = ?'
    }
}

module.exports = sqlMap;