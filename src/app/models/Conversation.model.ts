import {Participant} from './chatPreview.model';
import {ChatMessage} from './chatMessage.model';

export interface Conversation {
    participants: Participant[];
    messages: ChatMessage[];
    chat: ConversationChat;
}

export interface ConversationChat {
    conversations_id: number;
    type_conversation_id: number;
    creator_id: number;
    conversation_name: string;
    created_at: string;
    conversation_picture_url: string;
}
