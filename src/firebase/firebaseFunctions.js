import { doc, setDoc } from "firebase/firestore";
import firebase from "./firebaseApp";
const db = firebase.firestore();

const createToken = async () => {
  const user = await firebase.auth().currentUser;
  const authToken = user && (await user.getIdToken());
  return authToken;
};

async function updateUserName(data) {
  let currentUser = await firebase.auth().currentUser;
  const updatedUser = await currentUser.updateProfile({
    displayName: `${data.firstName} ${data.lastName}`,
    photoURL: data.profileImage,
  });
  return updatedUser;
}

async function createUserWithEmailPass(email, password, firstName, lastName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  let currentUser = await firebase.auth().currentUser;
  await currentUser.updateProfile({
    displayName: `${firstName} ${lastName}`,
  });

  // create user on firebase
  const user = await firebase.auth().currentUser;
  const payload = {
    firstName: user.displayName.split(" ")[0],
    lastName: user.displayName.split(" ")[1],
    email: user.email,
    id: user.uid,
    score: 0,
  };

  await setDoc(doc(db, "users", payload.id), payload);
}

async function signout() {
  await firebase.auth().signOut();
}

async function changePassword(email, oldPassword, newPassword) {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await signout();
}

async function emailSignIn(email, password) {
  try {
    const authResponse = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user = authResponse.user;
    return {
      email: user.email,
      uid: user.uid,
      firstName: user.displayName.split(" ")[0],
      lastName: user.displayName.split(" ")[1],
    };
  } catch (e) {
    throw e;
  }
}

async function passwordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function passwordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

export {
  createToken,
  createUserWithEmailPass,
  emailSignIn,
  passwordReset,
  passwordUpdate,
  signout,
  changePassword,
  updateUserName,
};
