export function timeConvert(num) { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  var hoursText = hours > 1 ? " horas" : " hora";
  var minutesText = minutes > 1 ? " minutos" : " minuto";

  if(!minutes){
    return (hours+"").padStart(2, "0") + hoursText;         
  }

  if(hours){
    return (hours+"").padStart(2, "0") + hoursText+" y " + (minutes+"").padStart(2, "0")+minutesText;         
  }
  return (minutes+"").padStart(2, "0")+minutesText;         

}

export function timeShortConvert(num) { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  var hoursText = " h";
  var minutesText = " min"

  if(!minutes){
    return (hours+"").padStart(2, "0") + hoursText;         
  }

  if(hours){
    return (hours+"").padStart(2, "0") + hoursText+" " + (minutes+"").padStart(2, "0")+minutesText;         
  }
  return (minutes+"").padStart(2, "0")+minutesText;         
}

export function timeShortPowerTen(num) { 
   return timeShortConvert(timePowerTen(num));
}

export function timePowerTen(num) { 
  return num*10;
}