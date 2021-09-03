import { StyleSheet, Dimensions, Platform } from "react-native";
import * as Styles from 'App/Styles';


const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const slideHeight = viewportHeight * 0.3;
export const slideWidth = wp(75);
export const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2 + 20;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: 140,
    borderRadius: 10,
    //paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "#dfe4ea",
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: Styles.Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    //borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    // borderTopLeftRadius: entryBorderRadius,
    //borderTopRightRadius: entryBorderRadius,
    //borderWidth:1,
    //borderColor:'#f7f8fa',
  },
  author: {
    width: slideWidth * 0.5,
    justifyContent: "center",
    padding: 16,
    height: 97,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "#0065A1",
    // borderTopLeftRadius: entryBorderRadius,
    //borderTopRightRadius: entryBorderRadius,
    //borderWidth:1,
    //borderColor:'#f7f8fa',
  },
  imageContainerEven: {
    backgroundColor: Styles.Colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    //borderRadius: IS_IOS ? entryBorderRadius : 0,
    //borderTopLeftRadius: entryBorderRadius,
    //borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white",
  },
  radiusMaskEven: {
    backgroundColor: Styles.Colors.black,
  },
  textContainer: {
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 10,
    //paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    //backgroundColor: 'white',
    //borderBottomLeftRadius: entryBorderRadius,
    //borderBottomRightRadius: entryBorderRadius,
    // borderWidth:1,
    //borderColor:'#f7f8fa',
  },
  textContainerEven: {
    backgroundColor: Styles.Colors.black,
  },
  title: {
    color: Styles.Colors.black,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  titleEven: {
    color: "white",
  },
  subtitle: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",

    //fontStyle: 'italic'
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});
