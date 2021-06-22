
export default (getStorage, events) => {

    const { updateStorage, resetStorage } = events

    const launcherButton = document
        .querySelector('[data-button=setLocalStorage]')

    const backdrop = document
        .querySelector('[data-component=backdrop]')

    const component = document
        .querySelector('[data-component=localStorage]')

    const closeButton = document
        .querySelector('[data-button=closeStorage]')

    const show = function() {
        component.dataset.hidden = false
        backdrop.dataset.hidden = false
        closeButton.focus()
    }

    const hide = function() {
        component.dataset.hidden = true
        backdrop.dataset.hidden = true
        launcherButton.focus()
    }

    launcherButton
        .addEventListener('click',show)

    closeButton
        .addEventListener('click', hide)
        
    backdrop
        .addEventListener('click', function(){
            if (component.dataset.hidden === "false") {
                hide()
            }
        })

    document
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
        .querySelector('[data-button=enterStorage]')
        .addEventListener('click', function(){
            const str = window.prompt('Local Storage를 입력하세요.')
            if(str){
                updateStorage(str)
                hide()
            }
        })

    document
        .querySelector('[data-button=resetStorage]')
        .addEventListener('click', function(){
            resetStorage()
            hide()
        })

    
}
