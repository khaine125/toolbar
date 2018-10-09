define(function() {
	function createListItem(elementConfig) {
		var imageElement, labelElement,
			listItemContainer = document.createElement('li'),
			imageSource = elementConfig.source,
			textLabel = elementConfig.textLabel;
		
		if (imageSource) {
			imageElement = document.createElement('img');
			imageElement.src = imageSource;
			listItemContainer.appendChild(imageElement);
		}
		
		if (textLabel) {
			labelElement = document.createElement('span');
			labelElement.innerHTML = textLabel;
			listItemContainer.appendChild(labelElement);
		}
		
		return listItemContainer;
	};
	
	return {
		init: function(data) {
			var tempElementsContainer,
				elementsContainer = data.destinationElement;
				
			this.listItems = new Array();
			this.elementsData = data.elementsData;
			tempElementsContainer = this.buildElements(data.elementsData);
			
			elementsContainer.appendChild(tempElementsContainer);
			console.log(data);
		},
		
		buildElements: function(elementsData) {
			var tempElementsContainer = document.createDocumentFragment()
				unorderedListElements = {},
				self = this;;
			
			elementsData.map(function(element) {
				debugger;
				var itemContainerId = element.itemContainerId,
					listContainer = unorderedListElements[itemContainerId], 
					listContainerItem;
				
				if (listContainer === undefined) {
					listContainer = document.createElement('ul');
					listContainer.id = itemContainerId;
					unorderedListElements[itemContainerId] = listContainer;
				}
				
				listContainerItem = createListItem(element);
				self.listItems.push(listContainerItem);
				listContainer.appendChild(listContainerItem);
			});
			
			Object.keys(unorderedListElements).map(function(list) {
				var unorderedListElement = unorderedListElements[list];
				tempElementsContainer.appendChild(unorderedListElement);
			});
			
			return tempElementsContainer;
		}
	};
});

/*
{
	itemContainerId: 'group1',
	source: './ikone/toolbar-btn-hyperlink.svg',
	textLabel: 'All hyperlinks'
}
*/

/*
<ul id="group1">
	<li>
		<img src="./ikone/toolbar-btn-hyperlink.svg" />
		<span>All Hyperlinks</span>
	</li>
</ul>
*/