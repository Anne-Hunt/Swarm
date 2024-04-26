export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data?.picture
    this.banned = data.banned
    this.bannedBy = data.bannedBy
    // TODO add additional properties if needed
  }
}
