const baseurl="https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
window.addEventListener("load",()=>
{
    updateExchangeRate();
})
for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        select.append(newOption);
        if(select.name==="from" && currcode==="USD")
        {
            newOption.selected="selected";
        }
        if(select.name==="to" && currcode==="NPR")
        {
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>
    {
        updateFlag(evt.target);
    });
}
const updateFlag =(element)=>
{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click", (evt)=>
{
    evt.preventDefault();
     updateExchangeRate();
    
});
const updateExchangeRate =async ()=>
{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal <1 )
    {
        amtVal=1;
        amount.value="1";
    }
    console.log(fromCurr.value,toCurr.value);
    const URL=`${baseurl}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    console.log(data);
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    console.log(amtVal);
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;   
}
