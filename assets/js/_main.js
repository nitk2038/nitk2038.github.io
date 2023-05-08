/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function() {
  // FitVids init
  $("#main").fitVids();

  // Sticky sidebar
  var stickySideBar = function() {
    var show =
      $(".author__urls-wrapper button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  stickySideBar();

  $(window).resize(function() {
    stickySideBar();
  });

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function() {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function() {
      $(".search-content input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).has("> img").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  $('.page__content').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
      var anchor = document.createElement("a");
      anchor.className = 'header-link';
      anchor.href = '#' + id;
      anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas fa-link\"></i>';
      anchor.title = "Permalink";
      $(this).append(anchor);
    }
  });
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/analytics";
import { getFirestore, collection, query, orderBy, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdvPwIeQQmAv6ysvI0DGTcrtok6lI_sFg",
  authDomain: "meongju0o0-gitblog-todolist.firebaseapp.com",
  projectId: "meongju0o0-gitblog-todolist",
  storageBucket: "meongju0o0-gitblog-todolist.appspot.com",
  messagingSenderId: "55477124340",
  appId: "1:55477124340:web:e266e2c5fbddda37d572a1",
  measurementId: "G-P1WDJX7EK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let ref = db.collection('tasks')
let dragSrcEl = null;

function createListItem(taskId, task) {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-task-id', taskId);
  listItem.setAttribute('draggable', 'true');
  listItem.addEventListener('dragstart', dragStartHandler);
  listItem.addEventListener('dragover', dragOverHandler);
  listItem.addEventListener('drop', dropHandler);
  listItem.addEventListener('dragleave', dragLeaveHandler);
  listItem.addEventListener('dragend', dragEndHandler);

  const taskNumber = document.createElement('span');
  taskNumber.className = 'task-number';
  listItem.appendChild(taskNumber);

  const taskContent = document.createElement('span');
  taskContent.className = 'task-content';
  taskContent.textContent = task;
  listItem.appendChild(taskContent);

  const taskButtons = document.createElement('div');
  taskButtons.className = 'task-buttons';
  listItem.appendChild(taskButtons);

  const statusButton = createStatusButton();
  taskButtons.appendChild(statusButton);

  return listItem;
}

function dragStartHandler(e) {
  e.stopPropagation();
  dragSrcEl = this;
  dragSrcEl.style.opacity = '0.5';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', '');
  e.dataTransfer.setData('text/html', this.innerHTML);
  e.dataTransfer.setData('index', Array.from(dragSrcEl.parentElement.children).indexOf(dragSrcEl));
}

function dragOverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const target = e.target.closest('li');
  if (!target) {
    return;
  }
  const rect = target.getBoundingClientRect();
  const offsetY = e.clientY - rect.top;
  const direction = offsetY > rect.height / 2 ? 'bottom' : 'top';
  target.style.border = 'none';
  target.style.borderBottom = direction === 'bottom';
  target.style.borderTop = direction === 'top';
}

function dropHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  const srcIndex = parseInt(e.dataTransfer.getData('index'));
  const target = e.target.closest('li');
  if (!target) {
    return;
  }
  const dstIndex = Array.from(target.parentElement.children).indexOf(target);
  const parentNode = target.parentNode;
  const srcItem = parentNode.children[srcIndex];
  const dstItem = parentNode.children[dstIndex];
  const direction = target.style.borderTop ? 'before' : 'after';
  if (direction === 'before') {
    parentNode.insertBefore(srcItem, dstItem);
  } else {
    parentNode.insertBefore(srcItem, dstItem.nextSibling);
  }
  target.style.border = 'none';
  dragSrcEl.style.opacity = '1';
  updateTaskNumbers();
}

function dragLeaveHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target.closest('li');
  if (!target) {
    return;
  }
  target.style.border = 'none';
}

function dragEndHandler(e) {
  e.stopPropagation();
}

function statusButtonClick(e) {
  const buttonStates = ['Not Yet', 'Started', 'Done', 'Delete', '_'];
  let currentState = buttonStates.indexOf(e.target.innerText);
  currentState = (currentState + 1) % buttonStates.length;
  e.target.innerText = buttonStates[currentState];
  if (e.target.innerText === '_') {
    e.target.closest('li').remove();
    updateTaskNumbers();
  }
}

function updateTaskNumbers() {
  const listItems = document.querySelectorAll('#todoList li');
  listItems.forEach((item, index) => {
    const taskNumber = item.querySelector('.task-number');
    taskNumber.textContent = (index + 1).toString();
  });
}

function createStatusButton() {
  const statusButton = document.createElement('button');
  const buttonStates = ['Not Yet', 'Started', 'Done', 'Delete', '_'];
  let currentState = 0;
  statusButton.innerText = buttonStates[currentState];
  statusButton.addEventListener('click', statusButtonClick);
  return statusButton;
}

function addNewTask(task) {
  const docRef = addDoc(ref, {
    task: task,
    state: 'Not Yet',
    createdAt: new Date().toISOString()
  });
  const taskId = docRef.id;
  const listItem = createListItem(taskId, task);
  document.getElementById('todoList').appendChild(listItem);
  updateTaskNumbers();
}


function addTask() {
  var task = document.getElementById('todoInput').value;
  if (task.trim() !== "") {
    addNewTask(task);
    document.getElementById('todoInput').value = "";
  }
}

document.getElementById('todoInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

document.getElementById('addTodo').addEventListener('click', function () {
  addTask();
});

function loadTasksFromFirestore() {
  const tasksQuery = query(collection(db, 'tasks'), orderBy('createdAt'));
  onSnapshot(tasksQuery, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const taskId = change.doc.id;
      if (change.type === 'added') {
        const listItem = createListItem(taskId, data.task);
        document.getElementById('todoList').appendChild(listItem);
      } else if (change.type === 'removed') {
        const listItem = document.querySelector(`li[data-task-id="${taskId}"]`);
        if (listItem) {
          listItem.remove();
        }
      }
    });
    updateTaskNumbers();
  });
}

loadTasksFromFirestore();