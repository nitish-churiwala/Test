let currentPage = 1;
let itemsPerPage = 5;  // Display 5 items per page
let filteredData = [];
let data = [];

// Fetch the courses JSON data
fetch('courses.json')
  .then(response => response.json())
  .then(courses => {
    data = courses;
    filteredData = data;  // Initially, filtered data is the same as all data
    displayCourses();
    setupPagination();
  });

// Function to display the courses with pagination
function displayCourses() {
  let courseList = document.getElementById('courseList');
  courseList.innerHTML = '';

  // Paginate the courses
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedCourses = filteredData.slice(start, end);

  if (paginatedCourses.length > 0) {
    let output = '<ul>';
    paginatedCourses.forEach(course => {
      output += `<li>${course.courseName} - ${course.duration} - ₹${course.fees}</li>`;
    });
    output += '</ul>';
    courseList.innerHTML = output;
  } else {
    courseList.innerHTML = '<p>No courses found.</p>';
  }
}

// Set up pagination controls dynamically
function setupPagination() {
  let paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  let totalPages = Math.ceil(filteredData.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', function () {
      currentPage = i;
      displayCourses();
    });
    paginationDiv.appendChild(pageButton);
  }
}

// Event listeners for sorting and filtering
document.getElementById('filter').addEventListener('input', function() {
  let searchTerm = this.value.toLowerCase();
  filteredData = data.filter(course => course.courseName.toLowerCase().includes(searchTerm));
  currentPage = 1;  // Reset to the first page after filtering
  displayCourses();
  setupPagination();
});

// Sort courses by name, fees, or duration dynamically without reloading
document.getElementById('sort').addEventListener('change', function() {
  let sortBy = this.value;
  
  if (sortBy === 'name') {
    filteredData.sort((a, b) => a.courseName.localeCompare(b.courseName));
  } else if (sortBy === 'feesAsc') {
    filteredData.sort((a, b) => a.fees - b.fees);
  } else if (sortBy === 'feesDesc') {
    filteredData.sort((a, b) => b.fees - a.fees);
  } else if (sortBy === 'durationAsc') {
    filteredData.sort((a, b) => a.duration.localeCompare(b.duration));
  } else if (sortBy === 'durationDesc') {
    filteredData.sort((a, b) => b.duration.localeCompare(a.duration));
  }

  currentPage = 1;  // Reset to the first page after sorting
  displayCourses();
  setupPagination();
});
