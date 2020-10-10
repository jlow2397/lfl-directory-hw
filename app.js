// Your work here

// adding styles element
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
// appending styles to <head> in html
document.getElementsByTagName('HEAD')[0].appendChild(link);

// CREATE SIDE NAV START
var sideNode = document.createElement("div");

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

for (let i = 0; i < employeeList.length; i++) {
  var employee = addEmployee(employeeList[i]);
  employeeNode.appendChild(employee);
}
employeeNode.classList.add('employeeList');
document.body.appendChild(employeeNode);
// EMPLOYEE LIST END

// VIEW FUNCTIONS START
function view () {
  $('div.employeeItem').removeClass('hidden');
  // $('form.addForm').addClass('hidden');
  var forms = document.querySelectorAll('form');
  if (forms[0] != undefined) {
    document.body.removeChild(forms[0]);
  }
}

function viewForm (options) {
  $('div.employeeItem').addClass('hidden');
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
}

function addShortForm (type) {
  var className = (type == 'Verify') ? 'verifyForm' : 'deleteForm';
  // add form
  var verifyForm = document.createElement("form");

  var verifyName = document.createElement("input");
  verifyName.id = "verifyName";
  var label = document.createElement("label");
  label.htmlFor = "verifyName";
  label.innerHTML = "Name";
  verifyForm.appendChild(label);
  verifyForm.appendChild(verifyName);

  var sub = document.createElement("input");
  sub.setAttribute("type", "submit");
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

  // var button = document.createElement("button");
  // button.innerHTML = type + " Employee";
  // button.addEventListener ("click", function(e) {
  //   e.preventDefault();
  //   alert(verifyEmployee(verifyName.value));
  // });
  // verifyForm.appendChild(button);

  verifyForm.classList.add(className);

  document.body.insertBefore(verifyForm, employeeNode);
}

function addLongForm (type) {
  var className = (type == 'Add') ? 'addForm' : 'updateForm';
  // add form
  var addForm = document.createElement("form");

  var addName = document.createElement("input");
  addName.id = "addName";
  var label = document.createElement("label");
  label.htmlFor = "addName";
  label.innerHTML = "Name";
  addForm.appendChild(label);
  addForm.appendChild(addName);

  var addNumber = document.createElement("input");
  addNumber.id = "addNumber";
  var label = document.createElement("label");
  label.htmlFor = "addNumber";
  label.innerHTML = "Office Number";
  addForm.appendChild(label);
  addForm.appendChild(addNumber);

  var addPhone = document.createElement("input");
  addPhone.id = "addPhone";
  var label = document.createElement("label");
  label.htmlFor = "addPhone";
  label.innerHTML = "Phone Number";
  addForm.appendChild(label);
  addForm.appendChild(addPhone);

  var sub = document.createElement("input");
  sub.setAttribute("type", "submit");
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

    view();
  };

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

  employeeList.push(employee);

  console.log('Employee Added!');
  // console.log(employeeList);

  var employeeDOM = addEmployee(employee);
  var list = document.getElementsByClassName("employeeList");
  // console.log(list);
  list[0].appendChild(employeeDOM);

  alert('Employee Added to DOM!');
  view();
}

function addEmployee(employee) {
  var divNode = document.createElement("div");

  var node = document.createElement("p");
  var nameNode = document.createTextNode('Name: ' + employee.name );
  node.appendChild(nameNode);
  divNode.appendChild(node);

  var node = document.createElement("p");
  var officeNode = document.createTextNode('Office: ' + employee.officeNum);
  node.appendChild(officeNode);
  divNode.appendChild(node);

  var node = document.createElement("p");
  var phoneNode = document.createTextNode('Phone: ' + employee.phoneNum);
  node.appendChild(phoneNode);
  divNode.appendChild(node);
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
    // update array
    employeeList[exists].officeNum = officeNum;
    employeeList[exists].phoneNum = phoneNum;

    // update HTML
    var list = document.querySelectorAll("div.employeeItem");
    console.log(list);
    var oldEmployee = list[exists];
    console.log(oldEmployee);
    var newEmployee = addEmployee({name,officeNum,phoneNum});
    newEmployee.classList.add('hidden');
    console.log(newEmployee);

    employeeNode.insertBefore(newEmployee, oldEmployee);
    employeeNode.removeChild(oldEmployee);

    return true;
  }
  else {
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
    employeeList.filter(employee => employee.name != name);

    // update HTML
    var list = document.querySelectorAll("div.employeeItem");
    console.log(list);
    var oldEmployee = list[exists];
    console.log(oldEmployee);

    employeeNode.removeChild(oldEmployee);

    return true;
  }
  else {
    return false;
  }
}
