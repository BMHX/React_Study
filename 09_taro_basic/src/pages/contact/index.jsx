import { useState } from "react";
import { View, Button, Text, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobilePhoneNumber: "",
  });

  // 选择联系人
  const handleChooseContact = () => {
    Taro.chooseContact({
      success: (res) => {
        console.log("选择的联系人:", res);
        setContactInfo(res);
        Taro.showToast({
          title: "选择成功",
          icon: "success",
        });
      },
      fail: (err) => {
        console.error("选择联系人失败:", err);
        Taro.showToast({
          title: "选择失败",
          icon: "none",
        });
      },
    });
  };


  // 拨打联系人电话
  const handleCallContact = () => {
    if (!contactInfo?.phoneNumber) {
      Taro.showToast({
        title: '该联系人没有电话号码',
        icon: 'none'
      })
      return
    }

    Taro.makePhoneCall({
      phoneNumber: contactInfo.phoneNumber,
      success: () => {
        console.log('拨打电话成功')
      },
      fail: (err) => {
        console.error('拨打电话失败:', err)
        Taro.showToast({
          title: '拨打失败: ' + err.errMsg,
          icon: 'none'
        })
      }
    })
  }

  // 添加联系人
  const handleAddContact = () => {
    Taro.addPhoneContact({
      ...form,
      success: () => {
        Taro.showToast({
          title: "添加成功",
          icon: "success",
        });
      },
      fail: (err) => {
        console.error("添加联系人失败:", err);
        Taro.showToast({
          title: "添加失败",
          icon: "none",
        });
      },
    });
  };

  const handleInputChange = (field, e) => {
    setForm({
      ...form,
      [field]: e.detail.value,
    });
  };

  return (
    <>
      <View className="contact-page">
        <Button className="action-btn" onClick={handleChooseContact}>
          选择联系人
        </Button>

        {contactInfo && (
          <View className="contact-info">
            <Text className="info-item">
              姓名: {contactInfo.displayName}
            </Text>
            <Text className="info-item">电话: {contactInfo.phoneNumber}</Text>
            {contactInfo.phoneNumber && (
            <Button type='primary' onClick={handleCallContact}>
              拨打 {contactInfo.phoneNumber}
            </Button>
          )}
          </View>
        )}
      </View>

      <View className="add-contact-page">
        <View className="form-item">
          <Text className="label">姓氏:</Text>
          <Input
            className="input"
            value={form.lastName}
            onInput={(e) => handleInputChange("lastName", e)}
            placeholder="请输入姓氏"
          />
        </View>

        <View className="form-item">
          <Text className="label">名字:</Text>
          <Input
            className="input"
            value={form.firstName}
            onInput={(e) => handleInputChange("firstName", e)}
            placeholder="请输入名字"
          />
        </View>

        <View className="form-item">
          <Text className="label">电话号码:</Text>
          <Input
            className="input"
            value={form.mobilePhoneNumber}
            onInput={(e) => handleInputChange("mobilePhoneNumber", e)}
            placeholder="请输入电话号码"
            type="number"
          />
        </View>

        <Button className="submit-btn" onClick={handleAddContact}>
          添加到通讯录
        </Button>
      </View>
    </>
  );
};

export default Contact;
