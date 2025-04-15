import { View, Text, Icon, Progress, RichText } from "@tarojs/components";
import "./index.scss";

const Basic = () => {
  // RichText示例内容
  const richTextNodes = [{
    name: "div",
    attrs: {
      class: "rich-text-wrapper"
    },
    children: [{
      type: "text",
      text: "这是一段富文本内容，支持"
    }, {
      name: "strong",
      children: [{
        type: "text",
        text: "加粗"
      }]
    }, {
      type: "text",
      text: "和"
    }, {
      name: "span",
      attrs: {
        style: "color: red;"
      },
      children: [{
        type: "text",
        text: "自定义样式"
      }]
    }]
  }];

  return (
    <View className="basic">
      {/* Icon组件示例 */}
      <View className="section">
        <View className="section-title">Icon示例</View>
        <View className="icon-list">
          <View className="icon-item">
            <Icon size="30" type="success" />
            <Text className="icon-name">success</Text>
          </View>
          <View className="icon-item">
            <Icon size="30" type="info" />
            <Text className="icon-name">info</Text>
          </View>
          <View className="icon-item">
            <Icon size="30" type="warn" color="#ff9900" />
            <Text className="icon-name">warn</Text>
          </View>
          <View className="icon-item">
            <Icon size="30" type="waiting" />
            <Text className="icon-name">waiting</Text>
          </View>
        </View>
      </View>

      {/* Text组件示例 */}
      <View className="section">
        <View className="section-title">Text示例</View>
        <View className="text-list">
          <Text className="text-item" selectable>可选择的文本</Text>
          <Text className="text-item" space="ensp">Text 组件支持 空格</Text>
          <Text className="text-item" decode>&lt;开启解码&gt;</Text>
          <Text className="text-item text-ellipsis">这是一段很长的文本，超出部分会显示省略号...</Text>
        </View>
      </View>

      {/* Progress组件示例 */}
      <View className="section">
        <View className="section-title">Progress示例</View>
        <View className="progress-list">
          <Progress percent={20} showInfo strokeWidth={4} />
          <Progress percent={40} strokeWidth={4} active />
          <Progress percent={60} strokeWidth={4} activeColor="#ff9900" />
          <Progress percent={80} strokeWidth={4} activeColor="#13CE66" backgroundColor="#FFE5E5" />
        </View>
      </View>

      {/* RichText组件示例 */}
      <View className="section">
        <View className="section-title">RichText示例</View>
        <RichText className="rich-text" nodes={richTextNodes} />
      </View>
    </View>
  );
};

export default Basic;
