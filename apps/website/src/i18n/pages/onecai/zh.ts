import type { OnecaiPageCopy } from './types';

const onecaiZh: OnecaiPageCopy = {
  meta: {
    title: '一成智能（1cAI） | 陈扬帆',
    description: '陈扬帆在一成智能（1cAI）的创业项目经历。'
  },
  title: '一成智能（1cAI）- 招投标 AI 工具',
  subtitle: '创业兼职 - UI、UX、产品设计 + 前端开发 + Agent 流程设计',
  detailsTitle: '经历详情',
  sections: [
    {
      id: 'overview',
      title: '招投标领域 AI 工具',
      content: [
        {
          description: '使用 AI 检查招标文件资格、报价、商务、技术、流程合规等要求。',
          muted: '目标：降低人工交叉逐项检查大型招、投标文件的成本，规避由疏忽造成的废标风险。'
        }
      ]
    },
    {
      id: 'technical',
      title: '技术挑战',
      content: [
        {
          description: '超长上下文（例如 500+ 页）的 Agent 流程设计。'
        },
        {
          description: '多模态文档理解与 RAG 等能力集成。'
        }
      ]
    },
    {
      id: 'design',
      title: '设计挑战',
      content: [
        {
          description: '用户需求洞察与任务流程梳理。'
        },
        {
          description: '检查结果信息结构化展示与认知负载控制。'
        }
      ]
    }
  ]
};

export default onecaiZh;
