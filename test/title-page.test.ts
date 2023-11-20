import { ActionElement, DialogueElement, parse } from '../src';
import { LyricsElement } from '../src/types/LyricsElement';
import { trimIndent } from './utils';

describe('Title Page', () => {
    
    it('should set .titlePage to the TitlePage child', () => {
        const fountainScript = parse(trimIndent(`
            Title: My Awesome Script
        `));
        expect(fountainScript.children[0]).toEqual(fountainScript.titlePage)
    });
    
    
    it('should read a title page with a single attribute', () => {
        const fountainScript = parse(trimIndent(`
            Title: My Awesome Script
        `));
        const titlePage = fountainScript.titlePage;
        expect(titlePage.attributes['Title']).toEqual('My Awesome Script')
    });
    
    it('should read a title page with multiple attributes', () => {
        const fountainScript = parse(trimIndent(`
            Title: My Awesome Script
            Source: This is a test
        `));
        const titlePage = fountainScript.titlePage;
        expect(titlePage.attributes).toEqual({
            Title: 'My Awesome Script',
            Source: 'This is a test'
        })
    });

    it('should read a title page with multi-line attributes', () => {
        const fountainScript = parse(trimIndent(`
            Title: My Awesome Script
            Contact: Jim Jimson
            +01 (555) 555 555
            1 Some st
            blah
            blah
        `));
        const titlePage = fountainScript.titlePage;
        expect(titlePage.attributes['Contact']).toEqual('Jim Jimson\n+01 (555) 555 555\n1 Some st\nblah\nblah')
    });
});
