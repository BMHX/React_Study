import axiosInstance from './axiosInstance';

/**
 * 创建分类
 * @param {Object} categoryData - 分类数据
 * @param {string} categoryData.name - 分类名称
 * @param {string} [categoryData.description] - 分类描述
 * @returns {Promise} 创建的分类信息
 */
export const createCategory = async (categoryData) => {
  return axiosInstance.post('/categories', categoryData);
};

/**
 * 获取所有分类
 * @returns {Promise} 分类列表
 */
export const getCategories = async () => {
  return axiosInstance.get('/categories');
};

/**
 * 获取单个分类信息
 * @param {string} categoryId - 分类ID
 * @returns {Promise} 分类信息
 */
export const getCategory = async (categoryId) => {
  return axiosInstance.get(`/categories/${categoryId}`);
};

/**
 * 更新分类信息
 * @param {string} categoryId - 分类ID
 * @param {Object} categoryData - 要更新的分类数据
 * @param {string} [categoryData.name] - 分类名称
 * @param {string} [categoryData.description] - 分类描述
 * @returns {Promise} 更新后的分类信息
 */
export const updateCategory = async (categoryId, categoryData) => {
  return axiosInstance.put(`/categories/${categoryId}`, categoryData);
};

/**
 * 删除分类
 * @param {string} categoryId - 分类ID
 * @returns {Promise} 删除结果
 */
export const deleteCategory = async (categoryId) => {
  return axiosInstance.delete(`/categories/${categoryId}`);
};
