//define global variables select dom element

const selectZone = document.querySelector('.selectZone'); //行政區的下拉選單
const  hotZone = document.querySelector('.hotZone'); //熱門地區
const list = document.querySelector('.list');
const mainTitle = document.querySelector('.mainTitle'); 

// attach event listener after the page has loaded
selectZone.addEventListener('change', clickChangeContent, false);
hotZone.addEventListener('click', hotList, false);

// fetch data and populate dropdown on page load

let localData =[];
function getData () {fetch('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
  .then(res => res.json())
  .then(data => {
    localData = data.result.records//data.result.records??
    displayData(); // Display all data initially
    changeArea(); //Populate the dropdown / related to the asynchronous behavior, Call the function here
  }) 

}


// filter data based on selected zone

function filterArea(zone){
let selectZone = [];
localData.forEach(item => {
  if(item.Zone === zone ) {
    selectZone.push(item)
  } else if (item.Zone === '請選擇行政區'){
    selectZone.push(item)
  }
});

mainTitle.innerHTML = zone;  //why isn't a selectZone;
}


// update Dom with the filtered data

function displayData(){
  let str = '';
  localData.forEach(item => {
    str += ` <li>
    <div class = "areaContent">
        <div class="area_image" style = "background : url(${item.Picture1}) center / cover">
            <h3>${item.Name}</h3>
            <p>${item.Zone}</p>
    </div>
    <div class = "areaInfo">
        <ul>
        <li><img class="icon" src="img/icons_clock.png" alt="clock">${item.Opentime}</li>
        <li><img class="icon" src="img/icons_pin.png" alt="pin">${item.Add}</li>
        <li><img class="icon" src="img/icons_phone.png" alt="clock">${item.Tel}</li>
        </ul>
      </div>
    </div>
  </li>`;
  });

  list.innerHTML = str;
}


// function to populate the dropdown with unique zones
function changeArea(){  

  let listZone = new Set();
  localData.forEach(items => listZone.add(items.Zone));

  let strOption = '<option value = "請選擇行政區" disabled selected> -- 請選擇行政區 -- </option></option><option value="全部">全部</option>';
  
  listZone.forEach(zone =>
  strOption += `<option value ="${zone}"> ${zone} </option>`
  );

  selectZone.innerHTML = strOption;

  displayData();

}


function clickChangeContent(e){
  let strSelected = '';
  localData.forEach((item)=>{
  if(e.target.value === item.Zone){
    let content = ` <li>
    <div class = "areaContent">
        <div class="area_image" style = "background : url(${item.Picture1}) center / cover">
            <h3>${item.Name}</h3>
            <p>${item.Zone}</p>
    </div>
    <div class = "areaInfo">
        <ul>
        <li><img class="icon" src="img/icons_clock.png" alt="clock">${item.Opentime}</li>
        <li><img class="icon" src="img/icons_pin.png" alt="pin">${item.Add}</li>
        <li><img class="icon" src="img/icons_phone.png" alt="clock">${item.Tel}</li>
        </ul>
      </div>
    </div>
  </li>`;

  strSelected+=content;
  list.innerHTML = strSelected;
  mainTitle.textContent = item.Zone; //注意這！
  }else if( e.target.value === '全部'){
    displayData();
  }
})
}

function hotList(e){
  if(e.target.nodeName == 'INPUT'){ 
    clickChangeContent(e);
  }
}
//e.target.nodeName == 'INPUT'也可以換成 e.target.type === 'button

getData();
       
        





//Data
//取得api (用這個跑不出來)
// var xhr = new XMLHttpRequest();
// xhr.open('get', apiLink, false );
// xhr.send(null);
// console.log(xhr.response)

// /*過濾*/
 // //將過濾資料放入 filterOption
// let filterOption = option.filter(function(item,index){
//     return option.indexOf(item) === index;
 // })
 // let strOption = '<option value="請選擇行政區" disabled selected>--請選擇行政區--</option><option value="全部">全部</option>';
 // filterOption.forEach(function(item){
 //     strOption += `<option value="${item}">${item}</option>`;
// })
 // selectZone.innerHTML = strOption;

 // function changeArea(){
//     let option = [];
//     localData.forEach(items => {
//         let zone = items.Zone;
//         option.push(zone);
//         console.log(option);
//     })
// }

// to filter out repeated options 
// use Set to store Zone 



//我在寫的時候順序不對會造成取值的runtime出錯 就會顯示不出來
