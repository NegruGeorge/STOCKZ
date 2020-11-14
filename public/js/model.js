

document.getElementById('add_stock').addEventListener('click',()=>{
    document.querySelector(".bg-model-add").style.display="flex";
 
})

document.querySelector('.close-add').addEventListener('click',()=>{
    document.querySelector('.bg-model-add').style.display='none';
})

document.getElementById('filter_stock').addEventListener('click',()=>{
    document.querySelector(".bg-model-filter").style.display="flex";
 
})


document.querySelector('.close-filter').addEventListener('click',()=>{
    document.querySelector('.bg-model-filter').style.display='none';
})