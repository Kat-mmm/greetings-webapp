export default function Greetings(){
    let count = 0;
    let genCount = 0;
    let names = [];
    let theName = '';
    let theLanguage = '';

    function setName(name){
        theName = name;
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
        return names.some(nameObj => nameObj.name === name);
    }

    function greet(name, language) {
        const lowercaseName = name.replace(/\s/g, '').toLowerCase();
    
        if (lowercaseName !== '' && !nameExists(lowercaseName)) {
            addCount();
            addName(lowercaseName);
        } else if (name === '' && language === '') {
            return 'Enter a name and language';
        } else if (language === '') {
            return 'No language selected';
        }
        else if (name === ''){
            return ''
        }
        

        const foundName = names.find(nameObj => nameObj.name === lowercaseName);

        if (foundName) {
            foundName.count++;
        }

        if(language !== ''){
            if (language === 'English') {
                return `Hello, ${name}`;
            } else if (language === 'Afrikaans') {
                return `Hallo, ${name}`;
            } else if (language === 'isiZulu') {
                return `Sawubona, ${name}`;
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
        names.push({name, count: count});
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
        getUserGreetCount
    }
}