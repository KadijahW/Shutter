const dropdown = () =>{
    document.getElementById("myDropdown").classList.toggle("show")
    console.log("classList", document.getElementById("myDropdown").classList)
    //Close the dropdown if the user clicks outside of it
    window.onclick = function(e){
        console.log("hamburder menu js function triggered")
        console.log("event target", e.target)
        console.log("get element", document.getElementById("myDropdown"))

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