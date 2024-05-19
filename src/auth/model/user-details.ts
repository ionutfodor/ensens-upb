export class UserDetails {
  name?: string;
  email?: string;

  constructor(init?: Partial<UserDetails>) {
    Object.assign(this, init);
  }
}