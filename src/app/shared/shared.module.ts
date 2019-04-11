import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatMessageComponent} from '../components/chat-message/chat-message.component';
import {PreviewChatComponent} from '../components/preview-chat/preview-chat.component';
import {ImagePickerComponent} from '../components/image-picker/image-picker.component';

@NgModule({
    declarations: [ChatMessageComponent, PreviewChatComponent, ImagePickerComponent],
    imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
    exports: [ChatMessageComponent, PreviewChatComponent, ImagePickerComponent],
    entryComponents: []
})
export class SharedModule {}
