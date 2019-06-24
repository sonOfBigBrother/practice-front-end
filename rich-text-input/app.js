import paste from './src/paste.js';
import {getCursorPosition, setCursorPosition} from './src/cursorPosition.js';
import emoji from './src/emoji.js';

const exec = (command, args = null) => {
    document.execCommand(command, false, args);
};
const vm = new Vue({
    el:'#app',
    data() {
        return {
            editor:null,
            cursorPosition:0,
            emoji
        }
    },
    mounted() {
        this.editor = this.$refs['editor'];
    },
    methods: {
        submit (e){
            const value = e.target.innerHTML.replace(/[\n\r]$/,'');
            if (value) {
                console.info('Submit text', { value });
                e.target.innerText = '';
            }
        },
        async onPaste (e) {
            const result = await paste(e);
            const imgRegexp = /^data:iamge\/png|jpg;base64,/;
            if (imgRegexp.test(result)) {
                document.execCommand('insertImage', false, result);
            } else {
                document.execCommand('insertText', false, result);
            }
        },
        getCursor () {
            this.cursorPosition = getCursorPosition(this.editor);
        },
        insertEmoji(emoji) {
            const text = this.editor.innerHTML;
            this.editor.innerHTML = text.slice(0, this.cursorPosition) + emoji + text.slice(this.cursorPosition, text.length);
            setCursorPosition(this.editor, this.cursorPosition + 1);
            this.cursorPosition = getCursorPosition(this.editor) + 1;
        },
        bold(){
            exec('bold');
        },
        formatBlock() {
            exec('formatBlock','<p>');
        },
        insertLink(){
            let url = window.prompt('请输入链接地址');
            if (url) {
                exec('createLink', url);
            }
        },
        insertImg(e){
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onload = () => {
                let base64Img = reader.result;
                exec('insertImage', base64Img);  
            }
            reader.readAsDataURL(file);
        }
    }
})