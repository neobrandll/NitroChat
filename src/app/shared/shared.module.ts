import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatMessageComponent} from '../components/chat-message/chat-message.component';
import {PreviewChatComponent} from '../components/preview-chat/preview-chat.component';
import {ImagePickerComponent} from '../components/image-picker/image-picker.component';
import {CustomDatePipe} from '../pipes/custom-date.pipe';
import {UserMenuInfoComponent} from '../components/user-menu-info/user-menu-info.component';
import {ChatSearchUserComponent} from '../components/chat-search-user/chat-search-user.component';
import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
    declarations: [ChatMessageComponent, PreviewChatComponent, ImagePickerComponent
        , CustomDatePipe, PreviewChatComponent, UserMenuInfoComponent,
        ChatSearchUserComponent
    ],
    imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
    exports: [ChatMessageComponent, PreviewChatComponent, ImagePickerComponent
        , CustomDatePipe, UserMenuInfoComponent, PreviewChatComponent
        , ChatSearchUserComponent
    ],
    entryComponents: [],
    providers: [Contacts]
})
export class SharedModule {}
