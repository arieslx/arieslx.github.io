---
title: StopWatch 身体观察本地知识库：第一批论文索引
date: 2026-08-26 23:08:00
tags:
  - 2026
  - hackathon
---

# StopWatch 身体观察本地知识库：第一批论文索引

## 1. 这份文件怎么用

这不是诊断指南，也不是把论文全文塞进模型的语料包。它是供产品、设计和开发共同使用的“证据索引”：

- StopWatch 主动记录的是主观事件，例如“困、饿、渴、压力、疼痛、经期变化”。
- Apple Health 提供步数、睡眠、心率等客观背景，但不能单独推断原因。
- 检索命中后，知识卡只能给出低风险观察建议，不直接诊断疾病。
- 优先保存论文元数据、摘要级总结、关键词、可用措辞和禁用措辞；全文仅在开放获取或团队有合法访问权时下载。
- 本文件中的“优先级”只是产品内部的收录优先级，不等同于正式 GRADE 证据评级。

### 产品内部优先级

| 标记 | 含义 | 推荐用途 |
| --- | --- | --- |
| P1 | 系统综述、荟萃分析或较完整的证据综述 | 可作为核心知识卡依据 |
| P2 | 叙述性综述、观察性研究或单项随机试验 | 用于补充语境，措辞需更谨慎 |
| P3 | 小样本或单次实验 | 仅用于提出观察问题，不形成一般结论 |

## 2. 快速关键词索引

| 主观记录标签 | 中文关键词 | 英文检索词 | 推荐来源 |
| --- | --- | --- | --- |
| 困、睡不够 | 睡眠限制、能量摄入、食欲 | sleep restriction, energy intake, appetite | SLEEP-001 |
| 晚上难睡 | 咖啡因、入睡潜伏期、睡眠效率 | caffeine, sleep latency, sleep efficiency | SLEEP-002 |
| 压力想吃 | 情绪性进食、负性情绪、高适口性食物 | emotional eating, negative affect, palatable food | EAT-001, EAT-002 |
| 渴、头痛、注意力差 | 水合状态、脱水、情绪、认知 | hydration, dehydration, mood, cognition | HYD-001, HYD-002 |
| 黄体期更饿 | 月经周期、黄体期、卵泡期、能量摄入 | menstrual cycle, luteal phase, follicular phase, energy intake | CYCLE-001, CYCLE-002 |
| 经量大又疲劳 | 月经过多、缺铁、缺铁性贫血 | heavy menstrual bleeding, iron deficiency, anemia | CYCLE-003 |
| 痛经 | 原发性痛经、运动、热敷、自我照护 | primary dysmenorrhea, exercise, heat, self-care | PAIN-001 |
| 久坐颈肩痛 | 办公人群、力量训练、微运动 | office workers, neck pain, strengthening, micro-exercise | MSK-001, MSK-002 |

## 3. 核心论文卡

### SLEEP-001｜睡眠时长与能量平衡

- 论文：St-Onge MP. *The role of sleep duration in the regulation of energy balance: effects on energy intakes and expenditure.* 2013.
- 类型 / 优先级：综述 / P1
- PMID：[23319909](https://pubmed.ncbi.nlm.nih.gov/23319909/)
- 关键词：`睡眠限制` `睡眠不足` `食欲` `能量摄入` `能量消耗` `瘦素` `胃饥饿素`
- 摘要级结论：多数受控研究支持睡眠限制可能增加能量摄入；对能量消耗和单一激素机制的结果并不一致。
- 可触发场景：连续记录“困”并同时出现“更饿、零食增加、晚间进食”。
- 推荐措辞：`最近睡眠不足可能和食欲或进食变化同时出现，可以先观察几天。`
- 不要说：`你饿是因为瘦素下降/胃饥饿素上升。` `睡少一定会发胖。`
- 可执行记录：睡眠时长、困倦时间、饥饿强度、进食时间；只显示并列趋势，不做因果判定。

### SLEEP-002｜咖啡因对后续睡眠的影响

- 论文：Gardiner C, et al. *The effect of caffeine on subsequent sleep: A systematic review and meta-analysis.* Sleep Medicine Reviews. 2023;69:101764.
- 类型 / 优先级：系统综述与荟萃分析 / P1
- PMID：[36870101](https://pubmed.ncbi.nlm.nih.gov/36870101/)；DOI：`10.1016/j.smrv.2023.101764`
- 关键词：`咖啡因` `总睡眠时间` `睡眠效率` `入睡潜伏期` `饮用时间` `剂量`
- 摘要级结论：咖啡因总体上与总睡眠时间和睡眠效率下降、入睡时间延长有关；剂量、饮用时间和个体差异重要。
- 可触发场景：晚间难入睡，且当天较晚记录咖啡、茶或能量饮料。
- 推荐措辞：`较晚摄入咖啡因可能影响后续睡眠；可以比较不同截止时间下的个人反应。`
- 不要说：`睡前固定 X 小时必须停咖啡。` 不把荟萃分析平均值当作每个人的硬阈值。
- 可执行记录：饮品类别、估计剂量、饮用时间、上床时间、入睡主观感受。

### EAT-001｜情绪性进食、睡眠与体重关系

- 论文：Konttinen H. *Emotional eating and obesity in adults: the role of depression, sleep and genes.* Proceedings of the Nutrition Society. 2020;79(3):283–289.
- 类型 / 优先级：综述 / P1
- PMID：[32213213](https://pubmed.ncbi.nlm.nih.gov/32213213/)；DOI：`10.1017/S0029665120000166`
- 关键词：`情绪性进食` `负性情绪` `压力` `睡眠` `高能量密度食物` `个体差异`
- 摘要级结论：负性情绪下，有些人吃得更多、有些人更少；情绪性进食常涉及高适口性、高能量密度食物，但机制和长期结果存在个体差异。
- 可触发场景：用户同时记录压力/低落与强烈零食欲望。
- 推荐措辞：`压力和进食反应因人而异；这次可以先区分身体饥饿与情绪驱动的想吃。`
- 不要说：`压力必然导致暴食。` `情绪性进食等于肥胖。`
- 可执行记录：情绪强度、饥饿强度、食物偏好、是否已有正餐、事件后感受。

### EAT-002｜压力和食物选择的实验研究

- 论文：Oliver G, Wardle J, Gibson EL. *Stress and food choice: a laboratory study.* Psychosomatic Medicine. 2000.
- 类型 / 优先级：实验室研究 / P3
- PMID：[11139006](https://pubmed.ncbi.nlm.nih.gov/11139006/)
- 关键词：`压力` `食物选择` `甜食` `高脂食物` `情绪性进食者` `差异化反应`
- 摘要级结论：压力并未让所有参与者总体都吃得更多；自报情绪性进食者在压力条件下更偏向甜、高脂食物。
- 可触发场景：用来支持“先问而非先判断”的交互。
- 推荐措辞：`你现在更像是肚子饿，还是想用某种味道缓冲压力？`
- 不要说：把一次小型实验泛化为女性或所有人群的稳定规律。

### HYD-001｜水合状态、认知和情绪

- 论文：Masento NA, et al. *Effects of hydration status on cognitive performance and mood.* British Journal of Nutrition. 2014.
- 类型 / 优先级：综述 / P1
- PMID：[24480458](https://pubmed.ncbi.nlm.nih.gov/24480458/)
- 关键词：`水合状态` `轻度脱水` `认知` `注意力` `情绪` `疲劳`
- 摘要级结论：水合状态可能影响部分认知和情绪指标，但研究方法和结果差异较大，不能由单个症状反推脱水。
- 可触发场景：记录“渴”以及头痛、疲劳或注意力下降时，提示补充背景信息。
- 推荐措辞：`口渴可能提示需要补水；先少量饮水并继续观察感受。`
- 不要说：`你的头痛/注意力差就是脱水造成的。`

### HYD-002｜增加日常饮水量的随机试验证据

- 论文：Hakam N, et al. *Outcomes in Randomized Clinical Trials Testing Changes in Daily Water Intake: A Systematic Review.* 2024.
- 类型 / 优先级：随机试验系统综述 / P1
- PMID：[39585691](https://pubmed.ncbi.nlm.nih.gov/39585691/)
- 关键词：`饮水量` `随机临床试验` `补水` `偏头痛` `代谢` `证据有限`
- 摘要级结论：纳入的随机试验数量有限，某些结局显示潜在益处，但不足以支持“多喝水可普遍改善所有症状”。
- 可触发场景：设计补水卡时用于控制承诺强度。
- 推荐措辞：`如果你现在口渴，可以按自己的需求补水；不必追求统一杯数。`
- 不要说：`每天必须八杯。` `多喝水可以治疗头痛或代谢问题。`
- 安全边界：不为心、肾等需要限制液体的人提供统一饮水目标。

### CYCLE-001｜月经周期中的能量摄入

- 论文：Rogan MM, Black KE. *Dietary energy intake across the menstrual cycle: a narrative review.* Nutrition Reviews. 2023.
- 类型 / 优先级：叙述性综述 / P2
- PMID：[36367830](https://pubmed.ncbi.nlm.nih.gov/36367830/)
- 关键词：`月经周期` `黄体期` `卵泡期` `排卵` `能量摄入` `食欲`
- 摘要级结论：总体趋势提示卵泡期能量摄入可能低于黄体期，但不同个体、不同周期及研究之间差异明显。
- 可触发场景：多周期重复出现“经前更饿”时显示个人趋势。
- 推荐措辞：`一些研究观察到黄体期摄入可能较高；更重要的是看你自己的多周期记录。`
- 不要说：`所有女性黄体期都会更饿。` `一次记录即可确认周期规律。`

### CYCLE-002｜周期阶段与能量摄入的荟萃分析

- 论文：Tucker WJ, et al. *The Effect of the Menstrual Cycle on Energy Intake: A Systematic Review and Meta-analysis.* 2024.
- 类型 / 优先级：系统综述与荟萃分析 / P1
- PMID：[39008822](https://pubmed.ncbi.nlm.nih.gov/39008822/)
- 关键词：`黄体期` `卵泡期` `能量摄入` `系统综述` `个体内比较`
- 摘要级结论：汇总证据支持黄体期摄入平均高于卵泡期，但平均差异不能直接预测单个用户。
- 可触发场景：至少两个以上周期、相似时段反复出现食欲变化后，生成“可能的个人周期模式”。
- 推荐措辞：`你的记录似乎在相近周期阶段重复出现；这是观察线索，不是诊断。`
- 不要说：用预测值覆盖用户当下感受，或把周期阶段当成唯一原因。

### CYCLE-003｜月经过多、缺铁与缺铁性贫血

- 论文：Munro MG, et al. *The relationship between heavy menstrual bleeding, iron deficiency, and iron deficiency anemia.* 2023.
- 类型 / 优先级：临床综述 / P1
- PMID：[36706856](https://pubmed.ncbi.nlm.nih.gov/36706856/)
- 关键词：`月经过多` `缺铁` `缺铁性贫血` `疲劳` `生活质量` `检查`
- 摘要级结论：月经过多是缺铁和缺铁性贫血的重要风险背景，两者都可能影响生活质量。
- 可触发场景：反复记录经量明显增多，同时伴疲劳、头晕、心悸或活动耐受下降。
- 推荐措辞：`如果经量持续明显增多又伴疲劳或头晕，建议尽快咨询专业人员并考虑规范检查。`
- 不要说：`你已经贫血。` `直接补铁即可。`
- 安全边界：不推荐自行确定铁剂剂量；急性大量出血、晕厥或明显虚弱应及时就医。

### PAIN-001｜原发性痛经的自我照护与生活方式干预

- 论文：Armour M, et al. *The effectiveness of self-care and lifestyle interventions in primary dysmenorrhea: a systematic review and meta-analysis.* BMC Complementary and Alternative Medicine. 2019.
- 类型 / 优先级：系统综述与荟萃分析 / P1
- PMID：[30654775](https://pubmed.ncbi.nlm.nih.gov/30654775/)
- 关键词：`原发性痛经` `运动` `热敷` `穴位按压` `自我照护` `疼痛`
- 摘要级结论：运动、热疗等干预在部分研究中显示缓解原发性痛经的潜力，但研究质量和干预方式不一。
- 可触发场景：用户已知是经期常见轻中度不适、没有危险信号时。
- 推荐措辞：`如果这是你熟悉的轻中度经期不适，可以尝试温热或轻柔活动，并观察是否舒服。`
- 不要说：`热敷/运动一定有效。` `所有盆腔疼痛都是痛经。`
- 安全边界：新发剧痛、快速加重、发热、晕厥、疑似妊娠或异常大量出血不进入普通自护卡。

### MSK-001｜办公人群慢性颈痛与运动

- 论文：Jones C, et al. *The influence of exercise on pain, disability and quality of life in office workers with chronic neck pain: A systematic review and meta-analysis.* Applied Ergonomics. 2024;117:104216.
- 类型 / 优先级：系统综述与荟萃分析 / P1
- PMID：[38219373](https://pubmed.ncbi.nlm.nih.gov/38219373/)；DOI：`10.1016/j.apergo.2023.104216`
- 关键词：`慢性颈痛` `办公人群` `力量训练` `疼痛` `功能障碍` `证据确定性低`
- 摘要级结论：力量相关运动可能减轻办公人群慢性颈痛和功能障碍，但纳入研究偏倚风险高，证据确定性有限。
- 可触发场景：久坐后熟悉的轻度颈肩紧张。
- 推荐措辞：`短暂活动或循序渐进的力量练习可能帮助一部分久坐人群；以不加重症状为前提。`
- 不要说：`做某个动作就能治好颈椎病。`

### MSK-002｜久坐工作者的微运动

- 论文：Yaghoubitajani Z, et al. *Effectiveness of micro-exercises for managing neck/shoulder pain in sedentary workers: a systematic review and meta-analysis.* Scientific Reports. 2026.
- 类型 / 优先级：系统综述与荟萃分析 / P1
- PMID：[42297926](https://pubmed.ncbi.nlm.nih.gov/42297926/)；DOI：`10.1038/s41598-026-56061-z`
- 关键词：`微运动` `久坐` `颈肩痛` `工作间歇` `依从性` `异质性`
- 摘要级结论：微运动对久坐工作者的颈肩症状可能有帮助，但证据从中等到极低不等，研究间差异较大。
- 可触发场景：StopWatch 识别到长时间静止并且用户主动记录熟悉的轻度颈肩不适。
- 推荐措辞：`要不要做一次很短、幅度舒适的活动，再记录前后感受？`
- 不要说：把久坐自动判断为疼痛原因；没有主观不适时不要频繁打扰。

## 4. 第一批知识卡建议

| 卡片 ID | 触发条件 | 最小展示内容 | 需要的数据 | 禁止自动触发的情况 |
| --- | --- | --- | --- | --- |
| CARD-SLEEP-APPETITE | “困”与“饿/想吃”在近几天共同出现 | 睡眠与食欲可能同现，建议继续观察 | 主观记录 + 睡眠时段 | 单次事件即下结论 |
| CARD-CAFFEINE | 晚间难睡 + 较晚咖啡因记录 | 比较个人咖啡因截止时间 | 饮用时间 + 上床时间 | 不知道饮品/剂量却给硬阈值 |
| CARD-EMOTIONAL-EATING | 压力与强烈想吃同时记录 | 区分身体饥饿与情绪需求 | 压力、饥饿、食物偏好 | 使用羞耻或体重评价语言 |
| CARD-HYDRATION | 用户主动记录口渴 | 少量补水并观察 | 口渴、环境、活动背景 | 心肾限液用户给统一目标 |
| CARD-CYCLE-APPETITE | 至少两个周期出现相近食欲模式 | 展示个人重复模式 | 周期日期 + 食欲事件 | 只凭一次事件预测 |
| CARD-HEAVY-BLEEDING | 经量明显增加 + 疲劳/头晕等 | 提醒规范评估 | 主观症状与持续时间 | 推荐自定铁剂剂量 |
| CARD-DYSMENORRHEA | 熟悉的轻中度经期疼痛 | 温热/轻柔活动选项 | 疼痛强度、是否熟悉 | 新发剧痛或危险信号 |
| CARD-NECK-BREAK | 久坐 + 用户主动记录轻度颈肩紧张 | 一次舒适幅度的微活动 | 静止时长 + 主观不适 | 自动诊断颈椎问题 |

## 5. 结构化字段建议

```yaml
source_id: SLEEP-002
title_zh: 咖啡因对后续睡眠的影响
evidence_type: systematic_review_meta_analysis
internal_priority: P1
population: adults
keywords_zh: [咖啡因, 睡眠效率, 入睡潜伏期]
keywords_en: [caffeine, sleep efficiency, sleep latency]
trigger_tags: [难入睡, 咖啡, 茶, 能量饮料]
safe_claim: 较晚摄入咖啡因可能影响后续睡眠，个体反应不同。
avoid_claims:
  - 所有人必须在固定时间停止咖啡因
  - 单次难睡一定由咖啡因造成
action_type: self_observation
red_flags: []
pmid: "36870101"
doi: "10.1016/j.smrv.2023.101764"
retrieved_from: PubMed
last_reviewed: 2026-08-25
```

建议把每篇论文拆成独立 YAML/Markdown 条目，模型检索时返回 `source_id + safe_claim + avoid_claims + action_type`，而不是直接返回整段摘要。

## 6. 安全与文案规则

1. 说“可能同时出现、值得观察”，不说“就是因为”。
2. 说“你的多次记录中出现了模式”，不说“女性都会如此”。
3. Apple Health 与 StopWatch 数据都保留来源、时间和置信状态；不同来源不互相覆盖。
4. 默认不提供药物、补充剂剂量，不替代临床检查。
5. 胸痛、呼吸困难、晕厥、突发神经症状、快速加重的剧痛、异常大量出血伴明显虚弱等情况，不进入普通知识卡，应提示及时寻求专业帮助。
6. 没有危险信号也不代表安全；产品只能提供信息与记录支持。

## 7. 全文下载策略

- 第一阶段只下载开放获取全文；其他论文保存 PubMed、DOI 和摘要级人工总结。
- 首选来源：PubMed Central、期刊官网开放获取页面、作者机构仓储。
- 文件命名：`{source_id}_{year}_{first-author}_{short-title}.pdf`。
- 每个 PDF 旁放一个同名 `.md`，记录许可证、下载地址、校验日期和是否允许模型索引全文。
- 不从非授权镜像批量下载，不把只能个人阅读的全文重新分发给团队或产品。
- 每季度复查一次核心卡；若新综述与旧结论冲突，保留版本并降低自动触发强度。

## 8. 下一批待补证据

- Apple Health 主观/客观数据融合与时间序列可视化。
- 经前症状量表与日记的验证研究。
- 女性人群的睡眠、压力与食欲纵向研究。
- 可穿戴设备久坐提醒的有效性和提醒疲劳。
- 贴纸打印与数字记录联动对依从性的影响。
- 语音主动记录的隐私、误识别与低负担交互研究。

> 维护提示：每次新增论文，都必须同时补齐“可用措辞”和“禁用措辞”。只有关键词而没有表达边界的资料，不进入面向用户的知识卡。
