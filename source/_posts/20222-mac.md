macos升级monterey踩坑：
monterey移除了python2（内置了python3），但是npm装包的时候有些编译操作是依赖python2的，所以我装回了python2重新装包解决问题。

一些必要的尝试：
- 重装xcode，用到一些gcc的依赖工具
- 检查xcode command line
- 丢失的环境变量手动添加一下

参考：
https://github.com/NativeScript/NativeScript/issues/9833（Monterey）
https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md（catalina及其他）