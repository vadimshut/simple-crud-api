import { IUser } from '../model/IUser';

const instanceOfIUser = async (object: IUser) => {
  const userKeys = ['username', 'age', 'hobbies'];
  const objectKeys = Object.keys(object);
  if (objectKeys.length !== userKeys.length) return false;

  for (const key of objectKeys) {
    if (!userKeys.includes(key)) return false;
  }

  const { age, hobbies, username } = object;
  if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) return false;

  if (hobbies.length === 0) {
    return true;
  } else {
    for (const key of hobbies) {
      if (typeof key !== 'string') return false;
    }
  }
  return true;
};

export const validateBody = async (body: string) => {
  let bodyInJson: IUser;
  try {
    bodyInJson = JSON.parse(body);
  } catch {
    return { verdict: false, user: null };
  }

  const verdict = await instanceOfIUser(bodyInJson);
  return { verdict, user: bodyInJson };
};
