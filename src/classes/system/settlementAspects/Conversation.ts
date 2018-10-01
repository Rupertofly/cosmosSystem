import Settlement from '../settlement';

class Conversation {
    public speed = 4;
    constructor(
        public type: 'Green' | 'Orange' | 'Purple',
        public source: Settlement,
        public dest: Settlement
    ) {}
}

export default Conversation;
