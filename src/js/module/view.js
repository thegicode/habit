
const view = function(template){

    const init = function( habits ){
        showHabits( habits )
    }

    const showHabits = function( habits ){
        template.drawCpnt( habits )
    }

    return {
        init: init,
        showHabits: showHabits
    }

}

export default view