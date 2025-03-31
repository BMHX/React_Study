import axiosInstance from './axiosInstance';

/**
 * 用户注册
 * @param {Object} userData - 用户注册数据
 * @param {string} userData.username - 用户名
 * @param {string} userData.email - 邮箱
 * @param {string} userData.password - 密码
 * @returns {Promise} 注册结果
 */
export const registerUser = async (userData) => {
  return axiosInstance.post('/users/register', userData);
};

/**
 * 用户登录
 * @param {Object} userData - 用户登录数据
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @returns {Promise} 登录结果，包含用户信息和token
 */
export const loginUser = async (userData) => {
  const response = await axiosInstance.post('/users/login', userData);
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response;
};

/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise} 用户信息
 */
export const getUser = async (userId) => {
  return axiosInstance.get(`/users/${userId}`);
};

/**
 * 更新用户信息
 * @param {string} userId - 用户ID
 * @param {Object} userData - 要更新的用户数据
 * @returns {Promise} 更新后的用户信息
 */
export const updateUser = async (userId, userData) => {
  return axiosInstance.put(`/users/${userId}`, userData);
};

/**
 * 用户登出
 * @returns {void}
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
};
