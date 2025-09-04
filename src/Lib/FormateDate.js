export function FormateDate(date){


 return new Date(date).toLocaleString("en-US",
            {
                day:"2-digit",
                month:"2-digit",
                year:"numeric",
            }).replaceAll("/","-")
            }


