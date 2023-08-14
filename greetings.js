export default function Greetings(){
    let count = 0;
    let genCount = 0;
    let names = [];
    let theName = '';
    let theLanguage = '';
    let errorMsgs = [];
    let show = false

    function setErrorMsgs(msg) {
        errorMsgs = msg;
    }

    function getErrorMsgs() {
        return errorMsgs;
    }

    function setName(name){
        const lowercaseName = name.replace(/\s/g, '').toLowerCase();

        theName = lowercaseName;
    }

    function getName(){
        return theName;
    }

    function setLanguage(language){
        theLanguage = language;
    }

    function getLanguage(){
        return theLanguage;
    }

    function getCount(){
        return genCount;
    }

    function getNames(){
        return names;
    }

    function nameExists(name) {
        const lowercaseName = name.replace(/\s/g, '').toLowerCase();
    
        // Check if the name exists while ignoring case
        return names.some(nameObj => nameObj.name === lowercaseName);
    }

    function greet(name, language) {
        const lowercaseName = name.replace(/\s/g, '').toLowerCase();

        const validNamePattern = /^[a-zA-Z]+$/;
    
        if (lowercaseName !== '' && !nameExists(name.replace(/\s/g, '').toLowerCase()) && language !== '' && validNamePattern.test(lowercaseName)) {
            addCount();
            addName(lowercaseName);
        }
        else if (name === '' && language === '') {
            return 'Enter a name and language';
        } else if (language === '') {
            return 'No language selected';
        }
        else if (name === ''){
            return ''
        }
        else if(!validNamePattern.test(lowercaseName)){
            return '';
        }
        
        const foundName = names.find(nameObj => nameObj.name === lowercaseName);

        if (foundName) {
            foundName.count++;
        }

        if(language !== ''){
            if (language === 'English') {
                return `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}`;
            } else if (language === 'Afrikaans') {
                return `Hallo, ${name.charAt(0).toUpperCase() + name.slice(1)}`;
            } else if (language === 'isiZulu') {
                return `Sawubona, ${name.charAt(0).toUpperCase() + name.slice(1)}`;
            }
        }
        else{
            return 'No language selected'
        }
    }    

    function addCount(){
        genCount += 1;
    }

    function addName(name){
        const lowercaseName = name.replace(/\s/g, '').toLowerCase();
    
        const validNamePattern = /^[a-zA-Z]+$/;
    
        if (validNamePattern.test(lowercaseName)) {
            names.push({ name: lowercaseName, count: count });
        }
    }

    function clearCount(){
        count = 0;
    }

    function getUserGreetCount(name) {
        let countOutput = 0;
    
        names.forEach(nameObj => {
            if (nameObj.name === name) {
                countOutput = nameObj.count;
            }
        });
    
        return countOutput;
    }

    function setShow(){
        show = true;
    }

    function getShow(){
        return show;
    }

    return{
        greet,
        getNames,
        addCount,
        getCount,
        addName,
        getName,
        setName,
        getLanguage,
        setLanguage,
        clearCount,
        getUserGreetCount,
        setErrorMsgs,
        getErrorMsgs,
        setShow,
        getShow
    }
}