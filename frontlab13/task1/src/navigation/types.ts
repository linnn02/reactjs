export type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    Settings: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}