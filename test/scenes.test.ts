import { readFile } from 'fs-extra';
import { readJSON, writeJSON } from 'fs-promise';
import {join, resolve} from 'path';
import { FountainScript, LocationType, parse } from '../src';
import { trimIndent } from './utils';

describe('Scenes', () => {
    const variations = [
        {line: 'INT. MY LOCATION', name: 'MY LOCATION', locationType: LocationType.INTERIOR, timeOfDay: undefined},
        {line: 'INT. MY LOCATION - DAY', name: 'MY LOCATION', locationType: LocationType.INTERIOR, timeOfDay: 'DAY'},
        {line: 'EXT. LOCATION 2 - EVENTIDE', name: 'LOCATION 2', locationType: LocationType.EXTERIOR, timeOfDay: 'EVENTIDE'}
    ]
    variations.forEach(({line, name, locationType, timeOfDay }) => {
        it(`should give ${name} for '${line}'`, async () => {
            const script = parse(trimIndent(`
            ${line}
            
            Sally walks cautiously into the room
    
            BEN
            Boo!
            `));
            expect(script?.scenes?.[0]?.location).not.toBeFalsy();
            expect(script.scenes[0].location?.name).toEqual(name);
            expect(script.scenes[0].location?.locationType).toEqual(locationType);
            expect(script.scenes[0].location?.timeOfDay).toEqual(timeOfDay);
        });
    });
    

});
