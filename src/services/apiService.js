import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (
  email,
  password,
  username,
  role,
  avatarImage
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
  return await axios.post("login", {
    email: email,
    password: password,
    delay: 2000,
  });
};

const postRegister = async (email, username, password) => {
  return await axios.post("register", {
    email: email,
    username: username,
    password: password,
  });
};

const getQuizsByUser = async () => {
  return axios.get("quiz-by-participant");
};

const getQuestionsByQuizId = async (id) => {
  return axios.get(`questions-by-quiz?quizId=${id}`);
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUsersWithPaginate,
  postLogin,
  postRegister,
  getQuizsByUser,
  getQuestionsByQuizId,
};
