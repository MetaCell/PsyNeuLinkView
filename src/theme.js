import { createTheme } from '@mui/material/styles';
import vars from './assets/styles/variables';
import nodeBlue from './assets/svg/node/blue.svg';
import nodeGray from './assets/svg/node/gray.svg';
import nodeRed from './assets/svg/node/red.svg';
import nodeGreen from './assets/svg/node/green.svg';
import nodeGreenIntegrator from './assets/svg/node/green-puzzle.svg';
import nodeGreenLearning from './assets/svg/node/green-book.svg';
import nodeComposition from './assets/svg/node/composition.svg';

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
  textBlack,
  listBorderColorSecondary,
  chipBorderColor,
  drawerBg,
  drawerBorderColor,
  drawerShadow,
  nodeGreenBackgroundColor,
  elementBorderColor,
  elementBgColor,
  tabDividerBgColor,
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
            fontWeight: '500',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            letterSpacing: '-0.001em',
            color: breadcrumbTextColor,
            display: 'flex',
            alignItems: 'center',

            '& img': {
              display: 'block',
              marginRight: '0.75rem',
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
            marginRight: '0.5rem',
          },
          '& img': {
            display: 'block',
            marginRight: '0.375rem',
          },

          '& .MuiChip-root': {
            marginLeft: '0.375rem',
          },
        },

        text: {
          color: breadcrumbLinkColor,
        },

        containedPrimary: {
          backgroundColor: buttonPrimaryBgColor,
          '&.Mui-disabled': {
            background: buttonPrimaryDisabledBgColor,
            color: textWhite,
          },
          '&:hover': {
            backgroundColor: buttonPrimaryBgHoverColor,
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          '&.drawerList': {
            borderRadius: '0.875rem',
            background: textWhite,
            padding: '0 1rem',

            '& .MuiListItem-root': {
              padding: '0.875rem 2.8125rem 0.875rem 0',
              '&:not(:last-child)': {
                borderBottom: `0.03125rem solid ${listBorderColorSecondary}`,
              },
            },

            '& .MuiListItemText-root': {
              margin: 0,
            },

            '& .MuiListItemText-primary': {
              fontWeight: 600,
              fontSize: '1.0625rem',
              lineHeight: '1.375rem',
              marginBottom: '0.125rem',
              letterSpacing: '-0.0255rem',
              color: textBlack,
            },

            '& .MuiListItemText-secondary': {
              fontWeight: 400,
              fontSize: '0.9375rem',
              lineHeight: '1.25rem',
              letterSpacing: '-0.015rem',
              color: chipBorderColor,
            },

            '&:not(:last-child)': {
              marginBottom: '1rem',
            },
            '& .MuiListItemIcon-root': {
              minWidth: '2.625rem',
            },
            '& .icon': {
              width: '1.875rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '1.875rem',
              backgroundSize: '1.125rem',
              backgroundImage: `url(${nodeGreen})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: nodeGreenBackgroundColor,

              '&.composition': {
                backgroundColor: nodeGrayBackgroundColor,
                backgroundImage: `url(${nodeComposition})`,
                backgroundSize: 'inherit',
              },

              '&.green-integrator': {
                backgroundImage: `url(${nodeGreenIntegrator})`,
              },

              '&.green-learning': {
                backgroundImage: `url(${nodeGreenLearning})`,
              },

              '&.red': {
                backgroundColor: nodeRedBackgroundColor,
                backgroundImage: `url(${nodeRed})`,
              },
              '&.blue': {
                backgroundColor: nodeBlueBackgroundColor,
                backgroundImage: `url(${nodeBlue})`,
              },
              '&.gray': {
                backgroundColor: nodeGrayBackgroundColor,
                backgroundImage: `url(${nodeGray})`,
              },
            },
          },

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
                  color: listSelectedTextColor,
                },
              },
            },

            '& .MuiChip-root': {
              marginLeft: '0.25rem',
            },

            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: '0.8125rem',
              lineHeight: '1.25rem',
              letterSpacing: '-0.005rem',
              color: listSelectedTextColor,
              margin: 0,
            },
          },
          '&.headerSwitch': {
            padding: '0.125rem',
            display: 'flex',

            '& .MuiListItemButton-root': {
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              '&: hover': {
                background: 'none',

                '& .MuiTypography-root': {
                  color: breadcrumbTextColor,
                },
              },

              '&:not(:last-child)': {
                marginRight: '0.75rem',
                marginBottom: '0',
              },

              '&.Mui-disabled': {
                opacity: 1,
              },

              '&.Mui-selected': {
                background: textWhite,
                '& .MuiTypography-root': {
                  color: breadcrumbTextColor,
                },

                '& :before': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-1.063rem',
                  backgroundColor: breadcrumbTextColor,
                  Color: breadcrumbTextColor,
                  height: `1px`,
                  width: '100%',
                },
              },
            },

            '& .MuiChip-root': {
              marginLeft: '0.25rem',
            },

            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: '0.8125rem',
              lineHeight: '1.25rem',
              letterSpacing: '-0.005rem',
              color: breadcrumbLinkColor,
              margin: 0,
            },
          },
        },
      },
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
          backgroundColor: primaryBg,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '0.375rem',
          borderRadius: '0.6875rem',
          background: progressBg,
          boxShadow: progressShadow,
        },

        bar: {
          background: progressBar,
          borderRadius: '0.6875rem',
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

        .primary-node.node-red .icon {
          background: url(${nodeRed});
        }

        .primary-node.node-red .primary-node_header p {
          color: ${nodeRedTextColor};
        }

        .primary-node.node-red .node-button .icon {
          background: ${nodeRedBackgroundColor};
          border-color: ${nodeRedBorderColor};
        }

        .primary-node.node-red .block .disc {
          background: ${nodeRedBackgroundColor};
          border-color: ${nodeRedTextColor};
        }

        .primary-node.node-red .block .disc:after {
          background: ${nodeRedTextColor};
        }

        .primary-node.node-red .seprator {
          background: ${nodeRedBorderColor};
        }

        .primary-node.node-blue {
          background: ${nodeBlueBackgroundColor};
          box-shadow: ${nodeBlueBoxShadow};
          border-color: ${nodeBlueBorderColor};
        }

        .primary-node.node-blue .icon {
          background: url(${nodeBlue});
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

        .primary-node.node-gray .icon {
          background: url(${nodeGray});
        }

        .primary-node.node-gray .primary-node_header p {
          color: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .node-button .icon {
          background: ${nodeGrayBackgroundColor};
          border-color: rgba(130, 130, 130, 0.2);
        }

        .primary-node.node-blue .block .disc {
          background: ${nodeBlueBackgroundColor};
          border-color: ${nodeBlueTextColor};
        }

        .primary-node.node-blue .block .disc:after {
          background: ${nodeBlueTextColor};
        }

        .primary-node.node-blue .seprator {
          background: ${nodeBlueBorderColor};
        }

        .primary-node.node-gray .block .disc {
          background: ${nodeGrayBackgroundColor};
          border-color: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .block .disc:after {
          background: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .seprator {
          background: ${nodeGrayBorderColor};
        }
      
        .flexlayout__tabset_tabbar_inner_tab_container_top {
          border-top: none;
        }

        .flexlayout__tabset_tabbar_outer_top {
          border-bottom: none;
        }

        .flexlayout__splitter {
          background-color: ${textWhite};
          border-radius: 8px;
        }

        .flexlayout__tabset-selected {
          background-color: ${elementBgColor};
        }

        .flexlayout__tab_button_content {
          font-family:  ${fontFamily};
          font-size: 0.875rem
        }

        .flexlayout__tab_button {
          padding-left: 16px;
          padding-right: 12px;
          margin: 0;
          border-radius: 8px 8px 0 0;
        }

        .flexlayout__tab_button:hover {
           background-color: ${elementBorderColor};
        }
        
        .flexlayout__tab_button--unselected {
          position: relative;
          color: ${breadcrumbLinkColor};
        }

        .flexlayout__tab_button--unselected::after {
          content: "";
          position: absolute;
          top: 6px;
          right: 0;
          height: 16px; 
          border-left: 1px solid ${tabDividerBgColor};
        }

        // allow you to select a previous sibling
        .flexlayout__tab_button--unselected:has(+ .flexlayout__tab_button--selected):after {
          border-left-color: transparent;
        }

        .flexlayout__tab_button--unselected:hover{
          background-color: ${elementBorderColor};
        }

        .flexlayout__tab_button--selected {
          background-color: ${elementBorderColor};
          color: ${breadcrumbTextColor};
        }

        .flexlayout__tab {
          border-radius: 0 8px 8px 8px;
        }

        .flexlayout__tab_button_trailing {
          display: flex;
          place-items: center;
          background-image: none !important;
          margin-left: 4px;

        }

        .flexlayout__tab_button_trailing, .flexlayout__tab_toolbar_button {
          min-width: 16px;
          min-height: 16px;
        }

        .flexlayout__tab_button_trailing[title~="Close"] {
          color: #000;
          opacity: 0.2;
          min-width: 8px;
          min-height: 8px;
        }

        .flexlayout__tab_button_trailing[title~="Close"]:hover {
          opacity: 1;
        }

       .flexlayout__tab_toolbar_button-min {
          background-image: none;
        }

        .flexlayout__tab_toolbar_button-min[title~="Maximize"] {
          color: #000;
          opacity: 0.3;      
        }

        .flexlayout__tab_toolbar_button-min[title~="Maximize"]:hover {
          opacity: 1;      
        }

        .modebar-container[style] {
          top: 60px !important;
        }
      `,
    },

    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
          },
        },
        paper: {
          width: '25rem',
          height: 'calc(100% - 4.125rem)',
          top: '3.5rem',
          borderRadius: '0.75rem',
          right: '0.625rem',
          padding: '0.75rem 1rem 1rem',
          background: drawerBg,
          border: `0.03125rem solid ${drawerBorderColor}`,
          boxShadow: drawerShadow,
          backdropFilter: 'blur(2.5rem)',

          '& .close-icon': {
            display: 'block',
            width: '2rem',
            height: '2rem',
            marginLeft: 'auto',
            cursor: 'pointer',
          },

          '& .drawer-header': {
            padding: '0 1rem 1.75rem',

            '& img': {
              display: 'block',
              marginBottom: '0.75rem',
            },

            '& h4': {
              fontWeight: 700,
              fontSize: '1.375rem',
              marginBottom: '0.125rem',
              lineHeight: '1.75rem',
              letterSpacing: '0.021875rem',
              color: textBlack,
            },

            '& p': {
              fontWeight: 400,
              fontSize: '0.9375rem',
              lineHeight: '1.25rem',
              letterSpacing: '-0.015rem',
              color: chipBorderColor,
            },
          },
        },
      },
    },
  },
};

export default createTheme(theme);
