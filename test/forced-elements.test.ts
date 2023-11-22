import { ActionElement, DialogueElement, parse } from '../src';
import { trimIndent } from './utils';

describe('Forced Elements', () => {
    const titlePage = 'title: example script\n\n';
    
    it('should force character names when @ prefixes a line', () => {
        const fountainScript = parse(trimIndent(`
        ${titlePage}

        @MacDouglas
        Hello World!

        `));
        expect(fountainScript.dialogue).toHaveLength(1);
        const dialogue = fountainScript.dialogue[0];
        
        expect(fountainScript.children.filter(it => it === dialogue));
        expect(dialogue.character).toEqual('MacDouglas');
        expect(dialogue.dialogue).toEqual('Hello World!');
        expect(fountainScript.characterNames).toEqual(['MacDouglas']);
    });
    
    it('should force an action when ! prefixes a line', () => {
        const fountainScript = parse(trimIndent(`
        !BANG
        BANG
        BANG
        `));
        expect(fountainScript.children[0].type).toEqual('title-page');
        expect(fountainScript.children).toHaveLength(4);
        fountainScript.children.slice(1).forEach(element => {
            const action = element as ActionElement;
            expect(action.type).toEqual('action');
            expect(action.textContent).toEqual('BANG');
        });
    });
    
    it('should force lyrics as part of dialogue when ~ prefixes a line and lyrics form dialogue text', () => {
        const fountainScript = parse(trimIndent(`

        SINGER
        ~These are the songs
        ~That I sing
        `));

        const children = fountainScript.children.filter(it => !['line-break', "title-page"].includes(it.type));
        const dialogue = children[0] as DialogueElement;
        expect(dialogue.type).toEqual('dialogue');
        expect(children).toHaveLength(1);
        expect(dialogue.dialogueTokens[0].type).toEqual("lyrics");
        expect(dialogue.dialogueTokens[0].text).toEqual("~These are the songs");
        expect(dialogue.dialogueTokens[1].type).toEqual("lyrics");
        expect(dialogue.dialogueTokens[1].text).toEqual("~That I sing");
    });

    it('should force lyrics even when not as part of dialogue', () => {
        const fountainScript = parse(trimIndent(`
        ~These are the songs
        ~That I sing
        `));

        const children = fountainScript.children.filter(it => !['line-break', "title-page"].includes(it.type));
        expect(children).toHaveLength(2);
        expect(children[0].type).toEqual("lyrics");
        expect(children[0].textContent).toEqual("~These are the songs");
        expect(children[1].type).toEqual("lyrics");
        expect(children[1].textContent).toEqual("~That I sing");
    });
});
