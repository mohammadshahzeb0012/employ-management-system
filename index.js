const employees = {};

// modal toggle button
const modalToggleButton = document.getElementById("modal-toggle-btn");
const modal = document.querySelector("#modal");
const form = document.getElementById("form");
const tableBody = document.querySelector("#employee-list > tbody");
const closeIcon = document.querySelector(".close-icon");

const toggleModal = () => {
    modal.classList.toggle("hide-modal")
}
modalToggleButton.addEventListener("click", () => {
    modal.classList.toggle("show-modal");
    modal.classList.toggle("hide-modal")
})

closeIcon.addEventListener("click", () => {
    modal.classList.toggle("hide-modal");
})


const deleteFunc = (event) => {
    event.target.parentNode.parentNode.remove();
}

function createNewEmployeeRecord(employee) {
    const record = document.createElement("tr");
    record.id = employee.id;  // generateng unique id

    for (let key in employee) {
        const cell = document.createElement("td");
        cell.innerText = employee[key]
        record.appendChild(cell)
    }

    const options = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.className = "material-icons";
    editButton.addEventListener("click", editRecord)

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.className = "material-icons delete";
    deleteButton.addEventListener("click", deleteFunc)



    options.append(editButton, deleteButton);
    record.appendChild(options)
    tableBody.appendChild(record)


    const rowIndex = tableBody.rows.length - 1;
    if (rowIndex % 2 == 0) {
        record.style.background = "#f5f5f5";
    }
    else {
        record.style.background = "#e0f2f8"
    }
}

let count = 1;
const getNewId = () => {
    return count++;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const employee = {
        name: form.fullName.value,
        email: form.email.value,
        id: getNewId(),
        role: form.role.value,
        doj: form.doj.value,
        gender: form.gender.value,
    }
    employees[employee.id] = employee;
    createNewEmployeeRecord(employee);
    // form.reset();

    // toggleModal()
})

const updateModal = document.getElementById("modal1");
const updateForm = document.getElementById("form1");
let editingEmployeeId = null;

function toggleUpdateModal() {
    updateModal.classList.toggle("hide-modal");
    updateModal.classList.toggle("show-modal");

}

function prefillData(employee) {
    debugger;
    for (let property in employee) {
        updateForm[property] && (updateForm[property].value = employee[property])
    }
}
const editRecord = (e) => {
    const empId = e.target.parentNode.parentNode.id;
    editingEmployeeId = empId;

    toggleUpdateModal() // opening model
    prefillData(employees[empId])
}

updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
    // Collect updated info
    const updatedInfo = {
        name: updateForm.fullName.value,
        email: updateForm.email.value,
        id: editingEmployeeId,
        role: updateForm.role.value,
        doj: updateForm.doj.value,
        gender: updateForm.gender.value,
    }
    
    // Update the employee in the employees object
    employees[editingEmployeeId] = updatedInfo;
    
    toggleUpdateModal();

    // Update the table row with new data
    const record = document.getElementById(editingEmployeeId);
    
        let tdCellIndex = 0;
        for (let property in updatedInfo) {
            record.children[tdCellIndex++].innerText = updatedInfo[property];
        }
        console.log("Record updated:", record);
    
    updateForm.reset(); // Reset the form
});
