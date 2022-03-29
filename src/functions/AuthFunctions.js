import { userDataRef } from "../constants/FirebaseRefs";
import { auth } from "../firebase/firebaseInit";

export const AuthInstance = auth;

const createUserDoc = async (data) => {
  var userData = {
    name: "Empresa",
    auth: "user",
  };
  return new Promise((response, reject) => {
    userDataRef
      .doc(`${data.email}`)
      .set(userData)
      .then(async () => {
        await userDataRef
          .doc(`${data.email}`)
          .get()
          .then((userDoc) => {
            response({
              email: userDoc.id,
              ...userDoc.data(),
            });
          })
          .catch((error) => reject(error));
      });
  });
};

export const createUser = async (data) => {
  return new Promise((response, reject) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.pass)
      .then(() => {
        response(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUserDoc = async (email) => {
  return new Promise(async (response, reject) => {
    await userDataRef
      .doc(`${email}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          response({
            email: doc.id,
            ...doc.data(),
          });
        } else {
          createUserDoc({ email }).then((user) => {
            response(user);
          });
        }
      })
      .catch((error) => reject(error));
  });
};

export const CommonSignIn = async (email, pass) => {
  return new Promise((response, reject) => {
    AuthInstance.signInWithEmailAndPassword(email, pass)
      .then(async (user) => {
        await getUserDoc(AuthInstance.currentUser.email)
          .then((res) => {
            response(res);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};
