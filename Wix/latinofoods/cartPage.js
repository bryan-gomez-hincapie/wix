import { fetch } from 'wix-fetch';
import wixWindow from "wix-window";
import wixStores from 'wix-stores';

var ipAddress = "", country = "", city = "";

$w.onReady(function () {
	getUserIP();  
});

function getUserIP(){
    fetch('https://extreme-ip-lookup.com/json', {
        method: 'get'
    })
    .then((httpResponse) => {
        if (httpResponse.ok) {
            return httpResponse.json();
        }
    })
    .then((json) => {
        ipAddress = json.query;
        country = json.country;
        city = json.city;
        console.log("Your IP address is: " + ipAddress + " from " + city + ", " + country); 
        //Santiago de Cali -- Auckland
        if(city !== 'Auckland'){
            //PROMO DESACTIVADA
            if($w('#group31').collapsed){
                $w('#group31').collapse();
            }

            //MENSAJE EMERGENTE
            wixStores.getCurrentCart()
            .then((cartData) => {
                
                for(let i = 0; i < cartData.lineItems.length; i++){
                    let a = cartData.lineItems[i].sku.includes('FRZN');
                    console.log("cartData");
                    console.log(cartData);
                    if(a == true){
                        wixWindow.openLightbox("FrozenCity"); 
                        break;
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            //MENSAJE PROMO
            wixWindow.openLightbox("Promo"); 
            //PROMO ACTIVADA
            if($w('#group31').collapsed){
                $w('#group31').expand();
            }
        }

        return ipAddress;

    });
    
}