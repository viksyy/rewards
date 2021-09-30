import { StyleSheet } from 'react-native';

import { Colors } from './colors';

export const GlobalStyles = StyleSheet.create({
	Shadow: {
		elevation: 5,
		shadowColor: Colors.Black,
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	ShadowTop: {
		elevation: 2,
		shadowColor: Colors.Black,
		shadowOffset: { width: -10, height: -10 },
		shadowOpacity: 0.2,
		shadowRadius: 20,
	},
});
