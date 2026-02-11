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
  <div class="max-w-4xl mx-auto px-page mt-8 mb-16">
    <section class="pt-3">
      <h2 class="my-2 text-[28px] font-bold">{{ t('title') }}</h2>
      <div class="my-2 mb-4 text-muted">{{ t('courseContext') }}</div>
      <div class="card p-6">
        <h3 class="mt-0 mb-4 font-semibold text-lg">{{ t('projectSummary.title') }}</h3>
        <div class="text-block">
          <p>{{ t('projectSummary.description') }}</p>
        </div>
        <div class="mt-6">
          <a
            href="/INFOMMMI_Super_VR_Power_paper.pdf"
            target="_blank"
            class="inline-block px-4 py-2 bg-primary text-white rounded font-semibold hover:brightness-110"
            >{{ t('paperLink') }}</a
          >
        </div>
      </div>
    </section>

    <h3 class="mt-12 mb-4 font-semibold text-lg">{{ t('gallery.title') }}</h3>
    <section class="gallery-section">
      <div class="grid grid-cols-2 max-[720px]:grid-cols-1 gap-4 w-full max-w-[1500px] mx-auto px-6 box-border">
        <figure class="m-0">
          <video class="block w-full h-auto" controls>
            <source src="/infommmi-demo-part-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption class="mt-2 text-sm text-content-70 px-1">{{ t('gallery.elicitationVideoCaption') }}</figcaption>
        </figure>
        <figure class="m-0">
          <video class="block w-full h-auto" controls>
            <source src="/infommmi-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption class="mt-2 text-sm text-content-70 px-1">{{ t('gallery.comparisonVideoCaption') }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="mt-12 card p-6">
      <h3 class="mt-0 mb-4 font-semibold text-lg">{{ t('myRole.title') }}</h3>
      <div class="text-block">
        <p>{{ t('myRole.introduction') }}</p>
        <ul>
          <li>
            <strong>{{ t('myRole.vrPrototyping.title') }}</strong>
            {{ t('myRole.vrPrototyping.content') }}
          </li>
          <li>
            <strong>{{ t('myRole.userStudy.title') }}</strong>
            {{ t('myRole.userStudy.content') }}
          </li>
          <li>
            <strong>{{ t('myRole.dataAnalysis.title') }}</strong>
            {{ t('myRole.dataAnalysis.content') }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
pageTitle: "Gesture Interaction in VR - Yangfan Chen"
pageDescription: "Elicitation study and implementation of natural hand gestures for distant 2D GUI interaction in VR."
title: "Project Retrospective: Gesture Interaction Study in VR"
courseContext: "Course: Multimodal Interaction / Duration: Approx. 2.5 Months"
paperLink: "Download Full Research Paper"
projectSummary:
  title: "Natural Gesture in VR: An Elicitation Study and Implementation"
  description: "To identify natural hand gestures for distant interaction in VR, we initiated a 'Wizard of Oz' user study to observe and categorize spontaneous gestures (Video 1). Based on these findings, we designed and implemented two novel gestures in Unity, which we then evaluated against Meta's default interaction method (a finger-based ray) in a comparative study (Video 2)."
gallery:
  title: "Gesture Elicitation & Evaluation"
  elicitationVideoCaption: "Video 1: A participant in our 'Wizard of Oz' elicitation study. A researcher manually simulated system responses to capture unbiased, instinctual gestures."
  comparisonVideoCaption: "Video 2: In a qualitative study using the think-aloud protocol, we compared Meta's default ray-casting gesture with the two gestures we designed: pinch-to-select and tap-to-select."
myRole:
  title: "My Role"
  introduction: "I initiated the research idea, independently developed the prototype, and played a key role in designing the user study. My main contributions were:"
  userStudy:
    title: "User Study:"
    content: "I co-designed the user study, which employed the 'Wizard of Oz' method for gesture elicitation and the think-aloud protocol for qualitative feedback."
  vrPrototyping:
    title: "VR Prototyping (Unity & C#):"
    content: "I built the VR testbed from scratch and implemented the complete interaction logic for the two novel gestures. This involved solving technical challenges such as achieving stable pointing with wrist tracking, precise interaction detection, and projecting hand models to avoid visual obstruction."
  dataAnalysis:
    title: "Data Analysis:"
    content: "I was responsible for analyzing the qualitative data from the user study to synthesize findings and identify key usability issues."
</i18n>

<i18n lang="yaml" locale="zh">
pageTitle: "VR手势交互研究 - 陈扬帆"
pageDescription: "VR中与远处2D GUI交互的自然手势诱导研究与实现。"
title: "课程项目回顾：VR中的手势交互研究"
courseContext: "课程：多模态交互 (Multimodal Interaction) / 项目周期：约2.5个月"
paperLink: "下载完整研究论文"
projectSummary:
  title: "VR自然手势的诱导式研究与实现"
  description: "为探索VR远距离交互中的自然手势，我们首先采用“Wizard of Oz”方法进行用户研究，以观察并归纳用户的自发手势（视频1）。基于研究发现，我们在Unity中设计并实现了两种新手势，并与Meta的默认交互方式 (Ray-casting) 进行了对比评估（视频2）。"
gallery:
  title: "手势诱导与评估"
  elicitationVideoCaption: "视频1：“Wizard of Oz”诱导研究中的一名参与者。为捕捉用户无偏见的本能手势，系统响应由研究员在后台实时模拟。"
  comparisonVideoCaption: "视频2：在采用 Think-aloud 方法的定性研究中，我们对比了 Meta 的默认 Ray-casting 手势与我们设计的两种新手势（捏合选择与点击选择）。"
myRole:
  title: "我的角色"
  introduction: "我提出了最初的研究想法，独立开发了项目原型，并深度参与了用户研究的设计。我的主要贡献包括："
  userStudy:
    title: "用户研究："
    content: "我参与设计了完整的用户研究，包括采用“Wizard of Oz”法进行手势诱导，并运用 Think-aloud 方法收集定性反馈。"
  vrPrototyping:
    title: "VR原型开发 (Unity & C#)："
    content: "我从零搭建了VR测试环境，实现了两种新手势的完整交互逻辑，并解决了手腕追踪稳定性、交互判定、手部模型渲染等技术挑战。"
  dataAnalysis:
    title: "数据分析："
    content: "我负责分析用户研究中的定性数据，以提炼研究发现并定位核心可用性问题。"
</i18n>

<style scoped>
.text-block p,
.text-block ul {
  margin: 16px 0;
}

.text-block ul {
  padding-left: 24px;
  list-style-type: disc;
}

.text-block li {
  margin: 8px 0;
}

.gallery-section {
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
}
</style> 