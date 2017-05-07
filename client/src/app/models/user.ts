export class User {
  email: String;

  constructor(
    email: String
  ) {
    this.email = email;
  }

  static fromJson(data): User {
    return new User(data.email);
  }
}
