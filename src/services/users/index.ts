import getUser from "./getUser";
import getUsers from "./getUsers";
import postPermissions from "./postPermissions";
import postUsers from "./postUsers";
import patchUser from "./patchUser";
import getUserByEmail from "./getUserByEmail";

export {
  postPermissions,
  postUsers,
  getUser,
  getUsers,
  patchUser,
  getUserByEmail,
};

export type * from "./types";
