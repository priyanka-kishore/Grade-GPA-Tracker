var toggleGrade = false, toggleGPA = false;

function displayGradeCalc() {
    toggleGrade = true;
    if (toggleGPA) {
        document.getElementById("gpaTracker").style.display = "none";
    }
    document.getElementById("gradeTracker").style.display = "block";
}

function displayGPACalc() {
    toggleGPA = true;
    if (toggleGrade) {
        document.getElementById("gradeTracker").style.display = "none";
    }
    document.getElementById("gpaTracker").style.display = "block";
}

// CODE FOR GPA TRACKER

function initValues() {
    var courseName = document.getElementById("course-input").value;
    var numCredits = document.getElementById("credits-input").value;
    var gradeVal = document.getElementById("grade-input").value;
    
    addRow(courseName, numCredits, gradeVal);
    calculateTotals();
}

function addRow(course, credits, gradeVal) {
    var table = document.getElementById("gpaTable");
    var rowCount = table.getElementsByTagName("tr").length; // length of array that returned all "tr" tags
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0); // insert first col
    var cell2 = row.insertCell(1); // insert second col
    var cell3 = row.insertCell(2); // insert third col
    var remove = row.insertCell(3);

    cell1.innerHTML = course;
    cell2.innerHTML = credits;
    cell3.innerHTML = gradeVal;
    remove.innerHTML = '<button type="button" id="deleteBtn" onclick="deleteCourse(this)">DELETE</button>';
}

function deleteCourse(currRow) {
    var r = currRow.parentNode.parentNode;

    r.cells[1].innerHTML = 0;
    r.cells[2].innerHTML = 0;
    calculateTotals();
    r.parentNode.removeChild(r);
}

function calculateTotals() {
    var totalCreds = 0, sumQP = 0, currCreds;
    var table = document.getElementById("gpaTable");

    for (var i = 1; i < table.rows.length; i++) {
        currCreds = parseInt(table.rows[i].cells[1].innerHTML) || 0;
        totalCreds += currCreds;
        sumQP += (parseFloat(table.rows[i].cells[2].innerHTML) || 0) * currCreds;
    }
    document.getElementById("calc-cred").innerHTML = totalCreds;
    if (totalCreds != 0) {
        document.getElementById("calc-gpa").innerHTML = (sumQP/totalCreds).toFixed(2);
    } else {
        document.getElementById("calc-gpa").innerHTML = "0";
    }
    
}

// CODE FOR GRADE TRACKER

function initAssignment() {
    var assignment = document.getElementById("assignment-input").value;
    var pointsEarned = document.getElementById("pts-earned").value;
    var maxPoints = document.getElementById("pts-max").value;
    var weight = document.getElementById("weight").value;

    addAssignment(assignment, pointsEarned, maxPoints, weight);
    calculateGrade();
}

function addAssignment(assignment, pointsEarned, maxPoints, weight) {
    var table = document.getElementById("gradeTable");
    var rowCount = table.getElementsByTagName("tr").length; // length of array that returned all "tr" tags
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0); // insert task col
    var cell2 = row.insertCell(1); // insert earned pts col
    var cell3 = row.insertCell(2); // insert max pts col
    var cell4 = row.insertCell(3); // insert weight col
    var remove = row.insertCell(4);

    cell1.innerHTML = assignment;
    cell2.innerHTML = pointsEarned;
    cell3.innerHTML = maxPoints;
    cell4.innerHTML = weight;
    remove.innerHTML = '<button type="button" id="deleteBtn" onclick="deleteAssignment(this)">DELETE</button>'; 
}

function calculateGrade() {
    var sum = 0, earned, max, percent, sumPercent = 0;
    var table = document.getElementById("gradeTable");

    for (var i = 1; i < table.rows.length; i++) {
        earned = parseInt(table.rows[i].cells[1].innerHTML) || 0;
        max = parseInt(table.rows[i].cells[2].innerHTML) || 0;
        percent = parseFloat(table.rows[i].cells[3].innerHTML) || 0;

        sumPercent += percent;
        sum += earned / max * percent;
    }

    document.getElementById("calc-grade").innerHTML = (sum / sumPercent * 100).toFixed(3);
}

function deleteAssignment(currRow) {
    var r = currRow.parentNode.parentNode;

    r.cells[1].innerHTML = 0;
    r.cells[2].innerHTML = 0;
    r.cells[3].innerHTML = 0;
    calculateGrade();
    r.parentNode.removeChild(r);
}