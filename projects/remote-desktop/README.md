#guacamole-gateway-client 

This is a remote desktop Angular 15+ component for connecting to nodejs [guacamole-gateway-ts gateway](https://www.npmjs.com/package/guacamole-gateway-ts)

This is based off a previous work of raytecvision with little tweaks to make it work with guacamole-gateway-ts gateway.

##Code scaffolding
Run ng generate component component-name --project remote-desktop to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module --project remote-desktop.

Note: Don't forget to add --project remote-desktop or else it will be added to the default project in your angular.json file.

##Build
Run ng build remote-desktop to build the project. The build artifacts will be stored in the dist/ directory.


This diagram describes the architecture of Guacamole and the role of *guacamole-gateway-ts* in it:
![Chart](https://github.com/smeagol002/assets/blob/main/pictures/RemoteDesktop.jpg?raw=true)



## Install
 - `npm i guacamole-gateway-client`

```typescript remote-desktop.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteDesktopComponent } from './remote-desktop.component';
import { GuacamoleRemoteDesktopModule } from 'guacamole-gateway-client';

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
      <guacamole-gateway-client #remoteDesktop [showFileManager]="fileManagerVisible">
      <!-- Toolbar items -->
      <guacamole-gateway-client-toolbar-item *ngIf="rdService.isConnected()" (click)="handleTakeScreenshot()">
        Take screenshot
      </guacamole-gateway-client-toolbar-item>
      <guacamole-gateway-client-toolbar-item *ngIf="rdService.isConnected()" (click)="handleClipboard()">
        Clipboard
      </guacamole-gateway-client-toolbar-item>
      <guacamole-gateway-client-toolbar-item *ngIf="rdService.isConnected()" (click)="toggleFileManager()">
        File Manager
      </guacamole-gateway-client-toolbar-item>
      <guacamole-gateway-client-toolbar-item *ngIf="rdService.isConnected()" (click)="handleDisconnect()">
        Disconnect
      </guacamole-gateway-client-toolbar-item>
      <guacamole-gateway-client-toolbar-item *ngIf="!rdService.isFullScreen() && rdService.isConnected()" (click)="handleEnterFullScreen()">
        Enter full screen
      </guacamole-gateway-client-toolbar-item>
      <guacamole-gateway-client-toolbar-item *ngIf="rdService.isFullScreen() && rdService.isConnected()" (click)="handleExitFullScreen()">
        Exit full screen
      </guacamole-gateway-client-toolbar-item>
  

      <!-- Override connection state messages -->
      <guacamole-gateway-client-connecting-message>
        <div class="guacamole-gateway-client-message-title guacamole-gateway-client-message-title-success">
          CONNECTING TO REMOTE DESKTOP
        </div>
        <div class="guacamole-gateway-client-message-body">
          Attempting to connect to the remote desktop. Waiting for response...
        </div>
      </guacamole-gateway-client-connecting-message>

      <!-- Status bar -->
      <guacamole-gateway-client-status-bar *ngIf="rdService.isConnected()">
        <guacamole-gateway-client-status-bar-item>
          You are currently connected to: <strong>Machine 1</strong>
        </guacamole-gateway-client-status-bar-item>
        <guacamole-gateway-client-status-bar-item>
          <span>Need help? Look at our <a href="#">documentation</a></span>
        </guacamole-gateway-client-status-bar-item>
      </guacamole-gateway-client-status-bar>

      <!-- File Manager -->
      <guacamole-gateway-client-file-manager *ngIf="rdService.isConnected()">
      </guacamole-gateway-client-file-manager>
    </guacamole-gateway-client>
  </div>
 ```

 ```typescript remote-desktop.component.ts
 
import { Component, ViewEncapsulation, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Guacamole, GuacamoleRemoteDesktopComponent, RemoteDesktopService, TunnelRestApiService } from 'guacamole-gateway-client';

@Component({
  selector: 'remote-desktop',
  templateUrl: './remote-desktop.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./remote-desktop.component.scss']
})

export class RemoteDesktopComponent implements OnInit, AfterViewInit {
  @ViewChild('remoteDesktop', { static: false }) remoteDesktop: GuacamoleRemoteDesktopComponent;

  public fileManagerVisible: boolean = false;


  constructor(
    public rdService: RemoteDesktopService,
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
   const socket = new Guacamole.SocketIOTunnel('', {
        path: "{{your path}}",
        transports: ['websocket'],
        secure: true,
        auth: {{your custom authentication/identification object}})
        }
      });
      this.remoteDesktopService.initialize(socket);
      this.connect();
      this.remoteDesktopService.onReconnect.subscribe(reconnect => this.connect());
  }

  ngAfterViewInit() {
    if (this.remoteDesktop) {
      this.remoteDesktop.toolbarVisible = this.rdService.isConnected();
    }
  }


  connect() {
    //tell the gatway this is a client trying to connect
     this.remoteDesktopService.connect({ type: 'client'});
    if (this.remoteDesktop) {
      this.remoteDesktop.toolbarVisible = this.remoteDesktopService.isConnected();
    }
  }
 ```

 ## Associated Components

 [guacamole-gateway-ts](https://www.npmjs.com/package/guacamole-gateway-ts)
 [guacamole-common-ts](https://www.npmjs.com/package/guacamole-common-ts)

 [Apache Guacamole](https://guacamole.apache.org/)
 
