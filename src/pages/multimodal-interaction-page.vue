<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="project-page">
    <h2 class="heading">{{ t('title') }}</h2>
    <p class="status-line">{{ t('courseContext') }}</p>

    <section class="section single-col">
      <h3 class="section-subtitle">{{ t('section1.title') }}</h3>
      <div class="text-block">
        <p>{{ t('section1.p1') }}</p>
        <p>{{ t('section1.p2') }}</p>
      </div>
    </section>

    <section class="section single-col">
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

    <section class="section single-col">
      <h3 class="section-subtitle">{{ t('section3.title') }}</h3>
      <div class="text-block">
        <h4>{{ t('section3.sub1.title') }}</h4>
        <p>{{ t('section3.sub1.p1') }}</p>
        <video controls>
          <source src="/infommmi-demo-part-1.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <p class="video-label">{{ t('section3.sub1.videoLabel') }}</p>
        <h4>{{ t('section3.sub2.title') }}</h4>
        <p>{{ t('section3.sub2.p1') }}</p>
        <h4>{{ t('section3.sub3.title') }}</h4>
        <p>{{ t('section3.sub3.p1') }}</p>
        <video controls>
          <source src="/infommmi-demo.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <p class="video-label">{{ t('section3.sub3.videoLabel') }}</p>
      </div>
    </section>

    <section class="section single-col">
      <h3 class="section-subtitle">{{ t('section4.title') }}</h3>
      <div class="text-block">
        <p>{{ t('section4.p1') }}</p>
        <p>{{ t('section4.p2') }}</p>
      </div>
    </section>

    <section class="section single-col">
      <h3 class="section-subtitle">{{ t('section5.title') }}</h3>
      <div class="text-block">
        <ul>
          <li><strong>{{ t('section5.l1.title') }}</strong> {{ t('section5.l1.content') }}</li>
          <li><strong>{{ t('section5.l2.title') }}</strong> {{ t('section5.l2.content') }}</li>
          <li><strong>{{ t('section5.l3.title') }}</strong> {{ t('section5.l3.content') }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
title: "Project: What Feels Natural? Gesture Interaction in VR"
courseContext: "Project for the course 'Multimodal Interaction'"
section1:
  title: "Defining 'Natural' Gestures for Distant Interaction in VR"
  p1: "Hand-tracking in VR offers an immersive, controller-free experience. However, a key challenge is designing gestures that feel natural and intuitive, especially for new users interacting with 2D screens beyond arm's reach."
  p2: "For our course project, we set out to answer the research question: For users with no VR experience, what is perceived as the most natural way to interact with a distant 2D screen in a VR environment using hand-tracking?"
section2:
  title: "My Role: Researcher & Lead Developer"
  role: "I was a core researcher and the lead developer responsible for the technical implementation."
  p1: "My primary responsibilities included:"
  l1: "Co-designing the four-stage research study, from user elicitation to final comparative evaluation."
  l2: "Leading the technical implementation in Unity, including the VR test environment and novel gesture interaction logic."
  l3: "Solving technical challenges to ensure the gestures were usable for the user studies."
section3:
  title: "A Four-Stage Research & Development Process"
  sub1:
    title: "1. Elicitation Study (Wizard of Oz)"
    p1: "We first conducted a gesture elicitation study with 8 VR novices. To capture unbiased, 'natural' gestures, we used the 'Wizard of Oz' technique, where a researcher manually simulated system responses in real-time. This allowed us to observe users' unfiltered instincts. We found that while 'pointing' and 'pinching' were dominant, there was no single universal gesture; user preferences were influenced by factors like target size and prior experience with smartphones."
    videoLabel: "Video: A participant in the 'Wizard of Oz' study, performing gestures that are simulated by a researcher in real-time."
  sub2:
    title: "2. Gesture Implementation"
    p1: "Based on the study, I implemented two promising gestures in Unity: a direct 'tap' and a 'pinch'. This involved solving two key technical problems. To overcome the 'double vision' issue caused by binocular vision, I projected a hand model onto the screen. I also re-engineered the logic to use the user's wrist as a more stable anchor point for pointing, improving stability over direct fingertip tracking."
  sub3:
    title: "3. Comparative Evaluation"
    p1: "Finally, we conducted a think-aloud evaluation study with 4 new participants. They compared our two implemented gestures against Meta's default ray-casting interaction. This allowed us to gather qualitative data on fatigue, intuitiveness, and the importance of feedback."
    videoLabel: "Video: A comparison between Meta's default gesture (first) and the two gestures I implemented (second and third)."
section4:
  title: "Result: A 'Gesture Spectrum' and Key Design Insights"
  p1: "The study revealed our implemented gestures were highly intuitive for positioning, often grasped faster than Meta's default. However, our 'tap' gesture failed due to a lack of clear feedback, which caused user uncertainty and fatigue."
  p2: "Our main contribution was not a single 'best' gesture, but a design principle we termed the 'Gesture Spectrum.' We concluded that for VR interactions to feel natural, systems should support a range of gestures for the same task—from small pinches to larger grabs—to accommodate user preferences and context. This finding, along with the importance of feedback, formed the core of our research paper."
section5:
  title: "Reflection: Lessons in VR Research and Development"
  l1:
    title: "The Power of Wizard of Oz in Early-Stage Research."
    content: "This project was my first time using the Wizard of Oz method. It proved effective for exploring a design space without the cost of building a fully functional system, allowing us to gather authentic user behaviors."
  l2:
    title: "Technical Details Define the User Experience."
    content: "The shift from fingertip to wrist-based tracking was a critical lesson. A seemingly small implementation detail had a significant impact on usability. It showed that in interaction design, especially in VR, the user experience is directly shaped by such technical decisions."
  l3:
    title: "Feedback is Not a Feature; It's a Prerequisite."
    content: "The failure of our 'tap' gesture was a clear reminder that an interaction is incomplete without immediate, unambiguous feedback. This experience solidified my understanding that feedback is a fundamental prerequisite for any successful interactive system."
</i18n>

<i18n lang="yaml" locale="zh">
title: "项目：自然之感——探索VR中的远距离手势交互"
courseContext: "课程项目：多模态交互 (Multimodal Interaction)"
section1:
  title: "为VR远距离交互定义“自然”手势"
  p1: "VR中的手势追踪提供了无需控制器的沉浸式体验。然而，一个关键挑战是设计出感觉自然、直观的手势，特别是对于新手用户与远超手臂范围的2D屏幕进行交互时。"
  p2: "在我们的课程项目中，我们着手回答这个研究问题：对于没有VR经验的用户，在VR环境中使用手势追踪与远距离2D屏幕交互的最自然方式是什么？"
section2:
  title: "我的角色：研究员与主开发"
  role: "我是团队的核心研究员，并主导技术实现。"
  p1: "我的主要职责包括："
  l1: "合作设计四阶段的研究流程，从用户诱导到最终的比较评估。"
  l2: "主导在Unity中的技术实现，包括构建VR测试环境和编写新的手势交互逻辑。"
  l3: "解决开发过程中的技术挑战，确保手势在用户研究中可用。"
section3:
  title: "四阶段的研究与开发过程"
  sub1:
    title: "1. 诱导研究（绿野仙踪法）"
    p1: "我们首先对8名VR新手进行了一项手势诱导研究。为了捕捉无偏见的“自然”手势，我们使用了“绿野仙踪”技术，即由研究员实时手动模拟系统响应。这使我们能够观察到用户未经过滤的本能反应。我们发现，虽然“指”和“捏”是主导手势，但不存在单一的通用手势；用户偏好受到目标大小和智能手机使用经验等因素的影响。"
    videoLabel: "视频：“绿野仙踪”研究中的一名参与者正在做出手势，研究员会实时模拟系统对该手势的响应。"
  sub2:
    title: "2. 手势实现"
    p1: "根据研究结果，我主导在Unity中实现了两种有前景的手势：“直接点击”和“捏合”。这涉及到解决两个关键技术问题：为克服双眼视觉导致的“重影”，我将手部模型投影到屏幕上；我还重新设计了逻辑，改用用户手腕作为更稳定的指向锚点，以提高稳定性，取代了直接追踪指尖。"
  sub3:
    title: "3. 比较评估"
    p1: "最后，我们对4名新参与者进行了一项出声思维评估研究。他们将我们实现的两种手势与Meta的默认射线投射交互进行了比较。这使我们能够收集到关于疲劳度、直观性和反馈重要性的定性数据。"
    videoLabel: "视频：对比Meta的默认手势（第一个）和我实现的两种手势（第二个和第三个）。"
section4:
  title: "结果：“手势谱”与关键设计洞见"
  p1: "研究显示，我们实现的手势在定位方面非常直观，用户掌握速度通常快于Meta的默认手势。然而，我们的“点击”手势因缺乏清晰反馈而失败，导致了用户的不确定性和疲劳。"
  p2: "我们的主要贡献并非某个“最佳”手势，而是一个我们称为“手势谱”的设计原则。我们认为，要让VR交互感觉自然，系统应支持同一任务的多种手势（从小的捏合到大的抓取），以适应用户偏好和情境。这一发现，连同反馈的重要性，构成了我们研究论文的核心。"
section5:
  title: "反思：VR研发中的经验"
  l1:
    title: "绿野仙踪法在早期研究中的作用。"
    content: "这是我首次应用绿野仙踪法。它被证明在探索设计空间方面非常有效，无需耗费巨大成本构建功能完备的系统，使我们能收集到真实的用户行为。"
  l2:
    title: "技术细节定义用户体验。"
    content: "从指尖追踪转向基于手腕的追踪是一个关键的教训。一个看似微小的实现细节对可用性产生了巨大影响。这表明在交互设计中，尤其是在VR中，用户体验是由这些细微的技术决策直接塑造的。"
  l3:
    title: "反馈并非功能，而是前提。"
    content: "“点击”手势的失败清楚地提醒我们：没有即时、明确的反馈，交互就是不完整的。这次经验巩固了我的理解：反馈是任何成功交互系统的基本前提。"
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

.video-label
  color: var(--text-color-secondary)
  text-align center
  margin-top: 4px
  margin-bottom 24px

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

video
  width 100%
  border-radius 8px
  margin-top 16px

.text-block p, .text-block ul
  margin 16px 0
  line-height 1.7

.text-block ul
  padding-left 24px
  list-style-type disc

.text-block li
  margin 8px 0
</style> 