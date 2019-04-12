import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuInfoPage } from './user-menu-info.page';

describe('UserMenuInfoPage', () => {
  let component: UserMenuInfoPage;
  let fixture: ComponentFixture<UserMenuInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
