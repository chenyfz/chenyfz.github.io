import type { ReactNode } from 'react';

/**
 * Represents the type of a chat message.
 * - 'system': Messages sent by the system/bot (e.g., greetings, info).
 * - 'user': Messages sent by the user (or simulated user actions).
 * - 'retraction': Represents a message that was retracted/deleted.
 * - 'options': A message that presents a list of selectable options to the user.
 */
export type MessageType = 'system' | 'user' | 'retraction' | 'options';

/**
 * Structure for a single option in an 'options' type message.
 */
export interface ChatOption {
  id: string;
  label: string;
  value: string;
  action?: () => void; // Optional callback for when the option is selected
}

/**
 * Metadata for a chat message.
 * Can be extended with more fields as needed (e.g., timestamp, avatar, etc.).
 */
export interface ChatMessageMetadata {
  timestamp?: number;
  senderName?: string;
  avatarUrl?: string;
  isTyping?: boolean; // If true, show a typing indicator before showing the content
}

/**
 * The core data structure for a chat message.
 * designed to be extensible for future requirements.
 */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  
  /** The type of the message, determining its appearance and behavior */
  type: MessageType;
  
  /** 
   * The main content of the message.
   * Can be a string or a ReactNode for complex content (e.g., links, components).
   */
  content: string | ReactNode;
  
  /** 
   * List of options, only relevant if type is 'options'.
   */
  options?: ChatOption[];
  
  /**
   * Additional metadata for the message.
   */
  metadata?: ChatMessageMetadata;
}
