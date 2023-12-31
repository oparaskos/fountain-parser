import { DialogueElement } from "./DialogueElement";
import { FountainElementWithChildren } from "./FountainElementWithChildren";
import { FountainToken } from "./FountainTokenType";


export class DualDialogueElement extends FountainElementWithChildren<'dual-dialogue', DialogueElement> {
    public type = 'dual-dialogue' as const;
    constructor(
        public tokens: FountainToken[],
        public children: DialogueElement[]
    ) {
        super('dual-dialogue', tokens, children);
    }
}
