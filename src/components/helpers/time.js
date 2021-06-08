export function timeConvert(num) { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  var hoursText = hours > 1 ? " hours" : " hour";
  var minutesText = minutes > 1 ? " minutes" : " minute";

  if(!minutes){
    return (hours+"").padStart(2, "0") + hoursText;         
  }

  if(hours){
    return (hours+"").padStart(2, "0") + hoursText+" and " + (minutes+"").padStart(2, "0")+minutesText;         
  }
  return (minutes+"").padStart(2, "0")+minutesText;         

}