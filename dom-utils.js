function getDefaultProp(prop, defaultValue, type) {
	if(type === 'boolean') {
		return prop === undefined ? defaultValue : false
	} else {
		return prop || defaultValue
	}
}

function cloneObject(objToClone) {
	return $.clone(objToClone);
	
}

function getElementWithStyle(element, style) {
	var clonedObject = cloneObject(element)
	$.each( style, function( key, value ) {
		clonedObject.style[key] = value;
	});
	return clonedObject;
}
