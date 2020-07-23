const btnModal = document.querySelectorAll(".btn-inversion");
const modal = document.querySelectorAll(".modal");
const modalDiv = document.querySelectorAll(".modal-div");
btnModal.forEach((element, index) => {
  element.onclick = () => {
    modal[index].style.display = "block";
    modalDiv[index].style.display = "block";
  };
});
modalDiv.forEach((element,index)=>{
    element.onclick = () => {
        modalDiv[index].style.display='none'
        modal.forEach((element) => {
            element.style.display = "none";
            element.style.display = "none";
        });
    };
})
