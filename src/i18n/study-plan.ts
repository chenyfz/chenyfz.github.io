import {Languages} from './types.ts'

interface Content {
    mcspTitle: string,
    mlhvlTitle: string,
    mvisTitle: string,
    mqlmTitle: string,
    mmmiTitle: string,
    mitiTitle: string,
    mqnmTitle: string,
    mmobTitle: string,
    mdmTitle: string,
    mcmTitle: string,
    thesisTitle: string,
    mcspParagraphs: string[],
    mlhvlParagraphs: string[],
    mvisParagraphs: string[],
    mqlmParagraphs: string[],
    mmmiParagraphs: string[],
    mitiParagraphs: string[],
    mqnmParagraphs: string[],
    mmobParagraphs: string[],
    mdmParagraphs: string[],
    mcmParagraphs: string[],
    thesisParagraph: string[],
    title: string,
    contentTitle: string,
    coursesTitle: string,
    firstYearTitle: string,
    secondYearTitle: string,
}

export const portfolioMsg : Record<Languages, Content> = {
    en: {
        mcspTitle: 'Advanced cognitive and social psychology for HCI',
        mlhvlTitle: 'Machine learning for human vision and language',
        mvisTitle: 'Information Visualization',
        mqlmTitle: 'Advanced HCI qualitative research methods',
        mmmiTitle: 'Multimodal Interaction',
        mitiTitle: 'Interaction technology innovation',
        mqnmTitle: 'Advanced HCI quantitative research methods',
        mmobTitle: 'Mobile Interaction',
        mdmTitle: 'Data Mining',
        mcmTitle: 'Cognitive Modeling',
        thesisTitle: 'Research Project (Graduation Thesis)',
        firstYearTitle: 'First Year',
        secondYearTitle: 'Second Year',
        title: 'Study Plan for Utrecht University\'s HCI program',
        contentTitle: 'Table of Contents',
        coursesTitle: 'Course detail and reflection',
        mcspParagraphs: [
            'This course focused on the fundamentals of social and cognitive psychology and their practical applications within Human-Computer Interaction (HCI). Students engaged in key projects, including designing an interactive class (in a group of five) on “Cognition, Motivation & Emotion” with a focus on Gamification, and collaboratively developing a research proposal on Gamification. The proposal process involved a thorough literature review and detailed outlining of research methods, analysis, and discussion. A final exam contributed to the overall assessment.'
        ],
        mlhvlParagraphs: [
            'This course explored two primary areas: the neuroscience foundations of vision, including its parallels with deep learning networks like CNNs and recurrent visual processing; and the principles of natural language processing using AI networks such as RNNs, Word2Vec, GloVe, LSTM, and encoder-decoder models. Practical application was emphasized through projects requiring students to implement a CNN model in Python from scratch and build an RNN and GloVe model for natural language processing. Learning was assessed through both mid-term and final exams.'
        ],
        mvisParagraphs: [
            'This course offered a comprehensive introduction to information visualization, covering essential topics such as various data and visualization types, principles of perception and color, task-oriented interaction design, evaluation methodologies, and cognitive considerations. It also explored advanced visualization methods through relevant case studies. The main project challenged us to select a data source and design effective visualizations to enhance understanding; our team chose to visualize the sustainability performance of fast fashion brands, creating two standard charts and one innovative chart to help consumers compare brands and make informed decisions.',
            'Project link (website)'
        ],
        mqlmParagraphs: [
            'This course provided a thorough grounding in advanced qualitative research methods for HCI. Key topics included various data collection techniques, robust analysis methods for qualitative data, and effective data visualization strategies within qualitative research. The central project involved conducting a complete qualitative research study on a self-selected topic, requiring the application of at least two distinct research methods. Our group investigated user perceptions of smart home cameras, employing focus groups and creative problem-solving methods to understand attitudes and propose solutions for user concerns.',
            'Paper link (PDF)',
        ],
        mmmiParagraphs: [
            'This course delved into the physiological basis of multimodal interaction, covering vision, motion perception, auditory, and tactile senses, alongside explorations of VR and AR technologies and the interplay between multimodal interaction and emotion. The core project involved conducting an original study. Our research focused on gesture interaction with distant 2D screens in a VR setting. This two-part study first involved designing remote 2D screen interaction tasks where users employed their preferred gestures, with feedback simulated using the Wizard of Oz technique. Subsequently, we extracted two common gestures and conducted a qualitative comparison against Meta\'s default interaction methods, utilizing the think-aloud protocol. The accompanying video showcases the gestures implemented in the second part, particularly the second and third gestures we developed.',
            'Paper link (PDF)',
        ],
        mitiParagraphs: [
            'As a practical, hands-on course, it provided access to laboratory space, electronic components, 3D printers, and other tools for student projects. The central theme for our project was an ”Enchanted Everyday Object.” More details about this project can be found in my Reflective Diary.',
            'Reflective Diary (PDF)'
        ],
        mqnmParagraphs: [
            'This course covered advanced quantitative research methods for HCI, contrasting parametric and non-parametric approaches. It explored techniques such as ANOVA, Factorial ANOVA, Randomized Block Designs, Repeated Measurements, ANCOVA, and MANOVA, as well as simple, multiple, and multivariate regression, and General Linear Models (GLM), alongside essential data processing skills. The main project required us to select a given dataset and formulate a research question involving at least two independent and two dependent variables. Our team analyzed the K-EmoPhone dataset (data from 77 participants over one week via smartphones and smart bands) to investigate whether personality traits influence heart rate variability (HRV) and electrodermal activity (EDA) – common stress indicators – during social media usage.',
            'Paper link (PDF)',
        ],
        mmobParagraphs: ['This course is currently ongoing, and I am actively engaged in its learning modules and project work.'],
        mdmParagraphs: ['Enrollment for this course is planned for a future semester.'],
        mcmParagraphs: ['Enrollment for this course is planned for a future semester.'],
        thesisParagraph: ['The graduation thesis project is actively in progress, involving dedicated research and development efforts towards its completion.']
    },
    zh: {
        mcspTitle: '面向HCI的认知与社会心理学 (Advanced cognitive and social psychology for HCI)',
        mlhvlTitle: '面向人类视觉与语言的机器学习 (Machine learning for human vision and language)',
        mvisTitle: '信息可视化 (Information Visualization)',
        mqlmTitle: '高级HCI定性研究方法 (Advanced HCI qualitative research methods)',
        mmmiTitle: '多模态交互 (Multimodal Interaction)',
        mitiTitle: '交互技术创新 (Interaction technology innovation)',
        mqnmTitle: '高级HCI定量研究方法 (Advanced HCI quantitative research methods)',
        mmobTitle: '移动交互 (Mobile Interaction)',
        mdmTitle: '数据挖掘 (Data Mining)',
        mcmTitle: '认知建模 (Cognitive Modeling)',
        thesisTitle: '研究项目 (毕业论文)',
        firstYearTitle: '第一年',
        secondYearTitle: '第二年',
        title: 'Utrecht University HCI 项目课程计划',
        contentTitle: '目录',
        coursesTitle: '课程详情',
        mcspParagraphs: [
            '本课程聚焦于社会心理学与认知心理学的基础及其在人机交互（HCI）领域的应用。学生通过重要项目进行实践，包括（五人小组）以"认知、动机与情感"为主题（侧重游戏化）设计一节约30分钟的互动课程，以及（二人小组）合作撰写关于游戏化的研究提案。提案过程包括了详尽的文献回顾，并细化了研究方法、分析方案与讨论环节。期末考试是课程整体评估的一部分。'
        ],
        mlhvlParagraphs: [
            '本课程探讨两大核心领域：首先是视觉的神经科学基础及其与深度学习网络（如CNN和递归视觉处理）的关联；其次是利用人工智能网络（如RNN、Word2Vec、GloVe、LSTM及编解码模型）进行自然语言处理的原理。课程通过实践项目强调知识应用，要求学生从零开始用Python实现CNN模型，并构建用于自然语言处理的RNN和GloVe模型。学习成果通过期中与期末考试进行评估。'
        ],
        mvisParagraphs: [
            '本课程全面介绍了信息可视化，涵盖了数据与可视化类型、感知与颜色原理、任务导向的交互设计、评估方法及认知因素等核心议题，并深入探讨了高级可视化方法及相关案例研究。主要项目要求我们自选数据源并设计有效的可视化方案以增进理解。我们小组选择可视化快时尚品牌在各项可持续性指标上的表现，为此创建了两个标准图表和一个创新图表，旨在帮助消费者比较品牌并做出明智决策。',
            '项目链接（网页）'
        ],
        mqlmParagraphs: [
            '本课程为HCI领域的高级定性研究方法提供了坚实基础。核心内容包括多样的定性数据收集技术、严谨的数据分析方法，以及定性研究中有效的数据可视化策略。中心项目是围绕自选主题进行一项完整的定性研究，并应用至少两种不同的研究方法。我们小组研究了用户对智能家居摄像头的看法，采用了焦点小组和创造性问题解决等方法，以理解用户态度并针对其顾虑提出解决方案。',
            '文章链接（PDF）',
        ],
        mmmiParagraphs: [
            '本课程深入探讨多模态交互的生理基础（视觉、运动感知、听觉、触觉），辅以对VR、AR技术的探索，以及多模态交互与情感之间关系的分析。核心项目要求完成一项原创研究。我们的研究聚焦于VR环境中与远距离2D屏幕的手势交互。这项研究分两阶段进行：首先，设计远程2D屏幕交互任务，用户使用自认为合理的方式完成，并通过\\"绿野仙踪\\"法模拟反馈以观察其偏好手势；随后，我们提取了两种常用手势，并运用出声思维法与Meta的默认交互方式进行了定性对比。附带视频展示了研究第二部分所实现的手势，特别是我们开发的第二和第三个手势。',
            '论文链接（PDF）',
        ],
        mitiParagraphs: [
            '作为一门实践性极强的课程，它为学生的项目提供了实验室空间、电子元件、3D打印机及其他工具。我们的项目主题是"魔法日常物品"。关于此项目的更多细节，请参阅我的反思日志。',
            '日志（PDF）',
        ],
        mqnmParagraphs: [
            '本课程涵盖了HCI领域的高级定量研究方法，对比了参数化与非参数化方法，探讨了如方差分析（ANOVA）、因子方差分析、随机区组设计、重复测量、协方差分析（ANCOVA）、多变量方差分析（MANOVA）等技术，以及简单回归、多重回归、多变量回归和广义线性模型（GLM），并培养了必要的数据处理技能。主要项目要求我们选用给定数据集，并设计一个至少包含两个自变量和两个因变量的研究问题。我们小组分析了K-EmoPhone数据集（收集自77名参与者为期一周的智能手机与智能手环数据），旨在探究人格特质在使用社交媒体时是否会影响心率变异性（HRV）和皮肤电活动（EDA）这两个常见的压力指标。',
            '论文链接（PDF）',
        ],
        mmobParagraphs: ['本课程目前正在进行中，我正积极参与其学习模块与项目任务。'],
        mdmParagraphs: ['我计划在未来的学期参加本课程。'],
        mcmParagraphs: ['我计划在未来的学期参加本课程。'],
        thesisParagraph: ['毕业论文项目正在积极推进中，我正投入研究与开发工作以期顺利完成。']
    }
}