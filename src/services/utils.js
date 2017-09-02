export function isNonEmptyStr(str) {
  return !!(typeof str === 'string' && str.trim());
};

export function fillArray(item, times) {
  const array = [];
  for (let i = 0; i < times; i++) {
    array.push(item);
  }
  return array;
}

export function getParam(encodedUrl, paramName) {
	let params = encodedUrl.substr(1).split('&');
	if (params.length <= 0) {
		return;
	}
	let dataParam = params
		.map(param => {
			return param.replace(/\+/g, ' ').split('=');
		})
		.find(splitParam => {
			return splitParam && splitParam[0] === paramName;
		});
	return dataParam && dataParam.length > 1 ? dataParam[1] : undefined;
}
