// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc, writeBatch } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgjTZHgeW_Mj9ob8_3OYFGx_xgBoa0yH0",
    authDomain: "meongju0o0-git-blog-todolist.firebaseapp.com",
    projectId: "meongju0o0-git-blog-todolist",
    storageBucket: "meongju0o0-git-blog-todolist.appspot.com",
    messagingSenderId: "462108512601",
    appId: "1:462108512601:web:9d5a3357bbae002828fc48",
    measurementId: "G-RHKPH551R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let ref = collection(db, 'tasks')

function createListItem(taskId, task, state) {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-task-id', taskId);
  listItem.setAttribute('draggable', 'true');

  const taskHandle = document.createElement('div');
  taskHandle.className = 'task-handle';
  listItem.appendChild(taskHandle);

  const taskNumber = document.createElement('span');
  taskNumber.className = 'task-number';
  listItem.appendChild(taskNumber);

  const taskContent = document.createElement('span');
  taskContent.className = 'task-content task-handle';
  taskContent.textContent = task;
  listItem.appendChild(taskContent);

  const taskButtons = document.createElement('div');
  taskButtons.className = 'task-buttons';
  listItem.appendChild(taskButtons);

  const statusButton = createStatusButton(state);
  taskButtons.appendChild(statusButton);

  return listItem;
}

async function initializeSortable() {
  const list = document.getElementById('todoList');
  const sortable = new Sortable(list, {
    animation: 150,
    onUpdate: function () {
      updateTaskNumbers();
    },
    onEnd: async function (evt) {
      const listItems = document.querySelectorAll('#todoList li');
      listItems.forEach(async (item, index) => {
        await updateDoc(doc(db, 'tasks', item.getAttribute('data-task-id')), {
          order: index
        });
      });
    },
    handle: '.task-handle',  // Specify that only elements with 'task-handle' class can start the drag
    filter: '.task-buttons', // Prevent drag from starting when clicking on buttons
    preventOnFilter: false,  // Allow click events on filtered items
  });
}


async function statusButtonClick(e) {
  const item = e.target.closest('li');
  if (e.target.innerText === 'Delete') {
    await deleteDoc(doc(db, 'tasks', item.getAttribute('data-task-id')));
    item.remove();
    updateTaskNumbers();
    return;
  }
  const buttonStates = ['Not Yet', 'Started', 'Done', 'Delete'];
  let currentState = buttonStates.indexOf(e.target.innerText);
  currentState = (currentState + 1) % buttonStates.length;
  e.target.innerText = buttonStates[currentState];
  await updateDoc(doc(db, 'tasks', item.getAttribute('data-task-id')), {
      state: e.target.innerText
  });
}

async function updateTaskNumbers() {
    const listItems = document.querySelectorAll('#todoList li');
    listItems.forEach((item, index) => {
      const taskNumber = item.querySelector('.task-number');
      taskNumber.innerHTML = (index + 1).toString() + ".&nbsp;";
    });
  
    const batch = writeBatch(db);
  
    listItems.forEach((item, index) => {
      const taskDoc = doc(db, 'tasks', item.getAttribute('data-task-id'));
      batch.update(taskDoc, { order: index });
    });
  
    await batch.commit();
  }

function createStatusButton(initialState) {
  const statusButton = document.createElement('button');
  const buttonStates = ['Not Yet', 'Started', 'Done', 'Delete', '_'];
  let currentState = buttonStates.indexOf(initialState);
  statusButton.innerText = buttonStates[currentState];
  statusButton.addEventListener('click', statusButtonClick);
  statusButton.addEventListener('touch', statusButtonClick);
  return statusButton;
}

async function addNewTask(task) {
  const docRef = await addDoc(ref, {
    task: task,
    state: 'Not Yet',
    order: -1,
    createdAt: new Date().toISOString()
  });
  const taskId = docRef.id;
  const listItem = createListItem(taskId, task, 'Not Yet');
  document.getElementById('todoList').appendChild(listItem);
  updateTaskNumbers();
}

async function addTask() {
  var task = document.getElementById('todoInput').value;
  if (task.trim() !== "") {
    await addNewTask(task);
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

async function loadTasksFromFirestore() {
  const tasksQuery = query(collection(db, 'tasks'), orderBy('order'));
  const querySnapshot = await getDocs(tasksQuery);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const taskId = doc.id;
    const listItem = createListItem(taskId, data.task, data.state);
    document.getElementById('todoList').appendChild(listItem);
  });
  updateTaskNumbers();
}

initializeSortable();
loadTasksFromFirestore();
