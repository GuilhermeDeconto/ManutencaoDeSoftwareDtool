import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { CardRow } from "../components";
import colors from "../utils/colors";

const Carousel = () => {
  return (
    <View style={styles.carouselStyle}>
      <ScrollView>
        <View>
          <CardRow />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselStyle: {
    alignItems: "center",
    backgroundColor: colors.basic.backgroundHighlight,
    flexDirection: "row",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    padding: 10,
  },
});

export default Carousel;
