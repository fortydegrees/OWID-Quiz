const { boxShadow } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    borderColor:{
        'primary': '#ffcb1f',
        'secondary': '#eee'
    },
    textColor:{
      'primary': '#ffcb1f',
      'secondary': '#eee'
    },
    minWidth: {
           '0': '0',
           '25': '25%',
           '33': '33%',
           '10': '10%',
           '15': '15%',
           '20': '20%',
           '5':'5%',
           '50': '50%',
           '75': '75%',
           'full': '100%',
          },
    fontFamily: {
      display: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "Lato",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },
    customForms: theme => ({
      default: {
        input: {
          backgroundColor: theme("colors.gray.100"),
          "&::placeholder": {
            color: theme("colors.gray.500"),
            opacity: "1"
          },
          "&:focus": {
            outline: "none",
            boxShadow: theme("boxShadow.none"),
            borderColor: theme("colors.orange.500")
          }
        }
      }
    }),
    extend: {
      boxShadow: {
        ...boxShadow,
        outline: "0 0 0 3px rgba(239, 121, 48, 0.5)"
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")]
};
