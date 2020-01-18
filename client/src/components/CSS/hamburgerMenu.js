const dropdown = () =>{
    document.getElementById("myDropdown").classList.toggle("show")
    //Close the dropdown if the user clicks outside of it
    window.onclick = function(e){
        // if (!e.target.matches('.dropbtn')){
            // console.log("get element", document.getElementById("myDropdown"))
        //     let myDropdown = document.getElementById("myDropdown");
        //     if (myDropdown.classList.contains('show')){
        //         myDropdown.classList.remove('show');
        //     }
        // }
    }
}

export default{
    dropdown
}