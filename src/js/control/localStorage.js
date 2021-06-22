
export default (getStorage, events) => {

    const { updateStorage, resetStorage } = events

    const backdrop = document
        .querySelector('#backdrop')

    const component = document
        .querySelector('#localStorage')

    const launcherButton = document
        .querySelector('#root')
        .querySelector('[data-button=localStorage]')

    const closeButton = component
        .querySelector('[data-button=close]')

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

    component
        .querySelector('[data-button=save]')
        .addEventListener('click', function(e){
            const storage = JSON.stringify( getStorage() )
            const file = new Blob([storage], {type: 'text/plain'})
            let a = document.createElement("a")
            a.href = URL.createObjectURL(file)
            a.download = 'habits.txt'
            a.click()
        })

    component
        .querySelector('[data-button=email]')
        .addEventListener('click', function(e){
            const storage = JSON.stringify( getStorage() )
            const email = window.prompt('이메일 주소를 입력하세요.')
            window.location.href = `mailto:${email}?subject=Habits LocalStorage&body=${storage}`
        })

    component
        .querySelector('[data-button=enter]')
        .addEventListener('click', function(){
            const str = window.prompt('Local Storage를 입력하세요.')
            if(str){
                updateStorage(str)
                hide()
            }
        })

    component
        .querySelector('[data-button=reset]')
        .addEventListener('click', function(){
            resetStorage()
            hide()
        })
    
}
