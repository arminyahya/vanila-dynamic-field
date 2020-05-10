var component = {
	Code: ControlsCode.IntCode.toString()
}

var formDescriptor = [
	{
		Children: [
			{
				Type: 2,
				Code: ControlsCode.StringCode.toString(),
				DataIndex: 'username',
				Label: 'UserName',
				Required: true,
				Rules: [],
				SoftwareGuid: 'abc'
			},
			{
				Type: 2,
				Code: ControlsCode.StringCode.toString(),
				DataIndex: 'password',
				Label: 'password',
				Required: true,
				Rules: [],
				SoftwareGuid: 'abc'
			}
		],
		Attributes: { Title: 'personalInfo'},
		Type: 1,
		Code: 1,
		Identifier: 'b'
	},
	{
		Attributes: { Title: 'phonenumber'},
		Type: 2,
		Code: ControlsCode.IntCode.toString(),
		Identifier: 'c'
	},
]
var extraModelProps = {
	formDescriptor:formDescriptor
};

container.appendChild(ExtraModel(extraModelProps)) 
