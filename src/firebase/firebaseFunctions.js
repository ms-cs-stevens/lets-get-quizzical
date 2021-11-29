import firebase from "./firebaseApp";

const createToken = async () => {
  const user = await firebase.auth().currentUser;
  const authToken = user && (await user.getIdToken());
  return authToken;
};

async function updateUserName(id, data) {
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
  const newUser = await currentUser.updateProfile({
    displayName: `${firstName} ${lastName}`,
  });
  return newUser;
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
    await firebase.auth().signInWithEmailAndPassword(email, password);
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
