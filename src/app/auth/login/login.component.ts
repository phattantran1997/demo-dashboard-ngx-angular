import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import * as uuid from 'uuid';

import {
  getDeepFromObject,
  NbAuthService,
  NbAuthSocialLink,
  NbLoginComponent,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import { environment } from "../../../environments/environment";
import { Console } from "console";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends NbLoginComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "";
  wrongUserNameOrPasss: boolean =false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;
  deviceId: string = "";

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS)
    protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private http: HttpClient
  ) {
    super(service, options, cd, router);
    // this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    // this.showMessages = this.getConfigValue("forms.login.showMessages");
    // this.strategy = this.getConfigValue("forms.login.strategy");
    // this.socialLinks = this.getConfigValue("forms.login.socialLinks");
    // this.rememberMe = this.getConfigValue("forms.login.rememberMe");
  }

  getReturnUrl() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop.toString()),
    });
    return params['returnUrl'];
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.http
      .post(environment.UrlAppUser + "/user/login", {
        username: this.user.email,
        password: this.user.password,
        deviceId: uuid.v4()
      })
      .subscribe((result: any) => {
        if(result.code === 100000){
          this.wrongUserNameOrPasss =true;
          this.submitted = false;
        }else{
          this.wrongUserNameOrPasss =false;
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("username", this.user.email);
          let returnUrl = this.getReturnUrl();
          if (!returnUrl) window.location.href = "/";
          window.location.href = window.origin + returnUrl;
        }
        
      });

    // this.service
    //   .authenticate(this.strategy, this.user)
    //   .subscribe((result: NbAuthResult) => {
    //     this.submitted = false;

    //     if (result.isSuccess()) {
    //       this.messages = result.getMessages();
    //     } else {
    //       this.errors = result.getErrors();
    //     }

    //     const redirect = result.getRedirect();
    //     if (redirect) {
    //       setTimeout(() => {
    //         return this.router.navigateByUrl(redirect);
    //       }, this.redirectDelay);
    //     }
    //     this.cd.detectChanges();
    //   });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
