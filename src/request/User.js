export default class User {
  u: Object;

  constructor() {
    this.u = {};
  }

  age(age: number): User {
    this.u.age = age;
    return this;
  }

  gender(gender: number): User {
    if (['M', 'F', '0'].indexOf(gender) === -1) {
      throw new RangeError('\'M\', \'F\', \'O\' values acceptable');
    }

    this.u.gender = gender;
    return this;
  }

  language(language: String): User {
    this.u.language = language;
    return this;
  }

  serialize() {
    return Object.assign({}, this.u);
  }
}
