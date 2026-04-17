export class DataFetcher {
    constructor(httpClient) {
        this.client = httpClient;
    }

    async fetchUser(userId) {
        return this.client.get(`/users/${userId}`);
    }

    async fetchUserPosts(userId) {
        return this.client.get(`/posts?userId=${userId}`);
    }

    async fetchUserFollowers(userId) {
        return this.client.get(`/users/${userId}`);
    }

    async fetchUserWithDetails(userId) {
        try {
            const [user, posts, followers] = await Promise.all([
                this.fetchUser(userId),
                this.fetchUserPosts(userId),
                this.fetchUserFollowers(userId),
            ]);

            return {
                user,
                posts,
                followers,
                fetchedAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }

    async fetchMultipleUsers(userIds) {
        const results = await Promise.allSettled(
            userIds.map((id) => this.fetchUser(id))
        );

        const successful = results.filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);

        const failed = results.map((result, index) => ({ result, id: userIds[index] }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ result, id }) => ({
            id,
            error: result.reason.message,
        }));

        return {
            users: successful,
            failed,
            totalRequested: userIds.length,
            totalSuccessful: successful.length,
            totalFailed: failed.length,
        };
    }

    async fetchWithFallback(primaryUrl, fallbackUrls = []) {
        const urls = [primaryUrl, ...fallbackUrls];

        const results = await Promise.allSettled(
            urls.map((url) => this.client.get(url))
        );

        const successfulIndex = results.findIndex(
            (result) => result.status === 'fulfilled'
        );

        if (successfulIndex !== -1) {
            return {
                data: results[successfulIndex].value,
                source: urls[successfulIndex],
            };
        }

        throw new Error('All fetch attempts failed');
    }
}

export async function fetchFirstSuccess(promises, timeoutMs = 5000) {
    return Promise.race([
        Promise.allSettled(promises).then((results) => {
            const successful = results.find((result) => result.status === 'fulfilled');

            if (successful) {
                return successful.value;
            }

            throw new Error('All promises failed');
        }),
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), timeoutMs);
        }),
    ]);
}