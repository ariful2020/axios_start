const skill_list     = document.querySelector('#skill_list')
const add_new_member = document.querySelector('#add_new_member');
const edit_member    = document.querySelector('#edit_member');
const devs_show      = document.querySelector('#devs_show');
const view_modal     = document.querySelector('#view_modal .modal-body');

let skill_load = () => {
    axios.get('http://localhost:5050/skills').then(data => {
        
    let skill_data = ""; 
       data.data.map(data => {
           skill_data += `
           <option value="${data.id}"> ${data.name}</option>
          `
       })
       skill_list.insertAdjacentHTML('beforeend', skill_data)

       })
}

skill_load();

/* <td>${data.skillId}</td> */

let devs_short = () => {

    axios.get('http://localhost:5050/devs').then(res => {

        let devs_data = "";
        res.data.map((data, index) => {
            devs_data += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.mobile}</td>
                    <td>${data.salary}</td>
                    <td><img style = "width: 50px; height: 50px;" object-fit= "cover" src="${data.img}" alt=""></td>
                    <td>
                    <a class="btn btn-info" data-bs-toggle="modal" onclick="view_profile(${data.id})" href="#view_modal"><i class="fa fa-eye"></i></a>
                    <a class="btn btn-warning" data-bs-toggle="modal" onclick="edit_m_profile(${data.id})" href="#edit"><i class="fa fa-edit"></i></a>
                    <a class="btn btn-danger" data-bs-toggle="modal" onclick="delete_m(${data.id})" href="#delete"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
               `
        })
        devs_show.innerHTML = devs_data;
    })
}

devs_short()

add_new_member.addEventListener('submit', function(e){
    e.preventDefault();
    let name   = this.querySelector('input[name = "name"]');
    let email  = this.querySelector('input[name = "email"]');
    let mobile = this.querySelector('input[name = "mobile"]');
    let skill  = this.querySelector('#skill_list');
    let img    = this.querySelector('input[name = "img"]');
    let age    = this.querySelector('input[name = "age"]');
    let salary = this.querySelector('input[name = "salary"]');
    let bio    = this.querySelector('textarea[name = "bio"]');
   
if(name.value == '' || email.value == '' || mobile.value == ''){
 alert("All Field Are Required!")
}else{
    axios.post('http://localhost:5050/devs' , {
    id       :'',
    name     : name.value,
    email    : email.value,
    mobile   : mobile.value,
    skillsId : skill.value,
    img      : img.value,
    age      : age.value,
    salary   : salary.value,
    descrip  : bio.value,
}).then(res => {

    devs_short()
    name.value = '';
    email.value = '';
    mobile.value = '';
    skill.value = '';
    img.value = '';
    age.value = '';
    salary.value = '';
    bio.value = '';

})
}
})

function edit_m_profile(id){
    let name     = document.querySelector('input[name = "ename"]');
    let email    = document.querySelector('input[name = "eemail"]');
    let mobile   = document.querySelector('input[name = "emobile"]');
    let skill    = document.querySelector('input[name = "eskill"]');
    let img      = document.querySelector('input[name = "eimg"]');
    let age      = document.querySelector('input[name = "eage"]');
    let salary   = document.querySelector('input[name = "esalary"]');
    let eedit_id = document.querySelector('input[name = "eedit-id"]');
    let bio      = document.querySelector('textarea[name = "ebio"]');
    let preview  = document.querySelector('#preview');

axios.get(`http://localhost:5050/devs/${id}`).then(res => {

    name.value   = res.data.name;
    email.value  = res.data.email;
    mobile.value = res.data.mobile;
    skill.value  = res.data.skillsId;
    img.value    = res.data.img;
    age.value    = res.data.age;
    salary.value = res.data.salary;
    eedit_id.value = id;
    bio.value    = res.data.descrip;
    preview.setAttribute('src', res.data.img)
})
}
edit_member.addEventListener('submit', function(e){
    e.preventDefault();
    let name     = document.querySelector('input[name = "ename"]');
    let email    = document.querySelector('input[name = "eemail"]');
    let mobile   = document.querySelector('input[name = "emobile"]');
    let skill    = document.querySelector('input[name = "eskill"]');
    let img      = document.querySelector('input[name = "eimg"]');
    let age      = document.querySelector('input[name = "eage"]');
    let salary   = document.querySelector('input[name = "esalary"]');
    let eedit_id = document.querySelector('input[name = "eedit-id"]');
    let bio      = document.querySelector('textarea[name = "ebio"]');

    axios.put(`http://localhost:5050/devs/${eedit_id.value}`,{
        name     : name.value,
        email    : email.value,
        mobile   : mobile.value,
        skillsId : skill.value,
        img      : img.value,
        age      : age.value,
        salary   : salary.value,
        descrip  : bio.value,
    }
    ).then(res=> {
        devs_short()
        name.value = '';
        email.value = '';
        mobile.value = '';
        skill.value = '';
        img.value = '';
        age.value = '';
        salary.value = '';
        bio.value = '';
    })
})

function view_profile(id){
    axios.get(`http://localhost:5050/devs/${id}`).then(res =>{

        view_modal.innerHTML = `
                <img style="width: 200px; height: 200px" src="${res.data.img}" class="img-fluid rounded" alt="">
                <h4>${res.data.name}</h4>
                <h6>${res.data.skillId}</h6>
                <h6>${res.data.descrip}</h6>
                <div class="social mt-5">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
        `
    })
}

function delete_m(id){
    axios.delete(`http://localhost:5050/devs/${id}`).then(res =>{

    })
}