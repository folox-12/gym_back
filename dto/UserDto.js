export default class UserDto {
    email;
    id;
    isActivated
    name;
    surname;

   constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model['is_activated'];
        this.name = model.name || null;
        this.surname = model.surname || null;
   }
}
