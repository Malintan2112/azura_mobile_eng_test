import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "App/Components/Widget/Carousel";
import styles from "./SliderEntry.style";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: { gambar },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: gambar }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: gambar }} style={styles.image} />
    );
  }

  render() {
    const {
      data: { title, judul, link, author, time },
      even,
    } = this.props;

    const uppercaseTitle = title ? (
      <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => console.log("link", link)}
      >
        <View style={styles.shadow} />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.author}>
            <View>
              <Text
                style={(styles.subtitle, { fontFamily: "Roboto", color: "white", fontSize: 13 })}
                numberOfLines={2}
              >
                {judul}
              </Text>
            </View>
          </View>
          <View style={styles.imageContainer}>{this.image}</View>
        </View>

        <View style={styles.textContainer}>
          <Text style={{ fontSize: 10, fontFamily: "Roboto", color: "#83858A" }}>
            Post by : {author}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alingItem: "center",
            }}
          >
            <Icon
              type="FontAwesome"
              name="clock"
              style={{ fontSize: 10, alignSelf: "center", marginRight: 3, color: "#83858A" }}
            />

            <Text style={{ fontSize: 10, color: "#83858A" }}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
