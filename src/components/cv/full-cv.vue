<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RichText from '../ui/rich-text.vue'

const { t } = useI18n()
</script>

<template>
  <div class="cv-component full-cv">
    <h3>{{ t('education.title') }}</h3>
    <section class="entry">
      <div class="master">
        <div class="lr-layout highlight line">
          <div>{{ t('education.master.degree') }}</div>
          <div>{{ t('education.master.time') }}</div>
        </div>
        <div class="lr-layout">
          <div><rich-text :text="t('education.master.university')" /></div>
          <div class="uni-location">
            {{ t('education.master.location') }}
          </div>
        </div>
      </div>
      <div class="entry-details">
        <ul class="line">
          <li><rich-text :text="t('education.master.skillsTitle')" /></li>
          <li class="new-ul-container">
            <ul>
              <li><rich-text :text="t('education.master.skill1')" /></li>
              <li><rich-text :text="t('education.master.skill2')" /></li>
              <li><rich-text :text="t('education.master.skill3')" /></li>
              <li><rich-text :text="t('education.master.skill4')" /></li>
              <li><rich-text :text="t('education.master.skill5')" /></li>
            </ul>
          </li>
        </ul>
        <ul class="line">
          <li><rich-text :text="t('education.master.thesisTitle')" /></li>
          <li class="new-ul-container">
            <ul>
              <li>
                <rich-text :text="t('education.master.thesisLinks')" />
              </li>
              <li>{{ t('education.master.thesisSupervisors') }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <section class="entry">
        <div class="bachelor">
          <div class="lr-layout highlight line">
            <div>{{ t('education.bachelor.degree') }}</div>
            <div>{{ t('education.bachelor.time') }}</div>
          </div>
          <div class="lr-layout">
            <div><rich-text :text="t('education.bachelor.university')" /></div>
            <div class="uni-location">
              {{ t('education.bachelor.location') }}
            </div>
          </div>
        </div>
      <div class="entry-details">
        <ul class="line">
          <li><rich-text :text="t('education.bachelor.mainSkillset')" /></li>
          <li><rich-text :text="t('education.bachelor.highlightCourses')" /></li>
          <li><rich-text :text="t('education.bachelor.achievement')" /></li>
        </ul>
      </div>
    </section>

    <hr>
    <h3>{{ t('experience.title') }}</h3>

    <section class="entry">
        <div class="cwi">
          <div class="lr-layout highlight line">
            <div><rich-text :text="t('experience.trainee.role')" /></div>
            <div>{{ t('experience.trainee.time') }}</div>
          </div>
          <div class="lr-layout">
            <div><rich-text :text="t('experience.trainee.organization')" /></div>
            <div class="uni-location">
              {{ t('experience.trainee.location') }}
            </div>
          </div>
        </div>
      <div class="entry-details">
        <ul class="line">
          <li v-if="t('experience.trainee.description1')">{{ t('experience.trainee.description1') }}</li>
          <li><rich-text :text="t('experience.trainee.team')" /></li>
          <li><rich-text :text="t('experience.trainee.description2')" /></li>
        </ul>
      </div>
    </section>

    <section class="entry">
        <div class="wechat">
          <div class="lr-layout highlight line">
            <div><rich-text :text="t('experience.fullTime.role')" /></div>
            <div>{{ t('experience.fullTime.time') }}</div>
          </div>
          <div class="lr-layout">
            <div><rich-text :text="t('experience.fullTime.organization')" /></div>
            <div class="uni-location">
              {{ t('experience.fullTime.location') }}
            </div>
          </div>
        </div>
      <div class="entry-details">
        <ul class="line">
          <li><rich-text :text="t('experience.fullTime.team')" /></li>
          <li><rich-text :text="t('experience.fullTime.responsibilities.title')" /></li>
          <li class="new-ul-container">
            <ul>
              <li><rich-text :text="t('experience.fullTime.responsibilities.wechatSearch')" /></li>
              <li><rich-text :text="t('experience.fullTime.responsibilities.wechatChannels')" /></li>
              <li><rich-text :text="t('experience.fullTime.responsibilities.internalSystems')" /></li>
            </ul>
          </li>
          <li><rich-text :text="t('experience.fullTime.achievement')" /></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
title: "Curriculum Vitae"
name: "CHEN Yangfan"
education:
  title: "Education"
  master:
    degree: "MSc in Human-Computer Interaction (GPA: 8.39/10), Cum Laude"
    time: "Sep. 2023 - Aug. 2025"
    university: "[Utrecht University](https://www.uu.nl/)"
    location: "Utrecht, Netherlands"
    skillsTitle: "For course details, please see my [Master's Courses](/masters-courses)."
    skill1: "**Research Methods:** [Quantitative](/masters-courses#mqnm) (Grade: 9.4) and [Qualitative](/masters-courses#mqlm) (7.8) Research Methods"
    skill2: "**XR/VR/AR:** [Multimodal Interaction](/multimodal-interaction) (8), [Mobile Interaction](/masters-courses#mmob) (7.9), MSc Thesis (8.7)"
    skill3: "**Data Science:** Data Mining (9.5)"
    skill4: "**Visualization:** Information Visualization (8.2)"
    skill5: "**Digital Fabrication (3D modeling & printing, Arduino):** [Interaction Technology Innovation](/snow-globe) (8.3)"
    thesisTitle: "MSc Thesis: [ZoomPursuit: Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs](/graduation-thesis)"
    thesisSupervisors: "Supervisor: Lynda Hardman, Grade: 8.7/10"
    thesisLinks: "[Paper (PDF)](/thesis-illustration.png), [Video (MP4)](/infommmi-demo.mp4), [Codebase (GitHub)](https://github.com/chenyfz/zoom-pursuit)"
  bachelor:
    degree: "B.Eng. in Software Engineering (GPA: 4.1/5)"
    time: "Sep. 2016 - Jun. 2020"
    university: "[Nanjing University](https://www.nju.edu.cn/en/)"
    location: "Jiangsu, China"
    highlightCourses: "**Relevant Coursework:** Human-Computer Interaction Systems (96/100), Graduation Design (96/100)"
    mainSkillset: "**Core Competencies:** Acquired solid knowledge in computer science and versatile software engineering skills applicable to many domains"
    achievement: "**Excellent Graduation Design** (Team Award) by both Nanjing University and Jiangsu Province"
experience:
  title: "Work Experience"
  trainee:
    role: "Research Trainee"
    time: "Mar. 2025 - Aug. 2025"
    organization: "[Centrum Wiskunde & Informatica (CWI)](https://www.cwi.nl/)"
    location: "Amsterdam, Netherlands"
    description1: "The national research institute for mathematics and computer science in the Netherlands."
    team: "**Human-Centered Data Analytics Group**, Supervisor: Lynda Hardman"
    description2: "**LLMs, bias, data analytics, cultural heritage.** Gained insight into academic research"
  fullTime:
    role: "Web Developer"
    time: "Jul. 2020 - May 2022"
    organization: "[Weixin Group, Tencent](https://www.tencent.com/en-us/)"
    location: "Guangdong, China"
    team: "Department: Design Center, Core Product Department (基础产品部, 设计中心)"
    responsibilities:
      title: "**Key responsibilities:**"
      wechatSearch: "**Weixin Search** (微信搜一搜) front-end development, one of three main developers"
      wechatChannels: "**Weixin Channels & Channels Live** (微信视频号 & 视频号直播) front-end development"
      internalSystems: "**Weixin infrastructure library, toolkit and internal systems** full stack development"
    achievement: "**Tencent Good+ Contributor (top 15%)** for H1 2021 and H2 2021"
</i18n>

<i18n lang="yaml" locale="zh">
title: "简历"
name: "陈扬帆"
education:
  title: "教育经历"
  master:
    degree: "硕士 - 人机交互（GPA: 8.39/10），Cum Laude（荣誉毕业）"
    time: "2023年9月 - 2025年8月"
    university: "[乌特勒支大学](https://www.uu.nl/)"
    location: "荷兰，乌特勒支"
    skillsTitle: "课程请参考：[硕士课程](/masters-courses)"
    skill1: "**研究方法：** [定量](/masters-courses#mqnm)（9.4分）和[定性](/masters-courses#mqlm)（7.8分）研究方法"
    skill2: "**XR/VR/AR：** [多模态交互](/multimodal-interaction)（8分），[移动交互](/masters-courses#mmob)（7.9分），硕士论文（8.7分）"
    skill3: "**人因：** [认知建模](/masters-courses#mcm)（8.3分），[人机交互中的认知与社会心理学](/masters-courses#mcsp)（7.4分）"
    skill4: "**数字制造（3D建模与打印, Arduino）：** [交互技术创新](/snow-globe)（8.3分）"
    skill5: "**数据处理与可视化：** [数据挖掘](/masters-courses#mdm)（8.5分），[信息可视化](/masters-courses#mvis)（9分）"
    thesisTitle: "硕士论文：[ZoomPursuit: 用于通用图形用户界面的平滑追踪注视交互](/graduation-thesis)"
    thesisSupervisors: "导师：Lynda Hardman，成绩：8.7/10"
    thesisLinks: "[论文 (PDF)](/thesis-illustration.png)，[视频 (MP4)](/infommmi-demo.mp4)，[代码 (GitHub)](https://github.com/chenyfz/zoom-pursuit)"
  bachelor:
    degree: "本科 - 软件工程（GPA: 4.1/5）"
    time: "2016年9月 - 2020年6月"
    university: "[南京大学](https://www.nju.edu.cn/main.htm)"
    location: "中国，江苏"
    highlightCourses: "人机交互相关课程：人机交互系统（96/100），毕业设计（96/100）"
    mainSkillset: "掌握了坚实的计算机科学知识和能够迁移到诸多领域的软件工程素养"
    achievement: "江苏省优秀毕业设计（团队奖），南京大学优秀毕业设计（团队奖）"
experience:
  title: "工作经历"
  trainee:
    role: "Trainee"
    time: "2025年3月 - 2025年8月"
    organization: "[荷兰数学和计算机科学研究中心 (CWI)](https://www.cwi.nl/)"
    location: "荷兰，阿姆斯特丹"
    description1: ""
    team: "**以人为本数据分析小组**，导师：Lynda Hardman"
    description2: "**研究方向：** 大语言模型、偏见、数据分析、文化遗产。深入学术界"
  fullTime:
    role: "Web开发工程师"
    time: "2020年7月 - 2022年5月"
    organization: "[微信事业群, 腾讯](https://www.tencent.com/zh-cn/)"
    location: "中国，广东"
    team: "部门：微信事业群 - 设计中心 - 前端重构组"
    responsibilities:
      title: "**主要职责：**"
      wechatSearch: "**微信搜索**（微信搜一搜）前端开发，三位主要开发者之一"
      wechatChannels: "**微信视频号与视频号直播** 前端开发"
      internalSystems: "**微信基础设施库、工具包和内部系统** 全栈开发"
    achievement: "**腾讯Good+贡献者 (top 15%)** in 2021H1 and 2021H2"
</i18n>

<style scoped lang="stylus">
h3
  margin 12px 0 4px 0
  padding 0

.uni-location
  display none

@media (min-width: 840px)
  .lr-layout
    display flex
    justify-content space-between
  .uni-location
    display unset

.highlight
  font-weight 600

.line
  margin-top 8px

.mt-3
  margin-top 30px

.entry
  margin-bottom: 24px

.new-ul-container ul
  margin-top: 4px;
  padding-left: 20px;

.master,
.bachelor,
.cwi,
.wechat
  position: relative
  padding-left: 52px
  &:before
    position: absolute
    content: ''
    left: 0
    top: 6px
    display: block
    width: 40px
    height: 40px
    background-repeat: no-repeat
    background-position: center
    background-size: contain

.master:before
  background-image: url('/UU_logo.png')

.bachelor:before
  background-image: url('/NJU_logo.png')

.cwi:before
  background-image: url('/CWI_logo.png')
  background-position: top
  top: 8px

.wechat:before
  background-image: url('/wechat_logo.png')
</style>