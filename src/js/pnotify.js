import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules, Stack,defaults } from '../../node_modules/@pnotify/core/dist/PNotify.js';

defaults.closer = false;
defaults.delay = 2000;
defaults.sticker = false;
//const message= "Cлишком много совпадений, уточните запрос";
export default function pnotifyError(message) {error({
    text: message,
    stack: new Stack({
        dir1: 'top', dir2: 'right', // Position from the top left corner.
        firstpos1: 0, firstpos3: 0 // 90px from the top, 90px from the left.
    })
});
};

