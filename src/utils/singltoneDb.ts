import { IUser } from '../model/IUser';

export const dB = (function () {
  let instance: any;

  let GLOBAL_DATA: IUser[] = [];

  function getUsers() {
    return GLOBAL_DATA;
  }

  function addNewUser(user: IUser) {
    GLOBAL_DATA.push(user);
  }

  const createInstance = () => {
    return {
      getUsers,
      addNewUser,
    };
  };

  return {
    getInstance: function () {
      return instance || (instance = createInstance());
    },
  };
})();
