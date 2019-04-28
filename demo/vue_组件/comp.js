define('input2', function(){
    var template = `
        <div>
            <input type="text" v-model="aaa"/>
        </div>
    `;
    return {
        template: template,
        data: function(){
            return {
                aaa: this.value
            }
        },
        props: {
            value: {
                type: [String, Number],
                default: function(){
                    return '';
                }
            },
            type: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            aaa: function(value){
                this.$emit('input', value);
                if (value == "10") {
                    this.$emit('update:type', false);
                }
            }
        }
    }
});

require(['vue', 'input2'],  function(Vue, input2) {
    new Vue({
        el: '#app',
        data: {
            name: '',
            text: 'hello',
            type: true
        },
        components: {
            'input2': input2
        },
        methods: {
            change: function(value){
                console.log(arguments)
            }
        }
    })
})