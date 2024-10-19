function getData(){
    const text = document.getElementsByTagName("pre")[0].innerText;
    const data = text.replaceAll(/bag(s)*\s*/g, "").replaceAll(" .", "").replaceAll(" , ", ",").split("\n");
    data.pop();
    data.forEach((item, index) => {
        const splitData = item.split(" contain ");
        splitData[1] = splitData[1].split(",").map(bag => {
            if(bag == "no other") return "NONE";
            const bagSplit = bag.split(/ (.+)/);
            bagSplit.pop();
            return bagSplit;
        });
        data[index] = splitData;
    })
    return data;
}

//p1
function recursiveGoThroughP1(item, object){
    let goldCount = 0;
    for(const subItem of object[item]){
        if(subItem[1] == "shiny gold") goldCount++;
        if(subItem !== "NONE")
            if(recursiveGoThroughP1(subItem[1], object)) goldCount++;
    }
    return goldCount > 0;
}

function goThroughP1(){
    const data = getData();
    const object = Object.fromEntries(data);
   
    let bagsContaining = 0;
    for(const item of data){
        if(recursiveGoThroughP1(item[0], object)) bagsContaining++;
    }
    return bagsContaining;
}

console.log("Bags with shiny gold bags inside: " + goThroughP1());


//p2
function recursiveGoThroughP2(item, object){
    let count = 0;
    for(const subItem of object[item]){
        if(subItem !== "NONE"){
            count += parseInt(subItem[0]);
            count += parseInt(subItem[0]) * recursiveGoThroughP2(subItem[1], object);
        }
    }
    return count;
}

function goThroughP2(){
    const data = getData();
    const object = Object.fromEntries(data);
   
    let bags = recursiveGoThroughP2("shiny gold", object);
    return bags;
}

console.log("Bags inside of the shiny gold bag: ", goThroughP2());
