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

const getAllUsers = async () => {
  return await axios.get("participant/all");
};

const putUpdateUser = async (id, username, role, avatarImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", avatarImage);

  return await axios.put("participant", data);
};

const deleteUser = async (userId) => {
  return await axios.delete("participant", { data: { id: userId } });
};

const getUsersWithPaginate = async (page, limit) => {
  return await axios.get(`participant?page=${page}&limit=${limit}`);
};

const postLogin = async (email, password) => {
  return await axios.post("login", { email: email, password: password });
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUsersWithPaginate,
  postLogin,
};
