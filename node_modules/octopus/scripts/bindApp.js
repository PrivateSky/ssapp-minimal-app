function populateActions(actions, solution, app) {
	actions.push({
		"type": "copy",
		"src": `./${app}/seed`,
		"target": `./web-server/${solution}/apps/${app}/seed`,
		"options": {
			overwrite: true
		}
	});
	actions.push({
		"type": "mkdir",
		"target": `./web-server/${solution}/${app}-template`
	});
	actions.push({
		"type": "execute",
		"cmd": `echo Use this folder template in order to customize the application instance by adding configuration, pages etc. > ./web-server/${solution}/${app}-template/readme`
	});
}

module.exports = {populateActions};