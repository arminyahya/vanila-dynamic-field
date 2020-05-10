
function ReadOnlyField(props) {
	var onClick = props.onClick;
	var lineCount = getDefaultProp(props.lineCount, 0, 'number');
	var direction = props.direction;
	var value = props.value;
	var prefixCls = getDefaultProp(props.prefixCls, 'didgah-readOnlyField', 'string');
	var value = props.value;
	var handleOnClick = function () {
		if (!!onClick) {
			onClick();
		}
	}

	var className = "readOnly" + ((!!lineCount && lineCount > 0) ? " multiLine" : "");

	var lineHeight = lineCount * 21;

	var style = {};
	if (props.direction) {
		style.direction = direction;
	}

	if (lineHeight > 0) {
		style.overflow = 'auto';
		style.height = lineHeight.toString() + 'px';
	}
	var wrap = document.createElement("div");
	wrap.classList = [];
	wrap.classList.push(prefixCls + '-wrapper');
	var inner = document.createElement("div");
	inner.classList = [];
	inner.classList.push(className);
	wrap = getElementWithStyle(wrap, props.style);
	inner.innerHTML = value;
	wrap.appendChild(inner);
	wrap.onclick = handleOnClick;
	return wrap;
}

function NumericalInput(props) {
	var allowFloatNumbers = getDefaultProp(props.allowFloatNumbers, true, 'boolean');
	var formatDecimal = getDefaultProp(props.formatDecimal, false, 'boolean');
	var doNotConvertValueToNumber = getDefaultProp(props.doNotConvertValueToNumber, false, 'boolean');
	var automaticallySelectText = getDefaultProp(props.allowFloatNumbers, false, 'boolean');
	var onBlur = props.onBlur;
	var onChange = getDefaultProp(props.onChange, function () { return null }, 'function');
	var regEx = props.regEx;
	var formatter = props.formatter;
	function nullFormatter(value) {
		return value;
	}

	function handleBlur(value) {
		if (value === '-') {
			onChange(null);
		}
		if (value.charAt(value.length - 1) === '.') {
			onChange(value.substr(0, value.length - 1));
		}
		// if (onBlur) {
		// 	onBlur(e);
		// }
	}

	function handleChange(value) {


		var pureValue = (value || '').replace(new RegExp(',', 'g'), '');
		var refinedValue = null;

		var changeType = function (value) { return doNotConvertValueToNumber ? value : Number(value); }

		if (pureValue === '') {
			onChange(null);
			return;
		}

		if (!formatter) {
			var reg = allowFloatNumbers ?
				(formatDecimal ? /^-?([0-9][,0-9]*)(\.[0-9]*)?$/ : /^-?([0-9][0-9]*)(\.[0-9]*)?$/) :
				(formatDecimal ? /^-?([0-9][,0-9]*)$/ : /^-?([0-9][0-9]*)$/);
			if (pureValue === '-') {
				onChange(pureValue);
			}
			if ((reg.test(pureValue))) {
				refinedValue = endsWithPointCharacterOrOnlyDash(pureValue) ? pureValue : changeType(pureValue);
				onChange(refinedValue);
			}
		}
		else {
			if (!!regEx) {
				if ((regEx.test(value))) {
					refinedValue = value;
				}
				onChange(refinedValue);
			}
		}
	}

	var handleFocus = function () {
		if (automaticallySelectText) {
			// this.ref.select();
		}
	}

	var endsWithPointCharacterOrOnlyDash = function (value) {
		return value.charAt(value.length - 1) === '.' || (value.length === 1 && value === '-');
	}

	var defaultFormatter = function (value) {
		var formattedValue = value.toString().replace(new RegExp(',', 'g'), '');
		return utility.formatDecimal(formattedValue);
	}

	var formatterFunc = formatter;
	if (!formatterFunc) {
		formatterFunc = formatDecimal ? defaultFormatter : nullFormatter;
	}
	var wrap = document.createElement("input");
	// wrap.formatter = formatter
	wrap.onfocus = handleFocus;
	wrap.onblur = function(e) { handleBlur(this.value)};
	wrap.onchange = function(e) {handleChange(this.value)};
	return wrap;

}

function DecimalType(props) {
	var mode = getDefaultProp(props.mode, 'edit', 'string');
	var maxLength = getDefaultProp(props.maxLength, 9, 'number');
	var value = props.value;
	var formatValueForDisplay = getDefaultProp(props.formatValueForDisplay, true, 'boolean');
	var floatNumber = getDefaultProp(props.floatNumber, true, 'boolean');
	var onChange = props.onChange;

	var handleChange = function (value) {
		if (value.toString().length <= maxLength) {
			onChange(value);
		}
	}
	var formatDecimal = function(value) {
		return value;
	}
	switch (mode) {
		case 'display':
		case 'filter-readonly':
			var readOnlyFieldProps = {
				value: formatValueForDisplay && !!value ? formatDecimal(value) : value
			}
			return ReadOnlyField(readOnlyFieldProps)
		case 'filter':
		case 'wizard':
		case 'edit':
			var NumericalInputProps = {
				value: value,
				onChange: handleChange,
				allowFloatNumbers: floatNumber
			}
			return NumericalInput(NumericalInputProps);
	}
}

function IntType(props){
	props.maxLength = 9;
	props.formatValueForDisplay = false;
	props.floatNumber = false;
	return DecimalType(props)
}