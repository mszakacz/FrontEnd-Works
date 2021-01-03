var hotelsInRegion = {
    'regions': {
        "Mazowieckie": {
            "towns": {
                "Warszawa": {
                    "hotels": ["Marriott", "InterContinental", "Novotel", "Hilton"]
                }
            }
        },
        "Podlaskie": {
            "towns": {
                "Białystok": {
                    "hotels": ["Titanic", "Turkus", "Branicki", "Esperanto", "Silver"]
                },
                "Augustów": {
                    "hotels": ["Logos", "Falkowski", "Róża Wiatrów", "Hotel nad Nettą"]
                }
                
            }
        },

        "Pomorskie": {
            "towns": {
                "Gdynia": {
                    "hotels": ["Marriott", "Mercure", "Różany Gaj", "Błękitny Żagiel", "Antares"]
                },

                "Sopot": {
                    "hotels": ["Sheraton", "Radisson", "Marriott", "Haffner", "Focus"]
                },

                "Gdańsk": {
                    "hotels": ["Hampton", "Amber", "Puro", "Arkon", "Hilton", "Almond", "Qubus"]
                }
            }
        }

    }
}

var hRegionsList = document.getElementById("regions");  // HTML element (datalist) which includes available Regions
var hTownsList = document.getElementById("towns");      // HTML element (datalist) which includes available Towns
var hHotelsList = document.getElementById("hotels");    // HTML element (datalist) which includes available Hotels

var regionInput = document.getElementById("region");    // HTML element (input) which takes Region
var townInput = document.getElementById("town");        // HTML element (input) which takes Town
var hotelInput = document.getElementById("hotel");      // HTML element (input) which takes Hotel

var regionsKeys = Object.keys(hotelsInRegion.regions);  // List of Regions

var townsKeys;      // List of Towns in current Region
var curRegion;      // Region which is already input
var curTown;        // Town which is already input
var hotelsList;     // List of Hotels in current Town

let hOutputText = document.querySelector("p");      // HTML element (p) which display an output text

regionInput.addEventListener('input', updateTownsDatalist);
townInput.addEventListener('input', updateHotelsDatalist);
hotelInput.addEventListener('input', displayBooking);


function createRegionsDatalist(){
    for(let i = 0; i < regionsKeys.length; i++){
        var region = regionsKeys[i];
        var regionOpt = document.createElement("option");
        regionOpt.value = region;
        hRegionsList.appendChild(regionOpt);
    }
}

function updateTownsDatalist(event) {
    hTownsList.innerHTML = "";
    hHotelsList.innerHTML = "";
    townInput.value = "";
    hotelInput.value = "";
    hOutputText.textContent = "";

    curRegion = event.target.value;
    if(regionsKeys.includes(curRegion)){
        townsKeys = Object.keys(hotelsInRegion.regions[curRegion].towns);
        for(let i = 0; i < townsKeys.length; i++){
            var town = townsKeys[i];
            var townOpt = document.createElement("option");
            townOpt.value = town;
            hTownsList.appendChild(townOpt);
        }
    }
}

function updateHotelsDatalist(event) {
    hHotelsList.innerHTML = "";
    hotelInput.value = "";
    hOutputText.textContent = "";

    curTown = event.target.value;
    if(townsKeys.includes(curTown) && regionsKeys.includes(curRegion)){
        hotelsList = hotelsInRegion.regions[curRegion].towns[curTown].hotels;
        for(let i = 0; i < hotelsList.length; i++){
            var hotel = hotelsList[i];
            var hotelOpt = document.createElement("option");
            hotelOpt.value = hotel;
            hHotelsList.appendChild(hotelOpt);
        }
    }
    else if(!regionsKeys.includes(curRegion)) alert("Write a proper Region");
}

function displayBooking(event) {
    var curHotel = event.target.value;
    if(hotelsList.includes(curHotel) && townsKeys.includes(curTown) && regionsKeys.includes(curRegion)){
        hOutputText.textContent = "We book hotel " + curHotel + " in the " + curTown + " city (Region: " + curRegion + ")";
    }
    else {
        alert("Please select from available options");
    }    
}

createRegionsDatalist();