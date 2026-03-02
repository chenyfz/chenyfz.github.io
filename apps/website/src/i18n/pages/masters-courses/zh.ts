import type { MastersCoursesPageCopy } from './types';

const mastersCoursesZh: MastersCoursesPageCopy = {
  meta: {
    title: '硕士课程概览 | 陈扬帆',
    description: '乌得勒支大学 HCI 硕士期间修读课程与项目概览。'
  },
  title: '硕士修读课程概览',
  subtitle: 'Utrecht University（HCI 硕士项目）',
  tocTitle: '目录',
  detailsTitle: '课程详情',
  gradePrefix: '',
  gradeSuffix: '分',
  showMediaLabel: '展开完整内容',
  hideMediaLabel: '收起',
  closeViewerLabel: '关闭',
  years: [
    {
      title: '第一年',
      periods: [
        { label: 'Period 1', courseIds: ['mcsp', 'mlhvl'] },
        { label: 'Period 2', courseIds: ['mvis', 'mqlm'] },
        { label: 'Period 3', courseIds: ['miti', 'mmmi'] },
        { label: 'Period 4', courseIds: ['mqnm', 'mmob'] }
      ]
    },
    {
      title: '第二年',
      periods: [
        { label: 'Period 5', courseIds: ['mdm'] },
        { label: 'Period 6', courseIds: ['mcm'] },
        { label: 'Remaining', courseIds: ['thesis'] }
      ]
    }
  ],
  courses: [
    {
      id: 'mcsp',
      title: '面向HCI的认知与社会心理学 (Advanced Cognitive and Social Psychology for HCI)',
      grade: '7.4',
      description:
        `系统讨论认知心理学与社会心理学在人机交互中的解释力，核心问题是如何用心理机制解释技术使用行为，并将解释结果转化为可辩护的设计判断。

- 自我与身份：线上自我呈现、符号互动、社会信息加工。
- 社会关系：不确定性降低、期待违背、社会交换与社会渗透。
- 情绪与动机：基础情绪理论、建构情绪理论、认知评估、耶克斯-多德森规律。
- 社会影响：信息性/规范性影响、服从与从众、说服技术（Captology）。
- 群体与决策：群体迷思、社会认同、认知失调、启发式与偏差。

以文献综合、互动教学设计和研究提案写作为主要实践形式，覆盖从理论框架、研究问题到方法路径的完整论证流程。`
    },
    {
      id: 'mlhvl',
      title: '面向人类视觉与语言的机器学习 (Machine Learning for Human Vision and Language)',
      grade: '8.3',
      description:
        `以深度学习为主线，系统覆盖视觉建模与自然语言建模，并强调计算模型与认知科学/神经科学问题之间的对应关系。

- 深度学习基础：神经网络训练流程、表征学习、损失函数、优化与泛化问题。
- 视觉方向：
  - 核心机制：filter/convolution、ReLU、pooling、normalization。
  - 表征与认知：多层表征从低层特征到高层语义；覆盖前馈与循环视觉处理、预测编码（predictive coding），并比较人工网络与生物视觉系统在处理机制上的对应与差异。
- NLP方向：
  - 词向量与语义：count-based、predict-based、GloVe、Skip-gram/negative sampling，相似度度量与语义评估（similarity vs relatedness）。
  - 序列建模：RNN、LSTM、GRU，序列标注（如POS tagging）与编码器-解码器（seq2seq）任务。
- 跨学科关联：结合词向量与脑成像建模相关文献，讨论不同语义表示在解释语言认知过程中的能力与局限。

课程包含视觉与语言两类小组实验：视觉实践聚焦图像识别模型构建、训练曲线分析与泛化评估；语言实践聚焦词向量方法实现与RNN序列任务建模，并以书面报告形式对模型行为与结果进行解释。`
    },
    {
      id: 'mvis',
      title: '信息可视化 (Information Visualization)',
      grade: '9.0',
      description:
        `信息可视化强调“用视觉表示帮助人更有效完成任务”，重点在人机协作分析中提升判断效率，而非图表装饰。

- 认知主线：外部表示替代部分内部认知计算（replace cognition with perception），利用视觉系统高带宽、并行与预注意加工优势降低检索与比较负担。
- 信息保真：结合 Anscombe's Quartet 说明仅依赖统计摘要会丢失结构信息，分析中需保留分布细节与异常模式。
- 分析框架：采用 Munzner Nested Model（Domain、Abstraction、Idiom、Algorithm）组织从任务场景到编码与算法实现的完整决策链。
- 约束与准则：同时处理计算、显示（像素密度与留白）和人类（时间、记忆、注意力）约束，并以通道有效性、预注意特征、格式塔原则评估设计质量。
- 实现路径：以 D3.js 为核心完成 DOM/SVG/CSS 协作、enter/update/exit 数据绑定、比例尺/坐标轴、交互过渡与多视图联动；包含 GeoJSON/TopoJSON、投影、分级设色、平移缩放等地理可视化流程。

课程实践由渐进式编程作业与期末交互可视化项目构成，强调理论依据与实现选择的一致性。`,
      links: [{ label: '项目链接（网页）', href: 'https://superfashion.walzen.org/', external: true }]
    },
    {
      id: 'mqlm',
      title: '高级HCI定性研究方法 (Advanced HCI Qualitative Research Methods)',
      grade: '7.8',
      description:
        `聚焦HCI中的高级定性研究，核心是理解技术使用背后的情境经验、意义建构与社会文化机制，而非仅以量化指标评估可用性。

- 研究立场：解释主义与实证主义在研究问题、证据与结论表达上的差异。
- 数据采集：半结构化访谈、叙事访谈、焦点小组、情境探查、民族志观察、日记研究、文化探针。
- 数据分析：编码与主题分析、概念提炼与证据组织。
- 研究严谨性：可信度与一致性控制、研究者反思、偏差管理。
- 研究伦理：知情同意、隐私边界、高敏场景下的数据处理责任。

以小组研究形式完成从研究设计、数据采集、分析到论文写作的完整质性研究闭环。`,
      links: [{ label: '文章链接（PDF）', href: '/Group_30_Final_Paper.pdf' }]
    },
    {
      id: 'miti',
      title: '交互技术创新 (Interaction Technology Innovation)',
      grade: '8.3',
      description:
        `该课程是一个高强度的交互创新工作室，围绕“研究—综合—原型—评估”闭环推进，要求把需求洞察转化为可运行的实体/数字交互系统，而不是停留在概念草图。

- 研究与洞察：设计研究计划、概念图构建、洞察综合方法（如AC4D insight patterns）。
- 方案转译：用户情境、故事板、线框、用户旅程的系统化表达，并将“连接感”拆解为环境感知、信号传递与轻量沟通。
- 原型迭代：低保真到高保真原型的渐进开发，期间根据导师与用户反馈持续收敛交互方案。
- 技术集成：传感器、微控制器（Arduino）嵌入式开发、3D建模与3D打印、数字制造与有形交互装置，完成可旋转机构、风道与外壳装配等机电一体化实现。
- 评估与伦理：交互评估策略、传感模态选择、隐私与设计伦理。`,
      practice:
        `实践的命题是：Enchanted Everyday Objects。围绕这一命题，我们提出的主题是“异地关系中的持续在场感”，并据此设计一个能够低负担传递连接线索的实体交互物件。我们前期通过文献阅读、概念图和课堂讨论建立问题范围，并把需求从泛化社交收敛到一对一关系场景。

在方案探索阶段，比较了“灯具方案”和“雪景球方案”两条路径。过程中逐步发现，连接体验需要同时满足三类条件：信息线索要持续可见、交互动作要低负担、反馈形式要具有情绪表达能力。基于这一组条件，最终确定雪景球形态及其交互结构。

最终原型包含四项核心交互：
- 环境感知：顶部灯带映射对方环境光线；
- 语音留言：按键录音发送，旋转顶部触发播放并联动机械结构；
- 天气提示：独立指示灯反馈对方所在地天气；
- 魔法信号：摇动触发对端雪暴效果。

实现过程覆盖 Fusion 360 结构建模、3D打印、风道与旋转机构设计、嵌入式控制与电路集成、整机装配与调试。结构实现上重点处理了旋转触发机构、雪暴风道和内部排布之间的配合关系，使交互动作、机械反馈与电子控制保持一致。最终交付为可运行高保真原型和完整项目文档。`,
      links: [{ label: '项目反思日志（PDF）', href: '/Reflective_Diary_Yangfan.pdf' }],
      media: [
        {
          type: 'image',
          src: '/snow-ball/snow-globe-final-product.jpg',
          alt: '雪景球最终原型',
          caption: '最终原型：扭动顶部可触发落雪与旋转。'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-mechanism-bottom-view.jpg',
          alt: '雪景球底部机械结构',
          caption: '底部机械结构：棘轮反馈与复位旋转机构。'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-cad-model.png',
          alt: '雪景球CAD剖面设计',
          caption: 'Fusion 360 结构设计：外壳与内部空间布局。'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-core-assembly.jpg',
          alt: '雪景球核心组装件',
          caption: '核心组装：电机、齿轮、风扇与电路集成。'
        },
        {
          type: 'image',
          src: '/snow-ball/snow-globe-top-component.jpg',
          alt: '雪景球顶部功能组件',
          caption: '顶部组件：扩散光、环境感知与雪暴风道。'
        }
      ]
    },
    {
      id: 'mmmi',
      title: '多模态交互 (Multimodal Interaction)',
      grade: '8.0',
      description:
        `先建立“多感知通道协同”的理论基础，再进入VR/AR/MR中的三维交互设计，核心是解释与优化沉浸式交互中的感知一致性与操作可控性。

- 感知通道：视觉、听觉、前庭觉、本体感觉与触觉在任务执行中的作用分工。
- 跨通道整合：通道协同与冲突如何影响方向感、控制感、负荷与晕动反应。
- 三维交互链路：围绕“选择—操作—导航”组织3D用户界面设计。
- 交互范式比较：抓取式、指向式、间接式与混合式方法（Virtual Hand、Go-Go、Ray Casting、WIM、HOMER等）。
- 硬件权衡：头显追踪、手柄与手势输入在精度、疲劳、学习成本与可达性上的差异。`,
      practice:
        `我们从课程中的一个具体观察出发：在远距2D界面任务里，默认 Ray-casting 虽然可用，但在精度、反馈连续性和操作负担上并不稳定，不同用户对“自然手势”的直觉也并不一致。由此，实践流程先做问题探索与手势诱导，再进入实现与对比评估，而不是先固定一种手势方案。

研究对象为无VR手势经验用户，任务覆盖点击、滑动、缩放、滚动与屏幕位移。第一阶段采用 Wizard of Oz，由研究者后台控制系统反馈，采集首选与备选手势及其理由；这个阶段的重点是观察“用户先做什么动作、为什么这样做、何时会改动作”。第二阶段在 Unity 中实现点击与捏合手势，并与默认 Ray-casting 进行 think-aloud 对比，比较其在不同任务中的负担、可控性与反馈感知。论文中记录了 8 人诱导研究与 4 人评估研究的数据分析过程。

结果显示，手势选择主要受对象大小、反馈质量与既有交互经验影响；指向与捏合虽是高频方案，但同一任务通常需要保留从小幅到大幅的动作选择。评估阶段最突出的问题是疲劳、直觉性与反馈不确定性，反馈不足会直接引发重复点击和误判。实现层面采用眼睛中点与手部投影进行远距定位，并加入手腕补偿与判定逻辑以降低双像歧义和定位漂移。最终交付包括可运行原型、实验视频与完整研究论文，论文中明确给出了后续迭代方向：将同一任务的手势映射做成可调节动作谱，而非单一固定动作。`,
      links: [{ label: '研究论文（PDF）', href: '/INFOMMMI_Super_VR_Power_paper.pdf' }],
      media: [
        {
          type: 'video',
          src: '/infommmi-demo-part-1.mp4',
          alt: 'Wizard of Oz 手势诱导视频',
          caption: '视频1：Wizard of Oz 诱导研究，记录参与者在远距2D任务中的自然手势。'
        },
        {
          type: 'video',
          src: '/infommmi-demo.mp4',
          alt: '手势对比评估视频',
          caption: '视频2：对比默认 Ray-casting 与两种实现手势（捏合/点击）在任务中的表现。'
        }
      ]
    },
    {
      id: 'mqnm',
      title: '高级HCI定量研究方法 (Advanced HCI Quantitative Research Methods)',
      grade: '9.4',
      description:
        `聚焦HCI实验中的统计推断逻辑，核心是建立“研究问题—实验设计—统计模型—结果解释”的一致性，而非仅停留在工具化分析。

- 方差分析体系：单因素/多因素ANOVA、重复测量ANOVA。
- 回归与相关：线性关系建模、预测与解释。
- 高级模型：ANCOVA、MANOVA及其在GLM框架中的统一关系。
- 推断逻辑：统计功效、零假设检验、I/II类错误、效应量与置信区间。
- 稳健性处理：离群值判断、正态性与方差齐性检验、非参数替代。

通过统计作业与实践任务完成多自变量/多因变量情境下的建模、检验与结果解释。`,
      links: [{ label: '论文链接（PDF）', href: '/infomqnm-report.pdf' }]
    },
    {
      id: 'mmob',
      title: '移动交互 (Mobile Interaction)',
      grade: '7.9',
      description:
        `系统讨论移动计算中的交互设计边界，分析设备能力、感知反馈与使用情境三者如何共同决定移动体验。

- 平台约束：CPU/GPU、内存、能耗与网络条件对交互方案的影响。
- 显示与感知：分辨率、DPI、Retina判据与主客观画质评价。
- 交互范式：复杂触控、多点触控、姿态与倾斜输入、移动端3D/VR、移动AR。
- 人因与场景：握持负担、注意分散、情境干扰与反馈设计。

结合论文与案例分析评估不同移动交互方案在可实现性、可用性与情境适配性上的权衡。`
    },
    {
      id: 'mdm',
      title: '数据挖掘 (Data Mining)',
      grade: '8.5',
      description:
        `数据挖掘课程聚焦从大规模数据中提取可解释模式与预测模型，强调从问题定义、方法选择到模型验证的链路。

- 推理边界：演绎与归纳、实验数据与观察数据、相关与因果。
- 树模型与集成：基于重代入误差、Gini指数、信息熵的分类树构建，及Bagging、随机森林。
- 概率图模型：马尔可夫随机场与贝叶斯网络用于依赖结构表达与不确定性推断。
- 模式发现：支持度/置信度驱动的关联规则挖掘。
- 文本挖掘：非结构化文本表示、分类与误差分析。

以Python/R实现与验证为主线，涵盖树模型、随机森林和文本分类任务。`,
      links: [
        { label: '作业1（ZIP）', href: '/DM-A1-Yangfan-Yilun-Reem.zip' },
        { label: '作业2（PDF）', href: '/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf' }
      ]
    },
    {
      id: 'mcm',
      title: '认知建模 (Cognitive Modeling)',
      grade: '8.3',
      description:
        `讨论如何将认知理论形式化为可计算模型，用模型解释与预测行为，并比较不同建模范式在解释力与适用场景上的差异。

- 符号/处理模型：面向注意、记忆、学习与任务时序的过程建模。
- 联结主义模型：基于神经网络的表示学习与行为/脑活动对应分析。
- 概率与贝叶斯模型：不确定性推断、语言理解、沟通与语用建模。
- 范式比较：可解释性、拟合能力、计算成本与适用边界。

通过R/Python模型实现、文献精读与模型复现进行系统性比较分析。`
    },
    {
      id: 'thesis',
      title: '研究项目 (毕业论文)',
      grade: '8.7',
      description:
        `研究主题为通用图形用户界面中的眼动交互精度与校准漂移问题，目标是在不改造既有应用界面的前提下实现可行且具通用化潜力的平滑追视交互。

- 方法机制：提出ZoomPursuit，复用操作系统级放大功能触发可追踪运动。
- 系统实现：完成交互机制设计与轨迹匹配算法原型。
- 实证评估：两轮迭代研究比较自动修正、手动微调及组合策略在漂移条件下的表现。
- 最终模型：形成“自动校正 + 手动微调”的两阶段方案。

在未初始校准条件下实现动态校准并达到约0.10°最终指向误差，验证了平滑追视技术向通用桌面GUI迁移的可行路径。`,
      links: [{ label: '查看项目页面', href: '/graduation-thesis', localized: true }]
    }
  ]
};

export default mastersCoursesZh;
