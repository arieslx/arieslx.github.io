---
title: sheRuntime 黑客松 iOS HealthKit 探针
date: 2026-08-26 23:08:00
tags:
  - 2026
  - hackathon
---


# sheRuntime 黑客松 Handoff

> 更新时间：2026-08-27（Asia/Tokyo）  
> 路演时间：2026-08-29  
> 当前阶段：比赛已经开始，所有代码均为比赛期间从零编写的最小技术探针。

## 1. 项目目标

sheRuntime 是一个低负担的女性身体状态记录与解释工具。核心体验：用户通过随身 StopWatch 说一句身体感受，iPhone 自动结合 Apple Health 数据与本地女性健康 Skill/知识库，调用模型生成简短、积极、非诊断式的身体观察。

黑客松版本不做完整语音助手。StopWatch 不播放 TTS；完成记录后通过震动和屏幕形象/表情变化给予即时反馈，完整分析结果显示在 iPhone。

## 2. 已确定的最终最小架构

```text
StopWatch
├─ 按键开始/结束录音
├─ MEMS 麦克风采集音频
├─ PSRAM 临时保存短音频
├─ BLE 将音频传给 iPhone
└─ 震动 + 屏幕形象反馈
        ↓ BLE
iPhone App
├─ CoreBluetooth 接收音频
├─ 豆包 ASR：语音转文字
├─ HealthKit：读取身体数据
├─ 本地 Skill/Markdown 知识库
├─ API Key 调用 LLM
└─ 展示完整身体观察
        ↓ BLE 状态码
StopWatch
└─ 根据 SUCCESS / RETRY 等状态改变表情并震动
```

### 明确不做

- 不依赖场馆 Wi-Fi：现场网络极慢且频繁掉线。
- 不使用个人热点：场馆规则禁止。
- StopWatch 不直接调用云端 API。
- 暂不做 TypeScript 服务端、云数据库、Web App。
- 暂不做豆包 TTS、StopWatch 语音播放。
- 暂不做实时 BLE 麦克风；采用“录完再传”。
- 暂不做完整多轮对话。

### 网络分工

- StopWatch 与 iPhone：BLE，本地连接，不经过场馆 Wi-Fi。
- iPhone 与豆包/LLM：iPhone 自身蜂窝网络。
- 本地 Skill 与 HealthKit：留在 iPhone。

## 3. 为什么可以使用 BLE

M5Stack StopWatch 产品规格页只宣传 2.4GHz Wi-Fi，没有把 BLE 列为产品功能，但主控 ESP32-S3R8 芯片内置 Bluetooth LE。

已经通过本次比赛期间自己编写的最小固件，在真实设备上广播 BLE，并由 iPhone 的 nRF Connect 扫描到 `sheRuntime-StopWatch`。因此 BLE 通路已经实机确认可用。

参考仓库 `liptoxli/M5stopwatch-vibecoding` 证明了 StopWatch 可以做 BLE 实时音频，但该仓库是 macOS Bridge + 实时麦克风方案。本项目受比赛规则限制，不能复制或二次开发现成仓库，只能参考架构思想并从零实现自己的协议与代码。

## 4. Monorepo 结构与 Git 规则

当前采用一个 GitHub monorepo，不创建嵌套 Git 仓库：

```text
she-runtime/
├─ apps/
│  └─ ios/
├─ firmware/
│  └─ stopwatch/
├─ .gitignore
└─ README.md
```

Web、Server 等目录暂时不创建，等真正实现相应功能时再随代码加入。

根目录 `.gitignore` 已加入或应包含：

```gitignore
# macOS
.DS_Store

# Xcode
DerivedData/
*.xcuserstate
xcuserdata/
*.xccheckout
*.moved-aside

# Swift Package Manager
.build/
.swiftpm/

# PlatformIO
.pio/
.pioenvs/
.piolibdeps/

# VS Code
.vscode/
```

PlatformIO 自动生成的 `include/README`、`lib/README`、`test/README` 建议不提交。固件探针应提交的核心文件：

```text
firmware/stopwatch/platformio.ini
firmware/stopwatch/src/main.cpp
```

建议的 BLE 广播探针 commit：

```bash
git commit -m "feat(firmware): verify StopWatch BLE advertising"
```

## 5. 已完成：iOS HealthKit 探针

### Xcode 项目

- Product Name：`sheRuntime`
- Team：Personal Team
- Bundle Identifier：类似 `com.arieslx.sheRuntime`
- Interface：SwiftUI
- Storage：SwiftData
- CloudKit：未开启
- Target 已添加 `HealthKit` Capability
- 未开启 Clinical Health Records
- 未开启 HealthKit Background Delivery
- Health Share Usage Description：`用于读取你的步数，帮助生成身体状态摘要。`

### 已验证链路

```text
iPhone 真机
→ 请求 HealthKit 权限
→ 读取当天步数
→ SwiftUI 页面显示步数
```

真机调试时遇到 `No data available for the specified predicate`，已通过确认健康 App 中 `sheRuntime → 步数`读取权限，以及将 HealthKit `errorNoData` 视为 0 处理解决。最终已成功读取数据。

### 当前主要文件

```text
apps/ios/sheRuntime/
├─ sheRuntimeApp.swift
├─ ContentView.swift
├─ HealthKitManager.swift
└─ Assets.xcassets
```

`HealthKitManager.swift` 使用：

```swift
import Foundation
import HealthKit
import Combine
```

其职责：

1. 判断 HealthKit 是否可用。
2. 请求步数读取权限。
3. 使用 `HKStatisticsQuery` 查询今日累计步数。
4. 更新 `@Published var stepCount` 与 `statusMessage`。

`ContentView.swift` 当前通过：

```swift
@StateObject private var healthKitManager = HealthKitManager()
```

展示状态、今日步数和“连接 Apple Health”按钮。

建议已有/应有 commit：

```text
chore: initialize iOS app
feat(ios): add HealthKit step count probe
```

## 6. 已完成：StopWatch BLE 广播探针

### PlatformIO 配置

当前 `firmware/stopwatch/platformio.ini`：

```ini
[env:m5stack-stopwatch]
platform = espressif32 @ 6.12.0
board = esp32s3box
framework = arduino
board_build.partitions = default_16MB.csv
board_upload.flash_size = 16MB
board_upload.maximum_size = 16777216
board_build.arduino.memory_type = qio_opi
monitor_speed = 115200
build_flags =
  -DESP32S3
  -DBOARD_HAS_PSRAM
  -DCORE_DEBUG_LEVEL=5
  -DARDUINO_USB_CDC_ON_BOOT=1
  -DARDUINO_USB_MODE=1
lib_deps =
  M5Unified = https://github.com/m5stack/M5Unified
  M5GFX = https://github.com/m5stack/M5GFX
  M5PM1 = https://github.com/m5stack/M5PM1
  M5IOE1 = https://github.com/m5stack/M5IOE1
```

### 当前 BLE 广播代码

`firmware/stopwatch/src/main.cpp` 当前最小实现：

```cpp
#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

static const char *DEVICE_NAME = "sheRuntime-StopWatch";

static const char *SERVICE_UUID =
    "a7f00001-4d7a-4e6b-9f30-6a8e2a14c001";

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println();
    Serial.println("Starting BLE probe...");

    BLEDevice::init(DEVICE_NAME);
    BLEServer *server = BLEDevice::createServer();
    BLEService *service = server->createService(SERVICE_UUID);
    service->start();

    BLEAdvertising *advertising = BLEDevice::getAdvertising();
    advertising->addServiceUUID(SERVICE_UUID);
    advertising->setScanResponse(true);
    BLEDevice::startAdvertising();

    Serial.println("BLE advertising started.");
    Serial.println("Device name: sheRuntime-StopWatch");
}

void loop() {
    delay(1000);
}
```

### 验证结果

- PlatformIO 编译成功。
- 固件上传成功。
- 串口端口：`/dev/cu.usbmodem101`。
- 串口曾出现独占锁错误，通过关闭旧 Monitor/释放端口解决。
- PlatformIO Monitor 已成功连接，115200 8-N-1。
- iPhone 使用 `nRF Connect for Mobile` 扫描到 `sheRuntime-StopWatch`。

这表示第一阶段 BLE 硬件探针已经完成。

## 7. 下一步：BLE 双向消息探针

下一阶段不要马上加入录音。先从零实现一个稳定的双向 BLE 通信闭环：

```text
StopWatch 发送 VOICE_READY
→ sheRuntime iPhone App 收到并显示
→ iPhone 写回 SUCCESS
→ StopWatch 收到状态
→ 临时先通过串口打印；之后再接震动/表情
```

### 已确定 UUID

```text
Service
A7F00001-4D7A-4E6B-9F30-6A8E2A14C001

StopWatch → iPhone（Notify）
A7F00002-4D7A-4E6B-9F30-6A8E2A14C001

iPhone → StopWatch（Write）
A7F00003-4D7A-4E6B-9F30-6A8E2A14C001
```

### 推荐实施顺序

1. 固件创建 Notify Characteristic 与 Write Characteristic。
2. 固件暂时定时或通过简单逻辑发送 `VOICE_READY`，不依赖实体按键。
3. Xcode 添加蓝牙权限说明。
4. 新建 `BluetoothManager.swift`，使用 CoreBluetooth 扫描 `sheRuntime-StopWatch`。
5. 自动连接并发现上述 Service/Characteristics。
6. 订阅 Notify，收到 `VOICE_READY` 后更新 iPhone UI。
7. iPhone 写回 `SUCCESS`。
8. 固件 Write Callback 收到后串口打印 `SUCCESS`。
9. 完整往返连续成功三次，再接 StopWatch 按键、震动与屏幕。

## 8. 后续探针顺序

严格逐层验证，不要同时加入多个变量：

### Probe 2：BLE 双向文字消息

成功标准：`VOICE_READY → SUCCESS` 连续完成三次。

### Probe 3：麦克风采样到 PSRAM

- StopWatch 没有 SD 卡。
- 使用 8MB PSRAM 临时保存 PCM。
- 建议格式：16kHz、单声道、16-bit PCM。
- 5 秒约 160KB，10 秒约 320KB。
- 第一轮只验证录音字节数和音频有效性。

### Probe 4：BLE 传输固定二进制

先传固定二进制缓冲区，iPhone 统计字节数并校验完整性；不要直接把麦克风、BLE、ASR一起调。

建议最小消息类型：

```text
META：录音 ID、总字节、采样率
DATA：序号 + PCM 分片
END：传输结束
ACK：iPhone 确认完整接收
```

### Probe 5：真实 PCM → iPhone

StopWatch 录制短 PCM，BLE 分片发送；iPhone 重组后补 WAV Header，并验证能够播放或上传。

### Probe 6：豆包 ASR

iPhone 使用自身蜂窝网络把 WAV/PCM 提交给豆包 ASR，获得转写文字。

### Probe 7：核心产品闭环

```text
StopWatch 语音
→ BLE
→ 豆包 ASR
→ HealthKit + 本地 Skill
→ LLM 身体观察
→ iPhone 展示
→ BLE 返回 SUCCESS / RETRY
→ StopWatch 震动 + 表情变化
```

## 9. StopWatch 状态设计

比赛版只需要少量状态：

| 状态 | 屏幕反馈 | 震动 |
|---|---|---|
| IDLE | 平静呼吸 | 无 |
| LISTENING | 认真倾听 | 开始时轻振 |
| SENDING | 流动/等待 | 无 |
| PROCESSING | 思考表情 | 无 |
| SUCCESS | 点头、放松或微笑 | 短振两次 |
| RETRY | 温和困惑 | 短振三次 |

StopWatch 不显示完整 AI 文本，不用 TTS。完整结果留在 iPhone。

## 10. 本地 Skill 与模型调用方向

比赛版计划将 Markdown Skill/知识卡随 iOS App 打包，本地按关键词检索相关卡片，再与 HealthKit 数据、ASR 转写一起构造 Prompt。

最小结构可以是：

```text
apps/ios/sheRuntime/
├─ Health/
│  └─ HealthKitManager.swift
├─ Bluetooth/
│  └─ BluetoothManager.swift
├─ Knowledge/
│  ├─ SkillLoader.swift
│  └─ Resources/fatigue.md
├─ AI/
│  ├─ AIClient.swift
│  └─ PromptBuilder.swift
└─ ContentView.swift
```

普通模型 API 不会自动运行 `SKILL.md`。App 需要自己加载相关 Markdown，将选中的知识内容放入 Prompt。

黑客松可采用 BYOK：在 App 内运行时输入 API Key，并保存到 iOS Keychain；禁止把 Key 硬编码进 Swift、ESP32 固件或 Git。

## 11. 路演策略

- 29 日以自己的 iPhone 真机本地运行和投屏为主。
- 当前是 Personal Team，TestFlight 分发不是主方案。
- 路演正式链路使用 StopWatch BLE + iPhone 蜂窝网络。
- 准备一段完整成功流程录屏。
- ASR/LLM 网络失败时允许使用预置转写和本地基础观察作为明确标注的降级演示。

## 12. 给下一会话的直接任务

请继续指导并实现 **Probe 2：StopWatch 与 sheRuntime iPhone App 的 BLE 双向消息**。用户第一次开发 Apple App，需要逐步说明：点击哪个文件、在哪里新建文件、粘贴什么代码、如何编译、如何真机测试。不要一次引入音频、ASR或屏幕驱动。

验收目标：

```text
StopWatch Notify：VOICE_READY
→ iPhone sheRuntime 显示收到消息
→ iPhone Write：SUCCESS
→ StopWatch 串口打印收到 SUCCESS
```

