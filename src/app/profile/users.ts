export class Users {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
  profilePicture: string;
  country: number;
  city: number;

  constructor(id, firstname, lastname, email, password, birthdate, profilePicture, country, city) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email ;
    this.password = password ;
    this.birthdate = birthdate ;
    this.profilePicture = profilePicture ;
    this.country = country ;
    this.city = city ;
  }
}
