import React, { Component } from "react";
import { View } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  componentDidMount() {
    console.log(11111, process.env.CONFIG_ENV);
  }

  render() {
    return <View className="index">131313</View>;
  }
}

export default Index;
