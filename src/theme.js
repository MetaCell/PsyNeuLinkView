import { createTheme } from '@mui/material/styles';
import vars from './assets/styles/variables';

const {
  primaryBg,
  fontFamily,
  chipTextColor,
  chipBgColor,
  chipPrimaryTextColor,
  chipPrimaryBgColor,
  breadcrumbLinkColor,
  breadcrumbTextColor,
  textWhite,
  buttonPrimaryBgHoverColor,
  buttonPrimaryBgColor,
  buttonPrimaryDisabledBgColor,
  listItemActiveBg,
  listSelectedTextColor,
  listBoxShadow,
  listBorderColor,
  progressBg,
  progressBar,
  progressShadow,
  switchShadow
} = vars;

const theme = {
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-family: ${fontFamily};
        }
        body {
          font-family: ${fontFamily};
          font-size: 1rem;
        }
      `,
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          useNextVariants: true,
          fontFamily: fontFamily,
        },

        h1: {
        },
        h2: {
        },
        h3: {
        },
        h4: {
        },
        h5: {
        },
        h6: {
        },
        subtitle1: {
        },
        subtitle2: {
        },
        body1: {
        },
        body2: {
        },
        caption: {
        },
        button: {
        },
        overline: {
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: '700',
          fontSize: '0.5rem',
          lineHeight: '0.75rem',
          color: chipTextColor,
          backgroundColor: chipBgColor,
          borderRadius: '0.25rem',
          height: 'auto',
        },

        label: {
          padding: '0.0625rem 0.25rem',
        },

        colorPrimary: {
          backgroundColor: chipPrimaryBgColor,
          color: chipPrimaryTextColor,
        },
      },
    },

    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontWeight: '400',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            letterSpacing: '-0.001em',
            color: breadcrumbTextColor,
            display: 'flex',
            alignItems: 'center',

            '& img': {
              display: 'block',
              marginRight: '0.75rem'
            },
          },

          '& .MuiLink-root': {
            color: breadcrumbLinkColor,
          },
        },

        separator: {
          color: breadcrumbLinkColor,
          marginLeft: '0.25rem',
          marginRight: '0.25rem',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          fontSize: '0.875rem',
          lineHeight: '1',
          textTransform: 'none',
          letterSpacing: '-0.005rem',
          padding: '0.625rem 1rem',
          borderRadius: '0.5rem',
          '&:not(:last-child)': {
            marginRight: '0.5rem'
          },
          '& img': {
            display: 'block',
            marginRight: '0.375rem'
          },

          '& .MuiChip-root': {
            marginLeft: '0.375rem'
          },
        },

        text: {
          color: breadcrumbLinkColor,
        },

        containedPrimary: {
          backgroundColor: buttonPrimaryBgColor,
          '&.Mui-disabled': {
            background: buttonPrimaryDisabledBgColor,
            color: textWhite
          },
          "&:hover": {
            backgroundColor: buttonPrimaryBgHoverColor,
          },
        },
      },
    },

    // MuiList: {
    //   styleOverrides: {
    //     root: {
    //       '&.customSwitch': {
    //         padding: '0.125rem',
    //         background: chipTextColor,
    //         borderRadius: '0.5rem',
    //         display: 'flex',

    //         '& .MuiListItemButton-root': {
    //           padding: '0.25rem 0.75rem',
    //           borderRadius: '0.4375rem',
    //           width: '10.59375rem',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',

    //           '&:not(:last-child)': {
    //             marginBottom: '0',
    //           },

    //           '&.Mui-disabled': {
    //             opacity: 1,
    //           },

    //           '&.Mui-selected': {
    //             background: textWhite,
    //             boxShadow: listBoxShadow,
    //             border: `0.03125rem solid ${listBorderColor}`,

    //             '& .MuiTypography-root': {
    //               color: listSelectedTextColor
    //             },
    //           },
    //         },

    //         '& .MuiChip-root': {
    //           marginLeft: '0.25rem'
    //         },

    //         '& .MuiTypography-root': {
    //           fontWeight: 500,
    //           fontSize: '0.8125rem',
    //           lineHeight: '1.25rem',
    //           letterSpacing: '-0.005rem',
    //           color: chipBgColor,
    //           margin: 0
    //         },
    //       },
    //     }
    //   }
    // },

    // MuiListItemIcon: {
    //   styleOverrides: {
    //     root: {
    //       minWidth: 'inherit'
    //     },
    //   }
    // },

    // MuiListItemButton: {
    //   styleOverrides: {
    //     root: {
    //       padding: 0,
    //       width: '2.5rem',
    //       height: '2.5rem',
    //       borderRadius: '50%',
    //       justifyContent: 'center',
    //       backgroundColor: chipTextColor,
    //       '&:hover': {
    //         backgroundColor: chipTextColor,
    //       },
    //       '&:not(:last-child)': {
    //         marginBottom: '0.75rem',
    //       },
    //       '&.Mui-selected': {
    //         backgroundColor: listItemActiveBg,
    //         '&:hover': {
    //           backgroundColor: listItemActiveBg,
    //         },
    //       },

    //       '&.Mui-disabled': {
    //         opacity: 0.8,
    //       },
    //     },
    //   }
    // },

    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 0,
          width: '2rem',
          borderRadius: '3.125rem',
          height: '1.25rem',
        },

        switchBase: {
          padding: 0,
          background: textWhite,
          top: '0.125rem',
           transform: 'translateX(0.125rem)',

          '&.Mui-checked': {
            transform: 'translateX(0.875rem)',
            color: textWhite,

            '& + .MuiSwitch-track': {
              opacity: 1,
              background: listItemActiveBg,
            },
          },
        },

        thumb: {
          boxShadow: switchShadow,
          width: '1rem',
          height: '1rem',
        },

        track: {
          borderRadius: '3.125rem',
          opacity: 1,
          backgroundColor: primaryBg
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '0.375rem',
          borderRadius: '0.6875rem',
          background: progressBg,
          boxShadow: progressShadow
        },

        bar: {
          background: progressBar,
          borderRadius: '0.6875rem'
        },
      },
    },
  },
};

export default createTheme(theme);