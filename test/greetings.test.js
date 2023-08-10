import assert from 'assert';
import Greetings from '../greetings.js';

describe('Greetings Tests', () => {
    describe('Should be able to greet a user', () => {
        it('Should return a greeting when a user inserts a name', () => {
            const greeting = Greetings();
            greeting.setLanguage('English');
            const language = greeting.getLanguage()

            assert.equal('Hello, Naledi', greeting.greet('Naledi', language));
            assert.equal('Hello, Daniel', greeting.greet('Daniel', language));
        })

        it('When a user does not insert a name there should be an error', () => {
            const greeting = Greetings();
            greeting.setLanguage('English');
            const language = greeting.getLanguage()

            assert.equal('', greeting.greet('', language));
        })

        it('When a user does not insert a language there should be an error', () => {
            const greeting = Greetings();
            greeting.setLanguage('');
            const language = greeting.getLanguage()
     
            assert.equal('No language selected', greeting.greet('Kat', language));
        })

        it('When a user does not insert a language and a name there should be an error', () => {
            const greeting = Greetings();

            assert.equal('Enter a name and language', greeting.greet('', ''));
        })
    })
    describe('Should be able to greet a user in different Languages', () => {
        it('Should return a greeting in Afrikaans when a user inserts a name', () => {
            const greeting = Greetings();
            greeting.setLanguage('Afrikaans');
            const language = greeting.getLanguage()

            assert.equal('Hallo, Katlego', greeting.greet('Katlego', language));
        })
        it('Should return a greeting in isiZulu when a user inserts a name', () => {
            const greeting = Greetings();
            greeting.setLanguage('isiZulu');
            const language = greeting.getLanguage()

            assert.equal('Sawubona, Percy', greeting.greet('Percy', language));
        })
        it('Should return a greeting in English when a user inserts a name', () => {
            const greeting = Greetings();
            greeting.setLanguage('English');
            const language = greeting.getLanguage()

            assert.equal('Hello, Scott', greeting.greet('Scott', language));
        })
    })

    describe('Should be able to keep a count of the number of people greeted', () => {
        it('When you greet user the count should increase', () => {
            const greeting = Greetings();

            greeting.setLanguage('English');
            const language = greeting.getLanguage()
        
            greeting.greet('Naledi', language);
            greeting.greet('Daniel', language);

            assert.equal(2, greeting.getCount());
        })
        it('When you greet 3 users the count should be 3', () => {
            const greeting = Greetings();

            greeting.setLanguage('English');
            const language = greeting.getLanguage()
       
            greeting.greet('Naledi', language);
            greeting.greet('Daniel', language);
            greeting.greet('Cole', language);
            

            assert.equal(3, greeting.getCount());
        })
    })

    describe('Should be able to check if the user has been greeted before increasing the count', () => {
        it('When you greet the same user 2 times, the count should be 1', () => {
            const greeting = Greetings();

            greeting.setLanguage('English');
            const language = greeting.getLanguage()
        
            greeting.greet('Naledi', language);
            greeting.greet('Naledi', language);

            assert.equal(1, greeting.getCount());
        })
        it('When you greet the same user again the counter should not increase', () => {
            const greeting = Greetings();

            greeting.setLanguage('English');
            const language = greeting.getLanguage()
        
            greeting.greet('Daniel', language);
            greeting.greet('Daniel', language);
            greeting.greet('Cole', language);
            

            assert.equal(2, greeting.getCount());
        })
    })
  
})