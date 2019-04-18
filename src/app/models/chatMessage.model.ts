export interface ChatMessage {
    message_id: number;
    users_id: number;
    conversations_id: number;
    message_attachment: string;
    message_body: string;
    created_at: string;
    users_username: string;
    users_name: string;
    isMine: boolean;
}
