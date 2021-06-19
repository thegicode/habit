
export default (getStorage, events) => {

    const launcherButton = document
        .querySelector('[data-button=setPermanent]')

    const dimmed = document
        .querySelector('[data-component=dimmed]')

    const component = document
        .querySelector('[data-component=permanent]')

    const closeButton = document
        .querySelector('[data-button=closePermanent]')


    const show = function() {
        component.hidden = false
        dimmed.dataset.hidden = false
        closeButton.focus()
    }

    const hide = function() {
        component.hidden = true
        dimmed.dataset.hidden = true
        launcherButton.focus()
    }


    launcherButton
        .addEventListener('click', show)

    closeButton
        .addEventListener('click', hide)

    dimmed
        .addEventListener('click', function(){
            if (!component.hidden) {
                hide()
            }
        })

    /*document
        .querySelector('[data-button=saveStorage]')
        .addEventListener('click', function(e){
            const storage = JSON.stringify( getStorage() )
            const file = new Blob([storage], {type: 'text/plain'})
            let a = document.createElement("a")
            a.href = URL.createObjectURL(file)
            a.download = 'habits.txt'
            a.click()
        })

    document
        .querySelector('[data-button=sendStorage]')
        .addEventListener('click', function(e){
            const storage = JSON.stringify( getStorage() )
            window.location.href = `mailto:thegi.code@gmail.com?subject=Habits Get LocalStorage&body=${storage}`
        })

    document
        .querySelector('[data-button=EnterStorage]')
        .addEventListener('click', function(){
            const str = window.prompt('Local Storage를 입력하세요.')
            if(str){
                events.updateStorage(str)
                component.dataset.hidden = true
                dimmed.dataset.hidden = true
            }
        })
*/
    
}
