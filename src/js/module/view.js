
const view = function(template){

    const init = function(){
        const habits = window.localStorage.getItem('habits')
        if( habits ){
            template.drawCpnt()
        }
    }

    return {
        init: init
    }

}

export default view