import type { ChatMessage } from './types';

interface ChatBubbleProps {
  message: ChatMessage;
  dimmed?: boolean;
}

export default function ChatBubble({ 
  message, 
  dimmed = false
}: ChatBubbleProps) {
  const isSystem = message.type === 'system';
  const isUser = message.type === 'user';
  
  // Base classes
  const baseClasses = "chat-bubble w-fit border-[1.5px] px-4 py-2 rounded-[20px] max-w-[80%] break-words shadow-sm";
  
  // Dynamic classes based on message type
  let typeClasses = "";
  
  if (isSystem) {
    typeClasses = "bg-[var(--c-chat-system)] border-[var(--c-chat-border)] backdrop-blur-[30px] text-[var(--app-fg)]";
  } else if (isUser) {
    typeClasses = "bg-[var(--c-chat-user)] text-white border-transparent ml-auto";
  } else if (message.type === 'retraction') {
    typeClasses = "bg-gray-100 text-gray-500 border-gray-200 italic text-sm mx-auto";
  } else if (message.type === 'options') {
    typeClasses = "bg-[var(--c-chat-system)] border-[var(--c-chat-border)] backdrop-blur-[30px] text-[var(--app-fg)]";
  }

  // Apply dimmed state via opacity/filter
  const dimmedClasses = dimmed ? "opacity-30 blur-[1px]" : "opacity-100 blur-0";

  return (
    <div className={`w-full flex flex-col mb-4 ${dimmedClasses}`}>
      <div className={`${baseClasses} ${typeClasses}`}>
        {message.content}
        {message.type === 'options' && message.options && (
          <div className="mt-2 flex flex-col gap-2">
            {message.options.map((opt) => (
              <button 
                key={opt.id}
                className="text-left px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white/80 transition-colors text-sm border border-black/5"
                onClick={opt.action}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
