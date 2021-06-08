
export default (getStorage, events) => {

    const dimmed = document
        .querySelector('[data-component=dimmed]')

    const component = document
        .querySelector('[data-component=localStorage]')

    const launcherButton = document
        .querySelector('[data-button=setLocalStorage]')

    const closeButton = document
        .querySelector('[data-button=closeStorage]')

    launcherButton
        .addEventListener('click', function(){
            component.dataset.hidden = false
            dimmed.dataset.hidden = false
            closeButton.focus()
        })

    closeButton
        .addEventListener('click', function(){
            component.dataset.hidden = true
            dimmed.dataset.hidden = true
            launcherButton.focus()
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
            window.location.href = `mailto:thegicode@gmail.com?subject=Habits Get LocalStorage&body=${storage}`
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

    dimmed
        .addEventListener('click', function(){
            if (component.dataset.hidden === "false") {
                component.dataset.hidden = true
                this.dataset.hidden = true;
            }
        })
}
