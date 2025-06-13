<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeAvatarBar from "../components/avatar/home-avatar-bar.vue";
import ChatBubble from "../components/ui/chat-bubble.vue";
import ShortCv from "../components/cv/short-cv.vue";
import {ref} from "vue";
import TransformTransition from "../transitions/transform-transition.vue";
const { t } = useI18n()
const masterTabs = ['graduationProject', 'VR/AR/MR', 'researchMethods', 'prototyping']
const currentMasterTab = ref(masterTabs[0])
</script>

<template>
  <div class="home-page">
    <home-avatar-bar></home-avatar-bar>

    <div class="cv">
      <chat-bubble>{{ t('cv.title') }}</chat-bubble>
      <div class="cv-container">
        <short-cv></short-cv>
        <div class="full-cv-link">
          <router-link class="link" to="/cv"> > {{ t('cv.viewFullCv') }}</router-link>
        </div>
      </div>
    </div>

    <div class="master">
      <chat-bubble>{{ t('master.title') }}</chat-bubble>
      <div class="master-content-container">
        <div class="master-tabs">
          <div
              class="tab"
              v-for="tab in masterTabs"
              :key="tab"
              :class="{ active: currentMasterTab === tab }"
              @click="currentMasterTab = tab"
          >
            {{ t(`master.tabs.${tab}`) }}
          </div>
        </div>
        <div class="master-content">
          <transform-transition direction="up" :duration-second="0.3">
            <div :key="currentMasterTab" v-if="currentMasterTab === 'graduationProject'">
              <h4 class="sub-title">{{ t('master.content.whatIsIt') }}</h4>
              <p>{{ t('master.content.graduationProjectSummary') }}</p>
              <h4 class="sub-title">{{ t('master.content.whatLearnedTitle') }}</h4>
              <p>{{ t('master.content.whatLearnedContent') }}</p>
              <router-link class="link" to="/graduation-thesis">{{ t('master.content.viewDetails') }}</router-link>
            </div>
            <div :key="currentMasterTab" v-if="currentMasterTab === 'VR/AR/MR'">
              <p>
                {{ t('master.content.vrIntro') }}
                (<router-link class="link" to="/study-plan#mmmi-title">{{ t('master.content.vrMultiLink') }}</router-link>,
                <router-link class="link" to="/study-plan#mmob-title">{{ t('master.content.vrMobileLink') }}</router-link>)
              </p>
              <p>
                {{ t('master.content.vrHololens') }}
                <a class="link" href="https://www.projects.science.uu.nl/ics-datar/" target="_blank">DatAR project ↗</a>
              </p>
              <p>{{ t('master.content.vrPassion') }}</p>
            </div>
            <div :key="currentMasterTab" v-if="currentMasterTab === 'researchMethods'">
              <h4 class="sub-title">{{ t('master.content.rmQuantTitle') }}</h4>
              <p>
                {{ t('master.content.rmQuantDesc') }}
                <router-link class="link" to="/study-plan#mqnm-title">{{ t('master.content.rmQuantLink') }}</router-link>
                &nbsp;|&nbsp;
                <a class="link" href="/infomqnm-report.pdf" target="_blank">{{ t('master.content.rmQuantPdf') }}</a>
              </p>
              <h4 class="sub-title">{{ t('master.content.rmQualTitle') }}</h4>
              <p>
                {{ t('master.content.rmQualDesc') }}
                <router-link class="link" to="/study-plan#mqlm-title">{{ t('master.content.rmQualLink') }}</router-link>
                &nbsp;|&nbsp;
                <a class="link" href="/Group_30_Final_Paper.pdf" target="_blank">{{ t('master.content.rmQualPdf') }}</a>
              </p>
              <p>{{ t('master.content.rmLearn') }}</p>
            </div>
            <div :key="currentMasterTab" v-if="currentMasterTab === 'prototyping'">
              <h4 class="sub-title">Interaction Technology Innovation</h4>
              <p>{{ t('master.content.protoDesc') }}</p>
              <p>
                <router-link class="link" to="/study-plan#miti-title">{{ t('master.content.protoLink') }}</router-link>
                &nbsp;|&nbsp;
                <a class="link" href="/Reflective_Diary_Yangfan.pdf" target="_blank">{{ t('master.content.protoDiary') }}</a>
              </p>
            </div>
          </transform-transition>
        </div>
      </div>
    </div>

    <div class="tencent">
      <div class="bubbles-bar">
        <chat-bubble>{{ t('wechat.title') }}</chat-bubble>
      </div>
      <div class="tencent-content-container">
        <p>{{ t('wechat.p1') }}</p>
        <p>{{ t('wechat.p2') }}</p>
        <p>{{ t('wechat.p3') }}</p>
      </div>
    </div>

    <div class="skills">
      <div class="bubbles-bar">
        <chat-bubble>{{ t('skills.title') }}</chat-bubble>
      </div>
      <div class="skills-content-container">
        <p>{{ t('skills.summary') }}</p>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
cv:
  title: "Let me briefly introduce my experience 👀"
  viewFullCv: "View Full CV"
master:
  title: "You must be curious about what I did during my master's study! 🤔"
  tabs:
    graduationProject: "Graduation Project"
    "VR/AR/MR": "VR/AR/MR"
    researchMethods: "Research Methods"
    prototyping: "Prototyping"
  content:
    graduationProject: "Content for Graduation Project."
    "VR/AR/MR": "Content for VR/AR/MR Courses."
    researchMethods: "Content for Research Methods."
    prototyping: "Content for Prototyping."
    graduationProjectSummary: "Zoom Pursuit, my ongoing thesis, introduces a radial-zoom stimulus to overcome calibration drift and lets users accurately point with their eyes in any unmodified desktop GUI."
    viewDetails: "> Read more"
    whatIsIt: "What is it about?"
    whatLearnedTitle: "What have I learned?"
    whatLearnedContent: "A full-stack journey covering literature review, requirement discovery, interaction design, iterative prototyping, production-level implementation, and a complete quantitative + qualitative evaluation. "
    vrIntro: "I took several courses related to this domain such as"
    vrHololens: "Between Nov 2024 and Jan 2025, as part of my thesis groundwork, I contributed to the HoloLens 2 based DatAR project, and from Jan to Feb 2025 I prototyped multiple HoloLens 2 demos that ultimately did not become my thesis topic."
    vrPassion: "These experiences equipped me with solid knowledge and development skills in immersive technologies—strong enough to support the next stage of my career."
    rmQuantTitle: "Advanced HCI Quantitative Methods"
    rmQuantLink: "course page"
    rmQualTitle: "Advanced HCI Qualitative Methods"
    rmQualLink: "course page"
    rmQuantDesc: "We analysed the 77-participant, week-long K-EmoPhone dataset (smart-phone & smart-band data) to explore whether personality traits influence two common stress indicators during social-media use: heart-rate variability (HRV) and electrodermal activity (EDA)."
    rmQualDesc: "Conducted a full qualitative study on smart-home cameras using focus groups and Creative Problem Solving to reveal users' concerns and design directions."
    rmLearn: "These two core courses gave me a solid grounding in both qualitative and quantitative research, skills I applied in other classes and my thesis—and will continue to leverage throughout my career."
    vrMultiLink: "Multimodal Interaction"
    vrMobileLink: "Mobile Interaction"
    rmQuantPdf: "Report PDF ↗"
    rmQualPdf: "Report PDF ↗"
    protoDesc: |
      In the Interaction Technology Innovation course, we built a pair of networked snow-globes as our "Enchanted Everyday Object". Each globe senses and displays the ambient light around its counterpart, offering a glimpse into the other person's daily rhythm. Shaking either globe starts a shared physical snowfall effect inside both globes, and users can exchange short voice messages. The prototype involved ESP32 firmware development, electronics wiring, 3-D modelling, and mechanical design. Full details are documented in my reflective diary.
    protoLink: "Course page"
    protoDiary: "Reflective diary PDF ↗"
wechat:
  title: "Let me tell you about my role at WeChat 🧐"
  p1: "From 2020 to 2021 I worked on the front-end of WeChat Search in a three-person team. During a major overhaul I gradually became the main developer and led the new, highly extensible results-page architecture."
  p2: "In 2021–2022 I moved to the WeChat Channels team, focusing on B-side features such as campaign-configuration pages and settlement workflows. The work involved delivering complex customised requirements under tight schedules."
  p3: "These two years trained me in small-team collaboration within a large company, rapid iterations alongside designers, and large-scale front-end architecture design and maintenance."
skills:
  title: "Let's summarise my skills and knowledge 😎"
  summary: "My skill set spans user research (qualitative & quantitative), data analysis and visualisation, front-end and full-stack web engineering, VR/AR prototyping with Unity and ESP32, and 3-D modelling & printing. Master's courses trained me to design rigorous studies and analyse data, while industry work at WeChat honed large-scale architecture design, rapid iteration and close collaboration with designers. These experiences enable me to bridge research and production and build human-centred, scalable interactive systems."
</i18n>

<i18n lang="yaml" locale="zh">
cv:
  title: "先简要介绍一下我的经历 👀"
  viewFullCv: "查看完整的简历"
master:
  title: "你一定很想知道我在硕士期间干了什么吧！🤔"
  tabs:
    graduationProject: "毕业设计"
    "VR/AR/MR": "VR/AR/MR"
    researchMethods: "研究方法"
    prototyping: "原型设计"
  content:
    graduationProject: "毕业设计的内容。"
    "VR/AR/MR": "VR/AR/MR 相关课程设计的内容。"
    researchMethods: "研究方法的内容。"
    prototyping: "原型设计相关内容。"
    graduationProjectSummary: "毕业论文项目 Zoom Pursuit 通过在当前凝视点触发径向放大动画，实时修正漂移误差，使用户无需改动现有软件即可在任意桌面 GUI 中精准完成凝视指向。"
    viewDetails: "> 查看详情"
    whatIsIt: "项目简介"
    whatLearnedTitle: "我学到了什么？"
    whatLearnedContent: "项目覆盖完整的研究与设计流程：从文献梳理、需求挖掘，到交互概念设计与多轮原型迭代；随后完成高复杂度代码实现，并自主构建定量＋定性混合实验进行数据分析，全面体验从洞察到落地的全链路实践。"
    vrIntro: "我选修了多门与 VR/AR/MR 相关的课程（见上方链接）。在多模态交互课程期间，我购入了 Quest 3 并持续探索其应用。遗憾的是，它不具备眼动追踪功能，因此我的毕业设计只能在桌面端眼动追踪环境完成；尽管如此，这段经历点燃了我对沉浸式技术的热情，我希望未来能深耕于此领域。"
    vrHololens: "在 2024 年 11 月至 2025 年 1 月的毕业设计前期调研中，我深入参与并协助开发了基于 HoloLens 2 的 DatAR 项目；在 2025 年 1 月至 2 月确定毕业题目之前，我还基于 HoloLens 2 实现了多个 demo，最终未被采纳为毕业设计。"
    vrPassion: "这些实践让我在沉浸式技术的知识储备与开发能力上均打下了坚实基础，为未来的职业生涯奠定了方向。"
    rmQuantTitle: "高级 HCI 定量研究方法"
    rmQuantLink: "课程链接"
    rmQualTitle: "高级 HCI 定性研究方法"
    rmQualLink: "课程链接"
    rmQuantDesc: "我们分析了 77 名参与者一周的 K-EmoPhone 数据集（智能手机与手环数据），探究在社交媒体使用场景中，人格特质是否会影响两项常见压力指标：心率变异性（HRV）和皮肤电活动（EDA）。"
    rmQualDesc: "通过焦点小组与创造性问题解决方法，对智能家居摄像头开展完整定性研究，挖掘用户顾虑并提出设计方向。"
    rmLearn: "这两门核心课程为我打下了坚实的定性与定量研究基础，在其他课程与毕业设计中均得以应用，也将支撑我未来的研究工作。"
    vrMultiLink: "多模态交互"
    vrMobileLink: "移动交互"
    rmQuantPdf: "报告 PDF ↗"
    rmQualPdf: "报告 PDF ↗"
    protoDesc: |
      在「交互技术创新」课程中，我们以"魔法化日常物品"为题开发了一对联网雪球原型。两只雪球可实时感知并展示对方的环境光线，让用户大致了解彼此的生活节奏；摇晃任意一只即可同步触发实物飘雪效果，并可发送简短语音信息。项目包含 ESP32 固件开发、电子焊接、3D 建模与机械结构设计，完整过程已记录于项目日志。
    protoLink: "课程链接"
    protoDiary: "日志 PDF ↗"
wechat:
  title: "我们来聊聊我在微信的经历吧！ 🧐"
  p1: "2020 至 2021 年，我在 3 人前端团队中负责微信搜一搜。产品经历大规模改版，我逐渐成为主要开发者，主导了结果页的可扩展架构设计。"
  p2: "2021 至 2022 年，我转入微信视频号团队，承担活动配置、资金结算等 ToB 侧功能，面对高度定制需求和紧迫排期。"
  p3: "这段经历让我熟悉小团队在大公司中的协作模式，积累了与设计师高效迭代和大型前端架构设计、重构与维护的实践经验。"
skills:
  title: "来盘点一下我的技能吧！😎"
  summary: "我的能力涵盖定性与定量用户研究、数据分析与可视化、前后端 Web 工程、基于 Unity 与 ESP32 的 VR/AR 原型开发，以及 3D 建模与打印。硕士课程让我掌握严谨的研究设计与数据分析方法，微信的工作经历则锻炼了大规模架构设计、快速迭代和跨职能协作能力。凭借这样的组合，我能在研究与落地之间搭建桥梁，打造兼具人本关怀与可扩展性的交互系统。"
</i18n>

<style scoped lang="stylus">
.home-page
  max-width 800px
  margin 16px auto 64px
  padding 0 var(--page-padding)

.cv
.master
.tencent
.skills
  margin-bottom 24px

  .cv-container
    z-index 0
    margin -20px -8px 16px
    padding 16px 24px
    border-radius 0 16px 16px 16px
    background var(--background-50-transparent)
    backdrop-filter blur(40px)

.chat-bubble
  position relative
  z-index 1

.full-cv-link
  margin-top 12px

.master-content-container
  margin-top 16px
  display grid
  grid-gap 16px
  grid-template-columns max-content 1fr

.master-tabs
  display grid
  grid-gap 16px
  grid-template-columns 1fr

  .tab
    cursor pointer
    background var(--background-30-transparent)
    border 2px solid var(--border-chat-bubble)
    border-radius 4px
    padding 8px 16px
    transition .2s

    &.active
      background: var(--background-transition-border) center / cover border-box
      &:hover
        background: var(--background-transition-border) center / cover border-box
        filter brightness(1.1)

    &:hover
      background var(--background-50-transparent)
      filter brightness(1.1)


.master-content
  p
    margin 0 0 8px 0
  .link
    margin-top 4px
  .sub-title
    font-weight 600
    margin 0 0 4px 0

@media (max-width: 768px)
  .tab
    font-size 14px

  .master-content-container
    grid-template-columns 1fr

  .master-tabs
    grid-template-columns 1fr 1fr 1fr 1fr

@media (max-width: 500px)
  .master-tabs
    grid-template-columns 1fr 1fr

@media (min-width: 769px)
  .master-content-container
    display grid
    grid-template-columns auto 1fr

.skills-content-container
.tencent-content-container
  margin-top 8px
  p
    margin 0 0 8px 4px

</style>