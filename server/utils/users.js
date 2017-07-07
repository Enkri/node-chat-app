[{
  id: '/#sfvsfdvpdv2323',
  name: "Chen",
  room: "The Ofiice Fans"
}]


class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {
      id: id,
      name: name,
      room: room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    // return user that was removed
    var resUser = this.getUser(id);

    if (resUser) {
      var temp = this.users.filter((user) => {
        return user.id !== id;
      });
      this.users = temp;
    }
    return resUser;
  }

  getUser(id) {
    var resUser = this.users.filter((user) => {
      return user.id === id;
    });
    return resUser[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {
  Users
};
