    import React, { useState } from 'react';
    import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    interface SearchResult {
    id: string;
    title: string;
    subtitle: string;
    type: 'user' | 'post' | 'hashtag';
    }

    export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [recentSearches] = useState<string[]>([
        'React Native',
        'TypeScript',
        'Mobile Development',
    ]);

    const mockResults: SearchResult[] = [
        { id: '1', title: 'reactnative', subtitle: '1.2K posts', type: 'hashtag' },
        { id: '2', title: 'John Developer', subtitle: '@johndev', type: 'user' },
        { id: '3', title: 'TypeScript Tips', subtitle: '150 posts', type: 'post' },
        { id: '4', title: 'mobileapps', subtitle: '890 posts', type: 'hashtag' },
        { id: '5', title: 'Jane Smith', subtitle: '@janesmith', type: 'user' },
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query.trim()) {
        const filtered = mockResults.filter(
            (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        } else {
        setResults([]);
        }
    };

    const renderResult = ({ item }: { item: SearchResult }) => (
        <TouchableOpacity style={styles.resultItem}>
        <View style={styles.resultIcon}>
            <Ionicons
            name={
                item.type === 'user'
                ? 'person'
                : item.type === 'hashtag'
                ? 'pricetag'
                : 'document-text'
            }
            size={24}
            color="#666"
            />
        </View>
        <View style={styles.resultInfo}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
        </View>
        </TouchableOpacity>
    );

    const renderRecentSearch = (search: string, index: number) => (
        <TouchableOpacity
        key={index}
        style={styles.recentItem}
        onPress={() => handleSearch(search)}
        >
        <Ionicons name="time-outline" size={16} color="#999" />
        <Text style={styles.recentText}>{search}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search users, posts, hashtags..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
            )}
            </View>
        </View>

        {searchQuery.length === 0 ? (
            <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            {recentSearches.map(renderRecentSearch)}
            </View>
        ) : (
            <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderResult}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>No results found</Text>
                </View>
            }
            />
        )}
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        backgroundColor: '#0066cc',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    recentContainer: {
        padding: 16,
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    recentText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    listContent: {
        paddingVertical: 8,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    resultIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultInfo: {
        flex: 1,
        marginLeft: 12,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    resultSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    emptyContainer: {
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