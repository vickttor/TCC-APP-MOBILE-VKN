// Reactotron disabled due to compatibility issues with newer Node.js/Metro bundler
// import Reactotron from 'reactotron-react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {reactotronRedux} from 'reactotron-redux';

// Mock Reactotron for development
const mockReactotron = {
  createEnhancer: () => (createStore) => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);
    return store;
  },
  // Add other mock methods if needed
};

// Reactotron.setAsyncStorageHandler(AsyncStorage)
//   .configure()
//   .useReactNative()
//   .use(reactotronRedux())
//   .connect();

console.tron = mockReactotron;
export default mockReactotron;
