import { readFile } from 'fs-extra';
import { readJSON, writeJSON } from 'fs-promise';
import {join, resolve} from 'path';
import { FountainScript, parse } from '../src';

const samplesDir = resolve(join(__dirname, '../sample/'));
describe('Fountain Samples', () => {

    describe('Simple.fountain', () => {
        const fixturePath = join(samplesDir, 'Simple.fountain');
        let fountainScript: FountainScript = null as unknown as FountainScript;
        beforeEach(async () => {
            const fixtureContent = await readFile(fixturePath, 'utf-8');
            fountainScript = parse(fixtureContent);
        });

        it('should find all the character names', () => {
            expect(fountainScript.characterNames).toEqual(['MAN']);
        });

        it('should find all the scene names', () => {
            expect(fountainScript.scenes.map(it => it.location?.name)).toEqual(['OFFICE', 'house']);
        });

    });

    for (const sample of ['Boneyard', 'Notes', 'CenteredText', 'Indenting', 'Outlining', 'PageBreaks', 'MultilineAction', 'Dialogue', 'DualDialogue', 'ForcedElements', 'PageBreaks']){
        describe(`${sample}.fountain`, () => {
            const fountainPath = resolve(join(samplesDir, `${sample}.fountain`));
            const snapshotPath = resolve(join(samplesDir, `.snapshot/${sample}.json`));

            it(`should parse with no exception and return some data`, async () => {
                const script = parse(await readFile(fountainPath, 'utf-8'));
                expect(script).not.toBeFalsy();
                expect(script.children).not.toHaveLength(0);
            });

            it(`should match snapshot`, async () => {
                // await writeJSON(snapshotPath, parse(await readFile(fountainPath, 'utf-8')), {spaces:2});
                const snapshot = await readJSON(snapshotPath);
                expect(JSON.parse(JSON.stringify(parse(await readFile(fountainPath, 'utf-8'))))).toEqual(snapshot);
            });
        });
    }
});
