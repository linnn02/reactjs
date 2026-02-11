// Namespace Pattern (Ch. 11): создаём один глобальный объект и вкладываем под-пространства
(function (global) {
    const MyApp = global.MyApp || {};
    MyApp.Config = MyApp.Config || {};
    MyApp.Utils = MyApp.Utils || {};
    MyApp.Modules = MyApp.Modules || {};
    MyApp.Modules.Core = MyApp.Modules.Core || {};

    global.MyApp = MyApp;
})(typeof globalThis !== "undefined" ? globalThis : window);
