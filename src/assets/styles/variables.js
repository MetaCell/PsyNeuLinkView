const nodeRed = {
  nodeRedBackgroundColor: '#F4D4D4',
  nodeRedTextColor: '#9D6666',
  nodeRedBorderColor: 'rgba(157, 139, 102, 0.2)',
  nodeRedBoxShadow: '0 0.25rem 0.625rem -0.25rem rgba(157, 139, 102, 0.3)',
};

const nodeBlue = {
  nodeBlueBackgroundColor: '#D4E6F4',
  nodeBlueTextColor: '#66829D',
  nodeBlueBorderColor: 'rgba(102, 130, 157, 0.2)',
  nodeBlueBoxShadow: '0 0.125rem 0.375rem -0.25rem rgba(102, 130, 157, 0.2)',
};

const nodeGray = {
  nodeGrayBackgroundColor: '#E4E4E4',
  nodeGrayTextColor: '#818181',
  nodeGrayBorderColor: 'rgba(130, 130, 130, 0.2)',
  nodeGrayBoxShadow: '0 0.25rem 0.625rem -0.25rem rgba(129, 129, 129, 0.3)',
};

const vars = {
  fontFamily: 'Inter, sans-serif',
  primaryBg: '#f1f1f1',
  textWhite: '#FFFFFF',
  chipTextColor: '#F2F2F7',
  chipBgColor: 'rgba(60, 60, 67, 0.4)',

  chipPrimaryTextColor: 'rgba(255, 255, 255, 0.8)',
  chipPrimaryBgColor: 'rgba(0, 122, 255, 0.6)',

  breadcrumbLinkColor: '#A2A2A2',
  breadcrumbTextColor: '#292929',

  buttonPrimaryBgColor: '4353FF',
  buttonPrimaryBgHoverColor: '#3443E1',
  buttonPrimaryDisabledBgColor: 'rgba(0, 122, 255, 0.4)',

  listItemActiveBg: '#007AFF',
  listSelectedTextColor: '#3C3C43',
  listBoxShadow: '0 0.1875rem 0.5rem rgba(0, 0, 0, 0.12), 0 0.1875rem 0.0625rem rgba(0, 0, 0, 0.04)',
  listBorderColor: 'rgba(0, 0, 0, 0.04)',

  dividerColor: 'rgba(118, 120, 125, 0.12)',

  dropdownBg: 'rgba(246, 246, 248, 0.8)',
  dropdownTextColor: 'rgba(60, 60, 67, 0.6)',

  overlayColor: 'rgba(0, 0, 0, 0.4)',

  progressBg: '#E5E5E5',
  progressBar: '#017AFF',
  progressShadow: 'inset 0 0 0.0625rem #E3E3E3',

  switchShadow: '0 0.1875rem 0.5rem rgba(0, 0, 0, 0.15), 0 0.1875rem 0.0625rem rgba(0, 0, 0, 0.06)',
  ...nodeRed,
  ...nodeBlue,
  ...nodeGray,
};

export default vars;