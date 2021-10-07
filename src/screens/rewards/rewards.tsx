import React, { useEffect, useState } from 'react';
import { AppState } from '@state/types';
import { Colors, GlobalStyles } from '@utils';
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Reward } from '@interfaces';
import { collectReward, getAllRewards } from '@state/rewards/rewards.actions';
import { isRewardCollected } from '@helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const RewardsScreen = () => {
	const dispatch = useDispatch();
	const { rewards, loading, collectedRewards } = useSelector((state: AppState) => state.rewards);
	const inset = useSafeAreaInsets();

	const [collectedOpen, setCollectedOpen] = useState(true);

	useEffect(() => {
		dispatch(getAllRewards());
	}, []);

	const onRefresh = (): void => {
		dispatch(getAllRewards());
	};

	const RewardListItem = ({ reward, onPress }: { reward: Reward; onPress: () => void }): JSX.Element => {
		const isCollected = isRewardCollected(reward, collectedRewards);
		return (
			<View key={reward.id} style={styles.rewardCardView}>
				<Text style={styles.rewardTitle}>{reward.name}</Text>
				<View style={styles.rewardPointsView}>
					<Text style={styles.rewardPoints}>{reward.needed_points}</Text>
				</View>
				<ScrollView horizontal={true}>
					{reward.pictures.map((picture, index) => (
						<Image key={index} source={{ uri: picture.image }} resizeMode={'cover'} style={styles.pictureView} />
					))}
				</ScrollView>
				{!isCollected ? (
					<TouchableOpacity style={styles.rewardCollectButton} onPress={onPress}>
						<Text style={styles.rewardCollectButtonText}>{'COLLECT'}</Text>
					</TouchableOpacity>
				) : (
					<View style={styles.rewardEmptyView}>
						<Text style={styles.rewardEmptyText}>{'This reward is already collected!'}</Text>
					</View>
				)}
			</View>
		);
	};

	const onCollectReward = (reward: Reward): void => {
		dispatch(collectReward(reward));
	};

	const HeaderItem = ({ title }: { title: string }): JSX.Element => {
		return (
			<View style={styles.headerItemView}>
				<Text style={styles.headerItemText}>{title}</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<FlatList
				refreshControl={<RefreshControl tintColor={Colors.Orange} refreshing={loading} onRefresh={onRefresh} />}
				data={rewards}
				contentContainerStyle={[styles.growView, collectedRewards.length > 0 && styles.emptySpaceOpenCollected]}
				style={styles.backView}
				renderItem={({ item }: { item: Reward }) => <RewardListItem key={item.id} reward={item} onPress={() => onCollectReward(item)} />}
				ListHeaderComponent={() => <HeaderItem title={'Rewards'} />}
				ListEmptyComponent={() =>
					!loading ? (
						<View style={styles.emptyFlatList}>
							<Text style={styles.emptyText}>{'There are no rewards!'}</Text>
						</View>
					) : (
						<></>
					)
				}
			/>
			{collectedRewards.length > 0 && (
				<View style={[styles.collectedView, { height: collectedOpen ? 150 : 36, bottom: inset.bottom }]}>
					<TouchableOpacity activeOpacity={0.8} onPress={() => setCollectedOpen(!collectedOpen)} style={styles.headerCollected}>
						<Text style={styles.headerCollectedText}>{'COLLECTED REWARDS'}</Text>
					</TouchableOpacity>
					<FlatList
						horizontal={true}
						data={collectedRewards}
						renderItem={({ item, index }: { item: Reward; index: number }) => (
							<View key={index} style={styles.badgeView}>
								<Image source={require('@assets/reward-icon.png')} style={styles.badgeImage} />
								<Text numberOfLines={1} style={styles.badgeText}>
									{item.name}
								</Text>
							</View>
						)}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backView: {
		backgroundColor: Colors.GrayLight,
	},
	badgeImage: {
		height: 75,
		width: 75,
	},
	badgeText: {
		textAlign: 'center',
		width: 100,
	},
	badgeView: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		paddingBottom: 10,
	},
	collectedView: {
		...GlobalStyles.ShadowTop,
		backgroundColor: Colors.OrangeLight,
		position: 'absolute',
		width: '100%',
	},
	emptyFlatList: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	emptySpaceOpenCollected: {
		paddingBottom: 160,
	},
	emptyText: {
		textAlign: 'center',
	},
	growView: {
		flexGrow: 1,
	},
	headerCollected: {
		alignItems: 'center',
		backgroundColor: Colors.Black,
		justifyContent: 'center',
		padding: 10,
	},
	headerCollectedText: {
		color: Colors.White,
		fontWeight: 'bold',
	},
	headerItemText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	headerItemView: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	pictureView: {
		borderColor: Colors.Orange,
		borderRadius: 10,
		borderWidth: 2,
		height: 100,
		margin: 5,
		width: 100,
	},
	rewardCardView: {
		...GlobalStyles.Shadow,
		backgroundColor: Colors.White,
		borderLeftWidth: 10,
		borderRadius: 4,
		flex: 1,
		margin: 5,
		padding: 20,
		position: 'relative',
	},
	rewardCollectButton: {
		...GlobalStyles.Shadow,
		alignItems: 'center',
		backgroundColor: Colors.Orange,
		borderRadius: 10,
		height: 45,
		justifyContent: 'center',
		marginVertical: 20,
		width: '100%',
	},
	rewardCollectButtonText: {
		fontWeight: 'bold',
	},
	rewardEmptyText: {
		color: Colors.Gray,
		fontStyle: 'italic',
	},
	rewardEmptyView: {
		alignItems: 'center',
		height: 30,
		justifyContent: 'center',
	},
	rewardPoints: {
		color: Colors.White,
		fontWeight: 'bold',
	},
	rewardPointsView: {
		alignItems: 'center',
		backgroundColor: Colors.Black,
		borderTopRightRadius: 4,
		height: 35,
		justifyContent: 'center',
		position: 'absolute',
		right: 0,
		width: 55,
	},
	rewardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		width: '90%',
	},
	safeAreaView: {
		backgroundColor: Colors.GrayLight,
		flex: 1,
	},
});
