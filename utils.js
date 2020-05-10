
var container = document.getElementById('vanila-root');

function getComponent(component, controlFactory) {
	var extraModelComponent;
	switch (component.Code) {
		case ControlsCode.IntCode.toString():
			extraModelComponent = IntType(component);
			break;
		case ControlsCode.BigDecimalCode.toString():
			extraModelComponent = 'Im BigDecimalType';
			break;
		case ControlsCode.TextCode.toString():
			extraModelComponent = 'Im TextType';
			break;
		case ControlsCode.EmailCode.toString():
			extraModelComponent = 'Im EmailType';
			break;
		case ControlsCode.BooleanCode.toString():
			extraModelComponent = 'Im EmailType';
			break;
		case ControlsCode.DateCode.toString():
			extraModelComponent = 'Im DateType';
			break;
		case ControlsCode.DateTimeCode.toString():
			extraModelComponent = 'Im DateTimeType';
			break;
		case ControlsCode.MultiSelectCode.toString():
			extraModelComponent = 'Im MultiSelectType';
			break;
		case ControlsCode.UniqueidentifierCode.toString():
			extraModelComponent = 'Im UniqueidentifierType';
			break;
		case ControlsCode.AutoIncrementCode.toString():
			extraModelComponent = 'Im AutoIncrementType';
			break;
		case ControlsCode.GenderCode.toString():
			extraModelComponent = 'Im GenderType';
			break;
		case ControlsCode.ImageCode.toString():
			extraModelComponent = 'Im ImageType';
			break;
		case ControlsCode.FileCode.toString():
			extraModelComponent = 'Im FileType';
			break;
		case ControlsCode.StringCode.toString():
			var el = document.createElement('p');
			el.innerHTML = 'Im StringType'
			extraModelComponent = el;
			break;
		case ControlsCode.TelCode.toString():
			extraModelComponent = 'Im TelType';
			break;
		case ControlsCode.TimeCode.toString():
			extraModelComponent = 'Im TimeType';
			break;
		case ControlsCode.UrlCode.toString():
			extraModelComponent = 'Im UrlType';
			break;
		case ControlsCode.GridCode.toString():
			extraModelComponent = 'Im GridType';
			break;
		case ControlsCode.InsertTimeStampCode.toString():
			extraModelComponent = 'Im InsertTimeStampType';
			break;
		case ControlsCode.DidgahStaffCode.toString():
			extraModelComponent = 'Im DidgahStaffType';
			break;
		case ControlsCode.DidgahContactCode.toString():
			extraModelComponent = 'Im DidgahContactType';
			break;
		default:
			extraModelComponent = controlFactory(component);
			break;
	}
	return extraModelComponent;
}

function ExtraModel(props) {
	var controlFactory = function () { return null };
	var mode = 'edit';
	var downloadUrl = '';
	var onCreated = function () { return null };
	var formDescriptor = props.formDescriptor;
	var form = props.form;
	var mode = props.mode;
	var controlFactory = props.controlFactory;
	var downloadUrl = props.downloadUrl;

	var renderGroupedItems = function () {
		return formDescriptor.map(function (container) { return renderControl(container) });
	}

	var renderControl = function (control) {
		if (control.Type == ControlType.Container) {
			return getContainer(control);
		}
		else if (control.Type == ControlType.Component) {
			return renderComponent(control);
		} else {

			throw 'Renderer was not found for controlType = ' + control.Type
		}
	};

	var renderComponent = function (component) {
		var extraModelComponent = getComponent(component, controlFactory);
		return extraModelComponent;

	}

	var getContainer = function (container) {
		if (container.Code == ContainerCode.Fieldset.toString()) {
			var fieldset = document.createElement('FIELDSET');
			fieldset.setAttribute('legend', container.Attributes.Title);
			container.Children.map(function (child) {
				fieldset.appendChild(renderControl(child))
			})
			return fieldset;
		} else if (container.Code == ContainerCode.FormRow.toString()) {
			var formRow = document.createElement('div');
			container.Children.map(function (child) {
				fieldset.appendChild(renderControl(child))
			})
			return formRow
		}
		throw 'Container which its code = ' + container.Code + 'was not found.';
	}

	var form = document.createElement('form');
	renderGroupedItems().map(function (child) {
		form.appendChild(child) 
	})

	return form;
}