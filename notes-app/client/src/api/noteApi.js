import axiosInstance from './axiosInstance';

/**
 * 创建笔记
 * @param {Object} noteData - 笔记数据
 * @param {string} noteData.title - 笔记标题
 * @param {string} noteData.content - 笔记内容
 * @param {string} noteData.categoryId - 分类ID
 * @returns {Promise} 创建的笔记信息
 */
export const createNote = async (noteData) => {
  return axiosInstance.post('/notes', noteData);
};

/**
 * 获取用户的所有笔记
 * @param {string} userId - 用户ID
 * @returns {Promise} 笔记列表
 */
export const getNotes = async (userId) => {
  return axiosInstance.get(`/notes/user/${userId}`);
};

/**
 * 获取笔记详情
 * @param {string} noteId - 笔记ID
 * @returns {Promise} 笔记信息
 */
export const getNote = async (noteId) => {
  return axiosInstance.get(`/notes/${noteId}`);
};

/**
 * 获取用户某个分类下的所有笔记
 * @param {string} userId - 用户ID
 * @param {string} categoryId - 分类ID
 * @returns {Promise} 笔记列表
 */
export const getNotesByCategory = async (userId, categoryId) => {
  return axiosInstance.get(`/notes/categories/${userId}/${categoryId}`);
};

/**
 * 更新笔记
 * @param {string} noteId - 笔记ID
 * @param {Object} noteData - 要更新的笔记数据
 * @param {string} [noteData.title] - 笔记标题
 * @param {string} [noteData.content] - 笔记内容
 * @param {string} [noteData.categoryId] - 分类ID
 * @returns {Promise} 更新后的笔记信息
 */
export const updateNote = async (noteId, noteData) => {
  return axiosInstance.put(`/notes/${noteId}`, noteData);
};

/**
 * 删除笔记
 * @param {string} noteId - 笔记ID
 * @returns {Promise} 删除结果
 */
export const deleteNote = async (noteId) => {
  return axiosInstance.delete(`/notes/${noteId}`);
};
