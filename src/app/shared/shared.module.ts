import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatMessageComponent} from '../components/chat-message/chat-message.component';
import {PreviewChatComponent} from '../components/preview-chat/preview-chat.component';
import {ImagePickerComponent} from '../components/image-picker/image-picker.component';
import {CustomDatePipe} from '../pipes/custom-date.pipe';
import {UserMenuInfoComponent} from '../components/user-menu-info/user-menu-info.component';
import {ChatSearchUserComponent} from '../components/chat-search-user/chat-search-user.component';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import {NoUserComponent} from '../components/no-user/no-user.component';
import { SMS } from '@ionic-native/sms/ngx';

import {UpPicturePage} from '../pages/up-picture/up-picture.page';
import {PreviewImagePage} from '../pages/preview-image/preview-image.page';
import {PopoverComponent} from '../components/popover/popover.component';
import {GroupSearchUserComponent} from '../components/group-search-user/group-search-user.component';
import {DetailUserComponent} from '../components/detail-user/detail-user.component';
import {DetailPopOverComponent} from '../components/detail-pop-over/detail-pop-over.component';


@NgModule({
    declarations: [ChatMessageComponent, PreviewChatComponent, ImagePickerComponent
        , CustomDatePipe, PreviewChatComponent, UserMenuInfoComponent,
        ChatSearchUserComponent, NoUserComponent, UpPicturePage, PreviewImagePage, PopoverComponent, GroupSearchUserComponent, DetailUserComponent, DetailPopOverComponent
    ],
    imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule, FormsModule],
    exports: [ChatMessageComponent, PreviewChatComponent, ImagePickerComponent
        , CustomDatePipe, UserMenuInfoComponent, PreviewChatComponent
        , ChatSearchUserComponent, NoUserComponent, GroupSearchUserComponent, DetailUserComponent
    ],
    entryComponents: [UpPicturePage, PreviewImagePage, PopoverComponent, DetailPopOverComponent],
    providers: [Contacts, Sim, SMS]
})
export class SharedModule {}
