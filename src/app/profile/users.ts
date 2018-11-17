export class Users {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
  profilePicture: string;
  country: string;
  city: string;
  university: string;
  speciality: string;
  levelDegree: string;

  constructor(id, firstname, lastname, email, password, birthdate, profilePicture, country, city, university, speciality, levelDegree) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email ;
    this.password = password ;
    this.birthdate = birthdate ;
    this.profilePicture = profilePicture ;
    this.country = country ;
    this.city = city ;
    this.university = university ;
    this.speciality = speciality ;
    this.levelDegree = levelDegree ;
  }
}
