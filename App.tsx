import React from 'react';
import { Provider } from 'react-redux';
import store from '@state/store';
import { RewardsScreen } from '@screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<RewardsScreen />
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
