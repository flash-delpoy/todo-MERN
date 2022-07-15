module.exports = class UserDto {
  email;
  id;
  name;
  isAdmin;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.name = model.name;
    this.isAdmin = model.isAdmin;
  }
};
