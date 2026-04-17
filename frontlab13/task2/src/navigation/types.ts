export type RootStackParamList = {
    HomeMain: undefined;
    Profile: { userId: string };
    Settings: undefined;
    SearchMain: undefined;
    NotificationsMain: undefined;
    ProfileMain: undefined;
};

export type TabParamList = {
    Home: undefined;
    Search: undefined;
    Notifications: undefined;
    Profile: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}