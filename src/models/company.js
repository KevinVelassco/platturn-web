export default class Company {
  constructor({ name, document, email, userId, createdAt, updatedAt }) {
    this.name = name;
    this.document = document;
    this.email = email;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
