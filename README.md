# ssapp-minimal-app

ssapp-minimal-app is a basic todo application that ilustrates the possibilies of working with cardinal and ssapps.

### Installation

In order to use a ssapp you need a workspace to install it.
We recomend using our already created **ssapp-demo-workspace** for this operation to go as smoothly as possible.
However, the next steps can be adapted to work with a different workspace as well.

First, let's clone the workspace

```sh
$ git clone https://github.com/PrivateSky/ssapp-demo-workspace.git
```

After the repository was cloned, you must install all the dependencies.

```sh
$ cd ssapp-demo-workspace
$ npm install
```

If you have trouble installing the ssap-demo-workspace, please try to follow the guide provided on [PrivateSky.xyz](https://privatesky.xyz/?Start/installation)

After the installation of the workspace was successfull, let's install the **ssapp-minimal-app**

```sh
$ git clone https://github.com/PrivateSky/ssapp-minimal-app.git my-minimal-app
$ npm run add my-minimal-app https://github.com/PrivateSky/ssapp-minimal-app.git
npm run bind-app secure-channels my-minimal-app
```

One last step before doing the actual development work is to add a link to our application in the wallet template - if you remember the ssapp-demo-workspace comes with a wallet template which is a SSApp that displays a menu allowing you to select which application to run. We do this by editing web-server/secure-channels/wallet-template/menu.json and adding an entry for our application. The pages section of that file should look like this:

```json
"pages": [
    {"name": "Home"},
    {"name": "Inbox"},
    {"name": "Outbox"},
    {"name": "Contacts"},
    {
        "name": "Profile",
        "children":[
            {"name":"View"},
            {"name":"Edit"},
            {"name":"Share"}
        ]
    },
    {
        "name": "My minimal app",
        "path": "/my-minimal-app",
        "pageSrc": "my-minimal-app.html",
    }
]
```
Next, go ahead and create a new html file named *my-minimal-app.html* inside *web-server/secure-channels/wallet-template/pages/*:

```html
<psk-container controller-name="WalletSsappLauncher" data-app-name="my-minimal-app">
    <psk-ssapp key-ssi="@keySSI"></psk-ssapp>
</psk-container>
```

The last two commands you need to run in the *ssapp-demo-workspace* workspace
```sh
$ npm run server
$ npm run build-all
```