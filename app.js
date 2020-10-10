// Your work here

// adding styles element
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
// appending styles to <head> in html
document.getElementsByTagName('HEAD')[0].appendChild(link);

// CREATE SIDE NAV START
var sideNode = document.createElement("div");

// create logo
var logo = document.createElement("img");
logo.src = 'images/lfl.png';
logo.width = 80;
sideNode.appendChild(logo);

var buttons = ['Add','Verify','Update','Delete'];

var button = document.createElement("button");
button.innerHTML = "View";
button.addEventListener ("click", function() {
  view();
});
sideNode.appendChild(button);

for (let i = 0; i < buttons.length; i++) {
  var button = document.createElement("button");
  button.innerHTML = buttons[i];
  button.addEventListener ("click", function() {
    viewForm(buttons[i]);
  });
  sideNode.appendChild(button);
}

document.body.appendChild(sideNode);
$("div").addClass('sideNav');
// SIDE NAV END

// EMPLOYEE LIST START
var employeeNode = document.createElement("div");

// create title
var node = document.createElement("h1");
var nameNode = document.createTextNode('Employees:');
node.appendChild(nameNode);
employeeNode.appendChild(node);

// add each employee in the model as a DOM element
for (let i = 0; i < employeeList.length; i++) {
  var employee = addEmployee(employeeList[i]);
  employeeNode.appendChild(employee);
}
employeeNode.classList.add('employeeList');
document.body.appendChild(employeeNode);
// EMPLOYEE LIST END

// VIEW FUNCTIONS START
function view () {
  $('div.employeeList').removeClass('hidden');
  // $('form.addForm').addClass('hidden');
  var forms = document.querySelectorAll('form');
  if (forms[0] != undefined) {
    document.body.removeChild(forms[0]);
  }
  toggleActive('View');
}

function toggleActive(button) {
  var buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML == button) {
      buttons[i].classList.add('active');
    }
    else {
      buttons[i].classList.remove('active');
    }
  }
}

function viewForm (options) {
  $('div.employeeList').addClass('hidden');
  var toAdd, targetClass;

  switch (options) {
    case 'Add':
      targetClass = 'addForm';
      break;
    case 'Verify':
      targetClass = 'verifyForm';
      break;
    case 'Update':
      targetClass = 'updateForm';
      break;
    case 'Delete':
      targetClass = 'deleteForm';
      break;
  }

  var forms = document.querySelectorAll('form');
  if (forms[0] != undefined && forms[0].classList.contains(targetClass)) {
    // same form already exists so nothing to do here
    console.log('same form clicked')
  }
  else {
    // if a form already exists
    if (forms[0] != undefined) {
      document.body.removeChild(forms[0]);
    }
    // add new form
    switch (options) {
      case 'Add':
        addLongForm('Add');
        break;
      case 'Verify':
        addShortForm('Verify');
        break;
      case 'Update':
        addLongForm('Update');
        break;
      case 'Delete':
        addShortForm('Delete');
        break;
    }
  }

  toggleActive(options);
}

function addShortForm (type) {
  var className = (type == 'Verify') ? 'verifyForm' : 'deleteForm';
  // add form
  var verifyForm = document.createElement("form");

  // create title
  var node = document.createElement("h1");
  var nameNode = document.createTextNode(type+ ' Employee ');
  node.appendChild(nameNode);
  verifyForm.appendChild(node);

  var verifyName = document.createElement("input");
  verifyName.id = "verifyName";
  var label = document.createElement("label");
  label.htmlFor = "verifyName";
  label.innerHTML = "Name";
  verifyForm.appendChild(label);
  verifyForm.appendChild(verifyName);

  var sub = document.createElement("input");
  sub.setAttribute("type", "submit");
  sub.classList.add('submit');
  verifyForm.appendChild(sub);

  verifyForm.onsubmit = function(e) {
    e.preventDefault();
    var alertText;

    if (type == 'Verify') {
      if (verifyEmployee(verifyName.value) === false){
        alertText = 'Employee does not exist!';
      }
      else {
        alertText = 'Employee exists! Good job remembering case-sensitive names!' ;
      }

    }
    else {
      deleteEmployee(verifyName.value) ?
        alertText = 'Employee sucessfully deleted! See you never!' :
        alertText = 'Employee does not exist!';
    }

    alert(alertText);
    view();
  };

  verifyForm.classList.add(className);

  document.body.insertBefore(verifyForm, employeeNode);
}

function addLongForm (type) {
  var className = (type == 'Add') ? 'addForm' : 'updateForm';
  // add form
  var addForm = document.createElement("form");

  // create title
  var node = document.createElement("h1");
  var nameNode = document.createTextNode(type+ ' Employee ');
  node.appendChild(nameNode);
  addForm.appendChild(node);

  // name input field
  var addName = document.createElement("input");
  addName.id = "addName";
  var label = document.createElement("label");
  label.htmlFor = "addName";
  label.innerHTML = "Name";
  addForm.appendChild(label);
  addForm.appendChild(addName);

  // office input field
  var addNumber = document.createElement("input");
  addNumber.id = "addNumber";
  var label = document.createElement("label");
  label.htmlFor = "addNumber";
  label.innerHTML = "Office Number";
  addForm.appendChild(label);
  addForm.appendChild(addNumber);

  // phone input field
  var addPhone = document.createElement("input");
  addPhone.id = "addPhone";
  var label = document.createElement("label");
  label.htmlFor = "addPhone";
  label.innerHTML = "Phone Number";
  addForm.appendChild(label);
  addForm.appendChild(addPhone);

  var sub = document.createElement("input");
  sub.setAttribute("type", "submit");
  sub.classList.add('submit');
  addForm.appendChild(sub);

  addForm.onsubmit = function(e) {
    e.preventDefault();
    if (type == 'Add') {
      addNewEmployee(addName.value,addNumber.value,addPhone.value);
      alert('New employee added! Keep growing the company boss!')
    }
    else {
      var alertText;
      updateEmployee(addName.value,addNumber.value,addPhone.value) ?
        alertText = 'Employee sucessfully updated!' :
        alertText = 'Employee does not exist!' ;

      alert(alertText);
    }
    // navigate back to view once the employee was added/updated
    view();
  };

  // add the form to the DOM
  addForm.classList.add(className);
  document.body.insertBefore(addForm, employeeNode);
}
// VIEW FUNCTIONS END

// ADD EMPLOYEE FUNCTIONS START
function addNewEmployee(name, officeNum, phoneNum) {
  var employee = {
    name,
    officeNum,
    phoneNum
  }

  // controller updates model
  employeeList.push(employee);

  console.log('Employee Added!');
  // console.log(employeeList);

  var employeeDOM = addEmployee(employee);
  var list = document.getElementsByClassName("employeeList");
  // console.log(list);
  list[0].appendChild(employeeDOM);

  // alert('Employee Added to DOM!');
  view();
}

// controller updates view in this function
function addEmployee(employee) {
  var divNode = document.createElement("div");

  // create a p element for each field in the employee
  var node = document.createElement("h3");
  var nameNode = document.createTextNode(employee.name );
  node.appendChild(nameNode);
  divNode.appendChild(node);

  var innerDivNode = document.createElement("div");

  var node = document.createElement("p");
  var officeNode = document.createTextNode('Office: ' + employee.officeNum);
  node.appendChild(officeNode);
  innerDivNode.appendChild(node);

  var node = document.createElement("p");
  var phoneNode = document.createTextNode('Phone: ' + employee.phoneNum);
  node.appendChild(phoneNode);
  innerDivNode.appendChild(node);

  divNode.appendChild(innerDivNode);
  divNode.classList.add('employeeItem');

  return divNode;
}
// ADD EMPLOYEE FUNCTIONS END

// VERIFY START
function verifyEmployee(name) {
  // iterate through all the employees in the list
  for (let i = 0; i < employeeList.length; i++) {
    // if there is a match
    if (employeeList[i].name == name) {
      // return an integer
      return i;
    }
  }

  // no name found
  return false;
}
// VERIFY END

// UPDATE START
function updateEmployee(name, officeNum, phoneNum) {
  // if the employee exists
  var exists = verifyEmployee(name);
  if (exists !== false) {
    // controller updates model
    // update array with new values for employee object
    employeeList[exists].officeNum = officeNum;
    employeeList[exists].phoneNum = phoneNum;

    // controller update HTML view
    var list = document.querySelectorAll("div.employeeItem");
    // console.log(list);
    var oldEmployee = list[exists];
    // console.log(oldEmployee);
    var newEmployee = addEmployee({name,officeNum,phoneNum});
    newEmployee.classList.add('hidden');
    // console.log(newEmployee);

    // add new employee then remove the old one while preserving placement
    employeeNode.insertBefore(newEmployee, oldEmployee);
    employeeNode.removeChild(oldEmployee);

    return true;
  }
  else {
    // employee does not exist
    return false;
  }
}
// UPDATE END

// DELETE START
function deleteEmployee(name) {
  // if the employee exists
  var exists = verifyEmployee(name);
  if (exists !== false) {
    // update array
    employeeList.splice(exists,1);
    console.log(employeeList);

    // update HTML
    var list = document.querySelectorAll("div.employeeItem");
    // console.log(list);
    var oldEmployee = list[exists];
    // console.log(oldEmployee);

    employeeNode.removeChild(oldEmployee);

    return true;
  }
  else {
    return false;
  }
}
// DELETE END

// initialize the view with the employee list
view();
