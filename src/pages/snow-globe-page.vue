<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

const { t } = useI18n()
useHead({
  title: computed(() => t('pageTitle')),
  meta: [{ name: 'description', content: computed(() => t('pageDescription')) }],
})
</script>

<template>
  <div class="project-page">
    <section class="hero-section">
      <h2 class="heading">{{ t('title') }}</h2>
      <div class="project-meta">{{ t('courseContext') }}</div>
      <div class="card">
        <h3 class="section-subtitle">{{ t('projectSummary.title') }}</h3>
        <div class="text-block">
          <p>{{ t('projectSummary.introduction') }}</p>
          <p>{{ t('projectSummary.featuresTitle') }}</p>
          <ul>
            <li>{{ t('projectSummary.features.ambientAwareness') }}</li>
            <li>{{ t('projectSummary.features.tangibleMessaging') }}</li>
            <li>{{ t('projectSummary.features.weatherDisplay') }}</li>
            <li>{{ t('projectSummary.features.sharedExperience') }}</li>
          </ul>
          <p>{{ t('projectSummary.conclusion') }}</p>
        </div>
        <div class="actions">
          <a href="/Reflective_Diary_Yangfan.pdf" target="_blank" class="download-button">{{
            t('downloadButton')
          }}</a>
        </div>
      </div>
    </section>

    <h3 class="section-subtitle gallery-title">{{ t('gallery.title') }}</h3>
    <section class="gallery-section">
      <div class="gallery">
        <figure>
          <img src="/snow-ball/snow-globe-final-product.jpg" alt="Final product of the Enchanted Snow Globe">
          <figcaption>{{ t('gallery.captions.finalProduct') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-mechanism-bottom-view.jpg" alt="Bottom view of the mechanical structure">
          <figcaption>{{ t('gallery.captions.mechanism') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-cad-model.png" alt="3D model of the snow globe enclosure from Fusion 360">
          <figcaption>{{ t('gallery.captions.cadModel') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-core-assembly.jpg" alt="Close-up of the core assembly">
          <figcaption>{{ t('gallery.captions.coreAssembly') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-top-component.jpg" alt="Close-up of the top component for light and air flow">
          <figcaption>{{ t('gallery.captions.topComponent') }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="section card">
      <h3 class="section-subtitle">{{ t('myRole.title') }}</h3>
      <div class="text-block">
        <p>{{ t('myRole.introduction') }}</p>
        <ul>
          <li>{{ t('myRole.points.p1') }}</li>
          <li>{{ t('myRole.points.p2') }}</li>
          <li>{{ t('myRole.points.p3') }}</li>
        </ul>
      </div>
    </section>

  </div>
</template>

<i18n lang="yaml" locale="en">
pageTitle: "Enchanted Snow Globes - Yangfan Chen"
pageDescription: "Tangible IoT prototype for remote social connection, featuring 3D printing, ESP32, and interaction design."
title: "Project Retrospective: Enchanted Snow Globes"
courseContext: "Course: Interaction Technology Innovation / Theme: Enchanted Everyday Objects / Duration: Approx. 3 Months"
downloadButton: "Download Reflective Diary"
projectSummary:
  title: "The Enchanted Snow Globes: A Tangible Connection"
  introduction: "The Enchanted Snow Globes are a pair of connected devices for people in long-distance relationships, aimed to enhance social connection through tangible, non-intrusive interactions."
  featuresTitle: "Key features include:"
  features:
    ambientAwareness: "Ambient Awareness: An LED strip reflects the ambient light in the partner's location in real-time."
    tangibleMessaging: "Tangible Messaging: Users can record and send voice messages. Twisting the top of the globe plays the received message, causing the inner platform to rotate."
    weatherDisplay: "Weather Display: Dedicated LEDs indicate if the weather is sunny, rainy, or snowy at the partner's location."
    sharedExperience: "Shared Experience: Shaking one globe triggers a magical 'snowstorm' effect in the partner's globe."
  conclusion: "This page provides a summary of the project. For a detailed account of the design process, challenges, and personal reflections, please see the full reflective diary."
myRole:
  title: "My Role"
  introduction: "As the lead designer and prototyper, my main contributions included:"
  points:
    p1: "Led the product's conceptual design and core tangible interaction design."
    p2: "Designed all custom mechanical parts in Fusion 360, including the dual-layer rotating platform and a functional turbofan."
    p3: "Managed the entire fabrication and integration process, from hardware sourcing and 3D printing to the final mechatronic assembly."
gallery:
  title: "Gallery: From CAD Model to Final Product"
  captions:
    finalProduct: "The final working prototype. Twisting the globe triggers the snowfall and rotates the upper part of the globe."
    mechanism: "Bottom view of the 3D-printed mechanical structure. The gear and ratchet system provides force feedback and triggers a switch upon manual twisting. When released, a stepper motor rotates the globe back."
    cadModel: "A cross-section view of the enclosure's 3D model, designed in Fusion 360 with all parts optimized for 3D printing."
    coreAssembly: "A close-up of the core assembly, showing the stepper motor, gears, fan, and wiring, situated below the transparent globe containing foam balls."
    topComponent: "The top component, which integrates a light diffuser for uniform illumination, a light sensor, and the 3D-printed turbofan air duct for the 'snowstorm' effect."
</i18n>

<i18n lang="yaml" locale="zh">
pageTitle: "魔法雪球 - 陈扬帆"
pageDescription: "面向远程社交连接的实体交互IoT原型，涵盖3D打印、ESP32与交互设计。"
title: "课程项目回顾：魔法雪球"
courseContext: "课程：交互技术创新 / 主题：Enchanted Everyday Objects / 项目周期：约三个月"
downloadButton: "下载项目反思日志"
projectSummary:
  title: "魔法雪球：一个可触知的连接"
  introduction: "“魔法雪球”是一对为异地伴侣设计的物联网设备，旨在通过可触知的、非侵入性的交互增强社交连接感。"
  featuresTitle: "其核心功能包括："
  features:
    ambientAwareness: "环境感知：设备顶部的LED灯带可以实时反映对方所处环境的光线情况。"
    tangibleMessaging: "实体化信息：用户可录制和发送语音。扭动雪球顶部即可播放留言，并带动内部平台旋转。"
    weatherDisplay: "天气显示：独立的LED灯用于指示对方所在位置的天气是晴、雨还是雪。"
    sharedExperience: "共享体验：摇晃其中一个雪球，可以触发对方雪球内的“雪暴”魔法效果。"
  conclusion: "本页面是该项目的总结。如果想了解详细的设计过程、遇到的挑战和我的个人反思，请下载完整的项目反思日志。"
myRole:
  title: "我的角色"
  introduction: "作为项目的主设计师与原型制作者，我的主要贡献包括："
  points:
    p1: "主导了产品的概念构思与核心实体交互设计。"
    p2: "使用 Fusion 设计了所有定制机械部件，包括双层旋转平台和功能性涡轮风扇。"
    p3: "负责了从硬件选型、3D打印到最终机电组装的全部制造与集成工作。"
gallery:
  title: "作品一览：从CAD模型到最终成品"
  captions:
    finalProduct: "最终可用的原型。扭动雪球可以触发落雪，同时带动雪球上端转动。"
    mechanism: "3D打印的机械结构底视图。手动扭动雪球时，棘轮系统提供力反馈并触发开关；松手后，步进电机则带动雪球自动复位旋转。"
    cadModel: "设备外壳的剖面图，在Fusion 360中设计，所有部件均已为3D打印优化。"
    coreAssembly: "核心组装件特写，展示了步进电机、齿轮、风扇和电路。其上方是包含泡沫小球的透明雪球本体。"
    topComponent: "顶部的功能组件，集成了用于实现均匀光效的扩散板、光线传感器，以及为“雪暴”效果设计的3D打印涡轮风扇风道。"
</i18n>

<style scoped lang="stylus">
.project-page
  max-width 910px
  margin 32px auto 64px
  padding 0 var(--page-padding) 8px

.heading
  margin 8px 0
  font-size 28px
  font-weight 700

.project-meta
  margin 8px 0 16px
  color var(--text-color-secondary)

.section-subtitle
  margin-top 0
  margin-bottom 16px
  font-weight 600
  font-size 18px

.section
  margin-top 48px

h4
  font-size 16px
  font-weight 600
  margin 24px 0 8px

.text-block p, .text-block ul
  margin 16px 0

.download-button
  display inline-block
  margin-top 0
  padding 8px 16px
  background-color var(--accent-color)
  color white
  border-radius 4px
  font-weight 600
  &:hover
    filter brightness(1.1)

.hero-section
  padding 12px 0 0

.card
  padding 24px

.actions
  margin-top 24px

.gallery-section
  padding: 0 var(--page-padding)
  box-sizing: border-box
  margin-left calc(-1 * var(--page-padding))
  margin-right calc(-1 * var(--page-padding))

  @media (min-width: 1200px)
    margin-left calc(-50vw + 50%)
    margin-right calc(-50vw + 50%)

.gallery-title
  margin-top 48px

.gallery
  margin-top 16px
  display: grid
  gap: 24px 16px
  grid-template-columns: 1fr
  max-width: 2064px
  margin-left: auto
  margin-right: auto

  @media (max-width: 520px)
    grid-template-columns: repeat(1, 1fr)

  @media (min-width: 520px)
    grid-template-columns: repeat(2, 1fr)

  @media (min-width: 900px)
    grid-template-columns: repeat(3, 1fr)

  @media (min-width: 1200px)
    grid-template-columns: repeat(5, 1fr)

  figure
    margin: 0

  img
    width 100%
    aspect-ratio 1 / 1
    object-fit cover

  figcaption
    margin-top: 4px
    font-size 14px
    color var(--text-color-70)

.text-block li
  margin 8px 0
</style> 