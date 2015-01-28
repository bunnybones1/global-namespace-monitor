function globalNamespaceMonitor(duration, repeat, hurtMe) {
	duration = duration === undefined ? 1000 : 0;
	console.warn('monitoring global namespace for pollution. Do not use this module in production.')
	var initKeys = [];
	for(var key in window) {
		initKeys.push(key);
	}

	function checkGlobalNamespace() {
		for(var key in window) {
			if(initKeys.indexOf(key) == -1) {
				console.warn('global namespace polluted with', key);
				if(hurtMe) {
					console.warn('Hopefully this helps you find the problem. Deleting', key);
					delete window[key];
				} else {
					initKeys.push(key);
				}
			}
		}
	}

	if(repeat) {
		setInterval(checkGlobalNamespace, duration);
	} else {
		setTimeout(checkGlobalNamespace, duration);
	}
}
module.exports = globalNamespaceMonitor;