define(['helpers'], function(helpers) {
	var createDropDownElement, createImageElement, createTextLabel, createListItem,
		addEvent = helpers.addEvent,
		eventEmitter = helpers.eventEmitter;
	
	function createInputElement() {
		var inputElement = document.createElement('input');
		inputElement.type = 'text';
		
		return inputElement;
	}
	
	createDropDownElement = function(elementConfig, inputValuesKeys) {
		var defaultValue = elementConfig.defaultValue,
			inputValues = elementConfig.inputValues,
			dropDownElement = document.createElement('select');
		
		inputValuesKeys.map(function(value) {
			var option = document.createElement('option');
			option.value = value;
			option.text = inputValues[value];
			dropDownElement.appendChild(option);
		});
		
		dropDownElement.value = defaultValue;
		
		return dropDownElement;
	};
	
	createImageElement = function(imageSource) {
		var imageElement = document.createElement('img');
		imageElement.src = imageSource;
		
		return imageElement;
	};
	
	createTextLabel = function(textLabel) {
		var labelElement = document.createElement('span');
		labelElement.innerHTML = textLabel;
		
		return labelElement;
	};
	
	createListItem = function(elementConfig) {
		var inputValues = elementConfig.inputValues,
			inputValuesKeys = inputValues ? Object.keys(inputValues) : {},
			listItemContainer = document.createElement('li'),
			imageSource = elementConfig.source,
			textLabel = elementConfig.textLabel;
		
		if (imageSource) {
			listItemContainer.appendChild(createImageElement(imageSource));
		}
		
		if (textLabel) {
			listItemContainer.appendChild(createTextLabel(textLabel));
		}
		
		if (inputValues && inputValuesKeys.length === 0) {
			listItemContainer.appendChild(createInputElement());
		} else if (inputValues && inputValuesKeys.length > 0) {
			listItemContainer.appendChild(createDropDownElement(elementConfig, inputValuesKeys));
		}
		
		return listItemContainer;
	};
	
	return {
		init: function(data) {
			var tempElementsContainer,
				elementsContainer = data.destinationElement;
				
			this.types = {
				BUTTON: 'button'
			};
			
			eventEmitter(this);
			this.listItems = [];
			this.elementsData = data.elementsData;
			tempElementsContainer = this._buildElements(data.elementsData);
			
			elementsContainer.appendChild(tempElementsContainer);
		},
		
		destroy: function() {
			
		},
		
		_buildElements: function(elementsData) {
			var tempElementsContainer = document.createElement('div'),
				unorderedListElements = {},
				self = this;
			
			elementsData.map(function(element) {
				var itemContainerId = element.itemContainerId,
					listContainer = unorderedListElements[itemContainerId], 
					listItemContainer, itemEvent;
				
				if (listContainer === undefined) {
					listContainer = document.createElement('ul');
					listContainer.id = itemContainerId;
					unorderedListElements[itemContainerId] = listContainer;
				}
				
				listItemContainer = createListItem(element);
				listItemContainer.setAttribute('controlEventName', element.controlEventName);
				//listItemContainer.setAttribute('controlEventName', element.controlEventName);
				
				/*if (element.controlEventName) {
					itemEvent = addEvent(listItemContainer, 'click', function() {
						self._setEventListener(listItemContainer, element);
					});
				}*/
				
				//self.listItems.push(listItemContainer);
				//self.elementsCache[listItemContainer] = element;
				listContainer.appendChild(listItemContainer);
			});
			
			Object.keys(unorderedListElements).map(function(list) {
				var unorderedListElement = unorderedListElements[list];
				tempElementsContainer.appendChild(unorderedListElement);
			});
			
			return tempElementsContainer;
		},
		
		_setEventListener: function(listItemContainer, element) {
			var selectedElement = event.target;
			debugger;
			if (element.useToggle && selectedElement.className) {
				selectedElement.className = '';
			} else if (element.useToggle) {
				selectedElement.className = 'selected';
			}
			
			this.emit(element.controlEventName);
			console.log('eto klino sam: ' + element.controlEventName);
		}
	};
});