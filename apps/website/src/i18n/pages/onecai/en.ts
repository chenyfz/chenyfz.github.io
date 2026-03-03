import type { OnecaiPageCopy } from './types';

const onecaiEn: OnecaiPageCopy = {
  meta: {
    title: '1cAI | Chen Yangfan',
    description: 'Chen Yangfan\'s startup experience at 1cAI.'
  },
  title: '1cAI - AI for Tender Review',
  subtitle: 'Startup (part-time) - UI / UX, product design, frontend development, and agent workflow design',
  detailsTitle: 'Experience Details',
  sections: [
    {
      id: 'overview',
      title: 'AI Tooling for Bid/Tender Review',
      content: [
        {
          description: 'Built AI tooling for bid/tender review: qualification, pricing, commercial, technical, and process compliance checks.',
          muted: 'Goal: reduce manual cross-checking effort for large tender documents and lower disqualification risk caused by oversight.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Challenges',
      content: [
        {
          description: 'Long-context agent workflow design for very large files (for example, 500+ pages).'
        },
        {
          description: 'Multimodal document understanding and RAG integration.'
        }
      ]
    },
    {
      id: 'design',
      title: 'Design Challenges',
      content: [
        {
          description: 'User-needs discovery and workflow framing.'
        },
        {
          description: 'Structured presentation of review output and cognitive-load control.'
        }
      ]
    }
  ]
};

export default onecaiEn;
