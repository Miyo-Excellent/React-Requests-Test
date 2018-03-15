// Initial States
const testInitialState = (options = {}) => ({
  ...options,
  test: `test: ${5 * 5}`,
  user: {
    entities: [],
    info: {
      email: ''
    },
    isLogin: false
  },
  nav: {
    routes: [
      {
        name: 'Home',
        path: '/'
      }
    ]
  }
});

// Reducers
export default function test (state = testInitialState({}), action) {
  switch (action.type) {
    case "LOAD_ENTITIES": {
      console.log(action.data);
      return {
        ...state,
        user: {
          ...state.user,
          info: {
            ...state.user.info,
            email: action.data.requesteInfo.email
          },
          isLogin: !state.user.isLogin,
          entities: action.data.payload
        }
      };
      break;
    }
    default: {
      return state;
      break;
    }
  }
}
