export function calculate(expression){
    try{
        return eval(expression);
    }catch{
        return "Error";
    }
}