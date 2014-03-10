document.addEventListener('DOMContentLoaded', function () {
  	//when the document is ready, call the getCPUInformation function
  	getCPUInformation();
  	getMemoryInformation();
});

function getCPUInformation() {
	//use the get info function of the chrome system.cpu APi to retrieve the CPU 
	//information. pass the onCPURetrieved function as a callback parameter
	chrome.system.cpu.getInfo(onCPURetrieved);
}

function getMemoryInformation() {
	//use the get info function of the chrome system.memory APi to retrieve the RAM 
	//information. pass the onMemoryRetrieved function as a callback parameter
	chrome.system.memory.getInfo(onMemoryRetrieved)
}

function onCPURetrieved(info) { 
	console.log(info.features);
	//populate the information field
	var infoString = document.createElement("p");  // Create with DOM
	infoString.innerHTML= '<a href="'+ 'https://www.google.co.uk/search?q=' + encodeURIComponent(info.modelName) + '&ie=utf-8&oe=utf-8&aq=t"">' + info.modelName + '</a>';
	$('#cpuInfo').append(infoString);
}

function onMemoryRetrieved(info) {
	var capacity = info.capacity;
	var availible = info.availableCapacity;
	var inuse = capacity - availible;
	var inuseConverted = (inuse/capacity*100).toFixed(0);
	var freeConverted = 100 - inuseConverted;
	var infoString = document.createElement("p");  // Create with DOM
	infoString.innerHTML= "Memory: " + (capacity/1000000000).toFixed(2)+' GB' + ' (<span class="memoryInuse">' + inuseConverted + '%</span>)' + ' (<span class="memoryFree">' + freeConverted + '%</span>)' ;
	$('#cpuInfo').append(infoString);
}