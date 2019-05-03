import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChatPicturePage } from './update-chat-picture.page';

describe('UpdateChatPicturePage', () => {
  let component: UpdateChatPicturePage;
  let fixture: ComponentFixture<UpdateChatPicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChatPicturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChatPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
