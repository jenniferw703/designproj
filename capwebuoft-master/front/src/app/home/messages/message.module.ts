import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';


import { MailboxComponent } from './mail/mailbox/mailbox.component';
import { EmailViewComponent } from './mail/email-view/email-view.component';
import { EmailComposeComponent } from './mail/email-compose/email-compose.component';
import { MailComponent } from './mail/mail.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ChatComponent,
    MailComponent,
    MailboxComponent,
    EmailViewComponent,
    EmailComposeComponent,]
})
export class MessageModule { }

export const MSG_ROUTES = [
  { path: 'messages/chat', component: ChatComponent },
  { path: 'messages/mail/mailbox', component: MailboxComponent },
  { path: 'messages/mail/email-view', component: EmailViewComponent },
  { path: 'messages/mail/email-compose', component: EmailComposeComponent },
]
