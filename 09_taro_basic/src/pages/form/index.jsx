import { useState } from "react";
import {
  View,
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Text,
  Picker,
  Textarea,
  Switch,
} from "@tarojs/components";
import { AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const FormPage = () => {
  // 表单数据状态
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gender: "male",
    hobbies: [],
    birthday: "",
    description: "",
    agreement: false,
    education: "",
  });

  // 教育程度选项
  const educationOptions = ["高中", "大专", "本科", "研究生", "博士"];

  // 表单验证状态
  const [errors, setErrors] = useState({});

  // 处理输入框变化
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 处理复选框变化
  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(value)
        ? prev.hobbies.filter((item) => item !== value)
        : [...prev.hobbies, value],
    }));
  };

  // 表单验证
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "请输入用户名";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "密码长度至少6位";
    }

    if (!formData.birthday) {
      newErrors.birthday = "请选择出生日期";
    }

    if (!formData.agreement) {
      newErrors.agreement = "请同意用户协议";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 表单提交处理
  const handleSubmit = (e) => {
    if (validateForm()) {
      console.log("表单数据：", formData);
      Taro.showToast({
        title: "提交成功",
        icon: "success",
        duration: 2000,
      });
    } else {
      Taro.showToast({
        title: "请检查表单填写",
        icon: "error",
        duration: 2000,
      });
    }
  };

  return (
    <View className="form-page">
      <AtMessage />
      <View className="form-header">
        <Text className="form-title">表单组件示例</Text>
      </View>

      <Form onSubmit={handleSubmit}>
        {/* 文本输入框 */}
        <View className="form-item">
          <Text className="form-label">用户名：</Text>
          <Input
            className="form-input"
            type="text"
            placeholder="请输入用户名"
            value={formData.username}
            onInput={(e) => handleInputChange("username", e.detail.value)}
          />
        </View>

        {/* 密码输入框 */}
        <View className="form-item">
          <Text className="form-label">密码：</Text>
          <Input
            className="form-input"
            type="password"
            placeholder="请输入密码"
            value={formData.password}
            onInput={(e) => handleInputChange("password", e.detail.value)}
          />
        </View>

        {/* 单选框组 */}
        <View className="form-item">
          <Text className="form-label">性别：</Text>
          <View className="radio-group">
            <Radio
              className="radio"
              value="male"
              checked={formData.gender === "male"}
              onClick={() => handleInputChange("gender", "male")}
            >
              男
            </Radio>
            <Radio
              className="radio"
              value="female"
              checked={formData.gender === "female"}
              onClick={() => handleInputChange("gender", "female")}
            >
              女
            </Radio>
          </View>
        </View>

        {/* 复选框组 */}
        <View className="form-item">
          <Text className="form-label">爱好：</Text>
          <View className="checkbox-group">
            <Checkbox
              className="checkbox"
              value="reading"
              checked={formData.hobbies.includes("reading")}
              onClick={() => handleCheckboxChange("reading")}
            >
              阅读
            </Checkbox>
            <Checkbox
              className="checkbox"
              value="music"
              checked={formData.hobbies.includes("music")}
              onClick={() => handleCheckboxChange("music")}
            >
              音乐
            </Checkbox>
            <Checkbox
              className="checkbox"
              value="sports"
              checked={formData.hobbies.includes("sports")}
              onClick={() => handleCheckboxChange("sports")}
            >
              运动
            </Checkbox>
          </View>
        </View>

        {/* 日期选择器 */}
        <View className="form-item">
          <Text className="form-label">出生日期：</Text>
          <Picker
            mode="date"
            value={formData.birthday}
            onChange={(e) => handleInputChange("birthday", e.detail.value)}
          >
            <View className="picker-view">
              {formData.birthday || "请选择日期"}
            </View>
          </Picker>
          {errors.birthday && (
            <Text className="error-text">{errors.birthday}</Text>
          )}
        </View>

        {/* 教育程度选择器 */}
        <View className="form-item">
          <Text className="form-label">教育程度：</Text>
          <Picker
            mode="selector"
            range={educationOptions}
            value={educationOptions.indexOf(formData.education)}
            onChange={(e) =>
              handleInputChange("education", educationOptions[e.detail.value])
            }
          >
            <View className="picker-view">
              {formData.education || "请选择教育程度"}
            </View>
          </Picker>
        </View>

        {/* 文本域 */}
        <View className="form-item">
          <Text className="form-label">个人简介：</Text>
          <Textarea
            className="form-textarea"
            value={formData.description}
            onInput={(e) => handleInputChange("description", e.detail.value)}
            placeholder="请输入个人简介"
            maxlength={200}
          />
        </View>

        {/* 开关选择器 */}
        <View className="form-item">
          <View className="switch-container">
            <Text className="form-label">同意用户协议：</Text>
            <Switch
              checked={formData.agreement}
              onChange={(e) => handleInputChange("agreement", e.detail.value)}
            />
          </View>
          {errors.agreement && (
            <Text className="error-text">{errors.agreement}</Text>
          )}
        </View>

        {/* 提交按钮 */}
        <View className="form-item">
          <Button className="submit-btn" formType="submit" type="primary">
            提交
          </Button>
        </View>
      </Form>
    </View>
  );
};

export default FormPage;
