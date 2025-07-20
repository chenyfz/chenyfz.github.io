<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeAvatarBar from "../components/avatar/home-avatar-bar.vue";
import ChatBubble from "../components/ui/chat-bubble.vue";
import ShortCv from "../components/cv/short-cv.vue";
const { t } = useI18n()
</script>

<template>
  <div class="home-page">
    <home-avatar-bar></home-avatar-bar>

    <div class="cv">
      <div class="cv-container">
        <short-cv></short-cv>
        <div class="full-cv-link">
          <router-link class="showcase-cta" to="/cv">{{ t('cv.viewFullCv') }}</router-link>
        </div>
      </div>
    </div>

    <div class="master">
      <chat-bubble>{{ t('master.title') }}</chat-bubble>
      <div class="master-showcase-container">
        <!-- Graduation Project -->
        <router-link to="/graduation-thesis" class="showcase-item">
          <div class="showcase-header">
            <h3 class="showcase-title">{{ t('master.graduationProject.title') }}</h3>
            <div class="showcase-subtitle">{{ t('master.graduationProject.subtitle') }}</div>
          </div>
          <p class="showcase-description">{{ t('master.graduationProject.description') }}</p>
          <div class="showcase-cta">{{ t('master.graduationProject.cta') }}</div>
        </router-link>

        <!-- VR/AR/MR Project -->
        <router-link to="/multimodal-interaction" class="showcase-item">
          <div class="showcase-header">
            <h3 class="showcase-title">{{ t('master.vrArMrProject.title') }}</h3>
            <div class="showcase-subtitle">{{ t('master.vrArMrProject.subtitle') }}</div>
        </div>
          <p class="showcase-description">{{ t('master.vrArMrProject.description') }}</p>
          <div class="showcase-cta">{{ t('master.vrArMrProject.cta') }}</div>
        </router-link>

        <!-- Prototyping Project -->
        <router-link to="/snow-globe" class="showcase-item">
          <div class="showcase-header">
            <h3 class="showcase-title">{{ t('master.prototypingProject.title') }}</h3>
            <div class="showcase-subtitle">{{ t('master.prototypingProject.subtitle') }}</div>
            </div>
          <p class="showcase-description">{{ t('master.prototypingProject.description') }}</p>
          <div class="showcase-cta">{{ t('master.prototypingProject.cta') }}</div>
        </router-link>

        <!-- Research Methods -->
        <div class="showcase-item informational">
          <div class="showcase-header">
            <h3 class="showcase-title">{{ t('master.researchMethods.title') }}</h3>
            <div class="showcase-subtitle">{{ t('master.researchMethods.subtitle') }}</div>
            </div>
          <p class="showcase-description">{{ t('master.researchMethods.description') }}</p>
          <div class="showcase-links">
            <a class="link" href="/infomqnm-report.pdf" target="_blank">{{ t('master.researchMethods.link1') }}</a>
            <a class="link" href="/Group_30_Final_Paper.pdf" target="_blank">{{ t('master.researchMethods.link2') }}</a>
            </div>
        </div>
      </div>
    </div>

    <div class="tencent">
      <chat-bubble>{{ t('wechat.title') }}</chat-bubble>
      <div class="tencent-content-container">
        <h4>{{ t('wechat.wechatSearch.title') }}</h4>
        <p>{{ t('wechat.wechatSearch.content') }}</p>
        <h4>{{ t('wechat.wechatChannels.title') }}</h4>
        <p>{{ t('wechat.wechatChannels.content') }}</p>
      </div>
    </div>

    <div class="skills">
      <chat-bubble>{{ t('skills.title') }}</chat-bubble>
      <div class="skills-content-container">
        <p>{{ t('skills.intro') }}</p>
        <ul class="styled-list">
          <li><b>{{ t('skills.skill1_title') }}:</b> {{ t('skills.skill1_description') }}</li>
          <li><b>{{ t('skills.skill2_title') }}:</b> {{ t('skills.skill2_description') }}</li>
          <li><b>{{ t('skills.skill3_title') }}:</b> {{ t('skills.skill3_description') }}</li>
          <li><b>{{ t('skills.skill4_title') }}:</b> {{ t('skills.skill4_description') }}</li>
        </ul>
      </div>
    </div>

    <div class="future-plans">
      <chat-bubble>{{ t('future.title') }}</chat-bubble>
      <div class="future-plans-content-container">
        <h4>{{t('future.motivation.title')}}</h4>
        <p>{{t('future.motivation.content')}}</p>
        <h4>{{t('future.interests.title')}}</h4>
        <ul class="styled-list">
          <li>{{ t('future.interests.interest1') }}</li>
          <li>{{ t('future.interests.interest2') }}</li>
          <li>{{ t('future.interests.interest3') }}</li>
          <li>{{ t('future.interests.interest4') }}</li>
        </ul>
        <h4>{{t('future.commitment.title')}}</h4>
        <p>{{t('future.commitment.content')}}</p>
      </div>
    </div>

    <div class="code-base">
      {{ t('codebase') }}<a href="https://github.com/chenyfz/chenyfz.github.io"  class="link" target="_blank">
      https://github.com/chenyfz/chenyfz.github.io
    </a>
    </div>
  </div>
</template>

<i18n lang="yaml" locale="en">
cv:
  viewFullCv: "View Full CV"
master:
  title: "You must be curious about what I did during my master's study! 🤔"
  graduationProject:
    title: "Graduation Project"
    subtitle: "ZoomPursuit: A Novel Eye-Tracking Method"
    description: "Developed and evaluated a new technique for accurate, calibration-free gaze pointing on any standard desktop GUI, resolving a key trade-off of prior methods."
    cta: "View Research & Reflection"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "'What Feels Natural?' Gesture Study"
    description: "Led a user study to discover intuitive hand gestures for VR. Implemented the findings in Unity, revealing key insights into feedback, fatigue, and the need for a 'gesture spectrum'."
    cta: "View Study & Reflection"
  prototypingProject:
    title: "Prototyping"
    subtitle: "The Enchanted Snow Globes"
    description: "Designed and built a pair of networked objects to enhance social connection. The project involved 3D modeling, electronics, and ESP32 firmware development."
    cta: "View Project & Reflection"
  researchMethods:
    title: "Foundations"
    subtitle: "HCI Research Methods"
    description: "Applied rigorous qualitative (focus groups) and quantitative (statistical analysis of sensor data) methods in various projects to validate designs and uncover user insights."
    link1: "Quantitative Paper ↗"
    link2: "Qualitative Paper ↗"
wechat:
  title: "Let me tell you about my role at WeChat 🧐"
  wechatSearch:
    title: "WeChat Search: Leading a Revamp"
    content: "From 2020 to 2021, as part of a three-person team, I became the main developer during a major overhaul of WeChat Search. I led the design of a new, highly extensible results-page architecture."
  wechatChannels:
    title: "WeChat Channels: Building for Business"
    content: "In 2021–2022, I joined the Channels team to build B-side features. I delivered complex campaign-configuration pages and settlement workflows, meeting custom requirements under tight schedules."
skills:
  title: "Let's summarise my skills and knowledge 😎"
  intro: "My experiences enable me to bridge research and production to build human-centered, scalable interactive systems. My key skills include:"
  skill1_title: "User Research (Qualitative & Quantitative)"
  skill1_description: "Designing rigorous studies, conducting focus groups, and performing statistical analysis of sensor data to validate designs and uncover user insights."
  skill2_title: "Web & Software Engineering"
  skill2_description: "Scalable front-end architecture, full-stack development, and maintaining large-scale applications."
  skill3_title: "VR/AR Prototyping"
  skill3_description: "Using Unity and C# to build interactive VR experiences and conduct user studies on novel interaction techniques."
  skill4_title: "Physical Prototyping"
  skill4_description: "End-to-end hardware creation, from 3D modeling (Fusion 360) and 3D printing to electronics and firmware development (ESP32)."
codebase: "Source code of this website: "
future:
  title: "What's Next? My Future Plans 🚀"
  motivation:
    title: "Why Pursue a PhD?"
    content: "I am seeking a PhD position in Human-Computer Interaction to pursue curiosity-driven research. In contrast to working as a component within a large corporate team, I am more attracted to the academic freedom of a small team, which allows for deeper and more focused exploration of complex problems."
  interests:
    title: "Primary Research Interests"
    interest1: "VR/AR/MR Interaction"
    interest2: "Tangible & Hardware-based Interaction"
    interest3: "Human-AI Interaction"
    interest4: "Interaction Design for Specialized Hardware"
  commitment:
    title: "Foundation for Future Research"
    content: "My master's program has prepared me for PhD-level research. My engineering background is for technical implementation, while my HCI training is for user-centered design and analysis. My projects demonstrate that I can combine these skills: I have developed and evaluated a new algorithm for my thesis, built working VR and tangible prototypes from scratch, and applied rigorous research methods. This ability to connect design with implementation is my foundation for pursuing research in tangible and immersive interaction."
</i18n>

<i18n lang="yaml" locale="zh">
cv:
  viewFullCv: "查看完整的简历"
master:
  title: "你一定很想知道我在硕士期间干了什么吧！🤔"
  graduationProject:
    title: "毕业设计"
    subtitle: "ZoomPursuit: 新型眼动追踪技术"
    description: "为解决现有方法的关键权衡，我独立开发并评估了一种适用于任何标准桌面GUI的、精确且免校准的凝视指向新技术。"
    cta: "查看研究与反思"
  vrArMrProject:
    title: "VR/AR/MR"
    subtitle: "“自然之感”手势研究"
    description: "主导了一项用户研究以探索VR中的直观手势交互。我在Unity中实现了研究发现，并揭示了关于反馈、疲劳和“手势谱”等关键洞见。"
    cta: "查看研究与反思"
  prototypingProject:
    title: "原型设计"
    subtitle: "魔法雪球"
    description: "为增进社交连接，我设计并制作了一对联网实体物品。项目涉及3D建模、电子电路以及ESP32固件开发。"
    cta: "查看项目与反思"
  researchMethods:
    title: "基础"
    subtitle: "HCI 研究方法"
    description: "在多个项目中应用了严谨的定性（焦点小组）和定量（传感器数据统计分析）研究方法，以验证设计并洞察用户。"
    link1: "定量研究论文 ↗"
    link2: "定性研究论文 ↗"
wechat:
  title: "我们来聊聊我在微信的经历吧！🧐"
  wechatSearch:
    title: "微信搜一搜：主导重构"
    content: "2020至2021年，在一个三人前端团队中，我作为主要开发者主导了微信搜一搜的重大改版，设计了全新的、高可扩展性的结果页架构。"
  wechatChannels:
    title: "微信视频号：B端功能建设"
    content: "2021至2022年，我转入视频号团队，负责B端功能，如活动配置和结算工作流，在紧迫的排期内交付了复杂的定制化需求。"
skills:
  title: "来盘点一下我的技能吧！😎"
  intro: "我的经验使我能够很好地结合研究与工程实践，构建以人为本、可扩展的交互系统。我的核心技能包括："
  skill1_title: "用户研究（定性与定量）"
  skill1_description: "设计严谨的研究方案，通过焦点小组、传感器数据统计分析等方法来验证设计、洞察用户。"
  skill2_title: "Web及软件工程"
  skill2_description: "可扩展的前端架构设计、全栈开发能力，以及如微信般的大型应用维护经验。"
  skill3_title: "VR/AR原型开发"
  skill3_description: "使用Unity和C#构建交互式VR体验，并就新颖的交互技术进行用户研究。"
  skill4_title: "物理原型设计"
  skill4_description: "端到端的硬件创造能力，从3D建模（Fusion 360）、3D打印到电子电路和固件开发（ESP32）。"
codebase: "网站源代码："
future:
  title: "下一步？我的未来规划 🚀"
  motivation:
    title: "为什么想读博？"
    content: "我正在寻求人机交互（HCI）领域的博士研究机会，以从事由好奇心驱动的深度研究。相比于在大型企业中作为庞大团队的一名“螺丝钉”，我更向往小团队所能提供的学术自由，它允许我们更深入、更专注地探索复杂问题。"
  interests:
    title: "主要研究兴趣"
    interest1: "VR/AR/MR中的交互"
    interest2: "可触知及基于硬件的交互"
    interest3: "人机协同（Human-AI Interaction）"
    interest4: "面向专用硬件的交互设计"
  commitment:
    title: "未来研究的基石"
    content: "我的硕士学习为我的博士研究做好了准备。我的工程师背景负责技术实现，人机交互训练则负责以用户为中心的设计与分析。我的项目证明了我有能力结合这两种技能：我为毕业设计开发和评估了新算法，从零开始构建了可用的VR和实体原型，并应用了严谨的研究方法。这种将设计与实现相结合的能力，是我追求实体与沉浸式交互研究方向的基础。"
</i18n>

<style scoped lang="stylus">
.home-page
  max-width 1000px
  margin 16px auto 64px
  padding 0 var(--page-padding)

.cv
.master
.tencent
.skills
.future-plans
  margin-bottom 24px

.cv-container
  display flex
  flex-direction column

.full-cv-link
  margin-top 16px
  align-self flex-end

.master-showcase-container,
.cv-container,
.tencent-content-container,
.skills-content-container,
.future-plans-content-container
  margin-top 16px

.master-showcase-container
  display grid
  grid-template-columns 1fr 1fr
  gap 24px

.showcase-item,
.cv-container,
.tencent-content-container,
.skills-content-container,
.future-plans-content-container
  background var(--background-50-transparent)
  border 1.5px solid var(--border-chat-bubble)
  border-radius 12px
  padding 24px
  display flex
  flex-direction column
  text-decoration none
  color var(--text-color)
  transition transform 0.2s ease, box-shadow 0.2s ease

  h4
    font-size 16px
    font-weight 600
    margin-top 8px
    margin-bottom 8px
    &:first-child
      margin-top 0

  p
    line-height 1.7
    color var(--text-color-70)

  .styled-list
    padding-left 20px
    line-height 1.7
    color var(--text-color-70)
    li
      margin-bottom 8px
      &:last-child
        margin-bottom 0


.showcase-item:not(.informational)
  &:hover
    transform scale(1.03)
    border-color var(--border-chat-bubble-highlight)
    box-shadow 0 8px 20px rgba(0,0,0,0.1)

.showcase-item.informational
  background var(--background-30-transparent)


.showcase-header
  margin-bottom 16px

.showcase-title
  font-size 18px
  font-weight 600
  margin-bottom 4px
  margin-top 4px

.showcase-subtitle
  color var(--text-color-secondary)
  font-size 14px

.showcase-description
  flex-grow 1
  margin 0
  color var(--text-color-70)
  font-size 15px
  line-height 1.6

.showcase-cta
  font-weight 600
  color var(--text-color)
  &::after
    content ' →'

.showcase-links
  margin-top 16px
  display flex
  justify-content flex-end
  gap 16px

@media (max-width: 768px)
  .master-showcase-container
    grid-template-columns 1fr
    gap 20px
</style>