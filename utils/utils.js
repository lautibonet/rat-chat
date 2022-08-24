const formatAuthUser = ({ uid, email, token, photoURL, displayName }) => ({
  id: uid,
  email,
  token,
  photoURL,
  displayName,
})

export { formatAuthUser }
