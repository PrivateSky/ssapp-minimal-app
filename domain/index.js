console.log("Loaded from domain.js");
const TODO_MOUNTING_PATH = "/todos";
const keyssiresolver = require("opendsu").loadApi("resolver");

$$.swarms.describe('toDoSwarm', {
    start: function (data) {
        if (rawDossier) {
            return this.createToDo(data);
        }
        this.return(new Error("Raw Dossier is not available."));
    },

    createToDo: function (data) {
        const keyssiSpace = require("opendsu").loadApi("keyssi");
        rawDossier.getKeySSI((err, ssi) => {
            if (err) {
                console.error(err);
                return this.return(err);
            }
            const templateSSI = keyssiSpace.buildSeedSSI(keyssiSpace.parse(ssi).getDLDomain());
            keyssiresolver.createDSU(templateSSI, (err, newDossier) => {
                if (err) {
                    console.error(err);
                    return this.return(err);
                }
                newDossier.writeFile('/data', JSON.stringify(data), (err, digest) => {
                    if (err) {
                        console.error(err);
                        return this.return(err);
                    }
                    newDossier.getKeySSI((err, keySSI) => {
                        if (err) {
                            return this.return(err);
                        }
                        this.mountDossier(rawDossier, TODO_MOUNTING_PATH, keySSI)
                    });
                });
            });
        });
    },

    editToDo: function (editedToDo) {
        this.__listToDos((err, todos) => {
            if (err) {
                return this.return(err);
            }
            let wantedToDo = todos.find(todo => todo.path === editedToDo.path);
            if (!wantedToDo) {
                return this.return(new Error('Todo with path ' + editedToDo.path + ' not found.'));
            }

            keyssiresolver.loadDSU(wantedToDo.identifier, (err, todoDossier) => {
                if (err) {
                    return this.return(err);
                }
                todoDossier.writeFile('/data', JSON.stringify(editedToDo), this.return);
            })
        });
    },

    listToDos: function () {
        this.__listToDos((err, data) => {
            if (err) {
                return this.return(err);
            }
            this.return(err, data);
        });
    },

    __listToDos: function (callback) {
        rawDossier.readDir(TODO_MOUNTING_PATH, (err, applications) => {
            if (err) {
                return callback(err);
            }
            let toBeReturned = [];

            let getToDos = (todo) => {
                let appPath = TODO_MOUNTING_PATH + '/' + todo.path;
                rawDossier.readFile(appPath + '/data', (err, fileContent) => {
                    toBeReturned.push({
                        ...JSON.parse(fileContent),
                        path: appPath,
                        identifier: todo.identifier
                    });
                    if (applications.length > 0) {
                        getToDos(applications.shift())
                    } else {
                        return callback(undefined, toBeReturned);
                    }
                });
            };
            if (applications.length > 0) {
                return getToDos(applications.shift());
            }
            return callback(undefined, toBeReturned);
        })
    },

    removeToDo(applicationPath) {
        rawDossier.unmount(applicationPath, (err, data) => {
            if (err) {
                return this.return(err);
            }
            return this.return(err, data);
        });
    },


    mountDossier: function (parentDossier, mountingPath, seed) {
        const PskCrypto = require("pskcrypto");
        const hexDigest = PskCrypto.pskHash(seed, "hex");
        let path = `${mountingPath}/${hexDigest}`;
        parentDossier.mount(path, seed, (err) => {
            if (err) {
                console.error(err);
                return this.return(err);
            }
            this.return(undefined, {path: path, seed: seed});
        });
    }
});