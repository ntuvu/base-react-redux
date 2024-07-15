import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (
  email,
  password,
  username,
  role,
  avatarImage,
) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", avatarImage);

  return await axios.post("participant", data);
};

export { postCreateNewUser };
