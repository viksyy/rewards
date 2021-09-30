import { Reward } from '@interfaces';
import { collectReward, getAllRewards } from '@state/rewards/rewards.actions';
import { AppState } from '@state/types';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, GlobalStyles } from '@utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isRewardCollected } from '@helpers';

export const RewardsScreen = () => {
	const dispatch = useDispatch();
	const { rewards, loading, collectedRewards } = useSelector((state: AppState) => state.rewards);
	const inset = useSafeAreaInsets();

	const [collectedOpen, isCollectedOpen] = useState(true);

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
					<TouchableOpacity activeOpacity={0.8} onPress={() => isCollectedOpen(!collectedOpen)} style={styles.headerCollected}>
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
	safeAreaView: {
		flex: 1,
		backgroundColor: Colors.GrayLight,
	},
	growView: {
		flexGrow: 1,
	},
	backView: {
		backgroundColor: Colors.GrayLight,
	},
	rewardCardView: {
		...GlobalStyles.Shadow,
		flex: 1,
		backgroundColor: Colors.White,
		margin: 5,
		borderLeftWidth: 10,
		padding: 20,
		borderRadius: 4,
		position: 'relative',
	},
	rewardTitle: {
		fontWeight: 'bold',
		fontSize: 18,
		width: '90%',
	},
	rewardPointsView: {
		position: 'absolute',
		right: 0,
		backgroundColor: Colors.Black,
		height: 35,
		width: 55,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 4,
	},
	rewardPoints: {
		color: Colors.White,
		fontWeight: 'bold',
	},
	pictureView: {
		width: 100,
		height: 100,
		borderWidth: 2,
		margin: 5,
		borderColor: Colors.Orange,
		borderRadius: 10,
	},
	rewardEmptyView: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rewardEmptyText: {
		fontStyle: 'italic',
		color: Colors.Gray,
	},
	rewardCollectButton: {
		...GlobalStyles.Shadow,
		width: '100%',
		backgroundColor: Colors.Orange,
		height: 45,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
	},
	rewardCollectButtonText: {
		fontWeight: 'bold',
	},
	headerItemView: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	headerItemText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	emptySpaceOpenCollected: {
		paddingBottom: 160,
	},
	emptyFlatList: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	emptyText: {
		textAlign: 'center',
	},
	collectedView: {
		...GlobalStyles.ShadowTop,
		position: 'absolute',
		width: '100%',
		backgroundColor: Colors.OrangeLight,
	},
	headerCollected: {
		backgroundColor: Colors.Black,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerCollectedText: {
		color: Colors.White,
		fontWeight: 'bold',
	},
	badgeView: {
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10,
	},
	badgeImage: {
		width: 75,
		height: 75,
	},
	badgeText: {
		width: 100,
		textAlign: 'center',
	},
});
