
export default (getStorage, events) => {
    
    const dimmedComponent = document
        .querySelector('[data-component=dimmed]')

    const localStorageComponent = document
        .querySelector('[data-component=localStorage]')

    const setLocalStorageButton = document
        .querySelector('[data-button=setLocalStorage]')

    const closeLocalStorageButton = document
        .querySelector('[data-button=closeStorage]')

    setLocalStorageButton
        .addEventListener('click', function(){
            localStorageComponent.dataset.hidden = false
            dimmedComponent.dataset.hidden = false
            closeLocalStorageButton.focus()
        })

    closeLocalStorageButton
        .addEventListener('click', function(){
            localStorageComponent.dataset.hidden = true
            dimmedComponent.dataset.hidden = true
            setLocalStorageButton.focus()
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
        .querySelector('[data-button=setStorage]')
        .addEventListener('click', function(){
            const str = window.prompt('Local Storage를 입력하세요.')
            if(str){
                events.updateStorage(str)
                localStorageComponent.dataset.hidden = true
                dimmedComponent.dataset.hidden = true
            }
        })
}
