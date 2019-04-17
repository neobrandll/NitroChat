export interface ChatPreview {
    conversations_id: number;
    type_conversation_id: number;
    creator_id: number;
    conversation_name: string;
    created_at: string;
    participants: Participant[];
    last_message: LastMessage[];
    conversation_picture_url: string;
}

export interface Participant {
    conversations_users_id: number;
    users_id: number;
    type_users_id: number;
    conversations_id: number;
    deleted_at: string;
    is_deleted: boolean;
    users_phone: string;
    users_username: string;
    users_name: string;
    users_email: string;
    user_picture_url: string;
    users_creation_time: string;
}

export interface LastMessage {
    message_id: number;
    users_id: number;
    conversations_id: number;
    message_attachment: string;
    message_body: string;
    created_at: string;
}
