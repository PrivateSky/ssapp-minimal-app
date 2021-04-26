# ssapp-minimal-app

ssapp-minimal-app is a basic todo application that ilustrates the possibilies of working with cardinal and ssapps.

## A.Installation

In order to use a ssapp you need a workspace to install it.

**Note**: A _workspace_ is a project with many other libraries and configuration loaded.

We recomend using our already created [ssapp-demo-workspace](https://github.com/PrivateSky/ssapp-demo-workspace) for this operation to go as smoothly as possible so we will use that repository.

However, the next steps can be adapted to work with a different workspace as well.


### Step 1 - Clone the workspace

Clone it from GitHub:

```sh
$ git clone https://github.com/PrivateSky/ssapp-demo-workspace.git
```


### Step 2 - Install all the dependencies

```sh
$ cd ssapp-demo-workspace
$ npm install
```

It might take a while.


**Note**:As ssap-demo-workspace is from a different repo if you have trouble installing it, please try to follow the guide provided on [PrivateSky.xyz](https://privatesky.xyz/?Start/installation)


### Step 3 - Install ssapp-minimal-app application into the workspace

After the installation of the workspace was successfull, let's install the **ssapp-minimal-app**
It will be added inside the ssapp-demo-workspace so **YOU MUST BE INSIDE** of **[sapp-demo-workspace]** folder.

```sh
# Tell Octopus to add my-minimal-app to the build process
$ npm run add my-minimal-app https://github.com/PrivateSky/ssapp-minimal-app.git

# Bind the my-minimal-app (our ssapp) to wallet
$ npm run bind-app secure-channels my-minimal-app
```


### Step 4 - Update (configuration) files

#### a. Update menu.json
Add a link to our application in the wallet template - if you remember the ssapp-demo-workspace comes with a wallet template which is a SSApp that displays a menu allowing you to select which application to run. We do this by editing :

```sh
web-server/secure-channels/wallet-template/menu.json 
```

and adding an entry for our application. The pages section of that file should look like this:


```javascript
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
        "pageSrc": "my-minimal-app.html"
    }
]
```

#### b. Create  my-minimal-app.html file
Next, go ahead and create a new html file named *my-minimal-app.html* inside *web-server/secure-channels/wallet-template/pages/*
with the following content:

```html
<psk-container controller-name="WalletSsappLauncher" data-app-name="my-minimal-app">
    <psk-ssapp key-ssi="@keySSI" landing-path="/home"></psk-ssapp>
</psk-container>
```

### Step 5 - Boot the application

The last two commands you need to run inside the *ssapp-demo-workspace* folder.

**NOTE**: Each one must be run in separate tabs / console.

```sh
# Start the server
$ npm run server
```

and then

```sh
# Build all 
$ npm run build-all
```

## B. Access the application

Use Chrome (using other browsers it might not work properly).

### Step 1 - Reach "My minimal app"
1. Open a new Incognito Window (Ctrl-Shift-N)
2. Point it to : http://localhost:8080/secure-channels/loader/
3. New Dossier > (Fill Pin | Confirm it) > Set Pin > Open Wallet > Enter Pin > Open Wallet > (Left Menu) Minimap App

### Step 2 - Play with it 

* Add new todo by filling the text field and then clicking outside it
* Edit an existing todo by double click on it

