import { View, Text } from "@tarojs/components";
import { GridView, ListView } from "@tarojs/components";
import "./index.scss";

const SkylinePage = () => {
  // GridView 数据
  const gridData = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `项目 ${i + 1}`,
    color: `hsl(${(i * 20) % 360}, 70%, 70%)`,
  }));

  // ListView 数据
  const listData = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    title: `列表项 ${i + 1}`,
    desc: `这是第 ${i + 1} 个列表项的描述信息`,
  }));

  return (
    <View className="skyline-page">
      {/* GridView 示例 */}
      <View className="section">
        <Text className="section-title">GridView 组件</Text>
        <GridView
          className="grid-view"
          crossAxisCount={4}
          crossAxisGap={20}
          mainAxisGap={20}
        >
          {gridData.map((item) => (
            <View
              key={item.id}
              className="grid-item"
              style={{ backgroundColor: item.color }}
            >
              <Text className="grid-item-text">{item.title}</Text>
            </View>
          ))}
        </GridView>
      </View>

      {/* ListView 示例 */}
      <View className="section">
        <Text className="section-title">ListView 组件</Text>
        <ListView className="list-view" scrollY height={300}>
          {listData.map((item) => (
            <View key={item.id} className="list-item">
              <Text className="list-item-title">{item.title}</Text>
              <Text className="list-item-desc">{item.desc}</Text>
            </View>
          ))}
        </ListView>
      </View>
    </View>
  );
};

export default SkylinePage;
