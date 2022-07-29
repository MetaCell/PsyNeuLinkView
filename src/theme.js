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
  switchShadow,
  nodeRedBackgroundColor,
  nodeRedBorderColor,
  nodeRedBoxShadow,
  nodeRedTextColor,
  nodeBlueBackgroundColor,
  nodeBlueBoxShadow,
  nodeBlueBorderColor,
  nodeBlueTextColor,
  nodeGrayBoxShadow,
  nodeGrayBackgroundColor,
  nodeGrayBorderColor,
  nodeGrayTextColor,
} = vars;

const theme = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          useNextVariants: true,
          fontFamily: fontFamily,
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

    MuiList: {
      styleOverrides: {
        root: {
          '&.customSwitch': {
            padding: '0.125rem',
            background: chipTextColor,
            borderRadius: '0.5rem',
            display: 'flex',

            '& .MuiListItemButton-root': {
              padding: '0.25rem 0.75rem',
              borderRadius: '0.4375rem',
              width: '10.59375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              '&:not(:last-child)': {
                marginBottom: '0',
              },

              '&.Mui-disabled': {
                opacity: 1,
              },

              '&.Mui-selected': {
                background: textWhite,
                boxShadow: listBoxShadow,
                border: `0.03125rem solid ${listBorderColor}`,

                '& .MuiTypography-root': {
                  color: listSelectedTextColor
                },
              },
            },

            '& .MuiChip-root': {
              marginLeft: '0.25rem'
            },

            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: '0.8125rem',
              lineHeight: '1.25rem',
              letterSpacing: '-0.005rem',
              color: chipBgColor,
              margin: 0
            },
          },
        }
      }
    },

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

    MuiCssBaseline: {
      styleOverrides: `
        .primary-node.node-red {
          background: ${nodeRedBackgroundColor};
          box-shadow: ${nodeRedBoxShadow};
          border-color: ${nodeRedBorderColor};
        }

        .primary-node.node-red .primary-node_header p {
          color: ${nodeRedTextColor};
        }

        .primary-node.node-red .node-button .icon {
          background: ${nodeRedBackgroundColor};
          border-color: ${nodeRedBorderColor};
        }

        .primary-node.node-blue {
          background: ${nodeBlueBackgroundColor};
          box-shadow: ${nodeBlueBoxShadow};
          border-color: ${nodeBlueBorderColor};
        }

        .primary-node.node-blue .primary-node_header p {
          color: ${nodeBlueTextColor};
        }

        .primary-node.node-blue .node-button .icon {
          background: ${nodeBlueBackgroundColor};
          border-color: ${nodeBlueBorderColor};
        }

        .primary-node.node-gray {
          background: ${nodeGrayBackgroundColor};
          box-shadow: ${nodeGrayBoxShadow};
          border-color: ${nodeGrayBorderColor};
        }

        .primary-node.node-gray .primary-node_header p {
          color: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .node-button .icon {
          background: ${nodeGrayBackgroundColor};
          border-color: rgba(130, 130, 130, 0.2);
        }
      `,
    },
  },
};

export default createTheme(theme);