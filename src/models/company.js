export default class Company {
  constructor({ name, code, document, email, userId, createdAt, updatedAt }) {
    this.name = name;
    this.code = code;
    this.document = document;
    this.email = email;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
