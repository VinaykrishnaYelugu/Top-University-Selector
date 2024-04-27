let url = "http://universities.hipolabs.com/search?name=";

let dataset;

let btnObj = document.querySelector("button");
let deshObj = document.querySelector("#desh_id");
let stateObj = document.querySelector("#state_id");
let ulObj = document.querySelector("#list_id");

function createOptionElement( value , ID ) {
    let obj = document.createElement("option");
    obj.setAttribute( 'id' , ID );
    obj.innerText = value;
    return obj;
}

function createLiElement( value ) {
   let obj = document.createElement("li");
   let divObj = document.createElement("div");
   obj.append( divObj );
   obj.innerText = value;
   return obj;
}


async function addCountries() {
    let countryObjs = {};
    for( let i=0 ; i<dataset.length ; i++ ) {
         countryObjs[ dataset[i]["country"] ] = 1;
    }

    for( country in countryObjs ) {
        let optnObj = createOptionElement(country,"cId");
        console.log( country );
        deshObj.append( optnObj );
    }
}

function removePrevStates() {
    let delElements = document.querySelectorAll("#state_id>#sId");
    for( let i=0 ; i<delElements.length ; i++ ) {
        stateObj.removeChild(delElements[i]);
    }
}

function removePrevColleges() {
    let prevClgs = document.querySelectorAll("#list_id>li");
    for( let i=0 ; i<prevClgs.length ; i++ ) {
       ulObj.removeChild( prevClgs[i] );
    }
}

async function addStatesIn( desh ) {
    removePrevStates();  // removes existing elements
    console.log(" Removed Existing Elements !!!");
    let stateObjs = {};
    for( let i=0 ; i<dataset.length ; i++ ) {
        if( dataset[i]["country"]==desh ) {
            stateObjs[ dataset[i]["state-province"] ] = 1;
            console.log(stateObjs[ dataset[i]["state-province"] ] + " " + desh );
        }
    }

    console.log( stateObjs );

    for ( state in stateObjs ) {
        let optnObj = createOptionElement(state,"sId");
        console.log( state );
        stateObj.append( optnObj );
    }
}

deshObj.addEventListener( "change" , async ()=>{
    let country = deshObj.selectedOptions[0].innerText;
    await addStatesIn( country );
});

async function initiateProcess() {
    let dataValues = await axios.get(url);
    dataset = dataValues.data;
    // console.log( dataset ); // dataset is an Array of Objects...

    await addCountries(); // adds all countries in Select box-1 options
}

async function addUniversities( desh , rashtr ) {
   removePrevColleges();

   let clgObjs = {};
   for( let i=0 ; i<dataset.length ; i++ ) {
       if( dataset[i]["country"]==desh && dataset[i]["state-province"]==rashtr ) {
            clgObjs[ dataset[i]["name"] ] = 1;
       }
   }
   console.log( clgObjs );

   for( clg in clgObjs ) {
     let liObj = createLiElement( clg );
     ulObj.append( liObj );
   }

}

btnObj.addEventListener( "click" , ()=>{
    let country = deshObj.selectedOptions[0].innerText;
    let state = stateObj.selectedOptions[0].innerText;
    console.log( country + " - " + state );
    addUniversities( country , state );
});

initiateProcess();








































// async function addCountries() {
//     let dataValues = await axios.get("http://universities.hipolabs.com/search?name");
//     let dataValArr = dataValues.data;
//     console.log( dataValArr );

//     let countriesArr={};
//     for( let i=0 ; i<dataValArr.length ; i++ ) {
//         countriesArr[ dataValArr[i].country ] = 1;    
//     }

//     for( objs in countriesArr ) {
//         let optnObj = document.createElement("option");
//         optnObj.innerText = objs;
//         deshObj.append( optnObj );
//     }
// }

// async function addStates( country ) {
//    let dataValues = await axios.get("http://universities.hipolabs.com/search?country="+country+"&state-province");
//    let dataValArr = dataValues.data;
//    console.log( dataValArr );

//    let statesArr = {};
//    for( let i=0 ; i<dataValArr.length ; i++ ) {
//       statesArr[ dataValArr[i]["state-province"] ] = 1;
//       console.log( dataValArr[i]["name"]+" - "+dataValArr[i]["country"]+" - "+dataValArr[i]["state-province"] );
//    }

//    for( objs in statesArr ) {
//         let optnObj = document.createElement("option");
//         optnObj.setAttribute('id','sId');
//         optnObj.innerText = objs;
//         stateObj.append( optnObj );
//    }
// }


// deshObj.addEventListener( "change" , async ()=>{
//     console.log("Deleting Directories=>");
//     let deleteArr = document.querySelectorAll("#state_id>#sId");
//     for( let i=0 ; i<deleteArr.length ; i++ ) {
//         console.log(i+" : ");
//         console.dir( deleteArr[i] );
//         stateObj.removeChild( deleteArr[i] );
//     }
//     let country = deshObj.selectedOptions[0].innerText;
//     await addStates( country );
// });

// async function displayUniversities( desh , rashtr ) {
//     for( obj in universityArr ) {
//         if( obj["country"]==desh && obj["state-province"]==rashtr ) {
//             // let liObj = document.createElement("li");
//             // ulObj.append( liObj );
//             // liObj.innerText = obj["name"];
//             console.log( obj["name"] );
//         }
//     }
// }


// btnObj.addEventListener( "click" , async ()=>{
//     let country = deshObj.selectedOptions[0].innerText;
//     let state = stateObj.selectedOptions[0].innerText;
//     console.log( country+" " + state );
//     await displayUniversities( country , state );
// })


// async function addDetails() {
//     let dataValues = await axios.get(url);
//     universityArr = dataValues.data;
// }

// async function totalProcess() {
//     await addDetails();
//     await addCountries();
//     alert("LOAD COMPLETE !!");
// }

// totalProcess();




// deshObj.addEventListener( "change" , async ()=>{

//     // addCountries(countries.data.name);


// });