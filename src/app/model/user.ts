export interface User {
  /**
   * User id.
   */
  id?: string;
  /**
   * Username.
   */
  username: string;
  /**
   * Password.
   */
  password: string;
  /**
   * Define if is a super user.
   */
  isSuperUser: boolean;
  token: string;
}
