import { StyleSheet } from 'react-native';

import { Colors } from './colors';

export const GlobalStyles = StyleSheet.create({
	Shadow: {
		shadowColor: Colors.Black,
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	ShadowTop: {
		shadowColor: Colors.Black,
		shadowOffset: { width: -10, height: -10 },
		shadowOpacity: 0.2,
		shadowRadius: 20,
		elevation: 2,
	},
});
