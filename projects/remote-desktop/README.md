#guacamole-rd-ts 

This is a remote desktop Angular 15+ component for connecting to nodejs [guacamole-lite-ts gateway](https://www.npmjs.com/package/guacamole-lite-ts)

This is based off a previous work of raytecvision with little tweaks to make it work with guacamole-lite-ts gateway.
The work on this repo is highly experimental, and I have no prior experience on publishing packages to npm. Take this repo with a grain of salt.

##Code scaffolding
Run ng generate component component-name --project remote-desktop to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module --project remote-desktop.

Note: Don't forget to add --project remote-desktop or else it will be added to the default project in your angular.json file.

##Build
Run ng build remote-desktop to build the project. The build artifacts will be stored in the dist/ directory.


![Alt text](https://github.com/smeagol002/guacamole-rd-ts/blob/main/src/assets/RemoteDesktop.png?raw=true)



## Install
 - `npm i guacamole-rd-ts guacamole-common-ts`

```typescript remote-desktop.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteDesktopComponent } from './remote-desktop.component';
import { GuacamoleRemoteDesktopModule } from 'guacamole-rd-ts';

@NgModule({
  declarations: [ RemoteDesktopComponent, ],
  exports: [ RemoteDesktopComponent ],
  imports: [
    CommonModule,
    GuacamoleRemoteDesktopModule,
  ]
})
export class RemoteDesktopModule { }

```



 ```html remote-desktop.html test
  <div>
      <guacamole-rd-ts #remoteDesktop [showFileManager]="fileManagerVisible">
      <!-- Toolbar items -->
      <guacamole-rd-ts-toolbar-item *ngIf="rdService.isConnected()" (click)="handleTakeScreenshot()">
        Take screenshot
      </guacamole-rd-ts-toolbar-item>
      <guacamole-rd-ts-toolbar-item *ngIf="rdService.isConnected()" (click)="handleClipboard()">
        Clipboard
      </guacamole-rd-ts-toolbar-item>
      <guacamole-rd-ts-toolbar-item *ngIf="rdService.isConnected()" (click)="toggleFileManager()">
        File Manager
      </guacamole-rd-ts-toolbar-item>
      <guacamole-rd-ts-toolbar-item *ngIf="rdService.isConnected()" (click)="handleDisconnect()">
        Disconnect
      </guacamole-rd-ts-toolbar-item>
      <guacamole-rd-ts-toolbar-item *ngIf="!rdService.isFullScreen() && rdService.isConnected()" (click)="handleEnterFullScreen()">
        Enter full screen
      </guacamole-rd-ts-toolbar-item>
      <guacamole-rd-ts-toolbar-item *ngIf="rdService.isFullScreen() && rdService.isConnected()" (click)="handleExitFullScreen()">
        Exit full screen
      </guacamole-rd-ts-toolbar-item>
  

      <!-- Override connection state messages -->
      <guacamole-rd-ts-connecting-message>
        <div class="guacamole-rd-ts-message-title guacamole-rd-ts-message-title-success">
          CONNECTING TO REMOTE DESKTOP
        </div>
        <div class="guacamole-rd-ts-message-body">
          Attempting to connect to the remote desktop. Waiting for response...
        </div>
      </guacamole-rd-ts-connecting-message>

      <!-- Status bar -->
      <guacamole-rd-ts-status-bar *ngIf="rdService.isConnected()">
        <guacamole-rd-ts-status-bar-item>
          You are currently connected to: <strong>Machine 1</strong>
        </guacamole-rd-ts-status-bar-item>
        <guacamole-rd-ts-status-bar-item>
          <span>Need help? Look at our <a href="#">documentation</a></span>
        </guacamole-rd-ts-status-bar-item>
      </guacamole-rd-ts-status-bar>

      <!-- File Manager -->
      <guacamole-rd-ts-file-manager *ngIf="rdService.isConnected()">
      </guacamole-rd-ts-file-manager>
    </guacamole-rd-ts>
  </div>
 ```

 ```typescript remote-desktop.component.ts
 
 import { Component, ViewEncapsulation, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WebSocketTunnel } from 'guacamole-common-ts';
import { RemoteDesktopService, TunnelRestApiService, GuacamoleRemoteDesktopComponent, guac_params, guac_token_params } from 'guacamole-rd-ts';

@Component({
  selector: 'remote-desktop',
  templateUrl: './remote-desktop.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./remote-desktop.component.scss']
})

export class RemoteDesktopComponent implements OnInit, AfterViewInit {
  @ViewChild('remoteDesktop', {static: false}) remoteDesktop: GuacamoleRemoteDesktopComponent;

  public fileManagerVisible: boolean = false;


  constructor(
    public rdService: remoteDesktopService,
    public tunnelRestApiService: TunnelRestApiService,
  ) { }


  handleDisconnect(): void {
    this.rdService.getClient().disconnect();
  }

  handleEnterFullScreen() {
    this.rdService.setFullScreen(true);
  }

  handleExitFullScreen() {
    this.rdService.setFullScreen(false);
  }

  toggleFileManager() {
    this.fileManagerVisible = !this.fileManagerVisible;
  }



  ngOnInit() {
    const tunnel = new WebSocketTunnel("ws://localhost:4567/websocket-tunnel");
    this.tunnelRestApiService.initialize("http://localhost:4567");
    this.rdService.initialize(tunnel);
    this.connect();
    this.rdService.onRemoteClipboardData.subscribe(text => {
      const snackbar = this.snackBar.open("Received from remote clipboard", "OPEN CLIPBOARD", {
        duration: 1500,
      });
      snackbar.onAction().subscribe(() => this.handleClipboard());
    });
    this.rdService.onReconnect.subscribe(reconnect => this.connect());
  }

  ngAfterViewInit() {
    if (this.remoteDesktop) {
      this.remoteDesktop.toolbarVisible = this.rdService.isConnected();
    }
  }


  connect() {
    /**
      * 2 Methods below.
      *
      * 1 is authentication handled at the gateway guacamole-lite-ts and browser is agnostic
      * to the connection parameters. This is useful if you have all the data at the gateway.
      *
      * 2 is simpler as you can see the connection parameters here. 
      */

    //Method 1
    const auth = localStorage.getItem('auth-token');
    const method1 = {
      auth,                //Populating token from localstorage. Notice the token is NOT being put inside the token
      something: "test",   //This is a custom field for the gateway to know where to direct this connection
    };
    // importing the "guac_params" interface will make it easier. 
    var parameters: guac_params = { token: encrypt(method1) }

    //Method 2
    // importing the "guac_token_params" and "guac_params" interface will make it easier
    const method2: guac_token_params = {
      type: 'vnc',
      settings: {
        hostname: "192.168.1.1",
        port: "59000",
        "enable-sftp": true,
        "sftp-hostname": "192.168.1.10",
        "sftp-port": 2222,
        "sftp-username": "testuser",
        "sftp-password": "testuser"
        }
    }
    var parameters: guac_params = { token: encrypt(method2) }

    /**
     * Optional, you can add unencrypted parameters in addition to the token. 
     */
    parameters = {
      ...parameters,
      "swap-red-blue": true
    }

    this.tunnelRestApiService.setToken(parameters.token);
    this.rdService.connect(parameters);
    if (this.remoteDesktop) {
      this.remoteDesktop.toolbarVisible = this.rdService.isConnected();
    }
}
 ```

 ## Associated Components

 [guacamole-lite-ts](https://www.npmjs.com/package/guacamole-lite-ts)

 [guacamole-common-ts](https://www.npmjs.com/package/guacamole-common-ts)

[Apache Guacamole](https://guacamole.apache.org/)
 
