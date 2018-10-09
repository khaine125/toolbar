define(function() {
	function createListItem(elementConfig) {
		var imageElement, labelElement,
			listItemContainer = document.createElement('li'),
			imageSource = elementConfig.source,
			textLabel = elementConfig.textLabel,
			itemContainerId = elementConfig.itemContainerId;
		
		l
		
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
		
		listContainer.appendChild(listItemContainer);
		
		return listContainer;
	};
	
	return {
		init: function(data) {
			var tempElementsContainer,
				elementsContainer = data.destinationElement;
				
			this.elementsData = data.elementsData;
			tempElementsContainer = this.buildElements(data.elementsData);
			
			elementsContainer.appendChild(tempElementsContainer);
			console.log(data);
		},
		
		buildElements: function(elementsData) {
			var tempElementsContainer = document.createDocumentFragment()
				unorderedListElements = new Array();
			
			elementsData.map(function(element) {
				var itemContainerId = element.itemContainerId
					listContainer;
				
				if (unorderedListElements[itemContainerId] === undefined) {
					listContainer = document.createElement('ul');
					listContainer.id = itemContainerId;
				}
				
				tempElementsContainer.appendChild(createListItem(element));
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