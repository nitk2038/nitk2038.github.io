
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

  async function addNewTask(task) {
    const docRef = await addDoc(ref, {
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