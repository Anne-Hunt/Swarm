export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.banned = data.banned
    this.bannedBy = data.bannedBy
  }
}
