# habits

## Constructure
- Habiker 
    - template: app
    - habit and tracker
- Habikers 
    - template: habiker
    - habikers items
- trackers 
    - template: tracker
    - trackers items


## Selector [data-attribute]
- [data-template="value"] : Select template element
- [data-componet="value"] : Select comonent
- [data-button="value"] : Select button element 
- [data-text="value"] : Select text element 



## CSS Naming Rule

### List and Item
- list, item의 의미를 가진 고유명으로 지정한다.
- ex) tracker-list => trackers, trackers-item => tracker

### "__name"
- 블럭 내에서만 사용한다는 의미
- 블록의 마지막 자식 요소인 경우가 많다.
- 매번 새로운 이름으로 지정하는 피로도를 없애기 위해 
- 자주 사용하는 네이밍인 경우가 있다.
- ex) __button, __link, __text


## To Do
- scss 정리