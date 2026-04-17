    import React, { useState } from 'react';
    import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'mention';
    user: {
        name: string;
        username: string;
        avatar?: string;
    };
    message: string;
    time: string;
    read: boolean;
    }

    export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
        id: '1',
        type: 'like',
        user: { name: 'Jane Smith', username: '@janesmith' },
        message: 'liked your post',
        time: '2m ago',
        read: false,
        },
        {
        id: '2',
        type: 'comment',
        user: { name: 'Mike Johnson', username: '@mikej' },
        message: 'commented: "Great insights!"',
        time: '15m ago',
        read: false,
        },
        {
        id: '3',
        type: 'follow',
        user: { name: 'Sarah Wilson', username: '@sarahw' },
        message: 'started following you',
        time: '1h ago',
        read: false,
        },
        {
        id: '4',
        type: 'mention',
        user: { name: 'Tech Blog', username: '@techblog' },
        message: 'mentioned you in a post',
        time: '3h ago',
        read: true,
        },
        {
        id: '5',
        type: 'like',
        user: { name: 'Dev Community', username: '@devcom' },
        message: 'liked your post',
        time: '5h ago',
        read: true,
        },
    ]);

    const [refreshing, setRefreshing] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 1000);
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
        case 'like':
            return { name: 'heart' as const, color: '#dc3545' };
        case 'comment':
            return { name: 'chatbubble' as const, color: '#0066cc' };
        case 'follow':
            return { name: 'person-add' as const, color: '#28a745' };
        case 'mention':
            return { name: 'at' as const, color: '#ffc107' };
        }
    };

    const renderNotification = ({ item }: { item: Notification }) => {
        const icon = getNotificationIcon(item.type);
        const initial = item.user.name.charAt(0).toUpperCase();

        return (
        <TouchableOpacity
            style={[styles.notificationItem, !item.read && styles.unreadItem]}
            onPress={() => markAsRead(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initial}</Text>
            </View>

            <View style={[styles.iconBadge, { backgroundColor: icon.color }]}>
                <Ionicons name={icon.name} size={10} color="#ffffff" />
            </View>
            </View>

            <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
                <Text style={styles.userName}>{item.user.name}</Text> {item.message}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
            </View>

            {!item.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
                <Text style={styles.markAllRead}>Mark all as read</Text>
            </TouchableOpacity>
            )}
        </View>

        <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.listContent}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Ionicons name="notifications-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>No notifications yet</Text>
            </View>
            }
        />
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    markAllRead: {
        fontSize: 14,
        color: '#0066cc',
    },
    listContent: {
        flexGrow: 1,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    unreadItem: {
        backgroundColor: '#f0f8ff',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#0066cc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    iconBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    notificationContent: {
        flex: 1,
        marginLeft: 12,
    },
    notificationText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    userName: {
        fontWeight: '600',
    },
    timeText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0066cc',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: '#999',
    },
    });