function listWords (words){
    return words
    .map(word=>word.toLowerCase())
    .filter(word =>word.length >= 4)
    .filter(word => !word.includes("z"))
    .sort();
}
let words = ["Apple" ,"cat","zebra", "pineApple", "Red","papaya"];
console.log(listWords(words));