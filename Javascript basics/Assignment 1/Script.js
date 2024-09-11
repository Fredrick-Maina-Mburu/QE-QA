// Check if a String is a Palindrome
function isPalindrome (str){
  const stringWithNoPunctuations = str.replace(/[.,!?\s]/g, '').toLowerCase();
  const reversedString = stringWithNoPunctuations.split('').reverse().join('');

  return stringWithNoPunctuations === reversedString
}

//test cases
console.log(isPalindrome("A man, a plan ,a canal panama"))
console.log(isPalindrome("Was it a car or a cat I saw?"))
console.log(isPalindrome("Hello, World!"))


//reverse String
function reverseString(str) {
  return str.split('').reverse().join('');
}

// testcases
console.log(reverseString("Hello, World!"))



// find the longest palindromic substring
function checkPalindrom(str){
  const stringWithNoPunctuations = str.replace(/[.,!?\s]/g, '').toLowerCase();
  const reversedString = stringWithNoPunctuations.split('').reverse().join('');

  return stringWithNoPunctuations === reversedString
}

function longestPalindromicSubstring (str) {
   if (checkPalindrom(str)){
      return str
   }
  let longestString = ''
  let start = 0
  

  while(start < str.length){

    let next = start + 1

    while (next < str.length){
      let tempString = str.substring(start,next + 1)
      if(checkPalindrom(tempString) && tempString.length > longestString.length)(
        longestString = tempString
      )
      next++
     }
     start++
  }
   
   return longestString

}

// //test cases
console.log(longestPalindromicSubstring('babad'))
console.log(longestPalindromicSubstring('cbbd'))
console.log(longestPalindromicSubstring('madamracecar'))



// check if two strings are anagarams
function areAnagrams(str1, str2) {

  return str1.toLowerCase().split("").sort().join('') === str2.toLowerCase().split("").sort().join('')
}

// test cases
console.log(areAnagrams('Listen', 'Silent'))
console.log(areAnagrams('Hello', "World"))



//remove duplicate from a string
function removeDuplicates(str) {
  let stringArr = str.split('')
  let result = []
  for(i = 0; i < stringArr.length; i++){
    let isDuplicate = false

    for(j = 0; j < result.length; j++){
      if(stringArr[i] === result[j]){
        isDuplicate = true
        break
      } 
    }

    if(!isDuplicate){
      result.push(stringArr[i])
    }
  }
  return result.join('')

}

//test cases
console.log(removeDuplicates('programming'))
console.log(removeDuplicates('hello world'))
console.log(removeDuplicates('aaaaa'))
console.log(removeDuplicates('abcd'))
console.log(removeDuplicates('aabbcc'))



//count palindrome in a string
function checkPalindrom(str){
  const stringWithNoPunctuations = str.replace(/[.,!?\s]/g, '').toLowerCase();
  const reversedString = stringWithNoPunctuations.split('').reverse().join('');

  return stringWithNoPunctuations === reversedString
}

function countPalindromes (str) {
  
  let count = new Set()
  let start = 0
  

  while(start < str.length){

    let next = start + 1

    while (next <= str.length){
      let tempString = str.substring(start, next)
      if(checkPalindrom(tempString))(
        count.add(tempString)
      )
      next++
     }
     start++
  }
   
   return count.size

}

// //test cases
console.log(countPalindromes('ababa'))
console.log(countPalindromes('racecar'))
console.log(countPalindromes('aabb'))
console.log(countPalindromes('a'))
console.log(countPalindromes('abc'))


//longest common prefix
function longestCommonPrefix(strs) {
  if (strs.length === 0) {
    return "";
  }
  let prefix = strs[0]; //flower
  for (let i = 1; i < strs.length; i++) {
          //flow.indexOf(flower)
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") {
        return "";
      }
    }
  }
  return prefix;
}

//test cases
console.log(longestCommonPrefix(['flower', 'flow', 'flight']))
console.log(longestCommonPrefix(['dog', 'racecar', 'car']))
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate']))
console.log(longestCommonPrefix(['prefix', 'prefixes', 'prefore']))



//case insensitive palindrome
function isPalindrome (str){
  const stringWithNoPunctuations = str.replace(/[.,!?\s]/g, '').toLowerCase();
  const reversedString = stringWithNoPunctuations.split('').reverse().join('');

  return stringWithNoPunctuations === reversedString
}

//test cases
console.log(isPalindrome("Aba"))
console.log(isPalindrome("Racecar"))
console.log(isPalindrome("Palindrome"))
console.log(isPalindrome("Madam"))
console.log(isPalindrome("Hello"))