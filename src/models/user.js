export default class User {
  constructor(authUid, fullName, document, email, password, address, phone) {
    this.authUid = authUid;
    this.fullName = fullName;
    this.document = document;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
  }
}
