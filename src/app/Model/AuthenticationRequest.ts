export class AuthenticationRequest {
  username!: string;
  password!: string;
  public constructor(username :string,password :string){
    this.password=password
    this.username=username

  }
}
