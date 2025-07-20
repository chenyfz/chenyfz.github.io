<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="project-page">
    <h2 class="heading">{{ t('title') }}</h2>
    <p class="status-line">{{ t('courseContext') }}</p>

    <section class="section">
      <h3 class="section-subtitle">{{ t('section1.title') }}</h3>
      <div class="text-block">
        <p>{{ t('section1.p1') }}</p>
        <p>{{ t('section1.p2') }}</p>
      </div>
    </section>

    <section class="section">
      <h3 class="section-subtitle">{{ t('section2.title') }}</h3>
      <div class="text-block">
        <p><strong>{{ t('section2.role') }}</strong></p>
        <p>{{ t('section2.p1') }}</p>
        <ul>
          <li>{{ t('section2.l1') }}</li>
          <li>{{ t('section2.l2') }}</li>
          <li>{{ t('section2.l3') }}</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h3 class="section-subtitle">{{ t('section3.title') }}</h3>
      <div class="text-block">
        <h4>{{ t('section3.sub1.title') }}</h4>
        <p>{{ t('section3.sub1.p1') }}</p>
        <h4>{{ t('section3.sub2.title') }}</h4>
        <p>{{ t('section3.sub2.p1') }}</p>
        <p>{{ t('section3.sub2.p2') }}</p>
        <h4>{{ t('section3.sub3.title') }}</h4>
        <p>{{ t('section3.sub3.p1') }}</p>
        <p>{{ t('section3.sub3.p2') }}</p>
      </div>
    </section>

    <section class="section">
      <h3 class="section-subtitle">{{ t('section4.title') }}</h3>
      <div class="text-block">
        <p>{{ t('section4.p1') }}</p>
      </div>
    </section>

    <section class="section">
      <h3 class="section-subtitle">{{ t('section5.title') }}</h3>
      <div class="text-block">
        <p>{{ t('section5.p1') }}</p>
        <ul>
          <li><strong>{{ t('section5.l1.title') }}</strong> {{ t('section5.l1.content') }}</li>
          <li><strong>{{ t('section5.l2.title') }}</strong> {{ t('section5.l2.content') }}</li>
          <li><strong>{{ t('section5.l3.title') }}</strong> {{ t('section5.l3.content') }}</li>
          <li><strong>{{ t('section5.l4.title') }}</strong> {{ t('section5.l4.content') }}</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="gallery">
        <figure>
          <img src="/snow-ball/snow-globe-final-product.jpg" alt="Final product of the Enchanted Snow Globe">
          <figcaption>{{ t('gallery.finalProduct') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-mechanism-bottom-view.jpg" alt="Bottom view of the mechanical structure">
          <figcaption>{{ t('gallery.mechanism') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-cad-model.png" alt="3D model of the snow globe enclosure from Fusion 360">
          <figcaption>{{ t('gallery.cadModel') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-core-assembly.jpg" alt="Close-up of the core assembly">
          <figcaption>{{ t('gallery.coreAssembly') }}</figcaption>
        </figure>
        <figure>
          <img src="/snow-ball/snow-globe-top-component.jpg" alt="Close-up of the top component for light and air flow">
          <figcaption>{{ t('gallery.topComponent') }}</figcaption>
        </figure>
      </div>
    </section>

  </div>
</template>

<i18n lang="yaml" locale="en">
title: "Project: Enchanted Snow Globes"
courseContext: "Project for the course 'Interaction Technology Innovation'"
section1:
  title: "Enhancing Social Connectedness for the Separated"
  p1: "In the 'Interaction Technology Innovation' course, we were tasked to re-imagine an 'Enchanted Everyday Object'. My team and I decided to tackle the challenge of maintaining social connectedness for intimate individuals who are physically apart, such as long-distance couples or close family members."
  p2: "The goal was to create a tangible, non-intrusive device that could foster a sense of presence and connection, going beyond what typical screen-based communication offers."
section2:
  title: "My Role: Designer & Prototyper"
  role: "I was the core designer and a key prototyper in our team."
  p1: "My responsibilities were to:"
  l1: "Lead the conceptual design process, from brainstorming and user research to defining the final product features."
  l2: "Design and model the physical enclosure and key mechanical components using 3D modeling software (Fusion 360)."
  l3: "Take charge of fabricating the high-fidelity prototype, including 3D printing, sourcing materials, and solving hardware challenges."
section3:
  title: "From Abstract Ideas to a Physical Prototype"
  sub1:
    title: "1. Concept & Low-Fidelity Prototyping"
    p1: "I initiated the project direction towards 'social connectivity' and facilitated early brainstorming. After initial user research and feedback from instructors, we pivoted from a 'smart lamp' to a more 'enchanted' snow globe concept. I built early low-fidelity prototypes using LEGOs and 3D-printed parts to test the core rotation mechanism."
  sub2:
    title: "2. High-Fidelity Design & 3D Modeling"
    p1: "A major challenge was creating the 'snowstorm' effect. I independently learned Fusion 360 and, after three iterations, successfully designed and 3D-printed a functional miniature turbofan, which was flexible enough for later size adjustments. I also designed the main enclosure and the complex dual-layer rotating platform that allows users to interact with the globe."
    p2: "This phase involved significant trial-and-error, especially in attempting to create a transparent shell. I experimented with glass blowing consultation, SLA printing, and vacuum forming before we made the pragmatic decision to purchase a ready-made flask to keep the project on schedule."
  sub3:
    title: "3. Fabrication & Assembly"
    p1: "I was responsible for 3D printing all the custom parts."
    p2: "Despite these setbacks, we managed our time and resources to produce a working prototype for the final presentation, demonstrating resilience and problem-solving skills."
section4:
  title: "Result: A Tangible Connection"
  p1: "We created a pair of working 'Enchanted Snow Globes'. The final prototypes allow users to send voice messages, feel a partner's presence through ambient light, and trigger a magical, shared 'snowstorm' by shaking the globe. The project successfully integrated ESP32 firmware, custom 3D-printed mechanics, and off-the-shelf electronics into a cohesive, emotionally resonant experience."
gallery:
  finalProduct: "The final working prototype. Twisting the globe triggers the snowfall, and the mechanical structure rotates the upper part of the globe."
  mechanism: "Bottom view of the 3D-printed mechanical structure. Its gear and ratchet system allows for manual twisting, which in turn rotates the top part of the globe."
  cadModel: "The 3D model of the enclosure, designed in Fusion 360."
  coreAssembly: "A close-up of the core assembly, featuring the motor, gears, and wiring."
  topComponent: "The top component, designed for both light diffusion and air circulation for the snowstorm effect."
section5:
  title: "Reflection: Lessons in Design, Engineering, and Pragmatism"
  p1: "This project was a journey of growth, teaching me valuable lessons:"
  l1:
    title: "The Power of 'Enchanted' Absurdity."
    content: "I learned that designing for 'enchantment' means embracing a degree of irrationality and focusing on emotion. My initial pragmatic approach was challenged, and I now understand that sometimes a less 'useful' but more magical interaction can be more impactful. If I were to do it again, I would push the 'absurd' and emotional elements even further."
  l2:
    title: "Pragmatism in Prototyping."
    content: "I spent significant time trying to fabricate the perfect transparent shell. In hindsight, making a quicker, pragmatic decision to buy a pre-made component would have saved precious time for refining other core features. This taught me the importance of balancing vision with practical constraints in project management."
  l3:
    title: "Bridging Design and Engineering."
    content: "Taking on both design and fabrication roles gave me a profound appreciation for the entire product development lifecycle. The process of translating a 3D model into a functional physical object, with all its unforeseen challenges, was incredibly rewarding. It solidified my ability to foresee potential manufacturing issues during the design phase."
  l4:
    title: "End-to-End Prototyping and Technical Skills:"
    content: "This project was a comprehensive exercise in end-to-end product prototyping. It provided hands-on experience across the full stack of tangible computing: 3D Modeling & Printing (Fusion 360), Embedded Systems Design (integrating sensors, actuators, and an ESP32 microcontroller), Firmware Development (C++/Arduino), and Tangible Interaction Design. I gained practical skills in electronics, mechatronics, and creating networked IoT devices."
</i18n>

<i18n lang="yaml" locale="zh">
title: "项目复盘：魔法雪球"
courseContext: "课程项目：交互技术创新 (Interaction Technology Innovation)"
section1:
  title: "为分隔两地的人增强社交连接"
  p1: "在“交互技术创新”课程中，我们的任务是重新构想一个“被施了魔法的日常物品”。我和我的团队决定挑战一个课题：为身处异地但关系亲密的个体（如异地恋情侣或亲密的家人）维持和增强他们的社交连接感。"
  p2: "我们的目标是创造一个有形的、非侵入性的设备，它能够营造一种存在感和连接感，提供超越传统屏幕通信的体验。"
section2:
  title: "我的角色：设计师与原型师"
  role: "我在我们团队中是核心设计师和关键的原型制作者。"
  p1: "我的职责包括："
  l1: "主导概念设计过程，从头脑风暴、用户研究到定义最终产品功能。"
  l2: "使用三维建模软件（Fusion 360）设计和建模物理外壳及关键机械部件。"
  l3: "负责制作高保真原型，包括3D打印、采购材料和解决硬件挑战。"
section3:
  title: "从抽象想法到物理原型"
  sub1:
    title: "1. 概念与低保真原型"
    p1: "我主导了项目向“社交连接”方向发展，并促进了早期的头脑风暴。在经过初步的用户研究和导师反馈后，我们果断地从一个“智能灯”的概念转回到一个更具“魔法感”的雪球概念。我使用乐高和3D打印部件制作了早期的低保真原型，以测试核心的旋转机制。"
  sub2:
    title: "2. 高保真设计与3D建模"
    p1: "一个主要的挑战是创造“雪暴”效果。我自学了Fusion 360，并经过三次迭代，成功设计并3D打印了一个功能性的微型涡轮风扇，其设计足够灵活，方便后期进行尺寸调整。我还设计了产品的主外壳和复杂的双层旋转平台，以供用户与雪球互动。"
    p2: "这个阶段充满了反复试验，尤其是在尝试制作透明外壳时。在最终做出购买现成烧瓶的务实决定之前，我探索了玻璃吹制咨询、SLA打印和真空成型等多种方案，这个过程确保了项目得以继续推进。"
  sub3:
    title: "3. 制作与组装"
    p1: "我负责3D打印所有的定制部件。"
    p2: "尽管存在这些挫折，我们还是成功地管理了时间和资源，为最终的展示制作了一个可工作的原型，展示了我们的韧性和解决问题的能力。"
section4:
  title: "结果：一个有形的连接"
  p1: "我们创造了一对可工作的“魔法雪球”。最终的原型允许用户发送语音信息，通过环境光感受对方的存在，并通过摇晃雪球触发一个神奇的、共享的“雪暴”。该项目成功地将ESP32固件、定制的3D打印机械结构和现成的电子元件集成到一个有凝聚力的、情感共鸣的体验中。"
gallery:
  finalProduct: "最终可用的原型。通过扭动雪球可以触发落雪，同时机械结构会带动雪球上端转动。"
  mechanism: "3D打印的机械结构底视图。其齿轮与棘轮系统支持手动扭动，从而带动雪球上部旋转。"
  cadModel: "在Fusion 360中设计的外壳3D模型。"
  coreAssembly: "核心组装件的特写，展示了电机、齿轮和接线。"
  topComponent: "顶部的透光透风组件，为“雪暴”效果设计，用于光线扩散和空气循环。"
section5:
  title: "反思：在设计、工程和务实主义中得到的教训"
  p1: "这个项目是一次成长之旅，教会了我宝贵的经验："
  l1:
    title: "“魔法般”荒诞的力量。"
    content: "我学到，为“魔法感”而设计意味着要拥抱一定程度的非理性，并专注于情感。我最初的务实方法受到了挑战，现在我明白，有时一个“用途”较少但更具魔力的互动可能更有影响力。如果再做一次，我会进一步推动“荒诞”和情感化的元素。"
  l2:
    title: "原型制作中的务实主义。"
    content: "我花了大量时间试图制作完美的透明外壳。回想起来，更快地做出购买预制组件的务实决定会为完善其他核心功能节省宝贵的时间。这教会了我在项目管理中平衡愿景与实际限制的重要性。"
  l3:
    title: "连接设计与工程。"
    content: "同时承担设计和制作的角色，让我对整个产品开发生命周期有了深刻的理解。将3D模型转化为功能性物理对象，以及其中所有不可预见的挑战，这个过程非常有益。它巩固了我在设计阶段预见潜在制造问题的能力。"
  l4:
    title: "端到端的原型制作与技术技能："
    content: "这个项目是一次完整的端到端产品原型开发实践。它让我获得了可触知计算全栈的动手经验：3D建模与打印 (Fusion 360)、嵌入式系统设计 (集成传感器、执行器和ESP32微控制器)、固件开发 (C++/Arduino)以及实体交互设计。我从中掌握了电子、机电一体化和物联网设备开发的实用技能。"
</i18n>

<style scoped lang="stylus">
.project-page
  max-width 800px
  margin 32px auto 64px
  padding 0 var(--page-padding)

.heading
  margin-bottom 16px
  font-size 28px
  font-weight 700
  line-height 1.4

.status-line
  margin-top 0
  margin-bottom 32px
  color var(--text-color-70)

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
  line-height 1.7

.gallery
  margin-top 32px
  display grid
  grid-template-columns 1fr
  gap 8px
  @media (min-width: 768px)
    grid-template-columns 1fr 1fr
    gap 24px
  img
    width 100%
    border-radius 8px
    aspect-ratio 1 / 1
    object-fit cover
  figcaption
    margin-top 8px
    font-size 14px
    color var(--text-color-70)
    line-height 1.5
  figure
    margin 0

.text-block ul
  padding-left 24px
  list-style-type disc

.text-block li
  margin 8px 0
</style> 