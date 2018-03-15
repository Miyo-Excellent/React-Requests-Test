export default function deviceReducer(state = {}) {

  const { isBot, isCurl, isDesktop, isMobile, isPlayStation } = state;

  return {
    ...state,
    isBot,
    isCurl,
    isDesktop,
    isMobile,
    isPlayStation
  };
}
