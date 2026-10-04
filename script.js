const form=document.getElementById("contactForm"),msg=document.getElementById("msg");
form.addEventListener("submit",async e=>{e.preventDefault();const b=form.querySelector("button"),old=b.textContent;b.disabled=true;b.textContent="Invio in corso…";msg.textContent="";try{const r=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});if(!r.ok)throw Error();msg.textContent="Richiesta inviata con successo ✓";form.reset()}catch(e){msg.textContent="Invio non riuscito. Riprova o contattaci su WhatsApp."}finally{b.disabled=false;b.textContent=old}});

const booking=document.getElementById("bookingForm");
if(booking){
const bookingMsg=document.getElementById("bookingMsg");
const typeInput=document.getElementById("appointmentType");
const timeInput=document.getElementById("selectedTime");
const dateField=document.getElementById("bookingDate");
const summary=document.getElementById("summaryText");
const today=new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset()); dateField.min=today.toISOString().split("T")[0];

function updateSummary(){
  const type=typeInput.value;
  const date=dateField.value ? new Date(dateField.value+"T12:00:00").toLocaleDateString("it-IT",{weekday:"short",day:"2-digit",month:"long"}) : "Seleziona data";
  const time=timeInput.value || "Seleziona orario";
  summary.textContent=`${type} · ${date} · ${time}`;
}
document.querySelectorAll(".service-option").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".service-option").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active"); typeInput.value=btn.dataset.type; updateSummary();
}));
document.querySelectorAll(".time-option").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".time-option").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active"); timeInput.value=btn.dataset.time; updateSummary();
}));
dateField.addEventListener("change",updateSummary);

booking.addEventListener("submit",async e=>{
 e.preventDefault();
 if(!timeInput.value){bookingMsg.textContent="Seleziona una fascia oraria."; bookingMsg.className="booking-message error"; return;}
 const b=booking.querySelector(".modern-submit"), old=b.innerHTML;
 b.disabled=true; b.innerHTML="<span>Invio in corso…</span><b>•••</b>"; bookingMsg.textContent="";
 try{
   const r=await fetch(booking.action,{method:"POST",body:new FormData(booking),headers:{Accept:"application/json"}});
   if(!r.ok) throw Error();
   bookingMsg.textContent="Richiesta inviata ✓ Ti ricontatteremo per confermare l'appuntamento.";
   bookingMsg.className="booking-message success";
   booking.reset(); typeInput.value="Consulenza sicurezza"; timeInput.value="";
   document.querySelectorAll(".service-option").forEach(x=>x.classList.remove("active"));
   document.querySelector('.service-option[data-type="Consulenza sicurezza"]').classList.add("active");
   document.querySelectorAll(".time-option").forEach(x=>x.classList.remove("active")); updateSummary();
 }catch(e){
   bookingMsg.textContent="Invio non riuscito. Riprova o contattaci su WhatsApp.";
   bookingMsg.className="booking-message error";
 }finally{b.disabled=false;b.innerHTML=old;}
});
updateSummary();
}
