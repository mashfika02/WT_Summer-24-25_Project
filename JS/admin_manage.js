// Simple client-side manager for teachers and students using localStorage
function $(sel){return document.querySelector(sel)}

function loadJSON(key){
  try{ return JSON.parse(localStorage.getItem(key)||'[]') }catch(e){return[]}
}
function saveJSON(key,data){ localStorage.setItem(key,JSON.stringify(data)) }

// Teachers
function initTeachers(){
  const form = document.getElementById('teacherForm')
  const tbody = document.querySelector('#teacherTable tbody')
  function render(){
    const list = loadJSON('teachers')
    tbody.innerHTML = ''
    list.forEach((t,i)=>{
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${escapeHtml(t.name)}</td><td>${escapeHtml(t.dept)}</td><td>${escapeHtml(t.email)}</td><td><button data-i="${i}" class="del-btn">Remove</button></td>`
      tbody.appendChild(tr)
    })
    tbody.querySelectorAll('.del-btn').forEach(b=>b.addEventListener('click',e=>{
      const i = Number(e.currentTarget.dataset.i)
      removeTeacher(i); render()
    }))
  }
  form.addEventListener('submit',e=>{
    e.preventDefault()
    const name = $('#t_name').value.trim(); if(!name) return
    const dept = $('#t_dept').value.trim()
    const email = $('#t_email').value.trim()
    const list = loadJSON('teachers')
    list.push({name,dept,email})
    saveJSON('teachers',list)
    form.reset(); render()
  })
  render()
}
function removeTeacher(i){
  const list = loadJSON('teachers'); if(i<0||i>=list.length) return
  list.splice(i,1); saveJSON('teachers',list)
}

// Students
function initStudents(){
  const form = document.getElementById('studentForm')
  const tbody = document.querySelector('#studentTable tbody')
  function render(){
    const list = loadJSON('students')
    tbody.innerHTML = ''
    list.forEach((s,i)=>{
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.class)}</td><td>${escapeHtml(s.phone)}</td><td><button data-i="${i}" class="del-btn">Remove</button></td>`
      tbody.appendChild(tr)
    })
    tbody.querySelectorAll('.del-btn').forEach(b=>b.addEventListener('click',e=>{
      const i = Number(e.currentTarget.dataset.i)
      removeStudent(i); render()
    }))
  }
  form.addEventListener('submit',e=>{
    e.preventDefault()
    const name = $('#s_name').value.trim(); if(!name) return
    const sclass = $('#s_class').value.trim()
    const phone = $('#s_phone').value.trim()
    const list = loadJSON('students')
    list.push({name,sclass,phone})
    saveJSON('students',list)
    form.reset(); render()
  })
  render()
}
function removeStudent(i){
  const list = loadJSON('students'); if(i<0||i>=list.length) return
  list.splice(i,1); saveJSON('students',list)
}

function escapeHtml(s){ return String(s).replace(/[&<>\"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','\\':'\\\\','"':'&quot;' })[c]) }

// Expose for console/manual use
window.initTeachers = initTeachers
window.initStudents = initStudents
window.removeTeacher = removeTeacher
window.removeStudent = removeStudent
*** End Patch
