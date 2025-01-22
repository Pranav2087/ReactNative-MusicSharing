// Colours

export const colors = {
    darkGreen: "#229879",
    darkLime: "#1A8871",
    lightLime: "#BBD6C5",
    lime: "#2AD699",
    lightGreen: "#E7F9EF",
    lightGreen2: "#8EbCA0",
    white: "#fff",
    black: "#000",
    blue: "#4096FE",
    grayDark: "#999",
    grayLight: "#ddd",
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack3: "rgba(0, 0, 0, 0.3)",
    transparentBlack5: "rgba(0, 0, 0, 0.5)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)",
    transparentBlack9: "rgba(0, 0, 0, 0.9)",
    transparentGray: "rgba(77,77,77, 0.8)",
    transparentDarkGray: "rgba(20,20,20, 0.9)",
    transparent: "transparent",
    purpleColorLighter: "#A42DE8",
	blueColorLighter: "#318AFF",
	blueColorDarker: "#2D3DE8",
	blackColorTranslucentLess: "rgba(0,0,0,0.35)",
	blackColorTranslucentMore: "rgba(0,0,0,0.7)",
    whiteColor: "#ffffff",
    whiteColorTranslucent: "rgba(255,255,255, 0.5)",
	"light" : {
		bgColor: "#ffffff",
		fgColor: "#800080",
		fgColorLighter: "rgba(128,0,128,0.5)",
		headerTextColor: "#ffffff"
	},
	"dark" : {
		bgColor: "#422142",
		fgColor: "#f0c4f0",
		fgColorLighter: "rgba(210,169,210,0.5)",
		headerTextColor: "#f0c4f0",
	}
};

// Sizes

export const sizes = {
    // Global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    headerHeight: 300,

    // Font sizes
    heading: 22,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
};

// Fonts

export const fonts = {
    heading: { paddingBottom: sizes.padding / 2, color: colors.black, fontFamily: "System", fontSize: sizes.heading, lineHeight: 30 },
    body1: { color: colors.black, fontFamily: "System", fontSize: sizes.body1, lineHeight: 36 },
    body2: { color: colors.black, fontFamily: "System", fontSize: sizes.body2, lineHeight: 30 },
    body3: { color: colors.black, fontFamily: "System", fontSize: sizes.body3, lineHeight: 22 },
    body4: { color: colors.black, fontFamily: "System", fontSize: sizes.body4, lineHeight: 22 },
    body5: { color: colors.black, fontFamily: "System", fontSize: sizes.body5, lineHeight: 22 },
};

const appTheme = { colors, sizes, fonts };
export default appTheme;