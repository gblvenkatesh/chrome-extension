let myLeads = [];

const inputEl = document.getElementById('input-el'); // getting input field //
const ulEl = document.getElementById('ul-el'); // getting unordered list //
const saveBtn = document.getElementById('input-btn') // getting save btn //
const deleteBtn = document.getElementById('delete-btn') // getting the delete btn //
const saveTabBtn = document.getElementById('save-tab-btn'); // getting the save tab btn //

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // getting leads form the localstorage //
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage; // refresh //
    render(myLeads);
}


saveTabBtn.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                        <a href='${leads[i]}' target='_blank'>
                            ${leads[i]}
                        </a>
                      </li>`;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', function () {
    localStorage.clear(); // clearing the local storage //
    myLeads = []; // array is emty //
    render(myLeads); // clears list //
})

saveBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    render(); // calls renderLeads() function //
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // storing leads as strings in local storage //
    console.log( localStorage.getItem("myLeads") );
})

