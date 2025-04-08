import { Component } from 'react'
import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return this.props.children
  }
}

export default App
