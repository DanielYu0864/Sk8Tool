const loadMap = (e) => {
    console.log(e);
    mapDiv.innerHTML = '<iframe class="parkMap" frameborder="0" style="border:0"> yo </iframe>';
    const mapI = document.querySelector(".parkMap");
    mapI.setAttribute("style", "width:100%; height:40vw");

    if (checkParkOrShop = true) {
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${e}&key=${googleMapApiKey}`);
    } else {
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatesboradshop+in+${e}&key=${googleMapApiKey}`);
    }

    $(parkBtn).on("click",() =>{
        checkParkOrShop = true;
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${e}&key=${googleMapApiKey}`);
    });
    $(shopBtn).on("click",() =>{
        checkParkOrShop = false;
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skateshop+in+${e}&key=${googleMapApiKey}`);
    });
}
